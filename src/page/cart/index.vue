<template>
    <mu-grid-list class="gridlist-inline-demo">
      <mu-grid-tile v-for="tile, index in list" :key="index">
        <img :src="tile.image"/>
      </mu-grid-tile>
    </mu-grid-list>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        image: 'http://47.94.205.255:8082//uploadFile/product/tejia001.jpg',
        title: 'Breakfast',
        author: 'Myron',
        featured: true
      }, {
        image: 'http://47.94.205.255:8082//uploadFile/product/tejia002.jpg',
        title: 'Burger',
        author: 'Linyu'
      }, {
        image: 'http://47.94.205.255:8082//uploadFile/product/tejia003.jpg',
        title: 'Camera',
        author: 'ruolin'
      }, {
        image: 'http://47.94.205.255:8082//uploadFile/product/tejia002.jpg',
        title: 'Hats',
        author: 'kakali'
      }, {
        image: 'http://47.94.205.255:8082//uploadFile/product/tejia001.jpg',
        title: 'Honey',
        author: 'yuyang'
      }, {
        image: 'http://47.94.205.255:8082//uploadFile/product/tejia003.jpg',
        title: 'Morning',
        author: 'mokayi',
        featured: true
      }, {
        image: 'http://47.94.205.255:8082//uploadFile/product/tejia001.jpg',
        title: 'Vegetables',
        author: 'NUyyyyyyy'
      }, {
        image: 'http://47.94.205.255:8082//uploadFile/product/tejia003.jpg',
        title: 'water',
        author: 'TDDyyyyyyy'
      }]
    }
  }
}
</script>

<style>
.gridlist-inline-demo{
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>

