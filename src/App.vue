<template lang="pug">
header
  AppHeader
main.main
  AppTodo(:todos="chooseTodo()" @addTodo="addTodo" :toggleTodo="toggleTodo" :deleteTodo="deleteTodo" :clearCompleted="clearCompleted")
  AppTodoFilter(v-on:changeCurrentFilter="changeCurrentFilter($event)")
  p.footer Drag and drop to reorder list
</template>

<script>
import { mapStores } from 'pinia';
import useTodosStore from '@/stores/todos'
import { uuid } from 'vue-uuid'

import AppHeader from './components/AppHeader.vue';
import AppTodo from './components/AppTodo.vue';
import AppTodoFilter from './components/AppTodoFilter.vue';

export default {
  name: "App",
  components: {
    AppHeader,
    AppTodo,
    AppTodoFilter,
  },
  computed: {
    ...mapStores(useTodosStore)
  },
  data() {
    return {
      currentFilter: 'all',
      todos: [],
      todosAll: this.todos,
      todosActive: [],
      todosCompleted: [],
    }
  },
  methods: {
    addTodo(value) {
      if (value.length == 0) return
      this.todos.push({ "id": uuid.v1(), "title": value, "completed": false })
    },
    toggleTodo(id) {
      let currentTodo = this.todos.find(x => x.id === id)
      currentTodo.completed = !currentTodo.completed
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(e => e.id !== id)
    },
    clearCompleted() {
      this.todos = this.todos.filter(e => e.completed == false)
    },
    chooseTodo() {
      if (this.currentFilter == 'all') return this.todos
      if (this.currentFilter == 'active') return this.todosActive
      return this.todosCompleted
    },
    changeCurrentFilter(filter) {
      this.currentFilter = filter
    },
    updateTodoList() {
      console.log('!')
      this.todosStore.todosList = this.todos
    }
  },
  updated() {
    this.todosActive = this.todos.filter(e => !e.completed)
    this.todosCompleted = this.todos.filter(e => e.completed)
    this.todosStore.todosList = this.todos
  },
  created() {
    this.todos = this.todosStore.todosList
    // window.addEventListener('beforeunload', this.updateTodoList)
  },
}
</script>

<style scoped>
.main {
  background-color: #161722;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  height: 100vh;
  gap: 1rem;
}

.main form {
  width: 100%;
  margin-top: -35rem;
  position: relative;
}

.main input {
  width: 100%;
  padding: 1rem 3rem;
  background-color: hsl(235, 24%, 19%);
  border: none;
  border-radius: 0.5rem;
  color: hsl(234, 11%, 52%);
  font-family: 'Josefin Sans';
  font-size: 1.125rem;
}

/*# sourceMappingURL=Main.module.css.map */
</style>
