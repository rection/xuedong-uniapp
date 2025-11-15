<template>
  <view class="navbar-container" :style="{ paddingTop: safeAreaTop + 'px' }">
    <view style="height: 20px;"></view>
    <view class="navbar-content">
      <view class="nav-left" @click="drawerStore.openLeft()">
        <uni-icons type="bars" size="26" color="#333"></uni-icons>
      </view>
      
      <view class="nav-center">
        <text>{{ title }}</text>
      </view>
      
      <view class="nav-right" @click="drawerStore.openRight()">
        <uni-icons type="person-filled" size="26" color="#333"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useDrawerStore } from '@/stores/drawer.js';
// 获取屏幕边界信息，用于适配刘海屏
const { safeAreaInsets } = uni.getSystemInfoSync();
const safeAreaTop = safeAreaInsets.top;

const drawerStore = useDrawerStore();
defineProps({
	title:{
		type:String,
		default:''
	}
})

</script>

<style lang="scss" scoped>
.navbar-container {
  background-color: #ffffff;
  border-bottom: 1px solid #ebebeb;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px; /* 导航栏标准高度 */
  padding: 0 15px;
}

.nav-left, .nav-right {
  width: 40px;
  display: flex;
  align-items: center;
}

.nav-right {
  justify-content: flex-end;
}

.nav-center {
  // flex: 1; // 取消注释以使其居中
  font-size: 16px;
  font-weight: bold;
}
</style>