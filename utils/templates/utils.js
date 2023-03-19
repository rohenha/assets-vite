export const log = (text, name) => {
  const colors = {
    red: '31',
    green: '32',
    white: '37',
    blue: '34'
  }

  const color = colors[name] || colors.white
  return `\x1b[${color}m${text}\x1b[0m`
}

export const getModuleName = (phrase) => {
  return phrase
    .toLowerCase()
    .split('-')
    .map((word, index) => index === 0 ? word : word[0].toUpperCase() + word.slice(1))
    .join('');
};

export const slugify = (text) => {
  return text.toString().toLowerCase().trim()
    .normalize('NFD') 				 // separate accent from letter
    .replace(/[\u0300-\u036f]/g, '') // remove all separated accents
    .replace(/\s+/g, '-')            // replace spaces with -
    .replace(/&/g, '-and-')          // replace & with 'and'
    .replace(/[^\w\-]+/g, '')        // remove all non-word chars
    .replace(/\-\-+/g, '-')  
}