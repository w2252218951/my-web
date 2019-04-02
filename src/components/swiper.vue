<template>
    <div class="swiper" :style="swiperSize">
        <!--显示图片-->
        <ul class="swiper-ul" :style="listWrapper" @transitionend="setDuration" >
            <!--通过异步接收传入过来的data中的数据-->
            <li class="swiper-list" v-for="(item,index) in data" :key="index">
                <!--链接要绑定 : -->
                <a :href="item.href">
                    <img :style="swiperSize" :src="item.imgUrl" alt="">
                </a>
            </li>
            <li v-if="data.length > 1" class="swiper-list" :key="data.length + 1">
                <!--链接要绑定 : -->
                <!--此时是在空数组中拿值-->
                <a :href="data[0].href">
                    <img :style="swiperSize" :src="data[0].imgUrl" alt="">
                </a>
            </li>
        </ul>
        <!--切换按钮-->
        <ul class="swiper-pagination">
            <!-- changeImg(index) 是传入当前的索引值 -->
            <li v-for="(item,index) in data" @click="changeImg(index)" :class="{'active': activeIndex === index }" :key="index"></li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'swiper',
    props: {
      data: {
        type: Array,
        default () {
          return []
        },
      },
        height: {
          // 引入时不去设置值 就拿默认值直接赋值
          type: Number,
          default: 500
        },
        width: {
          type: Number,
          default: 1240
        },
        delay: {
          type: Number,
          default: 5000
        }
    },
    computed: {
      swiperSize () {
        return {
          // 传入的宽度
          width: `${this.width}px`,
          height: `${this.height}px`
        }
      },
      listWrapper () {
        return {
          // 当前数据的长度 * 当前的宽度 就是总宽度 因为是内联模块 在其后加上了一个li标签
          width: `${(this.data.length + 1) * this.width}px`,
          height: `${this.height}px`,
          // 从右往左所以是个负值
          transform: `translateX(-${this.activeIndex * this.width}px)`,
          // 通过判断haveDuration的真假进行判断
          transitionDuration:  this.haveDuration ? ".3s" : ""
        }
      }
    },
    data () {
      return {
        activeIndex: 0,
        timer: null,
        //  阈值 控制是否有滑动效果
        haveDuration: true
      }
    },
    mounted () {
      this.setTimer();
    },
    methods: {
      setTimer () {
        // 设置定时器 自动滚动   每次挂载清除一次
        clearInterval(this.timer) ;
        this.timer = setInterval(() => {
          if (this.activeIndex === (this.data.length )) {
            this.activeIndex = 0
            this.haveDuration = false;
          } else {
            this.activeIndex++;
            this.haveDuration = true;
          }
        } , this.delay)
      },
      changeImg(index) {
        this.activeIndex = index
        this.haveDuration = true;
      },
      setDuration() {
        if (this.activeIndex === this.data.length) {
          this.activeIndex = 0;
          this.haveDuration = false;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .swiper{
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        .swiper-ul{
            /* 因为内联样式本身就存在在空隙  可以通过样式进行清除*/
            font-size: 0;
        }
        .swiper-list{

            display: inline-block;

        }
        .swiper-pagination{
            position: absolute;
            left: 30%;
            bottom: 20px;

            li{
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin:0 5px;
                background-color: #fff;
                /*手指的标志*/
                cursor: pointer;
                &.active{
                    background: transparent;
                    border: 1px solid #fff;
                }
            }
        }
    }
</style>
