import fs from 'fs'
import config from '../config.js'

export const generateFile = (content, folder, path) => {
  return new Promise((resolve, reject) => {

    fs.mkdirSync(folder, { recursive: true })

    if (fs.existsSync(path)) {
      resolve(path)
      return
    }
  
    fs.writeFile(path, content, (error) => {
      if (error) {
        reject(error)
      }
      resolve(path)
    });
  })
}

export const createHTML = async (file) => {
  const content = `<div class="${file.class}"${file.module ? ` data-module-${file.slug}` : ''}></div>`;
  const path = `${file.atomic === 'templates' ? config.views.templates : config.views.snippets}/${file.atomic}/`;
  const filename = `${file.slug}.twig`
  return generateFile(content, path, path + filename)
}

export const createCSS = (file) => {
  const content = `.${file.class} {}
  `;
  const path = `${config.src}/styles/${file.atomic}/_${file.slug}.scss`;
  const filename = `_${file.slug}.scss`
  return generateFile(content, path, path + filename)
}

export const createJS = (file) => {
  const moduleNameJs = file.name[0].toUpperCase() + file.name.substring(1)
  const type = file.module ? "modules" : file.atomic;
  let content = ''
  const path = `${config.src}/scripts/${type}/`;
  const filename = `_${file.slug}.js`
  if (file.module) {
    content = `import { module as mmodule } from 'modujs'

export default class ${moduleNameJs} extends mmodule {
  constructor(m) {
    super(m)
    this.events = {}
  }
}

`
  const newModule = `\nexport { default as ${moduleNameJs} } from '../modules/_${file.slug}.js'\n`
  fs.appendFile(`${config.src}/scripts/organisms/_modules.js`, newModule, function (err) {
    if (err) throw err;
    // console.log('Updated!');
  });
  } else {
      content = `export default class ${moduleNameJs} {
  constructor() {
  }
}

`
  }
  return generateFile(content, path, path + filename)
}