import { defineStore } from 'pinia'

export default defineStore('todos', {
  state: () => ({
    todosList: [],
  }),
  getters: {
    todosActive: (state) => state.todosList.filter(e => !e.completed),
    todosCompleted: (state) => state.todosList.filter(e => e.completed),
  },
  persist: true,
})