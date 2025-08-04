const { spawn } = require('child_process');

const scripts = [
  './ControlB/controlB40.js',
  //'controlB41.js',
  //'controlB253.js',
  './ControlB/controlB254.js',
];

scripts.forEach(script => {
  const process = spawn('node', [script]);

  process.stdout.on('data', (data) => {
    console.log(`[${script}] ${data.toString().trim()}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`[${script} ❌] ${data.toString().trim()}`);
  });

  process.on('close', (code) => {
    console.log(`[${script}] 🔚 Kết thúc với mã ${code}`);
  });
});
