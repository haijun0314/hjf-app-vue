<!--
	作者：haijun
	时间：2017-10-27
	描述：主页组件视图
-->
<template>
	<div class="home" >
		<div class="m_layout">
            <!-- 头部区 -->
            <HomeHeaderView></HomeHeaderView>
            <!-- 轮播图-->
            <HomeBannerView></HomeBannerView>
            <!--导航-->
            <HomeNavView></HomeNavView>
            <!--商品区-->
            <HomeMainView></HomeMainView>
        </div>
	</div>
</template>
<script>
import HomeHeaderView from '../page/home/homeHeader.vue'
import HomeBannerView from '../page/home/homeBanner.vue'
import HomeNavView from '../page/home/homeNav.vue'
import HomeMainView from '../page/home/homeMain.vue'
import {bindEvent} from '../assets/js/index.js'
export default {
  components: {HomeHeaderView, HomeBannerView, HomeNavView, HomeMainView},
  data () {
    return {
      bottomNav: 'home'
    }
  },
  mounted () {
    bindEvent()
  }
}
</script>

