<template>
  <div id="app">
    <router-view></router-view>
    <NavBottom v-show="$store.state.isNavShow"></NavBottom>
  </div>
</template>

<script>
import NavBottom from './components/nav_bottom.vue'
export default {
  watch: {
    $route (to, from) {
      if (to.path.indexOf('product/detail') !== -1) {
        this.$store.dispatch('hideNav')
      } else {
        this.$store.dispatch('showNav')
      }
      if (to.path === '/search' || to.path === '/login' || to.path === '/register') {
        this.$store.dispatch('hideNav')
      }
    }
  },
  components: {NavBottom},
  name: 'app'
}
</script>
<style>
@import './assets/css/index.css';
</style>

 