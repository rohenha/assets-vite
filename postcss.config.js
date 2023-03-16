const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const inlinesvg = require('postcss-inline-svg')

const dev = process.env.NODE_ENV === "dev"

let config = {
  plugins: [
    inlinesvg()
    // [
    //   'postcss-critical-css', 
    //   {
    //     outputPath: './views',
    //     outputDest: 'critical.twig',
    //     minify: true
    //   }
    // ]
  ],
}

if (!dev) {
  config.plugins.push(autoprefixer())

  config.plugins.push(
    purgecss({
      content: ['./public/*.html']
    })
  )
}

module.exports = config