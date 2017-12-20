'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// If symlinks are used make sure they are resolved
const rootDir = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(rootDir, relativePath);

module.exports = {
    dotenv: resolvePath('.env'),
    tsConfig: resolvePath('./config/tsconfig.json'),
    build: resolvePath('build'),
    idx: resolvePath('./src/index.tsx'),
    html: resolvePath('./public/index.html')
}