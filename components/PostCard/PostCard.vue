<template>
  <view class="post-card" @click="goToDetail">
    
    <view class="header">
      <view class="user-info">
        <image v-if="post.avatar" :src="post.avatar" mode="aspectFill" class="avatar" />
        <view v-else class="avatar-placeholder">{{ post.author ? post.author[0] : 'U' }}</view>
        <view class="info-text">
          <text class="author">{{ post.author }}</text>
          <text class="time">· {{ post.createTime }}</text>
        </view>
      </view>
      <view class="category-tag">r/{{ post.categoryName }}</view>
    </view>

    <view class="content">
      <text class="title">{{ post.title }}</text>
      <text class="body-text">{{ post.content }}</text>
    </view>

    <view v-if="post.images && post.images.length > 0" class="image-grid">
      <image 
        v-for="(img, index) in post.images" 
        :key="index" 
        :src="img" 
        mode="aspectFill" 
        class="post-img"
        @click.stop="previewImage(index)" 
      />
    </view>

    <view class="footer">
      <view class="action-btn like-btn" @click.stop="handleLike">
        <text class="icon" :class="{ 'active-icon': post.isLiked }">
          {{ post.isLiked ? '❤️' : '⬆️' }}
        </text>
        <text :class="{ 'active-text': post.isLiked }">
          {{ post.likeCount }}
        </text>
      </view>

      <view class="action-btn">
        <text class="icon">💬</text>
        <text>{{ post.commentCount }}</text>
      </view>
      
      <view class="action-btn">
        <text class="icon">🔗</text>
        <text>分享</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { usePostStore } from '@/stores/usePostStore';

// 1. 接收父组件传来的 post 数据
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// 2. 初始化 Store
const postStore = usePostStore();

// 跳转详情页
const goToDetail = () => {
  // 这里使用你刚才确认的路径方案
  uni.navigateTo({
    url: `/pages/detail/index?id=${props.post.id}`
  });
}

// 3. 点赞逻辑
const handleLike = () => {
  console.log('点击了点赞，ID:', props.post.id); // 调试日志
  // 调用 Store 中的 toggleLike 方法，这会直接修改 Pinia 中的数据
  // 因为 props.post 是响应式的，界面会自动更新
  postStore.toggleLike(props.post.id);
}

// (可选) 预览图片逻辑
const previewImage = (index) => {
  uni.previewImage({
    urls: props.post.images,
    current: index
  });
}
</script>

<style scoped>
.post-card {
  background-color: #fff;
  padding: 24rpx;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar, .avatar-placeholder {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.avatar-placeholder {
  background: #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #666;
}

.info-text {
  display: flex;
  flex-direction: column;
}

.author {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
}

.time {
  font-size: 22rpx;
  color: #999;
}

.category-tag {
  font-size: 20rpx;
  background-color: #eff6ff;
  color: #007aff;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-weight: bold;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #000;
  margin-bottom: 12rpx;
  display: block;
}

.body-text {
  font-size: 28rpx;
  color: #444;
  line-height: 1.5;
  margin-bottom: 16rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 底部操作栏样式 */
.footer {
  display: flex;
  align-items: center;
  border-top: 1rpx solid #f0f0f0;
  padding-top: 20rpx;
  margin-top: 10rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  margin-right: 40rpx;
  color: #888;
  font-size: 26rpx;
  /* 增加点击热区，更容易点中 */
  padding: 10rpx 0; 
}

/* 点赞后的样式 */
.active-icon, .active-text {
  color: #ff4d4f; /* 红色 */
  font-weight: bold;
}

.icon {
  margin-right: 8rpx;
  font-size: 30rpx;
}

/* 图片网格 */
.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-bottom: 20rpx;
}
.post-img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
  background: #eee;
}
</style>