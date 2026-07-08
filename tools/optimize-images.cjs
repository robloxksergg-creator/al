const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const worksDir = path.join(__dirname, '..', 'public', 'works');
const outDir = path.join(worksDir, 'optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const exts = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

async function processFile(file) {
  try {
    const ext = path.extname(file).toLowerCase();
    if (!exts.includes(ext)) return;
    const basename = path.basename(file, ext);
    const input = path.join(worksDir, file);

    // create 1200 and 600 versions in jpg and webp
    const out1200jpg = path.join(outDir, `${basename}-1200.jpg`);
    const out600jpg = path.join(outDir, `${basename}-600.jpg`);
    const out1200webp = path.join(outDir, `${basename}-1200.webp`);
    const out600webp = path.join(outDir, `${basename}-600.webp`);

    await sharp(input)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(out1200jpg);

    await sharp(input)
      .resize({ width: 600, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(out600jpg);

    await sharp(input)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out1200webp);

    await sharp(input)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(out600webp);

    console.log(`Processed ${file}`);
  } catch (e) {
    console.error(`Failed ${file}:`, e.message);
  }
}

(async () => {
  const files = fs.readdirSync(worksDir);
  for (const f of files) {
    await processFile(f);
  }
  console.log('Done');
})();