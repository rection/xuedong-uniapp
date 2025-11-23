<template>
  <GlobalLayout title="学习">
    <view class="page-container" @touchmove.stop.prevent="() => {}">
      <image class="bg-image" src="/static/images/yu.jpg" mode="aspectFill"></image>

      <view class="content-layer">

        <view class="header-section">
          <view class="avatar-box">
            <view class="avatar-circle">
              <image src="/static/images/yu.jpg" mode="aspectFit" class="avatar-img"></image>
            </view>
            <uni-badge class="notification-badge" text="2" type="error" absolute="rightTop" :offset="[-5, -5]"></uni-badge>
          </view>
        </view>

        <view class="center-section">
          <view class="check-in-card" @click="onCheckInClick">
            <view class="icon-area">
              <uni-icons :type="signStore.isSigned ? 'checkbox-filled' : 'calendar-filled'" size="32" color="#333"></uni-icons>
            </view>
            
            <view class="text-area">
               <text class="card-title" v-if="!signStore.isSigned">签到</text>
               <text class="card-title signed-text" v-else>已签到 <text class="days-highlight">{{ signStore.signDays }}</text> 天</text>
            </view>

            <text class="card-date">{{ signStore.formattedDate }}</text>
          </view>
        </view>

        <view class="stats-section">
          <view class="stat-card">
            <view class="stat-label" @click="learnCi">Learn</view>
            <view class="stat-value review-color">{{ learned }}</view>
          </view>
          <view class="stat-card">
            <view class="stat-label" @click="reviewCi">review</view>
            <view class="stat-value review-color">{{ reviewed }}</view>
          </view>
        </view>

      </view>
    </view>
  </GlobalLayout>
</template>

<script setup>
  import { ref } from 'vue';
  import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js';
  // 引入刚才创建的 Pinia Store
  import { useSignStore } from '@/stores/signStore.js';

  useTabDrawerCloser();

  // 初始化 Store
  const signStore = useSignStore();

  let learned = ref(1); 
  let reviewed = ref(1);

  // 点击签到逻辑
  const onCheckInClick = () => {
    // 调用 Store 的方法
    const success = signStore.handleCheckIn();
    
    if (success) {
      uni.showToast({ title: '签到成功', icon: 'success' });
    } else {
      uni.showToast({ title: '今日已签到啦~', icon: 'none' });
    }
  };

  const learnCi = () => {
    setTimeout(() => {
      uni.navigateTo({ url: '/pages-chat/learn/learn' });
    }, 500);
  };

  const reviewCi = () => {
    setTimeout(() => {
      uni.navigateTo({ url: '/pages-chat/review/review' });
    }, 500);
  };
</script>

<style lang="scss" scoped>
  .page-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .bg-image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .content-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    /* 关键：让头部、中间、底部均匀分布，确保底部肯定在最下面 */
    justify-content: space-between; 
    padding: 0 40rpx;
    box-sizing: border-box;
    /* 底部安全区，防止被 iPhone 横条遮挡 */
    padding-bottom: calc(40rpx + env(safe-area-inset-bottom)); 
  }

  /* 头部区域 */
  .header-section {
    /* 调整这里的值可以让圆标更往下 */
    margin-top: 100rpx; 
    display: flex;
    flex-shrink: 0; /* 防止被挤压 */
  }

  .avatar-box {
    position: relative;
    width: 80rpx;
    height: 80rpx;
  }

  .avatar-circle {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .avatar-img {
    width: 60%;
    height: 60%;
  }

  /* 中间区域 */
  .center-section {
    flex: 1; /* 占据所有剩余空间 */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
  }

  .check-in-card {
    width: 280rpx;
    height: 280rpx;
    background-color: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(10px);
    border-radius: 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
    transition: transform 0.1s;
  }
  
  .check-in-card:active {
    transform: scale(0.98);
  }

  .icon-area {
    margin-bottom: 10rpx;
  }

  .card-title {
    font-size: 32rpx;
    color: #333;
    font-weight: 600;
    margin-bottom: 8rpx;
  }
  
  .signed-text {
    font-size: 28rpx;
  }
  
  .days-highlight {
    color: #ff8c00;
    margin: 0 4rpx;
    font-size: 34rpx;
  }

  .card-date {
    font-size: 24rpx;
    color: #555;
  }

  /* 底部统计区域 */
  .stats-section {
    display: flex;
    justify-content: space-between;
    flex-shrink: 0; /* 防止被挤压 */
    /* 不需要 margin-bottom 了，由 content-layer 的 padding-bottom 控制 */
  }

  .stat-card {
    width: 48%;
    height: 160rpx;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .stat-label {
    font-size: 30rpx;
    font-weight: 600;
    color: #222;
  }

  .stat-value {
    font-size: 40rpx;
    font-weight: bold;
    color: #ff8c00;
  }
</style>