<template lang="pug">
.header(:class="`header_${mode}`")
  h1.header__title TODO 
  img.header__image(alt="mode" :class="`header__image_${mode}`" @click="changeMode")
</template>

<script>
import { mapStores } from 'pinia';
import useModeStore from '@/stores/mode'

export default {
  name: "AppHeader",
  data() {
    return {
      mode: '',
    }
  },
  computed: {
    ...mapStores(useModeStore)
  },
  methods: {
    changeMode() {
      this.modeStore.mode = this.modeStore.mode == 'dark' ? 'light' : 'dark'
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
.header {
  padding: 3rem 2rem;

  background-repeat: no-repeat;
  background-size: cover;
  height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  &_dark {
    background-image: url("@/images/bg-mobile-dark.jpg");
  }

  &_light {
    background-image: url("@/images/bg-mobile-light.jpg");
  }

  &__title {
    color: #fff;
    letter-spacing: 1rem;
  }

  &__image {
    cursor: pointer;


    &_dark {
      content: url("@/images/icon-sun.svg");
    }

    &_light {
      content: url("@/images/icon-moon.svg");
    }
  }
}

@media (min-width: 1000px) {
  .header {

    padding: 3rem 15rem;

    &_dark {
      background-image: url("@/images/bg-desktop-dark.jpg");
    }

    &_light {
      background-image: url("@/images/bg-desktop-light.jpg");
    }

  }
}
</style>