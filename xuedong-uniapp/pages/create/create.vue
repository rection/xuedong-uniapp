<template>
  <GlobalLayout title="创建">
    
    <view class="index-page-content">

    </view>

  </GlobalLayout>
</template>

<script setup>
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js'
useTabDrawerCloser()
</script>

<style lang="scss" scoped>

.index-page-content {
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
}
</style>