<template>
	<div class="search_ma"  >
		<header class="top_bar">
	        <a onclick="window.history.go(-1)" class="icon_back"></a>
	        <form  class="goods_search" v-on:submit.prevent>
	            <input type="saerch" class="goods_search_content" placeholder="搜索" v-model="keyword" @keyup.enter="search_common($event)">
	        </form>
	        <a href="#" class="icon_menu" @click="search_common()"></a>
    	</header>
	    <section class="search_condition">
	        <ul>
	            <li>
	                <span class="all" @click="search_common()">综合</span>
	                <em class="all_icon"></em>
	            </li>
	            <li>
	                <span @click="search_saleCount()">销量</span>
	            </li>
	            <li class="p_price">
	                <span @click="search_price()">价格</span>
	                <em class="price_up"></em>
	                <em class="price_down"></em>
	            </li>
	            <li>
	                <span>筛选</span>
	                <em class="saixuan"></em>
	            </li>
	        </ul>
	    </section>
		<main class="main_goods_box">
	        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
	            <li class="goods_item" v-for="item in proDatas">
	                <router-link :to="'/detail/'+item.product_id" class="goods_item_link">
	                    <img :src="item.pic" alt="" class="goods_item_pic">
	                    <div class="goods_right">
	                        <div class="pp_name">
	                            <span>
	                                {{item.productName}}
	                            </span>
	                        </div>
	                        <div class="price_box">
	                            <span>￥</span>
	                            <span>{{item.price}}</span>
	                            <span>.00</span>
	                        </div>
	                        <div class="pinglun_box">
	                            <span>{{item.product_comment_num}}条评价</span>
	                        </div>
	                    </div>
	                </router-link>
	            </li>
	        </ul>
	        <div style="height: 100px;"></div>
    	</main>
	</div>
</template>
<script>
export default{
  data () {
    return {
      page: 0,
      busy: false,
      msg_search_toast: '请输入关键词',
      toast: false,
      keyword: '',
      proDatas: []
    }
  },
  methods: {
    // 综合搜索、回车键搜索、点击搜索按钮搜索
    search_common (event) {
      let _this = this
      this.page = 1
      if (_this.keyword === '') {
        this.$toast.center(_this.msg_search_toast)
      } else {
        _this.$axios.get('/product?search', null, r => {
          this.proDatas = r.data.datas
        })
      }
      if (event) {
        window.event ? window.event.returnValue = false : event.preventDefault()
      }
    },
    // 按销量搜索
    search_saleCount () {
      let _this = this
      if (_this.keyword === '') {
        this.$toast.center(_this.msg_search_toast)
      } else {
        this.$loading('loading...')
        let self = this
        _this.$axios.get('/product?search', null, r => {
          this.proDatas = r.data.datas
          self.$loading.close()
        })
      }
    },
    // 按价格搜索
    search_price () {
      let _this = this
      if (_this.keyword === '') {
        this.$toast.center(_this.msg_search_toast)
      } else {
        _this.$axios.get('/product?search', null, r => {
          this.proDatas = r.data.datas
        })
      }
    },
    loadMore () {
      var self = this
      self.page++
      self.$axios.get('/product?search&page=' + self.page, null, r => {
        for (var i = 0; i < r.data.datas.length; i++) {
          self.proDatas.push(r.data.datas[i])
        }
      })
    }
  }
}
</script>