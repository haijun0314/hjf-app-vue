<template>
    <div id="app">
        <button @click="openCenter()">center</button>
		<button @click="openLoading()">loading</button>
    </div>
</template>
<script>
export default {
  methods: {
    openCenter () {
      this.$toast('center')
    },
    openLoading () {
      this.$loading('loading...')
      let self = this
      setTimeout(function () {
        self.closeLoading()
      }, 2000)
    },
    closeLoading () {
      this.$loading.close()
    }
  }
}
</script>