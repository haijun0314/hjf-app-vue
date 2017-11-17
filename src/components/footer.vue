<template>
	<mu-paper class="bottom-Nav-Class">
	    <mu-bottom-nav :value="bottomNav" @change="handleChange">
	        <mu-bottom-nav-item value="home" title="首页" icon="home" to="/home" />
	        <mu-bottom-nav-item value="exhibition" title="分类" icon="collections" to="/exhibition" />
	        <mu-float-button icon="add" @click="PuBliSh" />
	        <mu-bottom-nav-item value="more" title="购物车" icon="explore" to="/cart"  />
	        <mu-bottom-nav-item value="user" title="我的" icon="account_circle" />
	    </mu-bottom-nav>
	</mu-paper>
</template>
<style lang="less">
    .mu-bottom-item-active .mu-buttom-item-wrapper .mu-bottom-item-icon,.mu-bottom-item-active .mu-buttom-item-wrapper .mu-bottom-item-text{
        color: #ff5252;
    }
</style>

<style scoped lang="less">
    .bottom-Nav-Class{
        position:fixed;
        width: 100%;
        bottom: 0;
        table-layout: fixed;
    }
    .mu-bottom-nav{
        background-color: #474a4f;
    }
   
    .mu-buttom-item{
        color: #fff;
    }
</style>