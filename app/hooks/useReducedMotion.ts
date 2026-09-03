"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// During SSR and hydration the client must match the server output, so we
// report `false` first and let React re-read the real value after commit.
// This avoids hydration mismatches for consumers that branch render output
// on the reduced-motion preference.
function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
