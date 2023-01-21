const { homepage, repository, readmeFilename, name } = require('../package.json');
const { resolve, join } = require('path');
const root = resolve('./');

module.exports = {
  $schema: 'https://typedoc.org/schema.json',
  tsconfig: "./tsconfig/tsconfig.docs.json",
  basePath: root,
  plugin: [
    'typedoc-plugin-extras',
    'typedoc-plugin-mdn-links',
    'typedoc-plugin-missing-exports',
  ],
  sort: ['source-order'],
  entryPoints: [join(root, 'src', 'event.ts')],
  visibilityFilters: {
    protected: false,
    private: false,
    inherited: false,
    external: false,
    '@internal': false,
  },
  entryPointStrategy: 'expand',
  readme: join(root, readmeFilename),
  footerTypedocVersion: true,
  footerLastModified: true,
  customTitle: 'Event Polyfill',
  name: 'Event Polyfill',
  out: join(root, 'docs'),
  includeVersion: true,
  navigationLinks: {
    Docs: homepage,
    GitHub: repository.url,
    Npm: "https://www.npmjs.com/package/" + name
  },
  gaID: process.env.GA_ID || ""
};
