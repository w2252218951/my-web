<template>
    <div class="wrapper">
        <div class="loginWrapper">
            <div class="title">
                <span>{{title}}</span>
            </div>
        <!--<div class="logo"><img src="http://47.107.55.178/gjy/img/registerORlogin/logo@2x.png"></div>-->
            <form class="form-wrapper" @submit.prevent="handleLogin" autocomplete="off">
                <div class="ubox ">
                    <p>用户名</p>
                    <input type="text" maxlength="11" v-model="utel" name="utel" placeholder="请输入用户名" class="Input"/>
                </div>
                <div class="ubox ">
                    <p>密码</p>
                    <input type="password" maxlength="18" placeholder="请输入6-18位密码" name="upwd" class="Input" v-model="upwd"/>
                </div>
                <button :class="{loginBtn:!isReady,readyLogin:isReady}">登录</button>
            </form>
            <div class="registerOrResetPwd">
                <div>
                    <span>没有账号,</span>      <!--register  命名路由,查看注册模块-->
                    <router-link :to="{name:'Register'}" class="registerLink link">立即注册</router-link>
                </div>                          <!--resetPassword  命名路由,跳转重置密码页面,现在未开发-->
                <!--:to="{name: resetPassword}"-->
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        title: '登录',
        utel: '', // 账号
        upwd: '', // 密码
        utelIs: false, // 账号是否符合规则
        upwdIs: false, // 密码是否符合规则
        isShow: false // 解决浏览器自动填充问题
      }
    },
    methods: {
      handleBackClick () {
        this.$router.go(-1)
      },
      handleLogin () {
        if (this.isReady) { // 判定手机号码和密码前端校验通过,准备传递的参数
          let timeStamp = new Date().getTime()
          let sysaccesstoken = this.$md5('C65767C56FBC8CA70B2F1DDAC16CAC9B' + timeStamp) // md5模块已经在main.js中配置了
          let params = this.$qs.stringify({
            Password: this.upwd
          })
          this.axios({
            method: 'post',
            url: 'http://gjy.dhgjcloud.com/customize/control/login2', // 绝对路径是由于接口在两台服务器上
            data: params
          }).then(this.handleLoginGetData.bind(this))
        } else {
          this.$toast.bottom('手机号或密码不合法')
          return false
        }
      }, // 解决input获取焦点,输入法键盘挤压定位在底部的盒子

      handleLoginGetData (response) {
        let res = response.data
        if (res.tag !== 'Success') {
          this.$toast.bottom(res.message)
        } else {
          this.$toast.bottom('登陆成功')
          let userInfo = encodeURIComponent(JSON.stringify(res))
          localStorage.setItem('userInfo', userInfo) // 用户信息过长,cookie无法保存
          this.$cookies.set('sessionid', encodeURIComponent(res.sessionid)) // 对返回的sessionId进行独立的编码保存,失效时间默认30天
          setTimeout(this.handleRedirectToHome.bind(this), 1000)
        }
      },
      handleRedirectToHome () {
        this.$router.push({name: 'home'}) // 注意this指向
      }
    },
    watch: {
      utel (value) {
        if (/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value)) {
          this.utelIs = true
        } else {
          this.utelIs = false
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

    }

  }
</script>

<style lang="less" scoped>
    .wrapper{
        width: 100%;
        display: flex;
        justify-content: center;
        .loginWrapper{
            margin-top: 120px;
            .title{
                text-align: center;
            }
            .form-wrapper{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 250px;
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
                    }
                    .Input{
                        /*margin-left: 18px;*/
                        border:none;
                        box-sizing: border-box;
                        font-size: 14px;
                    }

                }
                .loginBtn {
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
                .readyLogin { //准备好登录时候的按钮样式
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
            .registerOrResetPwd{
                .link{
                    color: #F72300;
                }
            }
        }

    }
</style>

