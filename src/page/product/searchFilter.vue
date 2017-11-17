<!--
	作者：haijun
	时间：2017-11-02
	描述：商品搜索页面
-->
<template>
	<div>
		<div class="mjd-popCover new-filtrate">
	        <div class="index-ofyauto">
	        	<div class="top-block"> 
		            <!-- 价格区间筛选-->
		            <div class="title-line1 "> 
		            	<span class="title">价格区间</span> 
		            </div> 
					<div class="price-section">         
						<div class="from-to">             
							<input  class="J_ping" id="minPrice" name ="minPrice" type="number"  pattern="[0-9]*" placeholder="最低价" v-model="params.minPrice">             
								<span></span>             
							<input  class="J_ping" id="maxPrice" name="maxPrice"  type="number"   pattern="[0-9]*" placeholder="最高价" v-model="params.maxPrice">         
						</div>     
					</div>
		            <!-- 分类筛选-->
		            <div class="title-line1 "> 
		            	<span class="title">分类</span> 
		            </div> 
		            <div class="address-btns"> 
			            <div   v-for="cat in categorys" >
			                <span @click='params_init(0,cat.categoryId)'>{{cat.categoryName}}</span>
			            </div>
		            </div> 
	           	   <!-- 品牌筛选-->
		           <div class="title-line1 "> 
		            	<span class="title">品牌</span> 
		           </div> 
		           <div class="address-btns"> 
			            <div   v-for="brand in brands" >
			             	<span @click='params_init(1,brand.brandId)'>{{brand.brandName}}</span>
			            </div>
		           </div> 
	         </div>
	        </div>
			<div class="index-bnts">	
	            <mu-raised-button label="取消"/>
    			<mu-raised-button label="确定"  secondary @click="search_filter_confirm()"/>
    		</div>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      categorys: [],
      brands: [],
      params: {}
    }
  },
  mounted () {
    this.$axios.get('/product?categorys', null, r => {
      this.categorys = r.data.datas
    })
    this.$axios.get('/product?brands', null, b => {
      this.brands = b.data.datas
    })
  },
  methods: {
    search_filter_confirm () {
      this.$emit('search_filter_status', this.params)
    },
    params_init (type, value) {
      if (type === 0) {
        this.params.categoryId = value
      } else {
        this.params.brandId = value
      }
    }
  }
}
</script>
<style scoped>
	@import '../../assets/css/search-filter.css'
</style>
