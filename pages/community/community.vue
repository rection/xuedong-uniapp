<template>
  <GlobalLayout title="社区">
<view class="community-container">
    <scroll-view scroll-x class="category-nav">
      <view 
        class="nav-item" 
        :class="{ active: currentCategoryId === 0 }"
        @click="currentCategoryId = 0"
      >全部</view>
      <view 
        v-for="cat in categories" 
        :key="cat.id"
        class="nav-item"
        :class="{ active: currentCategoryId === cat.id }"
        @click="currentCategoryId = cat.id"
      >
        {{ cat.icon }} {{ cat.name }}
      </view>
    </scroll-view>

    <view class="post-list">
      <block v-for="post in filteredPosts" :key="post.id">
        <PostCard :post="post" />
      </block>
    </view>
  </view>
  </GlobalLayout>
</template>

<script setup>
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js'
import { ref, computed } from 'vue';
import { usePostStore } from '@/stores/usePostStore.js';
import PostCard from '@/components/PostCard/PostCard.vue';
useTabDrawerCloser()
const postStore = usePostStore();
const categories = computed(() => postStore.categories);
const currentCategoryId = ref(0); // 0 代表查看全部

// 核心筛选逻辑
const filteredPosts = computed(() => {
  if (currentCategoryId.value === 0) {
    return postStore.posts;
  }
  return postStore.posts.filter(p => p.categoryId === currentCategoryId.value);
});
</script>

<style lang="scss" scoped>

.category-nav { white-space: nowrap; background: #fff; padding: 20rpx; margin-bottom: 20rpx; }
.nav-item { 
  display: inline-block; 
  padding: 10rpx 30rpx; 
  margin-right: 20rpx; 
  background: #f0f2f5; 
  border-radius: 30rpx; 
  font-size: 26rpx;
  color: #666;
}
.nav-item.active { background: #007aff; color: #fff; }
.community-container { background-color: #f5f5f5; min-height: 100vh; }
.post-list { padding: 0 20rpx; }
</style>