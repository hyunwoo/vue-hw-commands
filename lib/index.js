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
createTemplate(createPath, `index.ts`, 'index.ts');


function createTemplate(createPath, name, template) {
  fs.writeFileSync(
    path.join(createPath, name),
    `// file created at ${new Date().toLocaleDateString()}\n// Auto-generated files ${name}\n\n` +
    readTemplateString(path.join(__dirname, '/templates/' + template))
  );
  log(chalk.green(name + ' created'));
}

function readTemplateString(path) {
  const f = fs
    .readFileSync(path)
    .toString()
    .replace(/{{ app }}/g, app)
    .replace(
      /{{ App }}/g,
      camel(app, {
        pascalCase: true
      })
    );
  return f;
}