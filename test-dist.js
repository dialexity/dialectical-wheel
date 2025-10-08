// Test script to verify the built package works
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Testing built package from /dist...');

// Check if dist files exist
const distFiles = [
    'dist/index.js',
    'dist/index.esm.js', 
    'dist/index.d.ts',
    'dist/index.css',
    'dist/index.esm.css'
];

distFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✓ ${file} exists`);
    } else {
        console.log(`✗ ${file} missing`);
    }
});

// Check if the built package exports the expected components
try {
    const builtPackage = await import('./dist/index.esm.js');
    console.log('✓ Built package loads successfully');
    console.log('Available exports:', Object.keys(builtPackage));
    
    if (builtPackage.DialecticalWheel) {
        console.log('✓ DialecticalWheel component found');
    } else {
        console.log('✗ DialecticalWheel component not found');
    }
} catch (error) {
    console.log('✗ Error loading built package:', error.message);
}

console.log('Test complete!');
