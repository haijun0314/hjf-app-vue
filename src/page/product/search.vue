<!--
	作者：haijun
	时间：2017-10-29
	描述：商品搜索页面
-->
<template>
	<div class="search_block"  >
		<!-- 搜索框头部 -->
		<header class="top_bar">
	        <a onclick="window.history.go(-1)" class="icon_back"></a>
	        <form  class="goods_search" v-on:submit.prevent>
	            <input type="saerch" class="goods_search_content" placeholder="输入您想要的宝贝" v-model="params.keyWord" @keyup.enter="search($event)">
	        </form>
	        <a href="#" class="icon_menu" @click="search()"></a>
	        <!-- 搜索框排序条件 -->
	    	<section class="search_filter" v-show="sortBlockShow" >
		        <ul>
		            <li>
		                <span class="all"> 
		                  <mu-dropDown-menu :value="value">
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
		                <span @click="search_filter_togle('open')">筛选</span>
		                <em class="saixuan"></em>
		            </li>
		        </ul>
		    </section>
		    <!-- 搜索框 筛选条件 弹出框 -->
			   <mu-popup position="right" popupClass="search-popup-right" :open="rightPopup" @close="search_filter_togle('close')">
   					<!-- 【筛选框组件给父组件通信】  监控子组件触发search_filter_status事件 执行父组件 search_filter_submit方法-->
   					<SearchFilter @search_filter_status="search_filter_submit"></SearchFilter> 
  			   </mu-popup>
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
import SearchFilter from './searchFilter'
export default{
  components: {
    InfiniteLoading, SearchFilter
  },
  data () {
    return {
      params: {sortBy: 0, page: 0}, // 查询参数
      open: false,
      value: '1',
      sortBlockShow: false, //  排序字段显示标记
      lastPage: false,
      msg_search_toast: '请输入关键词',
      proDatas: [],
      rightPopup: false
    }
  },
  mounted () {
  },
  methods: {
     // 回车键搜索、点击搜索按钮搜索
    search (event) {
      this.proDatas = []
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
      this.$loading('loading...')
      this.$axios.get('/product?search', this.params, r => {
        this.$loading.close()
        this.proDatas = r.data.datas
        this.params.page = 1
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
      this.params.sortBy = sortBy
      this.proDatas = []
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
      this.$loading('loading...')
      this.$axios.get('/product?search', this.params, r => {
        this.proDatas = r.data.datas
        this.$loading.close()
        this.params.page = 1
        this.sortBlockShow = true
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      })
    },
    // 下拉加载更多数据
    loadMore ($state) {
      if (this.params.page === 0) {
        this.$refs.infiniteLoading.isLoading = false
        return
      }
      this.$refs.infiniteLoading.isLoading = true
      const t = setTimeout(() => {
        this.params.page ++
        this.$axios.get('/product?search', this.params, r => {
          this.proDatas = this.proDatas.concat(r.data.datas)
          if (r.data.lastPage) {
            this.lastPage = true
          }
          clearTimeout(t)
        })
        if (this.lastPage) {
          $state.complete()
        } else {
          $state.loaded()
        }
      }, 1000)
    },
    search_filter_togle (status) {
      if (status === 'open') {
        this['rightPopup'] = true
      } else {
        this['rightPopup'] = false
      }
    },
    // 筛选框确定按钮点击事件【筛选框组件给父组件通信】
    search_filter_submit (_params) {
      Object.assign(this.params, _params)
      this.params.page = 0
      console.log(this.params)
      this.search()
      this['rightPopup'] = false
    }
  }
}
</script>
<style scoped>
	@import '../../assets/css/searchpage.css'
</style>
