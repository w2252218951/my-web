<template>
    <div>
        <ul v-if="data.length > 0" class="listWrapper" >
            <li @click="clickItem(item)" class="goodsList" v-for="(item,index) in data" :key="index">
                <a :href="item.href">
                    <images-list :data="item.colorImageUrls"></images-list>
                    <div class="goodsName">{{item.goodsName}}</div>
                    <div class="goodsDesc">{{item.goodsDesc}}</div>
                    <div class="goodsPrice">
                        <i>￥</i>
                        {{item.goodsPrice}}
                        <span class="lower" v-if="item.lower">&nbsp;起</span>
                        <span  class="goodsOldPrice" v-if="item.oldPrice">{{item.oldPrice}}</span>
                    </div>
                </a>
                <div v-if="item.newProduct" class="goodsNew">新品</div>
            </li>
        </ul>
        <div v-else  class="clearfix empty">
            <div class="fl empty-bg"></div>
            <div class="fr empty-desc">
                <div class="title">抱歉没有找到相关商品</div>
                <p>
                    建议您: <br>
                    1.适当减少筛选条件 <br>
                    2.尝试其他条件
                </p>
            </div>
        </div>
    </div>

</template>

<script>
    import imagesList from './imagesList';
  export default {
    name: 'categoryList',
    components: {
      imagesList
    },
    props: {
      data: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    methods: {
      clickItem (item) {
        // 在分类列表页进行使用
        this.$emit('clickItem',item)
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
        height: 416px;
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
        margin-bottom: 2px;
        color: #333333;
        font-style: 16px;
    }
    .goodsDesc{
        font-style: 12px;
        color:#999;
    }
    .goodsPrice{
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: baseline;
        /*padding-left: 14px;*/
        font-size: 18px;
        color:#c00;
    i{
        font-style: normal;
        font-size: 14px;
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 0px;*/
    }
    .lower{
        font-size: 16px;
    }
    .goodsOldPrice{
        text-decoration: line-through;
        color:#666;
        font-size: 12px;
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
    .empty{
        width: 335px;
        margin: 120px auto 300px;
        .empty-bg{
            background: url("../assets/images/xiongmao.png") no-repeat;
            width: 105px;
            height: 135px;
            margin-right: 30px;
        }
        .empty-desc{
            width: 200px;
        }
        .title{
           font-size: 18px;
            color: #00c3f5;
            margin: 15px auto;
        }
    }
</style>
