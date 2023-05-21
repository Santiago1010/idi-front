import { defineStore } from 'pinia'

export const useUtilsStore = defineStore('utils', {
  state: () => {
    return {
      loader: false,
      language: 'en'
    }
  },
  actions: {
    setNewLoadersState(state) {
      this.loader = state
    },
    setNewLanguage(newLanguage) {
      if (newLanguage) {
        localStorage.removeItem('language');
        localStorage.setItem('language', newLanguage);
        this.language = newLanguage;
      } else {
        this.language = localStorage.language || navigator.language.split('-')[0];
      }
    }
  }
})
