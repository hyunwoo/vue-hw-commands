#!/usr/bin/env node

const args = process.argv.slice(2);
const chalk = require('chalk');
const log = console.log;
const path = require('path');
const fs = require('fs');
const camel = require('camelcase');

const createPath = process.cwd();

const port = args.length !== 0 ? args[0] : 3000;
console.log(typeof (port * 1), (port * 1));
if (typeof (port * 1) !== 'number') {
  log(chalk.red('argument is port. must be number'));
  return;
}

createTemplate(createPath, 'pre-publish.js', './pre-publish/pre-publish.js');

function createTemplate (createPath, name, template) {
  const p = path.join(createPath, name);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
  }
  fs.writeFileSync(
    p,
    `// file created at ${new Date().toLocaleDateString()}\n// Auto-generated files ${name}\n\n` +
    readTemplateString(path.join(__dirname, '/templates/' + template))
      .replace(/#port#/g, port)
  );
  log(chalk.green(name + ' created'));
  log(chalk.yellow('please install require modules'));
  log(chalk.yellow('$ npm i -S koa zlib @koa/cors koa-static koa-send koa-compress'));
}

function readTemplateString (path) {
  const f = fs
    .readFileSync(path)
    .toString();
  return f;
}