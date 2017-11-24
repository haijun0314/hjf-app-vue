<!-- 商品详情  -->
<template>
	<div>
		<!-- 标题栏  -->
        <mu-appbar title="商品详情"  titleClass="common_bar_title">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="go_back()" />
        </mu-appbar>
        
        <!-- 商品详情轮播图  -->
		<van-swipe :autoplay="3000">
			<van-swipe-item v-for="item in product.picList">
		    	<img :src="item"  style="width: 100%;"/>
			</van-swipe-item>
		</van-swipe>
		
		<!-- 商品名称价格  -->
	    <van-cell-group>
		    <van-cell>
		        <div class="goods-title">{{ product.productName}}</div>
		        <div class="goods-price">￥{{ product.marketPrice}}</div>
		    </van-cell>
		    <van-cell>
		        <div  class="goods-descriptions">{{ product.descriptions}}</div>
		    </van-cell>
		    <van-cell class="goods-express">
		        <van-col span="10">运费：11</van-col>
		        <van-col span="14">剩余：{{product.store}}</van-col>
		    </van-cell>
		</van-cell-group>
		
		<!-- 商品简介  -->
	    <van-cell-group>
		    <van-cell title="促销 可享受以下优惠" :label="product.promotion" value="">
		    </van-cell>
		</van-cell-group>		
		<!-- 商品评论  -->
		<van-cell-group class="goods-cell-group">
		    <van-cell value="查看更多" icon="shop" :to="'/product/comment/'+this.productId" >
		        <template slot="title">
			        <span class="van-cell-text">商品评价</span>
			        <van-tag type="danger">{{comments.commentCount}}</van-tag>
			        
		        </template>
		    </van-cell>
		    <div class="gc-item gc-item-fit-add-spec" avalonctrl="gc-list-tag--1-item-0" v-for="item in comments.datas"> 
		        <div class="gc-top"> 
			        <div class="gc-avatar-wrapper"> 
			           <img class="gc-avatar" :src="item.headPic" /> 
			        </div> 
			        <div class="gc-info"> 
			          	<div class="gc-name">{{item.accountName}} </div> 
			        </div> 
		        	<div class="gc-time"> {{item.createdTime}} </div> 
		        </div> 
		        <div class="gc-main"> 
		        	<span>{{item.content}}</span> 
		        </div> 
		        <div class="gc-spec"> 
			        <div> 
			           <span>颜色:</span> 
			           <span>藏青色</span> 
			        </div>
		        </div> 
		    </div>
		</van-cell-group>
		<van-cell-group class="goods-cell-group">
		    <van-cell title="线下门店" icon="location" isLink></van-cell>
		</van-cell-group>	
		<van-cell-group class="goods-cell-group">
		    <van-cell title="查看商品详情" isLink ></van-cell>
		</van-cell-group>
		
		<!-- 商品详情  -->
		<van-cell-group class="goods-cell-group">
		    <p class="goods-detail" style="width: 100%;" v-html="product.detailDesc"></p>
		    <div style="height: 40px;"></div>
		</van-cell-group>
        
        <!-- 购物车导航栏  -->
		<van-goods-action>
			<van-goods-action-mini-btn icon="chat" @click=""> 客服 </van-goods-action-mini-btn>
			<van-goods-action-mini-btn icon="cart" @click=""> 购物车 </van-goods-action-mini-btn>
			<van-goods-action-big-btn @click=""> 加入购物车 </van-goods-action-big-btn>
			<van-goods-action-big-btn @click="" primary> 立即购买 </van-goods-action-big-btn>
		</van-goods-action>       	
	</div>
</template>
<script>
export default{
  mounted () {
    this.$store.dispatch('hideNav') // 隐藏 底部导航栏
    this.$parent.$data.shownav = false
    this.loadProduct(this.$route.params.id)
    this.loadComment(this.$route.params.id)
    this.productId = this.$route.params.id
  },
  data () {
    return {
      productId: null,
      shownav: false,
      product: {},
      comments: {}
    }
  },
  watch: {
  },
  methods: {
    go_back () {
      this.$router.go(-1)
    },
    // 加载商品信息
    loadProduct (productId) {
      this.$axios.get('/product?detail&productId=' + productId, null, r => {
        this.product = r.data
      })
    },
    // 商品评论数据
    loadComment (productId) {
      this.$axios.get('/product?comments&productId=' + productId, null, r => {
        this.comments.datas = r.data.datas
        this.comments.commentCount = r.data.commentCount
        this.comments.commentScoreRate = r.data.commentScoreRate
      })
    }
  }
}
</script>
<style scoped>
	@import '../../assets/css/product_detail.css'
</style>
<style lang="less">
.goods {
  padding-bottom: 50px;
  
  &-promotion{
  	text-align: left;
  }  
  &-descriptions{
  	font-size: 12px;
  	color: #81838e;
  } 
  &-detail {
  }
  &-detail img {
	width: 100%;
  } 
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
    font-size: 18px;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px 5px 0;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
}
</style>