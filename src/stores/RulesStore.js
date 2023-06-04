import { defineStore } from 'pinia'

export const useRulesStore = defineStore('rules', {
  state: () => {
    return {
      required: (val) => val && val.length > 0 || 'Este campo es obligatorio.',
      email: (val) => val || 'Ingresa una cuenta de correo electrónico válida',
      password: (val) => val && val.length >= 8 || 'Ingresa una contraseña más segura',
      codes: {
        user: (val) => val && val.length >= 17 && val.length <= 22 || 'El código del usuario es inválido',
      }
    }
  },
})
