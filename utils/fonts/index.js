import Fontmin from 'fontmin'
// import languageData from 'language-data'
import config from '../config.js'

// const Fontmin = require('fontmin')
// const path = require('path')
// const languageData = require('language-data')

const fonts = [
  'RadioGrotesk-Regular.ttf',
  'BonVivant-Regular.ttf'
]

// const fontPath = path.join(__dirname, '../../sources/fonts', 'RadioGrotesk-Regular.ttf')
// const outputPath = path.join(__dirname, '../../sources/assets/fonts')
// const langs = languageData.find(l => l.language == 'French');

const generateFont = (name) => {
  return new Promise((resolve, reject) => {
    const fontmin = new Fontmin()
      .src(`${config.src}/fonts/${name}`)
      .dest(`${config.src}/assets/fonts`)
      .use(Fontmin.glyph({ 
        text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890àáâãäåçèéêëìíîïñòóôõöøùúûüýÿ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
      }))
      .use(Fontmin.ttf2woff())
      .use(Fontmin.ttf2woff2())
      .run((err, files) => {
        if (err) throw err;
        resolve()
        console.log(`${name} - ${files.length} files generated!`);
      })
  })
}

fonts.forEach(async (name) => {
  await generateFont(name)
});

