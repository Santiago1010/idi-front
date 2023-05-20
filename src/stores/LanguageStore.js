import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('languages', {
  store: () => {
    return {
      language: 'es',
    }
  },
  actions: {
    setNewLanguage({ newLanguage } = {}) {
      if (!localStorage.language) {
        this.language = newLanguage ?? 'es'
        localStorage.setItem('language', this.language)
      }
    }
  },
})
