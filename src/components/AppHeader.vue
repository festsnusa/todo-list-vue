<template lang="pug">
.header 
  h1.header__title TODO 
  img.header__image(src="" alt="theme")
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style lang="scss" scoped>
.header {
  padding: 3rem 2rem;
  background-image: url("../images/bg-mobile-dark.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  &__title {
    color: #fff;
    letter-spacing: 1rem;
  }

  &__image {
    cursor: pointer;
    content: url("../images/icon-sun.svg");
  }
}
</style>