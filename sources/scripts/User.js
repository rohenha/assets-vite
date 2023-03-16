export default class User {
  constructor(name) {
    this.name = name
  }

  sayName() {
    console.log(this.name)
  }

  changeName(name) {
    this.name = name
  }
}
