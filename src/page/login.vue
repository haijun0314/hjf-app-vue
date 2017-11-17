<template>
    <div>
        <mu-appbar title="账户登录"  titleClass="common_bar_title">
            <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="go_back()" />
        </mu-appbar>
        <div class="login_logo">
        	<img  src="../assets/images/logo.png" />
        </div>
        <div class="login_input">
            <mu-text-field   label="请输入您的手机号" @input="login_params_watch()"  v-model="params.telephone"   type="number"   icon="phone_iphone" labelFloat fullWidth/>
            <mu-text-field   label="请输入登陆密码"   @input="login_params_watch()"  v-model="params.password"    type="password" icon="lock_outline" labelFloat fullWidth/>
        </div>  
        <mu-raised-button @click="login()" label="登录" class="login_btn" secondary fullWidth :disabled="login_btn_disabled" />
        <div>
			<mu-flexbox class="login_btn_other">
			    <mu-flexbox-item >
			      <mu-flat-button label="没有账号？立即注册" />
			    </mu-flexbox-item>
			    <mu-flexbox-item  >
			      <mu-flat-button label="忘记密码" />
			    </mu-flexbox-item>
			  </mu-flexbox> 
        </div>		        
    </div>
</template>

<script>
export default {
  data () {
    return {
      login_btn_disabled: true,
      params: {},
      userInfo: ''
    }
  },
  methods: {
    go_back () {
      this.$router.go(-1)
    },
    login () {
      console.log(this.$store.userInfo)
      this.$axios.get('/app/login?weblogin', this.params, res => {
        if (res.data.success) {
          this.userInfo = res.data.userToken
          window.sessionStorage.userInfo = this.userInfo.userToken
          this.$store.dispatch('setUserInfo', this.userInfo)
          console.log(this.$store.userInfo)
        } else {
          this.$toast(res.data.msg)
        }
      })
    },
    login_params_watch () {
      if (this.params.telephone && this.params.password) {
        this.login_btn_disabled = false
      } else {
        this.login_btn_disabled = true
      }
    }
  },
  watch: {
  }
}
</script>
 <style>
	@import '../assets/css/login.css'
</style>