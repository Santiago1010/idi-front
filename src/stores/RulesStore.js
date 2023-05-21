import { defineStore } from 'pinia'

import { useRegexStore } from './RegexStore.js'

export const useRulesStore = defineStore('rules', {
  state: () => {
    return {
      required: (val) => val && val.length > 0 || 'Este campo es obligatorio.',
      email: (val) => val && useRegexStore().email.test(val) || 'Ingresa una cuenta de correo electrónico válida',
    }
  },
})
