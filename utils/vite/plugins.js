/* ──────────────────────────────────────────────────────────
►►► Vite Plugins
────────────────────────────────────────────────────────── */
import brotli from "rollup-plugin-brotli"
import sassGlobImports from 'vite-plugin-sass-glob-import'
import { visualizer } from "rollup-plugin-visualizer"
import VitePluginBrowserSync from 'vite-plugin-browser-sync'
// import { svgSprite } from 'rollup-plugin-svgsprite-generator'

/* ─────────────────────────────────────────────────────── */
import config from '../config'
/* ─────────────────────────────────────────────────────── */

export default ({ isProd, isAnalyze }) => {
  const plugins = [
    sassGlobImports(),
  //   svgSprite({
  //     xml: false,
  //     doctype: false,
  //     idConvert: config.sprite.name,
  //     input: config.sprite.input,
  //     output: config.sprite.output,
  //  }),
  ]

  const pDev = [
    VitePluginBrowserSync({
      bs: {
        watch: true,
        proxy: {
          target: config.server.url,
          ws: true,
        },
        baseDir: './',
        logLevel: 'silent',
        open: true,
        port: config.server.port
      }
    })
  ]

  const pProd = [
    brotli()
  ]
  
  const pAnalyze = [
    visualizer({
      gzipSize: true,
      brotliSize: true,
      open: false,
      template: 'treemap'
     })
  ]

  if (isAnalyze) {
    return plugins.concat(pAnalyze).concat(pProd)
  }

  if (isProd) {
    return plugins.concat(pProd)
  }

  return plugins.concat(pDev)
}