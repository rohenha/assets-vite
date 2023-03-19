import { init, success, stepFile, stepModule } from './steps.js'
import { createHTML, createCSS, createJS } from './creators.js'
const app = async () => {
  init()

  const file = await stepFile()

  if(file.types.includes('js')) {
    file.module = await stepModule()
    const jsPath = await createJS(file)
    file.paths.push(jsPath)
  }

  if (file.types.includes('html')) {
    const htmlPath = await createHTML(file)
    file.paths.push(htmlPath)
  }

  if (file.types.includes('css')) {
    const cssPath = await createCSS(file)
    file.paths.push(cssPath)
  }

  success(file)
}

app()