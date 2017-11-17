<!--
	作者：haijun
	时间：2017-10-29
	描述：商品搜索页面
-->
<template>
	<div class="search_block"  >
		<header class="top_bar">
	        <a onclick="window.history.go(-1)" class="icon_back"></a>
	        <form  class="goods_search" v-on:submit.prevent>
	            <input type="saerch" class="goods_search_content" placeholder="输入您想要的宝贝" v-model="keyWord" @keyup.enter="search($event)">
	        </form>
	        <a href="#" class="icon_menu" @click="search()"></a>
	    	<section class="search_condition" v-show="sortBlockShow" >
		        <ul>
		            <li>
		                <span class="all"> 
		                  <mu-dropDown-menu :value="value" @change="handleChange">
						    <mu-menu-item value="1" title="综合" @click="search_common(0)"/>
						    <mu-menu-item value="2" title="新品优先" @click="search_common(1)"/>
						    <mu-menu-item value="3" title="评论高到低" @click="search_common(2)"/>
  						  </mu-dropDown-menu>
		                </span>
		            </li>
		            <li>
		                <span @click="search_common(3)">销量</span>
		            </li>
		            <li class="p_price">
		                <span @click="search_common(4)">价格</span>
		                <em class="price_up"></em>
		                <em class="price_down"></em>
		            </li>
		            <li>
		                <span>筛选</span>
		                <em class="saixuan"></em>
		            </li>
		        </ul>
		    </section>
		</header>
		<main class="main_goods_box">
	        <ul>
	            <li class="goods_item" v-for="item in proDatas">
	                <router-link :to="'/detail/'+item.product_id" class="goods_item_link">
	                    <img :src="item.pic" alt="" class="goods_item_pic">
	                    <div class="goods_right">
	                        <div class="pp_name">
	                            <span>
	                                {{item.productName}}createdTime{{item.createdTime}}countSale【{{item.countSale}}】price【{{item.price}}】
	                            </span>
	                        </div>
	                        <div class="price_box">
	                            <span>￥</span>
	                            <span>{{item.price}}</span>
	                        </div>
	                        <div class="pinglun_box">
	                            <span>{{item.countComment}}条评价</span>
	                        </div>
	                    </div>
	                </router-link>
	            </li>
	        </ul>
    	</main>
	    <infinite-loading @infinite="loadMore" ref="infiniteLoading" spinner="waveDots" >
		  <span slot="no-more">{{this.config.msgNoMoreData}}</span>
		  <span slot="no-results">{{this.config.msgNoData}}</span>
  		</infinite-loading>
  		<div style="height: 50px;"></div>
	</div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default{
  components: {
    InfiniteLoading
  },
  data () {
    return {
      value: '1',
      sortBlockShow: false, //  排序字段显示标记
      sortBy: 0,
      page: 0,
      msg_search_toast: '请输入关键词',
      keyWord: '',
      proDatas: []
    }
  },
  methods: {
     // 回车键搜索、点击搜索按钮搜索
    search (event) {
      this.proDatas = []
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
      // this.$loading('loading...')
      this.$axios.get('/product?search&keyWord=' + this.keyWord + '&sortBy=' + this.sortBy, null, r => {
        // this.$loading.close()
        this.proDatas = r.data.datas
        this.page = 1
        this.sortBlockShow = true
        if (r.data.lastPage) {
          this.$refs.infiniteLoading.complete()
        } else {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        }
      })
      if (event) {
        window.event ? window.event.returnValue = false : event.preventDefault()
      }
    },
    // 综合搜索、回车键搜索、点击搜索按钮搜索
    search_common (sortBy) {
      this.sortBy = sortBy
      this.proDatas = []
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
      console.log(this.sortBy)
      this.$loading('loading...')
      this.$axios.get('/product?search&keyWord=' + this.keyWord + '&sortBy=' + this.sortBy, null, r => {
        this.proDatas = r.data.datas
        this.$loading.close()
        this.page = 1
        this.sortBlockShow = true
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      })
    },
    // 下拉加载更多数据
    loadMore ($state) {
      if (this.page === 0) {
        this.$refs.infiniteLoading.isLoading = false
        return
      }
      this.$refs.infiniteLoading.isLoading = true
      setTimeout(() => {
        this.page ++
        this.$axios.get('/product?search&page=' + this.page + '&keyWord=' + this.keyWord, null, r => {
          this.proDatas = this.proDatas.concat(r.data.datas)
          this.$nextTick(() => {
            alert(r.data.lastPage)
            if (r.data.lastPage) {
              if (this.lastPage) {
                $state.complete()
              } else {
                $state.loaded()
              }
            }
          })
        })
      }, 1000)
    },
    handleChange (value) {
      this.value = value
    }
  }
}
</script>
<style scoped>
	@import '../../assets/css/searchpage.css'
</style>