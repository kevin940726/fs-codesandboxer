'use strict';

const getCodesSandbox = require('get-codesandbox');
const { getParameters } = require('codesandbox/lib/api/define');
const fetch = require('node-fetch');

async function fsCodeSandboxer(directoryPath) {
  const sandbox = await getCodesSandbox(`file:${directoryPath}`);

  const parameters = getParameters(sandbox);

  const { sandbox_id, error } = await fetch(
    'https://codesandbox.io/api/v1/sandboxes/define',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parameters, json: 1 }),
    }
  ).then((res) => res.json());

  if (error) {
    throw error;
  }

  return sandbox_id;
}

module.exports = exports = fsCodeSandboxer;
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = fsCodeSandboxer;
exports.fsCodeSandboxer = fsCodeSandboxer;
