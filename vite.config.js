/* ──────────────────────────────────────────────────────────
►►► Vite Config
────────────────────────────────────────────────────────── */
import { defineConfig } from 'vite'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

/* ─────────────────────────────────────────────────────── */
import getPlugins from './utils/vite/plugins'
import config from './utils/config'

const filename = fileURLToPath(import.meta.url)
const globDirname = dirname(filename)
const folder = path.resolve(globDirname, `${config.src}/`)
/* ─────────────────────────────────────────────────────── */

export default () =>
  defineConfig({
    publicDir: `${config.src}/${config.folder}`,
    base: `/${config.folder}`,
    resolve: {
      alias: {
        '@styles/': `${folder}/styles/`,
        '@scripts/': `${folder}/scripts/`,
      },
    },
    server: {
      cors: true,
      host: '0.0.0.0',
      origin: config.server.url,
    },
    build: {
      target: browserslistToEsbuild(),
      emptyOutDir: true,
      manifest: true,
      sourcemap: config.env.isProd ? false : 'inline',
      minify: config.env.isProd ? 'esbuild' : false,
      assetsDir: './',
      outDir: `${config.dist}/${config.folder}`,
      rollupOptions: {
        input: config.input,
        output: {
          entryFileNames: '[name].[hash].js',
          chunkFileNames: 'chunk-[hash].js',
          assetFileNames: '[name].[hash].[ext]',
        },
      },
    },
    plugins: getPlugins(config.env),
    test: {
      include: ['sources/tests/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  })