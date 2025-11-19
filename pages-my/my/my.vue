<template>
  <view class="container">
    <view class="avatar-section" @click="chooseAvatar">
      <image :src="form.avatar || '/static/default-avatar.png'" mode="aspectFill" class="avatar" />
      <text class="tip">点击更换头像</text>
    </view>

    <view class="form-list">
      <view class="form-item">
        <text class="label">用户名</text>
        <input class="input" v-model="form.username" placeholder="请输入用户名" />
      </view>
      
      <view class="form-item">
        <text class="label">性别</text>
        <picker mode="selector" :range="['保密', '男', '女']" @change="handleGenderChange">
          <view class="picker-value">{{ ['保密', '男', '女'][form.gender] }} ></view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">年龄</text>
        <input class="input" type="number" v-model="form.age" placeholder="请输入年龄" />
      </view>

      <view class="form-item">
        <text class="label">手机号</text>
        <input class="input" type="number" v-model="form.phone" placeholder="请输入手机号" />
      </view>
    </view>

    <button class="save-btn" @click="saveProfile">保存修改</button>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore.js';

const userStore = useUserStore();
const form = ref({});

// 进入页面时，复制 Store 里的数据到表单
onMounted(() => {
  // 深拷贝，防止修改表单时直接变动 Store（虽然 Pinia 允许，但为了点保存再生效，最好拷贝）
  form.value = JSON.parse(JSON.stringify(userStore.userInfo));
});

const chooseAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      // 实际开发中这里应该上传到服务器获取 URL
      // 这里演示直接使用临时路径
      form.value.avatar = res.tempFilePaths[0];
    }
  });
};

const handleGenderChange = (e) => {
  form.value.gender = e.detail.value;
};

const saveProfile = () => {
  if (!form.value.username) return uni.showToast({ title: '用户名不能为空', icon: 'none' });
  
  // 更新 Store
  userStore.updateUserInfo(form.value);
  
  uni.showToast({ title: '保存成功', icon: 'success' });
  setTimeout(() => {
    uni.navigateBack(); // 返回上一页
  }, 1000);
};
</script>

<style scoped>
.container {
	padding: 30rpx; 
	background: #f5f5f5; 
	min-height: 100vh;
	 }
.avatar-section {
	display: flex; 
	flex-direction: column;
	 align-items: center;
	  margin: 40rpx 0;
	   }
.avatar { 
	width: 160rpx;
	height: 160rpx;
	border-radius: 50%;
	background: #fff; 
   }
.tip { 
	font-size: 24rpx; 
	color: #999; 
	margin-top: 10rpx;
	 }

.form-list { 
	background: #fff; 
	border-radius: 12rpx; 
	padding: 0 30rpx;
	 margin-bottom: 60rpx;
	  }
.form-item { display: flex; 
	justify-content: space-between; 
	align-items: center;
	height: 100rpx;
	border-bottom: 1px solid #eee; 
  }
.form-item:last-child { 
	border-bottom: none; 
	}
.label { font-size: 30rpx; color: #333; }
.input { text-align: right; font-size: 30rpx; color: #333; }
.picker-value { font-size: 30rpx; color: #666; }
.save-btn { background: #007aff; color: #fff; border-radius: 50rpx; }
</style>