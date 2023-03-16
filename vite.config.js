import { defineConfig } from 'vite'
import brotli from "rollup-plugin-brotli"
import sassGlobImports from 'vite-plugin-sass-glob-import'
import { svgSprite } from 'rollup-plugin-svgsprite-generator'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { visualizer } from "rollup-plugin-visualizer"

export default ({ mode }) => {
  const env = process.env.NODE_ENV
  // const isDev = env === 'development'
  const isProd = env === 'prod' || env === 'analyze'
  // console.log();

  const plugins = [
    sassGlobImports(),
    svgSprite({
      xml: false,
      doctype: false,
      idConvert: (id) => `icon-${id}`,
      input: 'sources/sprite',
      output: 'public/sprite.twig',
   }),
  ]

  if (isProd) {
    plugins.push(
      brotli()
    )
  }

  if (env === 'analyze') {
    plugins.push(
      visualizer({
        gzipSize: true,
        brotliSize: true,
        open: true,
        template: 'treemap'
       })
    )
  }

  return defineConfig({
    publicDir: 'sources/assets',
    server: {
      cors: true,
      host: '0.0.0.0',
      origin: 'http://starter-vite.vm',
    },
    build: {
      target: browserslistToEsbuild(),
      emptyOutDir: true,
      manifest: true,
      sourcemap: isProd ? false : 'inline',
      minify: isProd ? 'esbuild' : false,
      cssCodeSplit: false,
      assetsDir: '',
      outDir: 'public/assets',
      rollupOptions: {
        input: [
          '/sources/scripts/site.js',
          // '/sources/styles/site.scss',
        ],
        output: {
          entryFileNames: 'site.[hash].js',
          chunkFileNames: "chunk-[hash].js",
          assetFileNames: "site.[hash].[ext]",
        },
      },
    },
    plugins: plugins
  })
}