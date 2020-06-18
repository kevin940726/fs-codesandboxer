#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const fsCodeSandboxer = require('../');

const cli = meow(
  chalk`
    {bold Usage}
      {bold $} {green fs-codesandboxer} {bold <source-directory-path>}

    {bold Options}
      {green.underline --ignore-paths}, {green.underline -i}	Paths to be ignored.
      {green.underline --skip-uploading-binary-files}	Skip uploading binary files to CodeSandbox, might cause the app to not function correctly.
 
    {bold Examples}
      {bold $} {green fs-codesandboxer} ./examples/react
      CodeSandbox ID	: {green.bold 2qxth} {dim (copied to clipboard)}
      Editor URL  	: {bold.underline https://codesandbox.io/s/2qxth}
      Preview URL 	: {bold.underline https://2qxth.csb.app}
`,
  {
    flags: {
      ignorePaths: {
        type: 'string',
        alias: 'i',
        isMultiple: true,
      },
      skipUploadingBinaryFiles: {
        type: 'boolean',
      },
    },
  }
);

(async function main() {
  if (!cli.input[0]) {
    throw new Error('Missing source directory path.');
  }

  const sandboxID = await fsCodeSandboxer(cli.input[0], {
    ignorePaths: cli.flags.ignorePaths,
    skipUploadingBinaryFiles: cli.flags.skipUploadingBinaryFiles,
  });

  await clipboardy.write(sandboxID);

  console.log(
    chalk`CodeSandbox ID\t: {green.bold ${sandboxID}} {dim (copied to clipboard)}
Editor URL\t: {bold.underline https://codesandbox.io/s/${sandboxID}}
Preview URL\t: {bold.underline https://${sandboxID}.csb.app}`
  );
})();
