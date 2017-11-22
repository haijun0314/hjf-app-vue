<!-- 商品详情  -->
<template>
	<div>
        <mu-appbar title="商品详情"  titleClass="common_bar_title">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="go_back()" />
        </mu-appbar>
        <!-- 商品详情轮播图  -->
		<van-swipe :autoplay="3000">
			<van-swipe-item v-for="item in product.picList" :key="index">
		    	<img :src="item"  style="width: 100%;"/>
			</van-swipe-item>
		</van-swipe>
		<!-- 商品名称价格  -->
	    <van-cell-group>
		    <van-cell>
		        <div class="goods-title">{{ product.productName}}</div>
		        <div class="goods-price">{{ product.marketPrice}}</div>
		    </van-cell>
		    <van-cell class="goods-express">
		        <van-col span="10">运费：11</van-col>
		        <van-col span="14">剩余：345</van-col>
		    </van-cell>
		</van-cell-group>
		<van-cell-group class="goods-cell-group">
		    <van-cell value="进入店铺" icon="shop" isLink>
		        <template slot="title">
			        <span class="van-cell-text">有赞的店</span>
			        <van-tag type="danger">官方</van-tag>
		        </template>
		    </van-cell>
		    	<van-cell title="线下门店" icon="location" isLink></van-cell>
		</van-cell-group>
		<van-cell-group class="goods-cell-group">
		    <van-cell title="查看商品详情" isLink></van-cell>
		</van-cell-group>
        <div>
           <p class="pro_det" v-html="product.detailDesc"></p>
        </div>
        <div style="height: 40px;"></div>
        <div>
			 <van-goods-action>
			  <van-goods-action-mini-btn icon="chat" @click="onClickMiniBtn">
			    客服
			  </van-goods-action-mini-btn>
			  <van-goods-action-mini-btn icon="cart" @click="onClickMiniBtn">
			    购物车
			  </van-goods-action-mini-btn>
			  <van-goods-action-big-btn @click="onClickBigBtn">
			    加入购物车
			  </van-goods-action-big-btn>
			  <van-goods-action-big-btn @click="onClickBigBtn" primary>
			    立即购买
			  </van-goods-action-big-btn>
			</van-goods-action>       	
        </div> 
	</div>
</template>
<script>
export default{
  mounted () {
    this.$store.dispatch('hideNav') // 隐藏 底部导航栏
    this.$parent.$data.shownav = false
    this.loadProduct(this.$route.params.id)
  },
  data () {
    return {
      shownav: false,
      product: {}
    }
  },
  watch: {
  },
  methods: {
    go_back () {
      this.$router.go(-1)
    },
    loadProduct (productId) {
      this.$axios.get('/product?detail&productId=' + productId, null, r => {
        this.product = r.data
      })
    }
  }
}
</script>
<style lang="less">
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 7.5rem;
      height: 7.5rem;
      display: block;
    }
  }
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
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