<template>
  <view class="search-bar">
    <uni-icon type="search" class="icon-search" size="24"/>
    <input :value="searchValue" :type="text" confirm-type="search" placeholder="请输入搜索内容" @input="onInput" @confirm="onConfirm" class="uni-input"/>
    <uni-icon type="clear" class="icon-clear" size="24"/>
  </view>
</template>

<script>
import uniIcon from "@/components/uni-icon.vue";
export default {
  name: 'SearchBar',
  components: {
    uniIcon
  },

  data () {
    return {
      searchValue: ''
    }
  },

  created () {
    console.log("onCreated");
  },

  mounted () {
    console.log("mounted");
  },

  method: {
    
    // 输入
    onInput (evt) {
      this.emit('update:input', evt);
    },

    // 触发搜索的动作
    onConfirm (evt) {
      this.emit('update:confirm', evt);
    }
  }

}
</script>

<style lang="less">
  .search-bar {
    position: relative;
    left: 0;
    top: 0;

    display: flex;
    width: 100%;
    height: 100%;

    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;

    background:rgba(246,246,246,1);
    opacity:0.54;
    

    .icon-search {
      display: block;
      width: 35upx;
      height: 33upx;

      flex-basis: 0;
    }

    .icon-clear {
      display: block;
      width: 57.6upx;
      height: 38.8upx;

      flex-basis: 0;
    }

    .uni-input {
      display: block;
      flex-basis: auto;
    }

  }
</style>

