/**
 * Database seed script helper
 *
 * This script helps you set up automatic seeding.
 * The actual seeding happens via bootstrap in src/index.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const envPath = path.join(__dirname, '..', '.env');

function setupSeed() {
  console.log('\n🌱 Setting up database seed...\n');

  // Check if .env exists
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
    console.log('📄 Found existing .env file\n');
  } else {
    console.log('📄 Creating new .env file\n');
  }

  // Check if SEED_ON_STARTUP already exists
  if (envContent.includes('SEED_ON_STARTUP')) {
    if (envContent.includes('SEED_ON_STARTUP=true')) {
      console.log('✅ SEED_ON_STARTUP=true is already set in .env\n');
      console.log('🚀 You can now run: npm run develop');
      console.log('   The seed will run automatically when Strapi starts!\n');
    } else {
      // Update to true
      envContent = envContent.replace(
        /SEED_ON_STARTUP=.*/g,
        'SEED_ON_STARTUP=true'
      );
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Updated SEED_ON_STARTUP=true in .env\n');
      console.log('🚀 You can now run: npm run develop\n');
    }
  } else {
    // Add SEED_ON_STARTUP=true
    const newLine = envContent && !envContent.endsWith('\n') ? '\n' : '';
    fs.appendFileSync(envPath, `${newLine}SEED_ON_STARTUP=true\n`, 'utf-8');
    console.log('✅ Added SEED_ON_STARTUP=true to .env\n');
    console.log('🚀 You can now run: npm run develop');
    console.log('   The seed will run automatically when Strapi starts!\n');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📖 For more details, see: apps/cms/SEED_INSTRUCTIONS.md');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

setupSeed();
