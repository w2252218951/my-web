<template>
    <div class="wrapper">
        <div class="loginWrapper">
            <div class="title">
                <span>{{title}}</span>
            </div>
        <!--<div class="logo"><img src="http://47.107.55.178/gjy/img/registerORlogin/logo@2x.png"></div>-->
            <form class="form-wrapper"  @submit.prevent="handleLogin" autocomplete="off">
                <div class="ubox ">
                    <p>用户名</p>
                    <input type="text"  v-model="user" name="user" placeholder="请输入用户名" class="Input"/>
                </div>
                <div class="ubox ">
                    <p>密码</p>
                    <input type="password" maxlength="18" placeholder="请输入6-18位密码" name="upwd" class="Input" v-model="upwd"/>
                </div>
                <button class=readyLogin>登录</button>
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
  import axios from 'axios'
  export default {
    name: 'Login',
    data () {
      return {
        title: '登录',
        user: '', // 账号
        upwd: '', // 密码
        isShow: false, // 解决浏览器自动填充问题
        userData: []
      }
    },
    mounted () {
        this.getUserData()
    },
    methods: {
      async getUserData () {
        const { data } = await axios.get('/api/user')
        // console.log(data)
        this.userData = data
        console.log(data)
      },
      handleBackClick () {
        this.$router.go(-1)
      },
      handleLogin () {
        this.userData.forEach(item => {
          console.log(item.id)
          if (item.username === this.user && item.pwd === this.upwd) {
            this.$toast.bottom('登录成功')
            this.handleRedirectToHome()
          } else {
            this.$toast.bottom('账号或者密码错误')
          }
        })
      }, // 解决input获取焦点,输入法键盘挤压定位在底部的盒子

      handleRedirectToHome () {
        this.$router.push({ name: 'Index'}) // 注意this指向
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
