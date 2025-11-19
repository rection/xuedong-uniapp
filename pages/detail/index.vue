<template>
  <view class="detail-container" v-if="post">
    <view class="post-content">
      <view class="header">
        <view class="user-box">
          <view class="avatar">{{ post.author[0] }}</view> <view class="info">
            <text class="name">{{ post.author }}</text>
            <text class="time">{{ post.createTime }} · {{ post.categoryName }}</text>
          </view>
        </view>
      </view>

      <text class="title">{{ post.title }}</text>
      <text class="body">{{ post.content }}</text>

      <view class="images" v-if="post.images && post.images.length">
        <image 
          v-for="(img, idx) in post.images" 
          :key="idx" 
          :src="img" 
          mode="widthFix" 
          class="detail-img"
        />
      </view>
      
      <view class="action-bar">
        <view 
          class="action-item" 
          :class="{ 'liked': post.isLiked }" 
          @click="handleLike"
        >
          <text class="icon">{{ post.isLiked ? '❤️' : '🤍' }}</text>
          <text>{{ post.likeCount }} 点赞</text>
        </view>
        <view class="action-item">
          <text class="icon">💬</text>
          <text>{{ post.commentCount }} 评论</text>
        </view>
      </view>
    </view>

    <view class="divider"></view>

    <view class="comment-section">
      <text class="section-title">全部评论</text>
      
      <view class="comment-list">
        <view v-for="comment in post.comments" :key="comment.id" class="comment-item">
          <view class="c-avatar">{{ comment.author[0] }}</view>
          <view class="c-content">
            <view class="c-top">
              <text class="c-name">{{ comment.author }}</text>
              <text class="c-time">{{ comment.time }}</text>
            </view>
            <text class="c-text">{{ comment.content }}</text>
          </view>
        </view>
        
        <view v-if="post.comments.length === 0" class="empty-comment">
          还没有人评论，抢个沙发吧~
        </view>
      </view>
    </view>

    <view class="footer-input">
      <input 
        class="input-box" 
        placeholder="写下你的评论..." 
        v-model="commentText"
        confirm-type="send"
        @confirm="submitComment"
      />
      <button 
        class="send-btn" 
        :disabled="!commentText" 
        @click="submitComment"
      >发送</button>
    </view>
    
    <view style="height: 120rpx;"></view>
  </view>

  <view v-else class="loading">
    帖子不存在或正在加载...
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { usePostStore } from '@/stores/usePostStore';

const postStore = usePostStore();
const postId = ref(null);
const commentText = ref('');

// 获取当前帖子数据 (保持响应式)
const post = computed(() => {
  return postStore.getPostById(postId.value);
});

onLoad((options) => {
  if (options.id) {
    postId.value = Number(options.id); // 确保转为数字类型
  }
});

// 处理点赞
const handleLike = () => {
  postStore.toggleLike(postId.value);
};

// 处理发送评论
const submitComment = () => {
  if (!commentText.value.trim()) return;
  
  postStore.addComment(postId.value, commentText.value);
  
  uni.showToast({ title: '评论成功', icon: 'none' });
  commentText.value = ''; // 清空输入框
};
</script>

<style scoped>
.detail-container {
	background: #fff; min-height: 100vh; }
.post-content { padding: 30rpx; }
.header { margin-bottom: 30rpx; }
.user-box { display: flex; align-items: center; }
.avatar { width: 80rpx; height: 80rpx; background: #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #666; }
.info { margin-left: 20rpx; display: flex; flex-direction: column; }
.name { font-weight: bold; font-size: 32rpx; }
.time { font-size: 24rpx; color: #999; margin-top: 4rpx; }
.title { font-size: 40rpx; font-weight: bold; margin-bottom: 20rpx; display: block; }
.body { font-size: 32rpx; color: #333; line-height: 1.6; }
.detail-img { width: 100%; margin-top: 20rpx; border-radius: 12rpx; }

.action-bar { display: flex; margin-top: 40rpx; padding-top: 20rpx; border-top: 1px solid #f5f5f5; }
.action-item { flex: 1; display: flex; align-items: center; justify-content: center; color: #666; font-size: 28rpx; }
.action-item.liked { color: #ff4d4f; } /* 点赞后的颜色 */
.icon { margin-right: 10rpx; font-size: 32rpx; }

.divider { height: 20rpx; background: #f5f5f5; }

.comment-section { padding: 30rpx; }
.section-title { font-weight: bold; border-left: 8rpx solid #007aff; padding-left: 20rpx; font-size: 30rpx; margin-bottom: 30rpx; display: block;}
.comment-item { display: flex; margin-bottom: 30rpx; }
.c-avatar { width: 70rpx; height: 70rpx; background: #f0f0f0; border-radius: 50%; margin-right: 20rpx; display: flex; align-items: center; justify-content: center; font-size: 24rpx;}
.c-content { flex: 1; }
.c-top { display: flex; justify-content: space-between; margin-bottom: 8rpx; }
.c-name { font-weight: bold; font-size: 28rpx; color: #555; }
.c-time { font-size: 24rpx; color: #bbb; }
.c-text { font-size: 28rpx; color: #333; }

.footer-input {
  position: fixed; bottom: 0; left: 0; width: 100%;
  background: #fff; padding: 20rpx;
  display: flex; align-items: center;
  border-top: 1px solid #eee;
  box-sizing: border-box; /* 关键：防止宽度溢出 */
}
.input-box { flex: 1; background: #f5f5f5; height: 70rpx; border-radius: 35rpx; padding: 0 30rpx; font-size: 28rpx; }
.send-btn { margin-left: 20rpx; background: #007aff; color: #fff; font-size: 26rpx; border-radius: 35rpx; height: 70rpx; line-height: 70rpx; padding: 0 30rpx; }
.send-btn[disabled] { background: #ccc; }
</style>