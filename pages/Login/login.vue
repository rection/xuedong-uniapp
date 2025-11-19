<template>
  <view class="login-container">
    <view class="logo-area">
      <text class="title">欢迎回来</text>
      <text class="subtitle">请填写您的基础信息完成登录</text>
    </view>

    <view class="input-group">
      <input class="login-input" placeholder="请输入用户名" v-model="username" />
    </view>
    
    <button class="login-btn" @click="handleLogin">立即登录</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore.js';

const username = ref('');
const userStore = useUserStore();

const handleLogin = () => {
  if (!username.value.trim()) return uni.showToast({ title: '请输入用户名', icon: 'none' });

  // 模拟登录：构造初始数据
  const initData = {
    username: username.value,
    avatar: '', // 可以在这里设置默认头像
    karma: 1,
    appAgeDays: 1,
    gender: 0,
    phone: '',
    age: ''
  };

  // 调用 Store 登录方法
  userStore.updateUserInfo(initData);

  uni.showToast({ title: '登录成功', icon: 'success' });
  
  // 登录成功后返回首页
  setTimeout(() => {
    uni.reLaunch({ url: '/pages/index/index' });
  }, 1000);
};
</script>

<style scoped>
.login-container { 
	padding: 60rpx; 
	display: flex; 
	flex-direction: column; 
	height: 100vh; 
	background: #fff;
	 }
.logo-area { margin-top: 100rpx; margin-bottom: 80rpx; }
.title { font-size: 50rpx; font-weight: bold; color: #333; display: block; margin-bottom: 10rpx; }
.subtitle { font-size: 28rpx; color: #999; }
.input-group { margin-bottom: 60rpx; }
.login-input { height: 100rpx; border-bottom: 2rpx solid #eee; font-size: 32rpx; }
.login-btn { background: linear-gradient(to right, #007aff, #00b4ff); color: #fff; border-radius: 50rpx; box-shadow: 0 10rpx 20rpx rgba(0,122,255,0.3); }
</style>