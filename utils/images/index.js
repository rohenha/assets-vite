const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

// Définir les tailles souhaitées
const sizes = [640, 1024, 1400, 1920];

// Récupérer le dossier contenant les images
const inputFolder = './images';

// Récupérer le dossier où stocker les images optimisées
const outputFolder = './optimized';

// Récupérer toutes les images dans le dossier
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  
  // Parcourir chaque fichier dans le dossier
  files.forEach(async (file) => {
    // Ignorer les fichiers qui ne sont pas des images
    if (!/\.(jpg|jpeg|png|svg)$/i.test(file)) {
      return;
    }

    // Récupérer le chemin complet de l'image
    const imagePath = path.join(inputFolder, file);

    // Lire l'image avec Sharp
    const image = sharp(imagePath);

    // Redimensionner et optimiser l'image pour chaque taille souhaitée
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];

      // Redimensionner l'image à la taille souhaitée
      const resizedImage = await image.clone().resize({ width: size }).toBuffer();

      // Optimiser l'image redimensionnée avec imagemin
      const optimizedImage = await imagemin.buffer(resizedImage, {
        plugins: [
          imageminMozjpeg(),
          imageminPngquant({ quality: [0.6, 0.8] }),
          imageminSvgo(),
        ],
      });

      // Créer un nom de fichier pour l'image optimisée
      const optimizedFileName = `${file.split('.')[0]}-${size}px.${file.split('.')[1]}`;

      // Écrire l'image optimisée dans le dossier de sortie
      fs.writeFileSync(path.join(outputFolder, optimizedFileName), optimizedImage);
    }
  });
});
