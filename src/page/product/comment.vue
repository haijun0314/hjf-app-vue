<!-- 商品评论  -->
<template>
	<div>
		<!-- 标题栏  -->
        <mu-appbar title="商品评论"  titleClass="common_bar_title">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="go_back()" />
        </mu-appbar>
 	
		<!-- 商品评论  -->
		<van-cell-group class="goods-cell-group">
		    <van-cell>
		        <template slot="title">
			        <span class="van-cell-text">商品评价数量</span>
			        <van-tag type="danger">{{commentCount}}</van-tag>
		        </template>
		    </van-cell>
		</van-cell-group>
		<!-- 商品评论  -->
		<van-cell-group class="goods-cell-group">
		    <van-cell>
				<van-row gutter="20">
					<van-col span="6"><van-button  type="danger" size="small">全部{{levelList.all}}</van-button></van-col>
					<van-col span="6"><van-button size="small">好评{{levelList.good}}</van-button></van-col>
					<van-col span="6"><van-button size="small">中评{{levelList.normal}}</van-button></van-col>
					<van-col span="6"><van-button size="small">差评{{levelList.bad}}</van-button></van-col>
				</van-row>	       
		    </van-cell>
		</van-cell-group>
	    <div class="gc-item gc-item-fit-add-spec" v-for="item in dataList"> 
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
	</div>
</template>
<script>
export default{
  mounted () {
    this.$store.dispatch('hideNav') // 隐藏 底部导航栏
    this.loadComment(this.$route.params.id)
  },
  data () {
    return {
      commentCount: null,
      commentScoreRate: null,
      dataList: {},
      levelList: {'all': 10002, 'good': 3556, 'normal': 454, 'bad': 435}
    }
  },
  watch: {
  },
  methods: {
    go_back () {
      this.$router.go(-1)
    },
    // 商品评论数据
    loadComment (productId) {
      this.$axios.get('/product?comments&productId=' + productId, null, r => {
        this.dataList = r.data.datas
        this.commentCount = r.data.commentCount
        this.commentScoreRate = r.data.commentScoreRate
        console.log(this.dataList)
      })
    }
  }
}
</script>
<style scoped>
	@import '../../assets/css/product_detail.css'
</style>
