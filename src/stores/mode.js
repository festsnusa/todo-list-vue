import { defineStore } from 'pinia'

export default defineStore('mode', {
  state: () => {
    return {
      mode: 'dark',
    };
  },
  persist: true,
})