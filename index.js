'use strict';

const { getCodeSandbox, uploadSandbox } = require('get-codesandbox');

async function fsCodeSandboxer(directoryPath, options) {
  const sandbox = await getCodeSandbox(`file:${directoryPath}`, options);

  const sandboxID = await uploadSandbox(sandbox);

  return sandboxID;
}

module.exports = exports = fsCodeSandboxer;
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = fsCodeSandboxer;
exports.fsCodeSandboxer = fsCodeSandboxer;
