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
    publicDir: `${config.src}/${config.folder}`,
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
      assetsDir: '',
      outDir: `${config.dist}/${config.folder}`,
      rollupOptions: {
        input: config.input,
        output: {
          entryFileNames: '[name].[hash].js',
          chunkFileNames: "chunk-[hash].js",
          assetFileNames: "[name].[hash].[ext]",
        },
      },
    },
    plugins: getPlugins(config.env),
    // css: { postcss: "./" }
  })
}