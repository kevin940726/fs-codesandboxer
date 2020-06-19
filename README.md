# fs-codesandboxer

![npm](https://img.shields.io/npm/v/fs-codesandboxer)

Create CodeSandbox from file system.

## Usage

```sh
npx fs-codesandboxer <source-directory-path>
```

## Options

- `--ignore-paths`, `-i`: Paths to be ignored when uploading. Can be provided multiple times. **Note that providing this option will override the [default settings](https://github.com/kevin940726/get-codesandbox/blob/master/ignore-paths.js).**
- `--skip-uploading-binary-files`: Skip uploading binary files, note that providing this option could results in unexpected behavior.

## Caveats

Binary files are being uploaded to [`file.io`](https://file.io) to let CodeSandbox to download them. The uploaded links would get expired once requested, or after 14 days (by default). The generated sandboxes are expected to be used/accessed at least once in the range of the expiration time. If for whatever reason you don't want to upload them to `file.io`, provide the `--skip-uploading-binary-files` option when using this module.

## Example

```sh
$ fs-codesandboxer ./examples/react
CodeSandbox ID	: 2qxth (copied to clipboard)
Editor URL  	: https://codesandbox.io/s/2qxth
Preview URL 	: https://2qxth.csb.app
```

## API

It can also be used programmatically.

```sh
yarn add fs-codesandboxer
```

```js
const fsCodeSandboxer = require('fs-codesandboxer');

const sandboxID = await fsCodeSandboxer(
  path.resolve(process.cwd(), './examples/react'),
  {
    ignorePaths: [],
    skipUploadingBinaryFiles: false,
  }
);

console.log(sandboxID); // "2qxth"
```

## Comparison to the official CodeSandbox CLI

The official [CodeSandbox CLI](https://github.com/codesandbox/codesandbox-importers/tree/master/packages/cli) also has the same functionality as `fs-codesandboxer`, but it requires you to sign in to deploy sandboxes. `fs-codesandboxer` uses the public API and [`file.io`](https://file.io) to allow you to programmatically deploy sandboxes without authentication.
