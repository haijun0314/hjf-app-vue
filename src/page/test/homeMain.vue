<template>
	<div class="home_m" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
		 <main class="m_product">
                <section class="product_box">
                    <div class="product_top">
                        <a href="#" class="product_left">
                            <strong class="dianshu">今日特价</strong>
                        </a>
                    </div>
                    <div class="product_content">
                        <ul>
                            <li class="product_skill_item" v-for="item in recPrdsList">
                                <router-link :to="'/detail/'+item.productId" class="product_skill_item_link">
                                    <img v-lazy="item.pic" alt="" class="product_skill_item_cion lazy-img-fadein">
	                                    <p class="nowprice">
	                                        <span class="now_price">¥{{item.price}}</span>
	                                    </p>
	                                    <p class="oldprice">
	                                        <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
	                                        <del class="old_price">{{item.price}}</del>
	                                    </p>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </section>
                <!-- 推荐商品 开始-->
                <section>
                	<div>
                		<img src="../../assets/images/title_01.jpg" width="100%"/>
                	</div>
                </section>
                <div class="left_share_quality_content clearfix">
                    <div class="share_quality">
                        <div class="share_quality_left not_eng_box">
                            <ul>
                                <li class="not_eng_item" v-for="item in hotPrdsList">
                                    <router-link  class="not_eng_link" :to="'/detail/'+item.productId">
                                        <img v-lazy="item.pic" alt="" class="not_eng_pic lazy-img-fadein">
                                        <div class="not_eng_info">
                                            <p class="not_eng_title">{{item.productName}}</p>
                                            <p class="not_eng_text">
                                                <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                                                <span class="more_info_price_txt">{{item.price}}</span>
                                            </p>
                                        </div> 
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- 推荐商品 结束-->
            </main>
	</div>
</template>
<script>
export default{
  data () {
    return {
      page: 0,
      busy: false,
      // 轮播图
      carouses: [],
      // 推荐商品
      recPrdsList: [],
      // 热门商品
      hotPrdsList: []
    }
  },
  mounted () {
    this.loadHotProds()
    this.loadRecPrds()
  },
  methods: {
    loadHotProds () {
      this.$axios.get('/product?search', null, r => {
        this.hotPrdsList = r.data.datas
      })
    },
    loadRecPrds () {
      this.$axios.get('/product?search&productType=2', null, r => {
        this.recPrdsList = r.data.datas
      })
    },
    loadMore () {
      this.page++
      this.$axios.get('/product?search&page=' + this.page, null, r => {
        for (var i = 0; i < r.data.datas.length; i++) {
          this.hotPrdsList.push(r.data.datas[i])
        }
      })
    }
  }
}
</script>
