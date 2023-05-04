<template lang="pug">
.todofilter(:class="`todofilter_${mode}`")
  span.todofilter__element.todofilter__element_active(@click="changeActive(0, 'all')") All 
  span.todofilter__element(@click="changeActive(1, 'active')") Active 
  span.todofilter__element(@click="changeActive(2, 'completed')") Completed
</template>

<script>
import { mapStores } from 'pinia';
import useFilterStore from '@/stores/filter'
import useModeStore from '@/stores/mode'

export default {
  name: "AppTodoFilter",
  computed: {
    ...mapStores(useFilterStore, useModeStore),
  },
  data() {
    return {
      mode: '',
    }
  },
  methods: {
    changeActive(index, filter) {
      let elements = document.querySelectorAll('.todofilter__element')
      elements.forEach((e, j) => {
        index == j ? e.classList.add('todofilter__element_active') : e.classList.remove('todofilter__element_active')
      })

      this.filterStore.currentFilter = filter

    },
  },
  created() {
    this.mode = this.modeStore.mode

    this.modeStore.$subscribe((mutation, state) => {
      this.mode = state.mode
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/vars.scss';

.todofilter {

  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 1rem;

  &_dark {
    background-color: $blueDesaturated;
  }

  &_light {
    background-color: #fff;
  }

  &__element {
    color: #5B5C78;
    cursor: pointer;

    &_active {
      color: $blueBright;
    }

  }
}
</style>