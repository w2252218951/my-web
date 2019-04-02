<template>
   <ul  class="listWrapper" >
       <li class="goodsList" v-for="(item,index) in data" :key="index">
           <a :href="item.href">
               <img class="goodsImg" :src="item.goodsUrl" alt="">
               <div class="goodsName">{{item.goodsName}}</div>
               <div class="goodsDesc">{{item.goodsDesc}}</div>
               <div class="goodsPrice">
                   <i>￥</i>
                   {{item.goodsPrice}}
                   <span class="lower" v-if="item.lower">起</span>
                   <span  class="goodsOldPrice" v-if="item.oldPrice">{{item.oldPrice}}</span>
               </div>
           </a>
           <div v-if="item.newProduct" class="goodsNew">新品</div>
       </li>
   </ul>
</template>

<script>
  export default {
    name: 'goodList',
  //  论文
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
    .listWrapper{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        .goodsList{
            width: 303px;
            height: 400px;
            background-color: #fff;
            cursor: pointer;
            transition:  all .3s ease;
            position: relative;
            margin-top: 10px;
            overflow: hidden;
            text-align: center;
            &:hover{
                box-shadow: 0 15px 30px rgba(0,0,0,.1);
            }
            .goodsImg{
                height: 230px;
                margin-top: 30px;
            }
            .goodsName{
                margin-top: 30px;
                margin-bottom: 2px;
                color: #333333;
                font-style: 16px;
            }
            .goodsDesc{
                font-style: 14px;
                color:#999;
            }
            .goodsPrice{
                position: relative;
                display: inline-block;
                padding-left: 14px;
                font-size: 22px;
                color:#c00;
                i{
                    font-style: normal;
                    font-style: 14px;
                    position: absolute;
                    left: -5px;
                    top: 0px;
                }
                .lower{
                    font-size: 16px;
                }
                .goodsOldPrice{
                    text-decoration: line-through;
                    color:#666;
                    font-size: 14px;
                    margin-left: 8px;
                }
            }
            .goodsNew{
                position: absolute;
                left: 30px;
                top: 30px;
                width: 60px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                border-radius: 50%;
                /*渐变色*/
                background: linear-gradient(120deg,#2e74f6,#56bdf9);
                color:#fff;
            }
        }
    }

</style>
