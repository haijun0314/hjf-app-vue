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
					<van-col span="6"><van-button @click="filter_comments('all')" :type="levelList.all.class_type"  size="small">全部{{levelList.all.value}}</van-button></van-col>
					<van-col span="6"><van-button @click="filter_comments('good')" :type="levelList.good.class_type" size="small">好评{{levelList.good.value}}</van-button></van-col>
					<van-col span="6"><van-button @click="filter_comments('normal')" :type="levelList.normal.class_type" size="small">中评{{levelList.normal.value}}</van-button></van-col>
					<van-col span="6"><van-button @click="filter_comments('bad')" :type="levelList.bad.class_type" size="small">差评{{levelList.bad.value}}</van-button></van-col>
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
      levelList: {'all': {'value': 1002, 'class_type': 'danger'}, 'good': {'value': 554, 'class_type': 'default'}, 'normal': {'value': 1002, 'class_type': 'default'}, 'bad': {'value': 554, 'class_type': 'default'}}
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
      if (type === 'all') {
        this.params.level = null
        this.levelList.all.class_type = 'danger'
      } else {
        this.levelList.all.class_type = 'default'
      }
      if (type === 'good') {
        this.params.level = 0
        this.levelList.good.class_type = 'danger'
      } else {
        this.levelList.good.class_type = 'default'
      }
      if (type === 'normal') {
        this.params.level = 1
        this.levelList.normal.class_type = 'danger'
      } else {
        this.levelList.normal.class_type = 'default'
      }
      if (type === 'bad') {
        this.params.level = 2
        this.levelList.bad.class_type = 'danger'
      } else {
        this.levelList.bad.class_type = 'default'
      }
      this.loadComment()
    }
  }
}
</script>
<style scoped>
	@import '../../assets/css/product_detail.css'
</style>
