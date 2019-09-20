#!/usr/bin/env node

const args = process.argv.slice(2);
const chalk = require('chalk');
const log = console.log;
const path = require('path');
const fs = require('fs');
const camel = require('camelcase');

const createPath = process.cwd();


log(chalk.blue('Create template files in the "' + createPath + '"'));
createTemplate(createPath, '.prettierrc', './lints/.prettierrc');
createTemplate(createPath, 'tsconfig.json', './lints/tsconfig.json');
createTemplate(createPath, 'tslint.json', './lints/tslint.json');

function createTemplate (createPath, name, template) {
  const p = path.join(createPath, name);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
  }
  fs.writeFileSync(
    path.join(createPath, name),
    `// file created at ${new Date().toLocaleDateString()}\n// Auto-generated files ${name}\n\n` +
    readTemplateString(path.join(__dirname, '/templates/' + template))
  );
  log(chalk.green(name + ' created'));
}

function readTemplateString (path) {

  const f = fs
    .readFileSync(path)
    .toString();

  return f;
}