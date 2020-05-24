#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const { getTemplate, getSandbox } = require('../');

const cli = meow(
  chalk`
    {bold Usage}
      {bold $} {green fs-codesandboxer} {bold <source-directory-path>}
 
    {bold Examples}
      {bold $} {green fs-codesandboxer} ./examples/react
      CodeSandbox ID	: {green.bold 2qxth} {dim (copied to clipboard)}
      Editor URL  	: {bold.underline https://codesandbox.io/s/2qxth}
      Preview URL 	: {bold.underline https://2qxth.csb.app}
`
);

(async function main() {
  if (!cli.input[0]) {
    throw new Error('Missing source directory path.');
  }

  const template = await getTemplate(cli.input[0]);
  const sandboxID = await getSandbox(template);

  await clipboardy.write(sandboxID);

  console.log(
    chalk`CodeSandbox ID\t: {green.bold ${sandboxID}} {dim (copied to clipboard)}
Editor URL\t: {bold.underline https://codesandbox.io/s/${sandboxID}}
Preview URL\t: {bold.underline https://${sandboxID}.csb.app}`
  );
})();
