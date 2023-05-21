import { defineStore } from 'pinia'

export const useRegexStore = defineStore('regex', {
  state: () => {
    return {
      email: null,
    }
  },
  actions: {
    setValidExtensions(validExtensions = ['gmail.com', 'hotmail.com', 'outlook.com']) {
      const escapedExtensions = validExtensions.map(extension => extension.replace('.', '\\.'))
      const extensionsRegex = `^[a-zA-Z0-9_.+-]+@(${escapedExtensions.join('|')})$`

      this.email = new RegExp(extensionsRegex)
    }
  }
})
