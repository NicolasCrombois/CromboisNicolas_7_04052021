<template>
      <navBar>
      </navBar>
</template>

<script>
import navBar from './components/nav-bar.vue'

export default {
  name: 'App',
  components: {
    navBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
