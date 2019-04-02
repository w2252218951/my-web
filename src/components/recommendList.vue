<template>
    <div>
        <div class="clearfix recommend-header">
            <h3 class="fl  title">推荐商品</h3>
            <div class="fr">
                <i class="icon-font icon-left pagination-item" :class="{'disabled': activeIndex === 0}" @click="prev"></i>
                <i class="icon-font icon-right pagination-item" :class="{'disabled': activeIndex === pageSize}" @click="next"></i>
            </div>
        </div>
        <div class="recommend-content">
            <ul  class="listWrapper" :style="listWrapper" >
                <li class="goodsList" v-for="(item,index) in data" :key="index">
                    <a :href="item.href">
                        <img :src="item.goodsUrl" alt="">
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
        </div>
    </div>
</template>

<script>

  export default {
    name: 'recommendList',
    props: {
      data: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        activeIndex: 0
      };
    },
    computed: {
      listWrapper () {
        return {
          width: `${(this.data.length) * 250}px`,
          transform: `translateX(-${this.activeIndex * 1240}px)`,
          // 通过判断haveDuration的真假进行判断
          transitionDuration:  ".3s"
        }
      },
      pageSize () {
        return Math.floor(this.data.length / 5);
      }
    },
    methods: {
      prev () {
        if (this.activeIndex === 0) return;
        this.activeIndex -= 1;
      },
      next () {
        if (this.activeIndex === this.pageSize) return;
        this.activeIndex += 1;
      }
    }
  }
</script>

<style lang="less" scoped>
    .recommend-header {
        margin: 30px auto 10px;
        .title{
            font-size: 30px;
            font-weight: 400;
        }
        .pagination-item{
            display: inline-block;
            width: 24px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
            color:#00c3f5;
            font-size: 12px;
            border:1px solid #00c3f5;
            &.disabled{
                color: #efefef;
                border-color: #dcdcdc;
            }
        }
    }
    .recommend-content {
        width: 1240px;
        background: #ffffff;
        overflow: hidden;
        .listWrapper{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
            .goodsList{
                width: 220px;
                background-color: #fff;
                cursor: pointer;
                transition:  all .3s ease;
                position: relative;
                margin-top: 10px;
                overflow: hidden;
                text-align: center;
                padding: 34px 0 15px;
                img{
                    height: 180px;
                    &:hover{
                        transform: scale(1.2);
                        transition: all 0.3s ;
                    }
                }
                &:hover{
                    box-shadow: 0 15px 30px rgba(0,0,0,.1);
                }
                .goodsName{
                    margin-top: 20px;
                    margin-bottom: 2px;
                    color: #555757;
                    font-style: 14px;
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
                    font-size: 16px;
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
    }
</style>
