import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      jwt: null
    }
  },
  actions: {
    setNewToken(jwt) {
      localStorage.removeItem('jwt')
      localStorage.setItem('jwt', jwt)
      this.jwt = jwt
    },
  }
})
