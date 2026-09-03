"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Pause, Play, RotateCcw, Trophy } from "lucide-react";

const BEST_KEY = "tee-breakout-best";

// Logical canvas resolution (scaled responsively via CSS).
const W = 800;
const H = 560;
const COLS = 10;
const BRICK_GAP = 6;
const SIDE_MARGIN = 40;
const TOP_MARGIN = 64;
const BRICK_H = 22;
const PADDLE_H = 14;
const BASE_PADDLE_W = 112;
const BALL_R = 7;
const MAX_BALLS = 6;
const START_LIVES = 3;
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

type PowerType = "expand" | "multi" | "life" | "slow";

type Brick = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  name: string;
  hits: number;
  alive: boolean;
};

type Ball = { x: number; y: number; vx: number; vy: number; stuck: boolean };
type PowerUp = { x: number; y: number; vy: number; type: PowerType };
type Status = "idle" | "playing" | "paused" | "levelclear" | "gameover";

/** Tech stack used for the brick rows — consistent with the Tools & Stack section. */
const TECHS = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#f5f0e8" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Tailwind", color: "#38BDF8" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Framer", color: "#f5f0e8" },
  { name: "Node.js", color: "#5FA04E" },
  { name: "Git", color: "#F05033" },
];

const POWER_LABEL: Record<PowerType, string> = {
  expand: "W",
  multi: "×",
  life: "+",
  slow: "S",
};

const POWER_COLOR: Record<PowerType, string> = {
  expand: "#5a9e8f",
  multi: "#8a6fc7",
  life: "#c45c3e",
  slow: "#d4a574",
};

/** True only after hydration — lets us read localStorage without SSR mismatch. */
function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/** Converts a #rrggbb hex to an rgba() string with the given alpha. */
function hexA(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const gg = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${gg},${b},${alpha})`;
}

export default function BreakoutGame() {
  const hydrated = useHydrated();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const apiRef = useRef<{ start: () => void; togglePause: () => void } | null>(null);
  const levelClearTimer = useRef<number | null>(null);

  // HUD state (mirrors the authoritative refs used by the loop).
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [level, setLevel] = useState(1);
  const [serving, setServing] = useState(true);
  const [sessionBest, setSessionBest] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);

  // Read the persisted best only once hydrated (SSR-safe, no setState-in-effect).
  const storedBest = useMemo<number | null>(() => {
    if (!hydrated) return null;
    try {
      const raw = window.localStorage.getItem(BEST_KEY);
      return raw ? Number(raw) : null;
    } catch {
      return null;
    }
  }, [hydrated]);

  const best = sessionBest ?? storedBest;

  // Authoritative mutable game state.
  const g = useRef({
    paddleX: W / 2,
    paddleW: BASE_PADDLE_W,
    balls: [] as Ball[],
    bricks: [] as Brick[],
    powerups: [] as PowerUp[],
    score: 0,
    lives: START_LIVES,
    level: 1,
    status: "idle" as Status,
    serving: true,
    keys: { left: false, right: false },
    expandUntil: 0,
    slowUntil: 0,
    flash: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;

    const speedFor = (lvl: number) => 300 + (lvl - 1) * 24;

    function readBest(): number | null {
      try {
        const raw = window.localStorage.getItem(BEST_KEY);
        return raw ? Number(raw) : null;
      } catch {
        return null;
      }
    }

    // NOTE: no React setState here — this also runs during effect init.
    function buildLevel(lvl: number) {
      const rows = clamp(3 + Math.floor((lvl + 1) / 2), 4, 7);
      const brickW = (W - SIDE_MARGIN * 2 - BRICK_GAP * (COLS - 1)) / COLS;
      const bricks: Brick[] = [];
      for (let r = 0; r < rows; r++) {
        const tech = TECHS[r % TECHS.length];
        for (let c = 0; c < COLS; c++) {
          const armored = lvl >= 2 && r < 2 && (c + r) % 3 === 0;
          bricks.push({
            x: SIDE_MARGIN + c * (brickW + BRICK_GAP),
            y: TOP_MARGIN + r * (BRICK_H + BRICK_GAP),
            w: brickW,
            h: BRICK_H,
            color: tech.color,
            name: tech.name,
            hits: armored ? 2 : 1,
            alive: true,
          });
        }
      }
      const s = g.current;
      s.bricks = bricks;
      s.powerups = [];
      s.paddleW = BASE_PADDLE_W;
      s.paddleX = W / 2;
      s.expandUntil = 0;
      s.slowUntil = 0;
      s.balls = [
        { x: W / 2, y: H - 40 - PADDLE_H / 2 - BALL_R - 1, vx: 0, vy: 0, stuck: true },
      ];
      s.serving = true;
    }

    function syncHud() {
      const s = g.current;
      setScore(s.score);
      setLives(s.lives);
      setLevel(s.level);
      setStatus(s.status);
      setServing(s.serving);
    }

    function gameOver() {
      g.current.status = "gameover";
      const finalScore = g.current.score;
      const prev = readBest();
      if (prev === null || finalScore > prev) {
        setSessionBest(finalScore);
        setIsNewBest(true);
        try {
          window.localStorage.setItem(BEST_KEY, String(finalScore));
        } catch {
          /* storage unavailable — ignore */
        }
      } else {
        setIsNewBest(false);
      }
      syncHud();
    }

    function start() {
      if (levelClearTimer.current) {
        window.clearTimeout(levelClearTimer.current);
        levelClearTimer.current = null;
      }
      const s = g.current;
      s.score = 0;
      s.lives = START_LIVES;
      s.level = 1;
      s.status = "playing";
      setIsNewBest(false);
      buildLevel(1);
      syncHud();
    }

    function nextLevel() {
      const s = g.current;
      s.level += 1;
      s.score += 200;
      s.status = "playing";
      buildLevel(s.level);
      syncHud();
    }

    function togglePause() {
      const s = g.current;
      if (s.status === "playing") s.status = "paused";
      else if (s.status === "paused") s.status = "playing";
      else return;
      setStatus(s.status);
    }

    function launch() {
      const s = g.current;
      if (s.status !== "playing" || !s.serving) return;
      const sp = speedFor(s.level);
      for (const b of s.balls) {
        if (!b.stuck) continue;
        const angle = -Math.PI / 2 + (Math.random() * 0.5 - 0.25);
        b.vx = Math.cos(angle) * sp;
        b.vy = Math.sin(angle) * sp;
        b.stuck = false;
      }
      s.serving = false;
      setServing(false);
    }

    apiRef.current = { start, togglePause };

    // ── Input ──
    function pointerToLogical(clientX: number) {
      const rect = canvas!.getBoundingClientRect();
      return (clientX - rect.left) * (W / rect.width);
    }
    function movePaddle(clientX: number) {
      g.current.paddleX = clamp(
        pointerToLogical(clientX),
        g.current.paddleW / 2,
        W - g.current.paddleW / 2
      );
    }
    function onMouseMove(e: MouseEvent) {
      movePaddle(e.clientX);
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length === 0) return;
      e.preventDefault();
      movePaddle(e.touches[0].clientX);
    }
    function onClick() {
      const st = g.current.status;
      if (st === "idle" || st === "gameover") start();
      else launch();
    }
    function onKeyDown(e: KeyboardEvent) {
      const k = e.key;
      if (k === "ArrowLeft" || k === "a" || k === "A") g.current.keys.left = true;
      if (k === "ArrowRight" || k === "d" || k === "D") g.current.keys.right = true;
      if (k === " ") {
        e.preventDefault();
        const st = g.current.status;
        if (st === "idle" || st === "gameover") start();
        else if (st === "playing") launch();
      }
      if (k === "p" || k === "P" || k === "Escape") togglePause();
    }
    function onKeyUp(e: KeyboardEvent) {
      const k = e.key;
      if (k === "ArrowLeft" || k === "a" || k === "A") g.current.keys.left = false;
      if (k === "ArrowRight" || k === "d" || k === "D") g.current.keys.right = false;
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // ── Simulation ──
    function applyPower(type: PowerType) {
      const s = g.current;
      const now = performance.now();
      s.score += 25;
      if (type === "expand") s.expandUntil = now + 9000;
      else if (type === "slow") s.slowUntil = now + 6000;
      else if (type === "life") s.lives = Math.min(s.lives + 1, 6);
      else if (type === "multi") {
        const src = s.balls.slice(0);
        for (const b of src) {
          if (s.balls.length >= MAX_BALLS) break;
          const sp = Math.hypot(b.vx, b.vy) || speedFor(s.level);
          for (const dir of [-0.5, 0.5]) {
            if (s.balls.length >= MAX_BALLS) break;
            const ang = Math.atan2(b.vy, b.vx) + dir;
            s.balls.push({
              x: b.x,
              y: b.y,
              vx: Math.cos(ang) * sp,
              vy: Math.sin(ang) * sp,
              stuck: false,
            });
          }
        }
      }
      setScore(s.score);
      setLives(s.lives);
    }

    function update(dt: number) {
      const s = g.current;
      if (s.status !== "playing") return;
      const now = performance.now();

      s.paddleW = now < s.expandUntil ? BASE_PADDLE_W * 1.55 : BASE_PADDLE_W;
      const slowMult = now < s.slowUntil ? 0.68 : 1;
      const speed = speedFor(s.level) * slowMult;

      const kSpeed = 560 * dt;
      if (s.keys.left) s.paddleX -= kSpeed;
      if (s.keys.right) s.paddleX += kSpeed;
      s.paddleX = clamp(s.paddleX, s.paddleW / 2, W - s.paddleW / 2);

      const paddleY = H - 40;

      for (const b of s.balls) {
        if (b.stuck) {
          b.x = s.paddleX;
          b.y = paddleY - PADDLE_H / 2 - BALL_R - 1;
          continue;
        }
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // Walls.
        if (b.x - BALL_R < 0) {
          b.x = BALL_R;
          b.vx = Math.abs(b.vx);
        } else if (b.x + BALL_R > W) {
          b.x = W - BALL_R;
          b.vx = -Math.abs(b.vx);
        }
        if (b.y - BALL_R < 0) {
          b.y = BALL_R;
          b.vy = Math.abs(b.vy);
        }

        // Paddle.
        if (
          b.vy > 0 &&
          b.y + BALL_R >= paddleY - PADDLE_H / 2 &&
          b.y - BALL_R <= paddleY + PADDLE_H / 2 &&
          b.x >= s.paddleX - s.paddleW / 2 - BALL_R &&
          b.x <= s.paddleX + s.paddleW / 2 + BALL_R
        ) {
          const offset = (b.x - s.paddleX) / (s.paddleW / 2);
          const angle = clamp(offset, -1, 1) * (Math.PI / 3);
          b.vx = Math.sin(angle) * speed;
          b.vy = -Math.abs(Math.cos(angle) * speed);
          b.y = paddleY - PADDLE_H / 2 - BALL_R - 0.5;
        }

        // Bricks (first hit only, per frame, per ball).
        for (const br of s.bricks) {
          if (!br.alive) continue;
          const px = br.w / 2 + BALL_R - Math.abs(b.x - (br.x + br.w / 2));
          const py = br.h / 2 + BALL_R - Math.abs(b.y - (br.y + br.h / 2));
          if (px > 0 && py > 0) {
            if (px < py) {
              b.vx = -b.vx;
              b.x += b.vx > 0 ? px : -px;
            } else {
              b.vy = -b.vy;
              b.y += b.vy > 0 ? py : -py;
            }
            br.hits -= 1;
            s.flash = 1;
            if (br.hits <= 0) {
              br.alive = false;
              s.score += 50;
              if (Math.random() < 0.14) {
                const types: PowerType[] = ["expand", "multi", "life", "slow"];
                s.powerups.push({
                  x: br.x + br.w / 2,
                  y: br.y + br.h / 2,
                  vy: 130,
                  type: types[Math.floor(Math.random() * types.length)],
                });
              }
            } else {
              s.score += 10;
            }
            setScore(s.score);
            break;
          }
        }

        // Constant speed + avoid near-horizontal trajectories.
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > 0) {
          b.vx = (b.vx / sp) * speed;
          b.vy = (b.vy / sp) * speed;
          if (Math.abs(b.vy) < speed * 0.25) {
            b.vy = (b.vy < 0 ? -1 : 1) * speed * 0.25;
            const nx = Math.hypot(b.vx, b.vy);
            b.vx = (b.vx / nx) * speed;
            b.vy = (b.vy / nx) * speed;
          }
        }
      }

      // Drop fallen balls; handle life loss.
      s.balls = s.balls.filter((b) => b.stuck || b.y - BALL_R < H);
      if (s.balls.length === 0) {
        s.lives -= 1;
        setLives(s.lives);
        if (s.lives <= 0) {
          gameOver();
          return;
        }
        s.balls = [
          { x: s.paddleX, y: paddleY - PADDLE_H / 2 - BALL_R - 1, vx: 0, vy: 0, stuck: true },
        ];
        s.serving = true;
        setServing(true);
      }

      // Power-ups fall + catch.
      for (const p of s.powerups) {
        p.y += p.vy * dt;
        if (
          p.y + 10 >= paddleY - PADDLE_H / 2 &&
          p.y - 10 <= paddleY + PADDLE_H / 2 &&
          p.x >= s.paddleX - s.paddleW / 2 &&
          p.x <= s.paddleX + s.paddleW / 2
        ) {
          applyPower(p.type);
          p.y = H + 999;
        }
      }
      s.powerups = s.powerups.filter((p) => p.y < H + 20);

      // Level cleared.
      if (s.bricks.every((br) => !br.alive)) {
        s.status = "levelclear";
        syncHud();
        levelClearTimer.current = window.setTimeout(() => {
          levelClearTimer.current = null;
          nextLevel();
        }, 900);
      }

      s.flash = Math.max(0, s.flash - dt * 4);
    }

    // ── Rendering ──
    function draw() {
      const s = g.current;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const bg = ctx!.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#101010");
      bg.addColorStop(1, "#0a0a0a");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);
      ctx!.fillStyle = "rgba(196,92,62,0.25)";
      ctx!.fillRect(0, 0, W, 2);

      // Bricks.
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (const br of s.bricks) {
        if (!br.alive) continue;
        ctx!.save();
        roundRect(ctx!, br.x, br.y, br.w, br.h, 4);
        ctx!.fillStyle = br.hits > 1 ? "rgba(255,255,255,0.06)" : hexA(br.color, 0.16);
        ctx!.fill();
        ctx!.lineWidth = 1;
        ctx!.strokeStyle = br.hits > 1 ? hexA(br.color, 0.9) : hexA(br.color, 0.5);
        ctx!.stroke();
        ctx!.clip();
        ctx!.fillStyle = hexA(br.color, br.hits > 1 ? 0.95 : 0.8);
        ctx!.font = `600 10px ${MONO}`;
        ctx!.fillText(br.name.toUpperCase(), br.x + br.w / 2, br.y + br.h / 2 + 0.5);
        ctx!.restore();
      }

      // Power-ups.
      for (const p of s.powerups) {
        ctx!.save();
        roundRect(ctx!, p.x - 13, p.y - 11, 26, 22, 5);
        ctx!.fillStyle = hexA(POWER_COLOR[p.type], 0.2);
        ctx!.fill();
        ctx!.lineWidth = 1.5;
        ctx!.strokeStyle = POWER_COLOR[p.type];
        ctx!.stroke();
        ctx!.fillStyle = POWER_COLOR[p.type];
        ctx!.font = `700 13px ${MONO}`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(POWER_LABEL[p.type], p.x, p.y + 1);
        ctx!.restore();
      }

      // Paddle.
      const paddleY = H - 40;
      ctx!.save();
      roundRect(ctx!, s.paddleX - s.paddleW / 2, paddleY - PADDLE_H / 2, s.paddleW, PADDLE_H, 7);
      const pg = ctx!.createLinearGradient(s.paddleX - s.paddleW / 2, 0, s.paddleX + s.paddleW / 2, 0);
      pg.addColorStop(0, "#c45c3e");
      pg.addColorStop(1, "#d4a574");
      ctx!.fillStyle = pg;
      ctx!.shadowColor = "rgba(196,92,62,0.5)";
      ctx!.shadowBlur = 16;
      ctx!.fill();
      ctx!.restore();

      // Balls.
      for (const b of s.balls) {
        ctx!.save();
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, BALL_R, 0, Math.PI * 2);
        ctx!.fillStyle = "#f5f0e8";
        ctx!.shadowColor = "rgba(245,240,232,0.7)";
        ctx!.shadowBlur = 14;
        ctx!.fill();
        ctx!.restore();
      }

      // Hit flash.
      if (s.flash > 0) {
        ctx!.fillStyle = `rgba(196,92,62,${s.flash * 0.05})`;
        ctx!.fillRect(0, 0, W, H);
      }
    }

    let raf = 0;
    let last = performance.now();
    function loop(now: number) {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      update(dt);
      draw();
      raf = requestAnimationFrame(loop);
    }

    // Attract scene (no React state updates here).
    buildLevel(1);
    g.current.status = "idle";
    draw();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (levelClearTimer.current) window.clearTimeout(levelClearTimer.current);
    };
  }, []);

  const primaryAction = () => {
    if (status === "playing" || status === "paused") apiRef.current?.togglePause();
    else if (status === "levelclear") return;
    else apiRef.current?.start();
  };

  const primaryLabel =
    status === "playing"
      ? "Pause"
      : status === "paused"
      ? "Resume"
      : status === "gameover"
      ? "Play again"
      : status === "levelclear"
      ? "Level cleared"
      : "Start game";

  const overlay =
    status === "idle"
      ? { title: "Breakout", sub: "Smash the stack — clear every brick", action: "Start game" }
      : status === "paused"
      ? { title: "Paused", sub: "Take a breath", action: "Resume" }
      : status === "levelclear"
      ? { title: `Level ${level} cleared`, sub: "+200 bonus · get ready…", action: null }
      : status === "gameover"
      ? {
          title: "Game over",
          sub: `${score.toLocaleString()} points${isNewBest ? " · new personal best!" : ""}`,
          action: "Play again",
        }
      : null;

  return (
    <div className="w-full">
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-6 sm:gap-8">
          <HudStat label="Score" value={score.toLocaleString()} accent />
          <HudStat label="Level" value={String(level)} />
          <HudStat label="Best" value={best !== null ? best.toLocaleString() : "—"} />
        </div>
        <div className="flex items-center gap-1.5" aria-label={`${Math.max(lives, 0)} lives left`}>
          {Array.from({ length: Math.max(lives, 0) }).map((_, i) => (
            <Heart key={i} className="w-4 h-4 text-accent fill-accent" />
          ))}
        </div>
      </div>

      {/* Canvas + overlays */}
      <div className="relative border border-border bg-background overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block w-full h-auto touch-none select-none"
          style={{ aspectRatio: `${W} / ${H}` }}
          aria-label="Breakout game canvas"
        />

        <AnimatePresence>
          {status === "playing" && serving && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.2em] uppercase text-muted pointer-events-none"
            >
              Press space or click to launch
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {overlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center bg-background/80 backdrop-blur-[2px] px-6"
            >
              {status === "gameover" && <Trophy className="w-9 h-9 text-accent mb-4" />}
              <h3 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">
                {overlay.title}
              </h3>
              <p className="text-muted text-sm mb-6">{overlay.sub}</p>
              {overlay.action && (
                <button
                  type="button"
                  onClick={primaryAction}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-background px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-300"
                >
                  <Play className="w-4 h-4" />
                  {overlay.action}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={primaryAction}
            className="inline-flex items-center gap-2 text-sm text-foreground border border-border hover:border-accent px-4 py-2 transition-all duration-300"
          >
            {status === "playing" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {primaryLabel}
          </button>
          <button
            type="button"
            onClick={() => apiRef.current?.start()}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground border border-border hover:border-accent px-4 py-2 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" /> Restart
          </button>
        </div>
        <p className="text-xs text-muted/70">
          Move: mouse / touch / <span className="font-mono">← →</span> · Launch:{" "}
          <span className="font-mono">space</span> · Pause: <span className="font-mono">P</span>
        </p>
      </div>
    </div>
  );
}

function HudStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-0.5">{label}</p>
      <p className={`font-mono text-lg tabular-nums ${accent ? "text-accent" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}
