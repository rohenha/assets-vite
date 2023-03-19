import { log, getModuleName, slugify } from './utils.js'
import inquirer from 'inquirer'

const prompt = inquirer.createPromptModule()

export const init = () => {
  console.log('')
  console.log(log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue'))
  console.log(`${log(' INITIALISATION ', 'blue')} ${log('Création d\'un module')}`)
  console.log(log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue'))
  console.log('')
}

export const stepFile = () => {
  const questions = [
    {
      type: 'input',
      name: 'filename',
      message: 'Quel est le nom du composant ?'
    },
    {
      type: 'checkbox',
      name: 'types',
      message: 'Quels fichiers voulez vous créer ?',
      choices: [
        { value: 'html', name: 'HTML' },
        { value: 'css', name: 'CSS' },
        { value: 'js', name: 'Javascript' },
      ]
    },
    {
      type: 'list',
      name: 'atomic',
      message: 'Et quel est le type de molécule ?',
      choices: [
        { value: 'atoms', name: 'Atoms' },
        { value: 'blocks', name: 'Blocks' },
        { value: 'molecules', name: 'Molécules' },
        { value: 'organisms', name: 'Organisms' },
        { value: 'templates', name: 'Templates' },
      ]
    },
  ]
  return new Promise((resolve) => {
    // const prompt = inquirer.createPromptModule()
    prompt(questions).then((answers) => {
      const slug = slugify(answers.filename)
      const name = getModuleName(slug)
      resolve({
        slug,
        name: name,
        types: answers.types,
        class: `${answers.atomic[0].toLowerCase()}-${name}`,
        module: false,
        atomic: answers.atomic,
        paths: []
      })
    })
  })
}

export const stepModule = () => {
  const questions = [
    {
      type: 'confirm',
      name: 'module',
      message: 'Le composant Javascript est-il un module ?'
    },
  ]
  return new Promise((resolve) => {
    // const prompt = inquirer.createPromptModule()
    prompt(questions).then((answers) => {
      resolve(answers.module)
    })
  })
}

export const success = (file) => {
  console.log('')
  console.log(log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'green'))
  console.log(`${log(' SUCCESS ', 'green')} ${`Le module ${log(file.name, 'blue')} a bien été créé`}`)
  console.log(log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'green'))
  console.log('')
  console.log('Fichiers :')
  console.log(log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'white'))
  file.paths.forEach((path) => {
    console.log(log(path, 'white'))
  });
  console.log('')
}


// module.exports = {
//   init,
//   success
// }