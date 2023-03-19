/* ──────────────────────────────────────────────────────────
►►► Project Config
────────────────────────────────────────────────────────── */
const pack = require('../package.json')
const env = process.env.NODE_ENV

module.exports = {
  name: pack.name,
  version: pack.version,
  env: {
    isDev : env === 'dev',
    isProd : env === 'prod' || env === 'analyze',
    isAnalyze : env === 'analyze',
  },
  src: 'sources',
  dist: 'public',
  folder: 'assets',
  input: [
    'sources/scripts/site.js',
  ],
  server: {
    url: 'http://starter-vite.vm',
    port: 3000,
  },
  sprite: {
    input: 'sources/sprite',
    output: 'public/',
    file: 'sprite.twig',
    name: (id) => `icon-${id}`,
  },
  css: {
    critical: {
      outputPath: './public',
      outputDest: 'critical.html',
    },
    views: ['./public/*.html']
  },
  views: {
    snippets: 'project/snippets',
    templates: 'project/views',
  }
}