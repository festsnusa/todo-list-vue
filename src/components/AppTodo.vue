<template lang="pug">
.todo 
  .todo__left
    img.todo__icon(alt="toggle" class="todo__incomplete")
    VeeField.todo__box(v-model="text" name="todo" placeholder="Create a new todo..." type="text" @keyup.enter="addTodo(text)")
.todolist
  .todo(v-for="todo in todos")
    .todo__left
      img.todo__icon(alt="toggle" :class="todo.completed ? 'todo__completed': 'todo__incomplete'" @click="toggleTodo(todo.id)")
      p {{ todo.title }}
    img.todo__close(alt="cross" @click="deleteTodo(todo.id)")
  .todolist__footer
    span.todolist__total {{ total }}
    span.todolist__clear(@click="clearCompleted") Clear completed
</template>

<script>
export default {
  name: "AppTodo",
  props: ["todos", "addTodo", "toggleTodo", "deleteTodo", "clearCompleted"],
  data() {
    return {
      text: '',
    }
  },
  computed: {
    total() {
      let todoslength = `${this.todos.filter(e => !e.completed).length}`
      let single = todoslength == 1 ? 'item' : 'items'
      return `${todoslength} ${single} left`
    }
  },
  methods: {
    changeActive(index) {
      let elements = document.querySelectorAll('.todofilter__element')
      elements.forEach((e, j) => {
        index == j ? e.classList.add('todofilter__element_active') : e.classList.remove('todofilter__element_active')
      })
    },
  },
  updated() {
    // console.log(this.todos)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/vars.scss';

p {
  color: #9597ad;
}

.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid hsl(234, 11%, 52%);
  width: 100%;

  &__left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__close {
    cursor: pointer;
    content: url('../images/icon-cross.svg');
  }

  &__icon {
    cursor: pointer;
    border-radius: 50%;
    padding: 0.6rem;
  }

  &__completed {
    content: url('../images/icon-check.svg');
    background: linear-gradient(to right,
        hsl(192, 100%, 67%),
        hsl(280, 87%, 65%));

    &_paragraph {
      text-decoration: line-through;
      color: #46485e;
    }
  }

  &__incomplete {
    border: 1px solid #fff;
    width: 2rem;
    height: 2rem;
    /* background-color: red; */
  }
}

.todolist {
  border-radius: 1rem;
  background-color: hsl(235, 24%, 19%);
  width: 100%;

  &__completed-section {
    display: flex;
    justify-content: space-between;
  }
}
</style>