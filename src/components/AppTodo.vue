<template lang="pug">
.todo.todo_borderless
  .todo__left
    img.todo__icon.todo__image_incomplete(alt="toggle")
    VeeField.todo__box(:class="`todo__box_${mode}`"
    v-model="text" name="todo" 
    placeholder="Create a new todo..." type="text" 
    @keyup.enter="addTodo")
.todolist(:class="`todolist_${mode}`")
  draggable(v-model="todos" group="people" @start="drag=true" @end="dragEnd" item-key="id")
    template(#item="{element}")
      .todo
        .todo__left
          img.todo__icon(alt="toggle" :class="element.completed ? 'todo__image_completed': 'todo__image_incomplete'" @click="toggleTodo(element.id)")
          p(:class="element.completed ? 'todo__paragraph_completed' : 'todo__paragraph_incomplete'") {{ element.title }}
        img.todo__close(alt="cross" @click="deleteTodo(element.id)")
  .todolist__footer
    span.todolist__total {{ total }}
    button.todolist__clear(@click="clearCompleted") Clear completed
</template>

<script>
import draggable from 'vuedraggable'
import { mapStores } from 'pinia';
import useTodosStore from '@/stores/todos'
import useFilterStore from '@/stores/filter'
import useModeStore from '@/stores/mode'
import { uuid } from 'vue-uuid'

export default {
  name: "AppTodo",
  components: {
    draggable
  },
  data() {
    return {
      text: '',
      drag: false,
      todos: [],
      mode: ''
    }
  },
  computed: {
    ...mapStores(useTodosStore, useFilterStore, useModeStore),
    total() {
      let todoslength = this.todos.length
      let single = todoslength == 1 ? 'item' : 'items'
      return `${todoslength} ${single} left`
    }
  },
  methods: {
    dragEnd() {

      let currentFilter = this.filterStore.currentFilter

      if (currentFilter == "all") this.todosStore.todosList = this.todos
      else if (currentFilter == "active") this.todosStore.todosActive = this.todos
      else this.todosStore.todosCompleted = this.todos

      this.drag = false

    },
    changeActive(index) {
      let elements = document.querySelectorAll('.todofilter__element')
      elements.forEach((e, j) => {
        index == j ? e.classList.add('todofilter__element_active') : e.classList.remove('todofilter__element_active')
      })
    },
    addTodo() {
      if (this.text.length == 0) return
      this.todosStore.todosList.push({ "id": uuid.v1(), "title": this.text, "completed": false })
      this.todos = this.defineTodo(this.filterStore.currentFilter)
      this.text = ''
    },
    toggleTodo(id) {
      let currentTodo = this.todos.find(x => x.id === id)
      currentTodo.completed = !currentTodo.completed
      this.todos = this.defineTodo(this.filterStore.currentFilter)
    },
    deleteTodo(id) {
      this.todosStore.todosList = this.todosStore.todosList.filter(e => e.id !== id)
      this.todos = this.defineTodo(this.filterStore.currentFilter)
    },
    clearCompleted() {
      this.todosStore.todosList = this.todosStore.todosList.filter(e => e.completed == false)
      this.todos = this.defineTodo(this.filterStore.currentFilter)
    },
    defineTodo(filter) {
      return filter == 'all'
        ? this.todosStore.todosList
        : filter == 'active'
          ? this.todosStore.todosActive
          : this.todosStore.todosCompleted
    },
  },
  mounted() {
    let currentFilter = this.filterStore.currentFilter
    let index = currentFilter == "all" ? 0 : currentFilter == "active" ? 1 : 2
    this.changeActive(index)
  },
  created() {
    this.todos = this.defineTodo(this.filterStore.currentFilter)
    this.filterStore.$subscribe((mutation, state) => {
      this.todos = this.defineTodo(state.currentFilter)
    })

    this.mode = this.modeStore.mode

    this.modeStore.$subscribe((mutation, state) => {
      this.mode = state.mode
    })

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/vars.scss';

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
    border: none;

    &_dark {
      background-color: hsl(235, 24%, 19%);
    }

    &_light {
      background-color: #fff;
    }
  }

  &__close {
    cursor: pointer;
    content: url('@/images/icon-cross.svg');
  }

  &__icon {
    cursor: pointer;
    border-radius: 50%;
    padding: 0.6rem;
  }

  &__image {
    &_completed {
      content: url('@/images/icon-check.svg');
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
  width: 100%;
  line-height: 3.5rem;
  box-shadow: 2px 12px 8px 0px rgba(34, 60, 80, 0.2);

  &_dark {
    background-color: $blueDesaturated;
  }

  &_light {
    background-color: #fff;
  }

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