#!/usr/bin/env node

const args = process.argv.slice(2);
const chalk = require('chalk');
const log = console.log;
const path = require('path');
const fs = require('fs');
const camel = require('camelcase');

if (args.length === 0) {
  log(chalk.red('require folder name'));
  log(chalk.red('ex) vue-template-creator page-main'));
  return;
}

const createPath = path.join(process.cwd(), args[0]);
const app = args[0];

// TEST
if (fs.existsSync(createPath)) {
  const files = fs.readdirSync(createPath);
  for (const file of files) {
    fs.unlinkSync(path.join(createPath, file));
  }
  fs.rmdirSync(createPath);
}

if (fs.existsSync(createPath)) {
  let result = false;
  log(chalk.red('Already exist folder'));
  return;
  do {
    log(chalk.default('Already exist folder'));

  }
  while (result === 'y' || result === 'Y' || result === 'n' || result === 'N');

  fs.rmdirSync(createPath);
  return;
}
log(chalk.blue('Create a file in the "' + createPath + '"'));
console.log('create template ')

fs.mkdirSync(createPath);
fs.writeFileSync(path.join(createPath, 'index.ts'),
  `// file created at ${new Date().toLocaleDateString()}\n// Auto-generated files index.ts\n\n` +
  createFileString(path.join(__dirname, 'templates/index.ts')));
fs.writeFileSync(path.join(createPath, app + '.ts'),
  `// file created at ${new Date().toLocaleDateString()}\n// Auto-generated files ${app}.ts\n\n` +
  createFileString(path.join(__dirname, 'templates/app.ts')));
fs.writeFileSync(path.join(createPath, app + '.scss'),
  `// file created at ${new Date().toLocaleDateString()}\n// Auto-generated files ${app}.scss\n\n` +
  createFileString(path.join(__dirname, 'templates/app.scss')));
fs.writeFileSync(path.join(createPath, app + '.vue'),
  `// file created at ${new Date().toLocaleDateString()}\n// Auto-generated files ${app}.vue\n\n` +
  createFileString(path.join(__dirname, 'templates/app.vue')));

function createFileString(path) {
  const f = fs.readFileSync(path).toString()
    .replace(/{{ app }}/g, app)
    .replace(/{{ App }}/g, camel(app, {
      pascalCase: true
    }));
  return f;
}