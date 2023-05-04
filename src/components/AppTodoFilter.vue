<template lang="pug">
.todofilter 
  span.todofilter__element.todofilter__element_active(@click="changeActive(0, 'all')") All 
  span.todofilter__element(@click="changeActive(1, 'active')") Active 
  span.todofilter__element(@click="changeActive(2, 'completed')") Completed
</template>

<script>
import { mapStores } from 'pinia';
import useFilterStore from '@/stores/filter'

export default {
  name: "AppTodoFilter",
  // props: ["changeCurrentFilter"],
  computed: {
    ...mapStores(useFilterStore),
  },
  methods: {
    changeActive(index, filter) {
      let elements = document.querySelectorAll('.todofilter__element')
      elements.forEach((e, j) => {
        index == j ? e.classList.add('todofilter__element_active') : e.classList.remove('todofilter__element_active')
      })

      // this.$emit('changeCurrentFilter', filter)
      this.filterStore.currentFilter = filter

    },
  },
  created() {
    // console.log(this.filterStore.currentFilter)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/vars';

.todofilter {

  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 1rem;
  background-color: $blueDesaturated;

  &__element {
    color: #5B5C78;
    cursor: pointer;

    &_active {
      color: $blueBright;
    }
  }
}
</style>