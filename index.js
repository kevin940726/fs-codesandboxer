'use strict';

const fs = require('fs').promises;
const path = require('path');
const readdir = require('recursive-readdir');
const { getParameters } = require('codesandbox/lib/api/define');
const fetch = require('node-fetch');

const IGNORE_PATHS = [
  '.gitignore',
  '*.log',
  '.DS_Store',
  'node_modules',
  'package-lock.json',
  'yarn.lock',
  '.yarn',
  '.pnp.js',
  '.cache',
];

exports.getTemplate = async function getTemplate(directoryPath) {
  let absDirectoryPath;

  if (path.isAbsolute(directoryPath)) {
    absDirectoryPath = directoryPath;
  } else {
    absDirectoryPath = path.resolve(process.cwd(), directoryPath);
  }

  const filePaths = await readdir(absDirectoryPath, IGNORE_PATHS);

  const files = {};

  for (const filePath of filePaths) {
    const relativePath = path.relative(absDirectoryPath, filePath);

    files[relativePath] = {
      content: await fs.readFile(filePath, 'utf8'),
    };
  }

  return {
    files,
  };
};

exports.getSandbox = async function getSandbox(template) {
  const parameters = getParameters(template);

  const { sandbox_id } = await fetch(
    'https://codesandbox.io/api/v1/sandboxes/define',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parameters, json: 1 }),
    }
  ).then((res) => res.json());

  return sandbox_id;
};
