/* ──────────────────────────────────────────────────────────
►►► Post CSS Config
────────────────────────────────────────────────────────── */
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const inlinesvg = require('postcss-inline-svg')
// import inlinesvg from 'postcss-inline-svg'
// import autoprefixer from 'autoprefixer'
// import purgecss from '@fullhuman/postcss-purgecss'

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

  postcss.plugins.push(
    purgecss({
      content: config.css.views
    })
  )
}

module.exports = postcss