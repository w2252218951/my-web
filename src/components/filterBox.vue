<template>
   <ul class="filter-box">
       <li class="box-item clearfix" v-for="(item,index) in data" :key="index">
           <div class="fl filter-title">
                {{item.name}}:
           </div>
           <ul class="fl">
               <li class="filter-item fl"  :class="{'active': activeFilter[item.key] === info.value }" v-for="(info,li) in item.queryList" :key="li" @click="changeFilter(item.key,info.value)">
                   {{info.name}}
               </li>
           </ul>
       </li>
   </ul>
</template>

<script>
  export default {
    name: 'filterBox',
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        activeFilter: {}
      }
    },
    methods: {
      // key 为品牌 value 为尺寸
      changeFilter (key,val) {
        // this.activeIndex[key] = val;
        this.$set(this.activeFilter,key,val);
        this.$emit('filter',this.activeFilter);
      }
    }
  }
</script>

<style  lang="less" scoped>
    .filter-box{
        background: #fff;
        padding: 15px 10px;
        border:1px solid #efefef;
        .box-item{
            line-height: 46px;
        }
        .filter-title{
            width: 85px;
            padding-left: 10px;
            /*  不换行  不管有多少字*/
            white-space: nowrap;
            color:#333;
            overflow: hidden;
        }
        .filter-item{
            cursor: pointer;
            margin-right: 62px;
            &.active{
                color:#00c3f5;
            }
        }
    }
</style>
