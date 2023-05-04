<template lang="pug">
header
  AppHeader
main.main(:class="`main_${mode}`")
  AppTodo
  AppTodoFilter
  p.main__footer Drag and drop to reorder list
</template>

<script>
import { mapStores } from 'pinia';
import useModeStore from '@/stores/mode'

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
    ...mapStores(useModeStore)
  },
  data() {
    return {
      currentFilter: 'all',
      todos: [],
      todosAll: this.todos,
      todosActive: [],
      todosCompleted: [],
      mode: '',
    }
  },
  created() {

    this.mode = this.modeStore.mode

    this.modeStore.$subscribe((mutation, state) => {
      this.mode = state.mode
    })

  },
}
</script>

<style scoped lang="scss">
@import './assets/vars';

.main {
  padding: 2rem;
  gap: 1rem;

  &_dark {
    background-color: #161722;
  }

  &_light {
    background-color: $grayLight;
  }

  &__footer {
    display: flex;
    justify-content: center;
    color: #5B5C78;
    padding: 2rem;
  }
}

@media (min-width: 1000px) {
  .main {
    padding: 0 15rem;
  }
}
</style>
