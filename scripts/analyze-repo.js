// scripts/analyze-repo.js
// Simple analysis script using madge and depcheck
const { exec } = require('child_process');

function runCommand(cmd, label) {
  console.log(`\n=== ${label} ===`);
  const child = exec(cmd, { stdio: 'inherit' });
  child.stdout?.pipe(process.stdout);
  child.stderr?.pipe(process.stderr);
  child.on('close', code => {
    if (code !== 0) {
      console.error(`${label} failed with exit code ${code}`);
    } else {
      console.log(`${label} completed successfully`);
    }
  });
}

// Run madge to generate dependency graph (output to console)
runCommand('npx madge --circular ./src', 'Madge Dependency Graph');

// Run depcheck to find unused dependencies
runCommand('npx depcheck', 'Depcheck Unused Dependencies');
