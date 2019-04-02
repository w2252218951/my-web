<template>
    <div class="wrapper">
        <div class="ad-left">
            <a :href="data[0] && data[0].href">
                <img class="ad-img" :src="data[0] && data[0].imgUrl" alt="">
            </a>
        </div>
        <div  class="adRightWrapper">
            <div class="ad-right-top">
                <a :href="data[1] && data[1].href">
                    <img class="ad-img" :src="data[1] && data[1].imgUrl" alt="">
                </a>
            </div>
            <div class="adRightBottom">
                <div class="ad-right-bottom">
                    <a :href="data[2] && data[2].href">
                        <img class="ad-img" :src="data[2] && data[2].imgUrl" alt="">
                    </a>
                </div>
                <div>
                    <a :href="data[3] && data[3].href">
                        <img class="ad-img" :src="data[3] && data[3].imgUrl" alt="">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'adList',
    // 从父组件传递的数据
    props: {
      data: {
        type: Array,
        default () {
          return [];
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .wrapper{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .ad-left{
            width: 615px;
            height: 450px;
        }
        .adRightWrapper{
            width: 615px;
            height: 450px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .ad-right-top{
                width: 616px;
                height: 220px;
            }
            .adRightBottom{
                width: 616px;
                height: 220px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .ad-right-bottom{
                    width: 303px;
                    height: 220px;
                }
            }
        }
    }
    .ad-img{
        width: 100%;
        height: 100%;
    }
</style>
