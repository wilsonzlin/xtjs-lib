#!/usr/bin/env node

const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const readdirp = require('readdirp');

const OUT_DIR = process.argv[2];

(async () => {
  for await (const file of readdirp(OUT_DIR, {
    depth: Infinity,
    fileFilter: '*.js',
  })) {
    const {code} = await babel.transformFileAsync(file.fullPath, {
      plugins: [
        ({types}) => ({
          visitor: {
            CallExpression (stPath) {
              if (stPath.node.callee.name === 'require') {
                const firstArg = stPath.get('arguments.0');
                const fakeImport = firstArg.node.value;
                const absImport = `${path.join(OUT_DIR, fakeImport)}.js`;
                if (fs.existsSync(absImport)) {
                  // Add `./` prefix in case importing from same directory.
                  // Node.js path.relative only works properly when first argument is directory.
                  const relImport = `./${path.relative(path.dirname(file.fullPath), absImport)}`;
                  firstArg.replaceWith(types.stringLiteral(relImport));
                }
              }
            },
          },
        }),
      ],
    });
    await fs.promises.writeFile(file.fullPath, code);
  }
})();
