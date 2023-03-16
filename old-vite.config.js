import { defineConfig } from 'vite'
import brotli from "rollup-plugin-brotli"
import sassGlobImports from 'vite-plugin-sass-glob-import'
import browserslistToEsbuild from 'browserslist-to-esbuild'
// import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper'
// import { svgSprite } from 'rollup-plugin-svgsprite-generator'

// import legacy from "@vitejs/plugin-legacy"

export default ({ mode }) => {
  const isDev = mode === 'development'
  const isProd = mode === 'production'

  return defineConfig({
    // root: './sources',
    // base: '/sources',
    // publicDir: 'sources/assets',
    build: {
      emptyOutDir: true,
      target: browserslistToEsbuild(),
      outDir: 'public/assets',
      assetsDir: '',
      manifest: true,
      sourcemap: isDev,
      cssCodeSplit: false,
      // write: true,
      rollupOptions: {
        input: {
          'site.js' : './sources/scripts/site.js',
        },
        // output: {
        //   manualChunks: undefined
        // }
        // output: {
        //   entryFileNames: 'site.[hash].js',
        //   chunkFileNames: "chunk-[hash].js",
        //   assetFileNames: "site.[hash].[ext]",
        // },
      },
    },
    // server: {
    //   cors: true,
    //   host: '0.0.0.0',
    //   // origin: 'http://starter-vite.vm',
    //   strictPort: true,
    //   port: 3000
    // },
    plugins: [
      // gzipPlugin(),
      brotli(),
      sassGlobImports(),
      // ViteSvgSpriteWrapper({
      //   icons: 'sources/sprite',
      //   outputDir: 'public/'
      // })
    //   svgSprite({
    //     xml: false,
    //     doctype: false,
    //     idConvert: (id) => `icon-${id}`,
    //     input: 'sources/sprite',
    //     output: 'public/sprite.twig',
    //  })
    ]
  });
}