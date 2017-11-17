<template>
	<div class="my_l">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">hjf登录</h3>
		</header>
    <div class="Login-Body">
        <mu-appbar :title="Title_Data" class="Top-Class" titleClass="titleClass">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne" />
        </mu-appbar>
        <div class="input-class">
            <mu-paper v-bind:class="['demo-paper-two',{'demo-paper-one': UserIcon}]" circle :zDepth="3">
                <mu-avatar v-if="this.$route.path === '/loginpassword'" v-bind:class="[{'Login-Button-Two': UserIcon}]" :src="User_Datas.icon + User_Datas.id" />
                <mu-avatar v-else v-bind:class="[{'Login-Button-Two': UserIcon}]" src="http://image.heitem.com/20170831150415275915317.png" />
            </mu-paper>
            <mu-sub-header v-show="Welcome" style="color:#ff5252">{{Welcome}}</mu-sub-header>
            <mu-sub-header style="color:#fff">{{Welcome_Bottom}}</mu-sub-header>
            <mu-text-field v-show="PhoneInputShow" iconClass="Phone-Input" style="color:#fff" :label="phoneLaBel" v-model="PhoneValue" @change="PhoneLaBel" type="number" icon="phone_iphone" labelFloat fullWidth/>
            <router-view></router-view>
            <mu-raised-button @click="login()" :label="LoginBtn" v-bind:class="['Login-Button-One',{'Login-Button-Two': LoginEnd}]" secondary fullWidth/>
        </div>  
        <mu-snackbar v-if="toast" message="请输入正确手机号(demo输入11位即可)" action="确定" @actionClick="hideToast" @close="hideToast"/>
    </div>		
		
		<main class="user_login_box">
		    <div class="login_dialog">
		        <div class="_username">
		            <input type="text" name="username" placeholder="请输入用户名" class="user_input" v-model="userName"/>
		        </div>
		        <div class="_username u_passwd">
		            <input type="password" name="password" placeholder="请输入密码" class="user_input" v-model="passWord"/>
		        </div>

		        <div class="login_box">
		            <a @click="goLogin()" class="btn_login">登录</a>
		        </div>
		        <div class="go_reg_box">
		            <router-link tag="span" to="/register">快速注册</router-link>
		        </div>
		    </div>
		</main>
	</div>
</template>
<script>
export default {
  data () {
    return {
      userName: '',
      passWord: ''
    }
  },
  methods: {
    goLogin () {
      alert(this.userName)
    }
  }
}
</script>
<style lang="less">
    .mu-text-field-content input{
        color: #fff;
    }
    .titleClass{
        text-align:center;
        font-size: 1.15em;
        margin-right: 15.2%;
    }
</style>
<style scoped lang="less">
    .Login-Body{
        background-color:#474a4f;
        height: 100vh;
    }
    .input-class{
        text-align:center;
        padding: 0 2em 0 1em;
        background-color:#474a4f;
    }
    .Phone-Input{
        color: #ffffff;
    }
    .top-button-icon{
        background-color:#474a4f;
        color: #ffffff;
    }
    .Login-Button-One{
        margin-top: 2em;
        width:96%;
        margin-left:4%;
    }
    .Login-Button-Two{
        display: none;
    }
    .demo-paper-two {
        display: inline-block;
        height: 100px;
        width: 100px;
        margin: 20px;
        text-align: center;
        background-color: #474a4f;
    }
    .demo-paper-one{
        display: inline-block;
        height: 100px;
        width: 100px;
        margin: 20px;
        text-align: center;
        background-color: #474a4f;
        display: none;
    }
    .demo-paper-two .mu-avatar{
        height: 100px;
        width: 100px;
    }
    .mu-sub-header{
        line-height: 1.5em !important;
        padding: 0em 0 1em 0;
        font-size: 1em;
    }
</style>