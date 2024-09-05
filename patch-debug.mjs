import { promises as fs } from 'fs';
import path from 'path';

// Resolve the path to the debug module
const filePath = path.resolve('node_modules/debug/src/node.js');

async function patchDebugModule() {
  try {
    // Read the file
    let data = await fs.readFile(filePath, 'utf8');

    // Replace "require('./common')" with "require('common')"
    const result = data.replace("require('./common')", "require('common')");

    // Write the patched content back to the file
    await fs.writeFile(filePath, result, 'utf8');

    console.log('Patched debug module');
  } catch (err) {
    console.error('Error patching debug module:', err);
  }
}

// Run the patching function
patchDebugModule();
