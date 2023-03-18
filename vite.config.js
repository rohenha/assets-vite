/* ──────────────────────────────────────────────────────────
►►► Vite Config
────────────────────────────────────────────────────────── */
import { defineConfig } from 'vite'
import browserslistToEsbuild from 'browserslist-to-esbuild'

/* ─────────────────────────────────────────────────────── */
import getPlugins from './utils/vite/plugins'
import config from './utils/config'
/* ─────────────────────────────────────────────────────── */

export default () => {
  return defineConfig({
    publicDir: config.src,
    server: {
      cors: true,
      host: '0.0.0.0',
      origin: config.server.url
    },
    build: {
      target: browserslistToEsbuild(),
      emptyOutDir: true,
      manifest: true,
      sourcemap: config.env.isProd ? false : 'inline',
      minify: config.env.isProd ? 'esbuild' : false,
      cssCodeSplit: false,
      assetsDir: '',
      outDir: config.dist,
      rollupOptions: {
        input: config.input,
        output: {
          entryFileNames: 'site.[hash].js',
          chunkFileNames: "chunk-[hash].js",
          assetFileNames: "site.[hash].[ext]",
        },
      },
    },
    plugins: getPlugins(config.env),
    // css: { postcss: "./" }
  })
}