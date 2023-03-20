/* ──────────────────────────────────────────────────────────
►►► Post CSS Config
────────────────────────────────────────────────────────── */
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const inlinesvg = require('postcss-inline-svg')

/* ─────────────────────────────────────────────────────── */
const config = require('./utils/config')
/* ─────────────────────────────────────────────────────── */

let postcss = {
  plugins: [
    inlinesvg()
    // [
    //   'postcss-critical-css', 
    //   {
    //     outputPath: config.css.critical.outputPath,
    //     outputDest: config.css.critical.outputDest,
    //     minify: true
    //   }
    // ]
  ],
}

if (config.env.isProd) {
  postcss.plugins.push(autoprefixer())

  // postcss.plugins.push(
  //   purgecss({
  //     content: config.css.views
  //   })
  // )
}

module.exports = postcss