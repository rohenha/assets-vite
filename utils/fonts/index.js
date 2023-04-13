import Fontmin from 'fontmin'
import config from '../config.js'

const fonts = [
  'RadioGrotesk-Regular.ttf',
  'BonVivant-Regular.ttf'
]

const generateFont = (name) => {
  return new Promise((resolve, reject) => {
    const fontmin = new Fontmin()
      .src(`${config.src}/fonts/${name}`)
      .dest(`${config.src}/assets/fonts`)
      .use(Fontmin.glyph({
        text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890àáâãäåçèéêëìíîïñòóôõöøùúûüýÿÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝŸ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
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

