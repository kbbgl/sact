# Chrome Extension React/TypeScript Boilerplate

This repository includes a boilerplate project for a Chrome Extension using ReactJS and TypeScript.

## Installation

```bash
npm install
```

This will create a new folder `node_modules` with all necessary project dependencies.

## Build

### Production

To create minimized assets for production usage, create the assets using:

```bash
npm run build
```

### Development

Includes source maps

```bash
npm start
```

## Load

After building, the assets will be found in the `dist` folder.

Load the extension from the browser in address `chrome://extensions` > Load unpacked > Select `dist` folder.
