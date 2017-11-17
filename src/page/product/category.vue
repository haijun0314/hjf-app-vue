<template>
<div class="demo-infinite-container">
  <mu-list>
    <template v-for="item in proDatas">
      <mu-list-item :title="''+item.productId"/>
      <mu-divider/>
    </template>
  </mu-list>
  <div> 
  	  <span v-show="no_more">{{this.config.msgNoMoreData}}</span>
		  <span v-show="noData">{{this.config.msgNoData}}</span>
  </div>
  	<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  

</div>
</template>

<script>
export default {
  data () {
    return {
      no_more: false,
      noData: false,
      params: {sortBy: 0, page: 0}, // 查询参数
      proDatas: [],
      num: 10,
      loading: false,
      scroller: null
    }
  },
  mounted () {
    this.scroller = this.$el
    this.$axios.get('/product?search', this.params, r => {
      if (r.data.noData) {
        this.noData = true
        return
      }
      this.params.page = 1
      this.proDatas = this.proDatas.concat(r.data.datas)
    })
  },
  methods: {
    loadMore () {
      this.loading = true
      if (this.params.page === 0) {
        return
      }
      this.params.page ++
      this.$axios.get('/product?search', this.params, r => {
        this.loading = false
        this.$nextTick(() => {
          if (r.data.lastPage) {
            this.params.page = 0
            this.no_more = true
            this.proDatas = this.proDatas
          } else {
            this.proDatas = this.proDatas.concat(r.data.datas)
          }
        })
      })
    }
  }
}
</script>

<style lang="css">
.demo-infinite-container{
  width: 100%;
  height: 400px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #d9d9d9;
}
.scrollNoMore{
 display: none;
}
</style>
<style scoped>
  @import '../../assets/css/searchpage.css'
</style>
