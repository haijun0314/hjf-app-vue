<!--
	作者：haijun
	时间：2017-10-27
	描述：顶部轮播图
-->
<template>
	<div class="home_ban">
		<div class="m_banner clearfix" id="my_banner">
            <ul class="banner_box">
                <li v-for= "car in carouses" ><img v-bind:src="car.pic"  /></li>
            </ul>
            <ul class="point_box" >
                <li v-for= "car in carouses"></li>
            </ul>
        </div>
	</div>
</template>
<script>
import {scrollPic} from '../../assets/js/index.js'
export default{
  data () {
    return {
      carouses: [] // 轮播图
    }
  },
  created () {
    // 加载主页顶部轮播图
    this.loadCarouses()
  },
  methods: {
    loadCarouses () {
      this.$axios.get('/market?carouses', null, r => {
        this.carouses = r.data.datas
        this.$nextTick(function () {
          scrollPic()
        })
      })
    }
  }
}
</script>