import User from './User'

const user1 = new User('Thomas')
const user2 = new User('John')
user2.changeName('Billy')
user1.sayName()
user2.sayName()
const variable = 'hello world'
// eslint-disable-next-line prefer-const
let var2 = 'test'
const var3 = variable + var2
console.log(variable)
console.log(var2, var3)
// /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ►►► Scripts/main
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
// // import '../styles/site.scss'
// import modular from 'modujs'
// import * as modules from './organisms/_modules'

// window.addEventListener('load', () => {
//   const init = () => {
//     console.log(
//       '%cFait avec ❤️❤️❤️ par TROA',
//       'font-size:10px;color:#AACBF4; background-color:#263069; padding:5px;'
//     )
//     // eslint-disable-next-line new-cap
//     const manager = new modular({
//       modules,
//     })
//     manager.init(manager)
//   }

//   const $style = document.getElementById('main-css')

//   if (!$style) {
//     console.warn('The "main-css" stylesheet not found')
//     return
//   }

//   if ($style.isLoaded) {
//     init()
//   } else {
//     $style.addEventListener('load', init)
//   }
// })
