import { defineStore } from 'pinia'

export const useUtilsStore = defineStore('utils', {
  state: () => {
    loader: false
  },
  actions: {
    setNewLoadersState(state) {
      this.loader = state
    }
  }
})
