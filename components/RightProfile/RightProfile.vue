<template>
  <view class="right-profile-container">
    <view class="profile-header" @click="handleHeaderClick">
      <view class="avatar-wrapper">
        <image v-if="userInfo.avatar" :src="userInfo.avatar" mode="aspectFill" class="avatar" />
        <view v-else class="avatar-placeholder">{{ userInfo.username[0] }}</view>
      </view>
      <text class="username">{{ userInfo.username }}</text>
    </view>

    <view class="stats-card">
      <view class="stat-item">
        <text class="stat-num">{{ userInfo.karma }}</text>
        <text class="stat-label">Karma</text>
      </view>
      <view class="divider"></view>
      <view class="stat-item">
        <text class="stat-num">{{ userInfo.appAgeDays }} 天</text>
        <text class="stat-label">软件年龄</text>
      </view>
    </view>

    <view class="menu-list">
      <view class="menu-item" @click="goToProfile">
        <text>👤 个人资料</text>
        <text class="arrow">></text>
      </view>
      <view class="menu-item">
        <text>⚙️ 设置</text>
        <text class="arrow">></text>
      </view>
      
      <view v-if="isLoggedIn" class="menu-item logout" @click="handleLogout">
        <text>🚪 退出登录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/useUserStore.js';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const isLoggedIn = computed(() => userStore.isLoggedIn);

// 点击头部：没登录去登录，登录了去资料页
const handleHeaderClick = () => {
  if (!isLoggedIn.value) {
    uni.navigateTo({ url: '/pages/Login/login' });
  } else {
    goToProfile();
  }
};

const goToProfile = () => {
  if (!isLoggedIn.value) {
    return uni.navigateTo({ url: '/pages/Login/login' });
  }
  // 跳转到分包的个人资料页
  uni.navigateTo({ url: '/pages-my/my/my' });
};

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 1. 执行 Store 的退出逻辑 (清除数据)
        userStore.logout();
        
        // 2. 提示用户
        uni.showToast({ title: '已退出', icon: 'none' });

        // 3. 延迟一小会儿跳转 (为了让用户看清 "已退出" 的提示)
        setTimeout(() => {
          // 🚀 使用 reLaunch 关闭所有页面，强制跳转到登录页
          uni.reLaunch({
            url: '/pages/Login/login'
          });
        }, 800);
      }
    }
  });
};
</script>

<style scoped>
/* 样式参照你的截图还原 */
.right-profile-container { padding: 40rpx 30rpx; background: #f8f9fa; height: 100%; }
.profile-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 40rpx; }
.avatar-wrapper { width: 140rpx; height: 140rpx; border-radius: 50%; overflow: hidden; margin-bottom: 20rpx; box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.1); background: #fff; }
.avatar { width: 100%; height: 100%; }
.avatar-placeholder { width: 100%; height: 100%; background: #e0e0e0; display: flex; align-items: center; justify-content: center; font-size: 50rpx; color: #fff; font-weight: bold; }
.username { font-size: 36rpx; font-weight: bold; color: #333; }

.stats-card { display: flex; background: #fff; border-radius: 20rpx; padding: 30rpx 0; margin-bottom: 40rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05); }
.stat-item { flex: 1; display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 5rpx; }
.stat-label { font-size: 24rpx; color: #999; }
.divider { width: 1px; background: #eee; }

.menu-list { background: #fff; border-radius: 20rpx; padding: 0 20rpx; }
.menu-item { display: flex; justify-content: space-between; padding: 30rpx 10rpx; border-bottom: 1px solid #f5f5f5; font-size: 30rpx; color: #333; }
.menu-item:last-child { border-bottom: none; }
.arrow { color: #ccc; }
.logout { color: #ff4d4f; margin-top: 20rpx; border-top: 1px solid #f5f5f5; }
</style>