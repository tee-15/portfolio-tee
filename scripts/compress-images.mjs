import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';

const publicDir = './public';
const THRESHOLD = 200 * 1024; // compress anything over 200KB

const files = readdirSync(publicDir).filter(f =>
  /\.(png|jpg|jpeg)$/i.test(f)
);

for (const file of files) {
  const fp = join(publicDir, file);
  const stat = statSync(fp);
  if (stat.size < THRESHOLD) {
    console.log(`skip  ${file} (${Math.round(stat.size / 1024)}KB)`);
    continue;
  }

  const ext = extname(file).toLowerCase();
  const base = basename(file, ext);
  const tmp = join(publicDir, `${base}__tmp${ext}`);

  try {
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(fp).jpeg({ quality: 82, mozjpeg: true }).toFile(tmp);
    } else {
      await sharp(fp).png({ compressionLevel: 9, effort: 10 }).toFile(tmp);
    }

    const newStat = statSync(tmp);
    const saved = Math.round((stat.size - newStat.size) / 1024);
    console.log(`✓  ${file}: ${Math.round(stat.size / 1024)}KB → ${Math.round(newStat.size / 1024)}KB (saved ${saved}KB)`);

    unlinkSync(fp);
    renameSync(tmp, fp);
  } catch (e) {
    console.error(`✗  ${file}: ${e.message}`);
    try { unlinkSync(tmp); } catch {}
  }
}

console.log('\nDone.');
