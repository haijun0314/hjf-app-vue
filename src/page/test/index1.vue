<template>
  <div>
    <Header></Header>
		 <mobile-tear-sheet>
		  <mu-list>
		    <mu-list-item  v-for="i in list">
		    	 <time v-text="$utils.goodTime(i.create_at)"></time>
		      <span slot="describe">
		      <router-link :to="'/content/' + i.id">{{ i.title }}</router-link></span> 
		    </mu-list-item>
		    
		  </mu-list>
		</mobile-tear-sheet>   
    
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
export default {
  components: { Header, Footer },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('topics', null, r => {
        this.list = r.data
      })
    }
  }
}
</script>