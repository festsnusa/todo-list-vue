<template lang="pug">
.todo.todo_borderless
  .todo__left
    img.todo__icon.todo__image_incomplete(alt="toggle")
    VeeField.todo__box(v-model="text" name="todo" 
    placeholder="Create a new todo..." type="text" 
    @keyup.enter="addingTodo")
.todolist
  .todo(v-for="todo in todos")
    .todo__left
      img.todo__icon(alt="toggle" :class="todo.completed ? 'todo__image_completed': 'todo__image_incomplete'" @click="toggleTodo(todo.id)")
      p(:class="todo.completed ? 'todo__paragraph_completed' : 'todo__paragraph_incomplete'") {{ todo.title }}
    img.todo__close(alt="cross" @click="deleteTodo(todo.id)")
  .todolist__footer
    span.todolist__total {{ total }}
    button.todolist__clear(@click="clearCompleted") Clear completed
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
    addingTodo() {
      this.$emit('addTodo', this.text)
      this.text = ''
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/vars.scss';

p,
input {
  color: #9597ad;
  font-size: 1rem;
}

.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid hsl(234, 11%, 52%);
  width: 100%;
  padding: 1rem;

  &_borderless {
    border-bottom: none;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }

  &__box {
    width: 100%;
    padding: 1rem;
    background-color: hsl(235, 24%, 19%);
    border: none;
    // border-radius: 1rem;
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

  &__image {
    &_completed {
      content: url('../images/icon-check.svg');
      background: linear-gradient(to right,
          hsl(192, 100%, 67%),
          hsl(280, 87%, 65%));
    }

    &_incomplete {
      border: 1px solid #fff;
      width: 2rem;
      height: 2rem;
    }
  }

  &__paragraph {

    &_completed {
      text-decoration: line-through;
      color: #46485e;
    }

  }

}

.todolist {
  border-radius: 1rem;
  background-color: hsl(235, 24%, 19%);
  width: 100%;
  line-height: 3.5rem;

  &__footer {
    display: flex;
    justify-content: space-between;
    color: #46485e;
    padding: 1rem;
  }

  &__clear {
    background-color: transparent;
    border: none;
  }
}
</style>