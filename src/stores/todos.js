import { defineStore } from 'pinia'
// import { uuid } from 'vue-uuid'

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