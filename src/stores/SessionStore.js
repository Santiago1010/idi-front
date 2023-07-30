import { defineStore } from 'pinia'
import { validateToken } from '../utils/security.js'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      jwt: '',
      usersData: {}
    }
  },
  actions: {
    setNewToken(jwt) {
      localStorage.removeItem('jwt')
      localStorage.setItem('jwt', jwt)
      this.jwt = jwt
      this.usersData = validateToken();
    },
  }
})
