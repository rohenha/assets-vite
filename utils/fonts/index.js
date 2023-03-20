const Fontmin = require('fontmin');
const path = require('path');

const fontPath = path.join(__dirname, 'fonts', 'example.ttf');
const outputPath = path.join(__dirname, 'dist');

const fontmin = new Fontmin()
  .src(fontPath)
  .dest(outputPath)
  .use(Fontmin.glyph({ 
    text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' 
  }))
  .use(Fontmin.ttf2woff())
  .use(Fontmin.ttf2woff2())
  .run((err, files) => {
    if (err) throw err;
    console.log(`${files.length} files generated!`);
  });
