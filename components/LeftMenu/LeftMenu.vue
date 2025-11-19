<template>
  <view class="left-menu-container">
    
    <view class="checkin-section">
      <view 
        class="checkin-card" 
        :class="{ 'is-checked': isCheckedIn, 'clicked': isAnimating }"
        @click="handleCheckIn"
      >
        <view class="card-content">
          <text class="checkin-icon">{{ isCheckedIn ? '🎉' : '📅' }}</text>
          <view class="text-box">
            <text class="checkin-title">{{ isCheckedIn ? '今日已打卡' : '每日打卡' }}</text>
            <text class="checkin-days">已连续坚持 {{ totalDays }} 天</text>
          </view>
          <view class="checkin-btn-text">{{ isCheckedIn ? '完成' : 'GO' }}</view>
        </view>
      </view>
    </view>

    <scroll-view scroll-y class="menu-list">
      <view class="menu-item">📁 我的收藏</view>
      <view class="menu-item">🌙 深色模式</view>
    </scroll-view>

  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
const isAnimating = ref(false); // 控制点击动画

// 从 Store 获取响应式数据
const totalDays = computed(() => userStore.totalDays);
const isCheckedIn = computed(() => userStore.isCheckedInToday);

// 初始化时读取缓存
onMounted(() => {
  userStore.hydrate(); // 加载本地数据
});

const handleCheckIn = () => {
  if (isCheckedIn.value) {
    uni.showToast({ title: '今天已经打过卡啦~', icon: 'none' });
    return;
  }

  // 触发点击动画
  isAnimating.value = true;
  setTimeout(() => isAnimating.value = false, 200);

  // 调用 Store 的打卡逻辑
  const success = userStore.checkIn();
  
  if (success) {
    uni.showToast({ title: '打卡成功！+1', icon: 'success' });
  }
};
</script>

<style scoped>
.left-menu-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
}

/* --- 打卡卡片 3D 样式核心 --- */
.checkin-section {
  margin-bottom: 40rpx; /* 与下方菜单隔开 */
}

.checkin-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* 漂亮的渐变紫 */
  border-radius: 20rpx;
  padding: 30rpx;
  color: white;
  position: relative;
  transition: all 0.1s ease;
  
  /* 🌟 核心：立体阴影 🌟 */
  /* 下面的阴影颜色较深，模拟厚度 */
  box-shadow: 0 8rpx 0 #5a3b85, 0 15rpx 20rpx rgba(0,0,0,0.2);
  border: 2px solid rgba(255,255,255,0.2); /* 描边 */
}

/* 激活状态（按下去的效果） */
.checkin-card.clicked {
  transform: translateY(8rpx); /* 向下移动，模拟被按下 */
  box-shadow: 0 0 0 #5a3b85, 0 0 0 rgba(0,0,0,0); /* 阴影消失 */
}

/* 已打卡状态 (变灰或变绿) */
.checkin-card.is-checked {
  background: linear-gradient(135deg, #42e695 0%, #3bb2b8 100%);
  box-shadow: 0 8rpx 0 #2a8a8f, 0 15rpx 20rpx rgba(0,0,0,0.1);
}
.checkin-card.is-checked.clicked {
  box-shadow: 0 0 0 #2a8a8f;
}

.card-content {
  display: flex;
  align-items: center;
}

.checkin-icon {
  font-size: 60rpx;
  margin-right: 20rpx;
}

.text-box {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.checkin-title {
  font-size: 34rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.checkin-days {
  font-size: 24rpx;
  opacity: 0.9;
}

.checkin-btn-text {
  font-size: 32rpx;
  font-weight: bold;
  background: rgba(255,255,255,0.2);
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
}

/* --- 下方菜单样式示例 --- */
.menu-list {
  flex: 1; /* 占据剩余空间 */
}
.menu-item {
  padding: 30rpx 20rpx;
  border-bottom: 1px solid #f5f5f5;
  font-size: 30rpx;
  color: #333;
}
</style>