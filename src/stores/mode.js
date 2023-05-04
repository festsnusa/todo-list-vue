import { defineStore } from 'pinia'

export default defineStore('mode', {
  state: () => ({
    currentMode: 'dark'
  }),
})