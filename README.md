# fs-codesandboxer

Create CodeSandbox from file system.

## Usage

```sh
npx fs-codesandboxer <source-directory-path>
```

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
const { getTemplate, getSandbox } = require('fs-codesandboxer');

const template = await getTemplate(
  path.resolve(process.cwd(), './examples/react')
);
const sandboxID = await getSandbox(template);

console.log(sandboxID); // "2qxth"
```
