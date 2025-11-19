<template>
  <GlobalLayout title="创建">
    
<view class="container">
    <picker mode="selector" :range="categories" range-key="name" @change="onCategoryChange">
      <view class="picker-item">
        <text>发布到：</text>
        <text class="selected-category">{{ selectedCategory ? selectedCategory.name : '点击选择板块 >' }}</text>
      </view>
    </picker>

    <input 
      class="input-title" 
      placeholder="起个吸引人的标题..." 
      v-model="formData.title"
    />

    <textarea 
      class="input-content" 
      placeholder="分享你的新鲜事..." 
      v-model="formData.content"
      maxlength="-1"
    ></textarea>

    <view class="image-upload-area">
      <view 
        class="image-preview" 
        v-for="(img, index) in formData.images" 
        :key="index"
      >
        <image :src="img" mode="aspectFill" />
        <view class="delete-btn" @click="removeImage(index)">×</view>
      </view>
      
      <view class="upload-btn" @click="chooseImage" v-if="formData.images.length < 9">
        <text>+</text>
      </view>
    </view>

    <button class="submit-btn" @click="submitPost">发布</button>
  </view>
  </GlobalLayout>
</template>

<script setup>
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js'
import { ref, computed } from 'vue';
import { usePostStore } from '@/stores/usePostStore';
useTabDrawerCloser()
const postStore = usePostStore();
const categories = computed(() => postStore.categories);

const selectedCategory = ref(null);
const formData = ref({
  title: '',
  content: '',
  images: []
});

// 选择分类
const onCategoryChange = (e) => {
  const index = e.detail.value;
  selectedCategory.value = categories.value[index];
};

// 选择图片
const chooseImage = () => {
  uni.chooseImage({
    count: 9 - formData.value.images.length,
    success: (res) => {
      // 临时路径，实际开发中这里需要调用 uni.uploadFile 上传到服务器
      formData.value.images = [...formData.value.images, ...res.tempFilePaths];
    }
  });
};

// 删除图片
const removeImage = (index) => {
  formData.value.images.splice(index, 1);
};

// 提交发布
const submitPost = () => {
  if (!selectedCategory.value) return uni.showToast({ title: '请选择版块', icon: 'none' });
  if (!formData.value.title) return uni.showToast({ title: '请输入标题', icon: 'none' });
  if (!formData.value.content) return uni.showToast({ title: '请输入内容', icon: 'none' });

  // 调用 Store 的 Action
  postStore.addPost({
    title: formData.value.title,
    content: formData.value.content,
    images: formData.value.images,
    categoryId: selectedCategory.value.id,
    categoryName: selectedCategory.value.name
  });

  uni.showToast({ title: '发布成功' });
  
  // 重置表单
  formData.value = { title: '', content: '', images: [] };
  selectedCategory.value = null;

  // 跳转回主页或社区页
  setTimeout(() => {
    uni.switchTab({ url: '/pages/index/index' }); // 假设这是你的主页路径
  }, 1000);
};

</script>

<style lang="scss" scoped>

.container { padding: 30rpx; background-color: #fff; min-height: 100vh; }
.picker-item { 
  padding: 20rpx 0; 
  border-bottom: 1px solid #eee; 
  font-size: 30rpx; 
  color: #333;
  display: flex;
  justify-content: space-between;
}
.selected-category { color: #007aff; font-weight: bold; }
.input-title {
  font-size: 36rpx;
  font-weight: bold;
  margin: 30rpx 0;
  padding: 10rpx 0;
  border-bottom: 1px solid #f5f5f5;
}
.input-content {
  width: 100%;
  height: 300rpx;
  font-size: 30rpx;
  line-height: 1.6;
}
.image-upload-area {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-top: 30rpx;
}
.upload-btn, .image-preview {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
  position: relative;
}
.upload-btn {
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60rpx;
  color: #ccc;
}
.image-preview image { width: 100%; height: 100%; border-radius: 8rpx; }
.delete-btn {
  position: absolute; top: -10rpx; right: -10rpx;
  background: red; color: white; width: 36rpx; height: 36rpx;
  border-radius: 50%; text-align: center; line-height: 32rpx;
}
.submit-btn {
  margin-top: 50rpx;
  background-color: #007aff;
  color: white;
  border-radius: 50rpx;
}
</style>