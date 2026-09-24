import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Processing images with sharp...');

  // 1. Process Makhar photos
  const makharFiles = [
    { src: 'tmp/makhar-real/makhar-6.jpg', dest: 'design-reference/khasaut/assets/inner-web/makhar-01-optimized.webp', maxW: 1920 },
    { src: 'tmp/makhar-real/makhar-7.jpg', dest: 'design-reference/khasaut/assets/inner-web/makhar-02-optimized.webp', maxW: 1920 },
    { src: 'tmp/makhar-real/makhar-4.jpg', dest: 'design-reference/khasaut/assets/inner-web/makhar-03-optimized.webp', maxW: 1920 },
    { src: 'tmp/makhar-real/makhar-6.jpg', dest: 'design-reference/khasaut/assets/inner/route-makhar-optimized.webp', maxW: 1920 },
  ];

  for (const item of makharFiles) {
    if (fs.existsSync(item.src)) {
      await sharp(item.src)
        .resize({ width: item.maxW, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(item.dest);
      const stat = fs.statSync(item.dest);
      console.log(`[OK] Generated ${item.dest} (${stat.size} bytes)`);
    } else {
      console.warn(`[WARN] Source not found: ${item.src}`);
    }
  }

  // 2. Process Thermal Springs replacement
  const brainDir = 'C:/Users/viman/.gemini/antigravity/brain/ae73e42e-440a-4e5d-b213-e3fb72ee678e';
  const generatedFiles = fs.readdirSync(brainDir).filter(f => f.startsWith('thermal_springs_pool_') && f.endsWith('.jpg'));
  if (generatedFiles.length > 0) {
    const latestThermal = path.join(brainDir, generatedFiles[generatedFiles.length - 1]);
    const thermalDest = 'design-reference/khasaut/assets/inner-web/suvorovskie-03-optimized.webp';
    await sharp(latestThermal)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(thermalDest);
    console.log(`[OK] Generated thermal replacement ${thermalDest} (${fs.statSync(thermalDest).size} bytes)`);

    // Also save an explicit copy as thermal-springs-pool-optimized.webp
    const customThermalDest = 'design-reference/khasaut/assets/inner/thermal-springs-pool-optimized.webp';
    await sharp(latestThermal)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(customThermalDest);
    console.log(`[OK] Saved dedicated thermal asset ${customThermalDest}`);
  }
}

main().catch(console.error);
