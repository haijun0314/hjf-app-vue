<!-- 商品评论  -->
<template>
	<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
		<!-- 标题栏  -->
        <mu-appbar title="商品评论"  titleClass="common_bar_title">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="go_back()" />
        </mu-appbar>
		<!-- 商品评论  -->
		<van-cell-group class="goods-cell-group">
		    <van-cell :value="commentScoreRate">
		        <template slot="title">
			        <span class="van-cell-text">商品评价数量</span>
			        <span class="van-cell-text">{{commentCount}}</span>
		        </template>
		    </van-cell>
		</van-cell-group>
		<!-- 商品评论分类按钮组  -->
		<van-cell-group class="goods-cell-group">
		    <van-cell>
				<van-row gutter="10">
					<van-col span="6"><van-button @click="filter_comments(0)" :type="levelList[0].class_type"  size="small">全部{{levelList[0].value}}</van-button></van-col>
					<van-col span="6"><van-button @click="filter_comments(1)" :type="levelList[1].class_type" size="small">好评{{levelList[1].value}}</van-button></van-col>
					<van-col span="6"><van-button @click="filter_comments(2)" :type="levelList[2].class_type" size="small">中评{{levelList[2].value}}</van-button></van-col>
					<van-col span="6"><van-button @click="filter_comments(3)" :type="levelList[3].class_type" size="small">差评{{levelList[3].value}}</van-button></van-col>
				</van-row>	       
		    </van-cell>
		</van-cell-group>
	    <div class="gc-item gc-item-fit-add-spec" v-for="item in dataList"> 
	        <div class="gc-top"> 
		        <div class="gc-avatar-wrapper"> 
		           <img class="gc-avatar" :src="item.headPic" /> 
		        </div> 
		        <div class="gc-info"> 
		          	<div class="gc-name">{{item.accountName}}</div> 
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
	    <div class="noMoreData">
	    	<span  v-show="busy">{{this.config.msgNoMoreData}}</span>
	    </div>
	</div>
</template>
<script>
export default{
  mounted () {
    this.$store.dispatch('hideNav') // 隐藏 底部导航栏
    this.loadComment()
  },
  data () {
    return {
      params: {page: 0, level: null},
      busy: false,
      commentCount: null,
      commentScoreRate: '',
      dataList: [],
      levelList: [{'value': 1002, 'class_type': 'danger'}, {'value': 554, 'class_type': 'default'}, {'value': 1002, 'class_type': 'default'}, {'value': 554, 'class_type': 'default'}]
    }
  },
  methods: {
    go_back () {
      this.$router.go(-1)
    },
    // 商品评论数据
    loadComment () {
      this.page = 0
      var productId = this.$route.params.id
      this.$axios.get('/product?comments&page=' + this.page + '&productId=' + productId, this.params, r => {
        this.dataList = r.data.datas
        this.commentCount = r.data.commentCount
        this.commentScoreRate = r.data.commentScoreRate
      })
    },
    // 加载更多
    loadMore () {
      if (this.page === 0) {
        return
      }
      this.page++
      var productId = this.$route.params.id
      this.$axios.get('/product?comments&page=' + this.page + '&productId=' + productId, this.params, r => {
        this.dataList = this.dataList.concat(r.data.datas)
        if (r.data.lastPage) {
          this.busy = true
        }
      })
    },
    filter_comments (type) {
      for (var i = 0; i < this.levelList.length; i++) {
        if (type > 0) {
          this.params.level = type - 1
        }
        this.levelList[i].class_type = 'default'
      }
      this.levelList[type].class_type = 'danger'
      this.loadComment()
    }
  }
}
</script>
<style scoped>
	@import '../../assets/css/product_detail.css'
</style>
