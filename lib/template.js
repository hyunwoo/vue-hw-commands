#!/usr/bin/env node

const args = process.argv.slice(2);
const chalk = require('chalk');
const log = console.log;
const path = require('path');
const fs = require('fs');
const camel = require('camelcase');

let command = '-default';
let app;

if (args.length === 0) {
  log(chalk.red('require folder name'));
  log(chalk.red('ex) vue-template-creator page-main'));
  return;
} else if (args.length === 1) {
  app = args[0];
} else if (args.length === 2) {
  if (args[0].startsWith('-')) {
    command = args[0];
    app = args[1];
  } else if (args[1].startsWith('-')) {
    command = args[1];
    app = args[0];
  } else {
    log(chalk.red('argument error'));
    return;
  }
}

if (command !== '-plugin' && command !== '-P' && command !== '-default') {
  log(chalk.red(`invalid argument "${command}"`));
  return;
}




const createPath = path.join(process.cwd(), app);

// TEST
// if (fs.existsSync(createPath)) {
//   const files = fs.readdirSync(createPath);
//   for (const file of files) {
//     fs.unlinkSync(path.join(createPath, file));
//   }
//   fs.rmdirSync(createPath);
// }

if (fs.existsSync(createPath)) {
  let result = false;
  log(chalk.red('Already exist folder'));
  return;
  do {
    log(chalk.default('Already exist folder'));
  } while (
    result === 'y' ||
    result === 'Y' ||
    result === 'n' ||
    result === 'N'
  );

  fs.rmdirSync(createPath);
  return;
}
log(chalk.blue('Create template files in the "' + createPath + '"'));
fs.mkdirSync(createPath);
createTemplate(createPath, `${app}.ts`, 'app.ts');
createTemplate(createPath, `${app}.scss`, 'app.scss');
createTemplate(createPath, `${app}.vue`, 'app.vue');
if (command === '-P' || command === '-plugin') {
  createTemplate(createPath, `index.ts`, 'plugin-index.ts');
} else {
  createTemplate(createPath, `index.ts`, 'index.ts');
}




function createTemplate (createPath, name, template) {
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
    .toString()
    .replace(/#app#/g, app)
    .replace(
      /#App#/g,
      camel(app, {
        pascalCase: true
      }))
    .replace(
      /#pApp#/g,
      camel(app, {
        pascalCase: false
      })
    );
  return f;
}