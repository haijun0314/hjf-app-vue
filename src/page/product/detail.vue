<template>
	<div>
		<header class="top_bar">
            <a onclick="window.history.go(-1)" class="icon_back"></a>
            <h3 class="cartname">商品详情</h3>
            <a href="#" class="icon_menu"></a>
        </header>
        <main class="detail_box">
            <section class="banner_box">
                <ul class="banner_child_box">
                    <li class="banner_item" v-for="item in product.picList">
                        <img v-lazy="item" alt="" class="banner_pic">
                    </li>
                
                </ul>
                <div class="banner_count">
                        <em id="slide-nub" class="fz18">1</em>
                        <em class="nub-bg">/</em>
                        <em id="slide-sum" class="fz12">5</em>
                </div>
            </section>
            <section class="product_info clearfix">
                <div class="product_left">
                    <p class="p_name">{{product.productName}}</p>
                    <div class="product_pric">
                        <span>￥</span>
                        <span class="rel_price">{{product.marketPrice}}</span>
                        <span>.00</span>
                    </div>
                    <div class="product_right">
                                            降价通知
                    </div>
                </div>
            </section>
            <section class="product_intro">
                <p class="pro_det">
                    {{product.detailDesc}}
                </p>
           </section>
        </main>
        <footer class="cart_d_footer">
            <div class="m">
                <ul class="m_box">
                    <li class="m_item">
                        <a href="" class="m_item_link">
                            <em class="m_item_pic"></em>
                            <span class="m_item_name">卖家</span>
                        </a>
                        <a href="" class="m_item_link">
                            <em class="m_item_pic two"></em>
                            <span class="m_item_name">关注</span>
                        </a>
                        <a href="" class="m_item_link">
                            <em class="m_item_pic three"></em>
                            <span class="m_item_name">购物车</span>
                        </a>
                    </li>
                </ul>
                <div class="btn_box clearfix" >
                    <a href="#" class="buy_now">加入购物车</a>
                    <a href="#" class="buybuy">立即购买</a>
                </div>
            </div>
        </footer>
	</div>
</template>
<script>
export default{
  mounted () {
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
    loadProduct (productId) {
      this.$axios.get('/product?detail&productId=' + productId, null, r => {
        this.product = r.data
      })
    }
  }
}
</script>
<style>
@import '../../assets/css/detail.css';
</style>