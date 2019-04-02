<template>
    <div class="wrapper">
        <div class="registerWrapper">
            <div class="title">
                <span>{{title}}</span>
            </div>
            <form class="form-wrapper" @submit.prevent="handleRegisterSubmit" autocomplete="off">
                <div class="ubox ">
                    <p>用户名</p>
                    <input type="text" v-model="user" maxlength="11" name="user" placeholder="请输入用户名" class="Input">
                </div>
                <div class="ubox">
                    <p>密码</p>
                    <input type="password" placeholder="请输入密码" name="upwd" class="Input" v-model="upwd">
                </div>
                <div class="ubox">
                    <p>确认密码</p>
                    <input type="password" placeholder="请确认输入密码" name="urepwd" class="Input" v-model="urepwd">
                </div>
                <div class="ubox">
                    <p>手机号码</p>
                    <input type="text" v-model="utel" maxlength="11" name="utel" placeholder="请输入手机号码" class="Input">
                </div>
                <div class="ubox">
                    <p>邮箱</p>
                    <input type="email" placeholder="请输入邮箱" name="uemail" class="Input" v-model="uemail">
                </div>
                <button :class="{registerBtn:!isReady,readyRegister:isReady}">注册</button>
            </form>
            <div class="hasAccount" @click="handleHasAccount">已有账号，立即登录 <img src="http://47.107.55.178/gjy/img/registerORlogin/into@2x.png"></div>
            <!--<div class="bottomImg">-->
            <!--<img src="http://47.107.55.178/gjy/img/registerORlogin/bottom@2x.png">-->
            <!--</div>-->
        </div>

    </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {
        title: '注册', // 主要标题
        user: '',
        uemail: '',
        utel: '', // 手机号码
        utelIs: false, // 判断手机号是否合法
        upwd: '', // 密码
        upwdIs: false, // 判断密码是否合法
        urepwd: '',
        isKeyBoard: true, // input获取焦点,键盘挤压
        disabled: true,
        timer: null
      }
    },
    methods: {
      show () {
        console.log('点击成功')
      },
      handleBackClick () {
        this.$router.go(-1)
      },
      handleRegisterSubmit () { // 进行用户注册
        if (!this.utelIs) { // 手机号码,验证码和密码合法性提示
          this.$toast.bottom('手机号码不合法')
          return
        }
        if (this.upwd !== this.urepwd) {
          this.$toast.bottom('两次密码不一致')
          return
        }
        if (!this.upwdIs) {
          this.$toast.bottom('密码不合法')
          return
        }
        let newUser = {
          'id': this.user,
          'pwd': this.upwd,
          'phone': this.utel,
          'mail': this.uemail
        }
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8800/user',
          data: newUser,
          success: function (data) {
            console.log(this)
            this.handleRedirectToLogin()
            console.log('添加成功')
          }.bind(this),
          error: function (err) {
            console.error(err)
          }
        }).bind(this)
      },
      handleRedirectToLogin () { // 注册成功跳转到登录页面
        this.$router.push({name: 'Login'})
      },
      handleHasAccount () {
        this.$router.push({name: 'Login'}) // 点击已经有账号时候,跳转到登录页面
      }
    },
    watch: {
      utel (value) {
        if (/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value)) {
          this.utelIs = true
          this.disabled = false
          return false
        } else {
          this.disabled = true
        }
      },
      upwd (value) {
        if (/^[a-z0-9_-]{6,18}$/.test(value)) {
          this.upwdIs = true
        } else {
          this.upwdIs = false
        }
      }

    },
    computed: {
      isReady () {
        if (this.utelIs && this.upwdIs) {
          return true
        } else {
          return false
        }
      }
    },
    mounted () {

    }
  }
</script>

<style lang="less" scoped>
    .wrapper{
        width: 100%;
        display: flex;
        justify-content: center;
        .registerWrapper{
            margin-top: 120px;
            .title{
                text-align: center;
            }
            .form-wrapper{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 320px;
                /*border: 1px solid green;*/
                .ubox{
                    height: 30px;
                    line-height: 30px;
                    display: flex;
                    width: 250px;
                    flex-direction: row;
                    border-radius: 30px;
                    padding-left: 15px;
                    /*border: 1px solid red;*/
                    background: white;
                    p{  width:54px;
                        text-align: left;
                        display: flex;
                        align-items: flex-end;
                        font-size: 12px;
                    }
                    .Input{
                        /*margin-left: 18px;*/
                        border:none;
                        box-sizing: border-box;
                        font-size: 14px;
                    }

                }
                .registerBtn {
                    @h: 34px;
                    height: @h;
                    line-height: @h;
                    background: rgba(242, 136, 118, 1);
                    font-family: PingFangSC-Regular;
                    border-radius: 17px;
                    font-size: 18px;
                    text-align: center;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    border: none;
                }
                .readyRegister { //准备好登录时候的按钮样式
                    @h: 34px;
                    height: @h;
                    line-height: @h;
                    background: #F72300;
                    font-family: PingFangSC-Regular;
                    border-radius: 17px;
                    font-size: 18px;
                    text-align: center;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    border: none;
                }
            }
            .hasAccount{
                text-align: center;
                color:#f72300;
                display: flex;
                flex-direction: row;
                justify-content: center;
                img{
                    align-self: center;
                    margin-left: 4px;
                    height: 16px;
                    line-height: 16px;
                }
            }
        }

    }
</style>
