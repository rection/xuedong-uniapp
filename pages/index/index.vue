<template>
  <GlobalLayout title="主页">
 <view class="home-container">
     <block v-for="post in posts" :key="post.id">
       <PostCard :post="post" />
     </block>
     
     <view v-if="posts.length === 0" class="empty-tip">
       暂时还没有内容，快去创建吧！
     </view>
   </view>

  </GlobalLayout>
</template>

<script setup>
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js'
import { computed } from 'vue';
import { usePostStore } from '@/stores/usePostStore';
import PostCard from '@/components/PostCard/PostCard.vue';
useTabDrawerCloser()
const postStore = usePostStore();
// 逻辑A+B的体现：主页获取所有帖子，不分板块
const posts = computed(() => postStore.posts);
</script>

<style lang="scss" scoped>

.home-container {
  background-color: #f5f5f5; /* 灰色背景区分卡片 */
  padding: 20rpx;
  min-height: 100vh;
}
.empty-tip { text-align: center; color: #999; margin-top: 100rpx; }
</style>