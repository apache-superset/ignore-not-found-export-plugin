# IgnoreSupersetExportNotFoundWebpackPlugin

## Installation

```bash
npm install --saveDev @superset-ui/ignore-superset-export-not-found-webpack-plugin
```

## Usage

```js
// webpack.config.js

const IgnoreSupersetExportNotFoundWebpackPlugin = require('@superset-ui/ignore-superset-export-not-found-webpack-plugin')

module.exports = {
  ...,
  plugins: [
    new IgnoreSupersetExportNotFoundWebpackPlugin(),
    ...,
  ],
}
```

## Publishing

**Prerequisite:** You'll need an [npmjs.com](https://npmjs.com) account that is part of the `superset-ui` organization.

1. Make sure you're logged in to NPM from your shell. Run `npm login` if necessary.
2. To make the release, run `npm run release` and follow the prompts.
