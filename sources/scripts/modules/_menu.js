import { module as mmodule } from 'modujs'

export default class Menu extends mmodule {
  constructor(m) {
    super(m)
    this.state = false
    this.events = {}
  }

  init() {
    this.getValue('test', 'Website', 'website')
  }

  getValue(value, module, modId) {
    console.log(this.modules[module][modId][value])
  }
}
