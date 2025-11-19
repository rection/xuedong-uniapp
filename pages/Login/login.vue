<template>
  <view class="login-container">
    <!-- Logo区域 -->
    <view class="logo-section">
      <image class="logo" src="/static/logo.png" mode="aspectFit" v-if="logoExists"></image>
      <view class="logo-placeholder" v-else>
        <text class="logo-text">学动</text>
      </view>
      <text class="app-title">欢迎登录</text>
      <text class="app-subtitle">请输入您的账号信息</text>
    </view>

    <!-- 表单区域 -->
    <view class="form-section">
      <view class="input-wrapper">
        <view class="input-label">
          <uni-icons type="person" size="18" color="#999"></uni-icons>
          <text class="label-text">用户名</text>
        </view>
        <uni-easyinput
          v-model="formData.username"
          placeholder="请输入用户名"
          :clearable="true"
          :styles="inputStyles"
          trim="both"
        ></uni-easyinput>
      </view>

      <view class="input-wrapper">
        <view class="input-label">
          <uni-icons type="locked" size="18" color="#999"></uni-icons>
          <text class="label-text">密码</text>
        </view>
        <uni-easyinput
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          :clearable="true"
          :styles="inputStyles"
          trim="both"
        ></uni-easyinput>
      </view>

      <button 
        class="login-btn" 
        :class="{ 'btn-loading': isLoading }"
        @click="handleLogin" 
        :loading="isLoading"
        :disabled="isLoading"
      >
        {{ isLoading ? '登录中...' : '登录' }}
      </button>

      <!-- 提示信息 -->
      <view class="tips-section">
        <text class="tips-text">测试账号：admin / 123456</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user.js'

const formData = ref({
  username: '', // 移除预填，让用户手动输入
  password: ''
})
const isLoading = ref(false)
const userStore = useUserStore()

// 输入框样式配置
const inputStyles = {
  borderColor: '#e0e0e0',
  color: '#333'
}

// 检查logo是否存在
const logoExists = computed(() => {
  // 这里可以根据实际情况判断logo是否存在
  return false // 暂时设为false，使用占位符
})

const handleLogin = async () => {
  // 表单验证
  if (!formData.value.username || !formData.value.username.trim()) {
    uni.showToast({ 
      title: '请输入用户名', 
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  if (!formData.value.password || !formData.value.password.trim()) {
    uni.showToast({ 
      title: '请输入密码', 
      icon: 'none',
      duration: 2000
    })
    return
  }

  // 密码长度验证
  if (formData.value.password.length < 6) {
    uni.showToast({ 
      title: '密码长度不能少于6位', 
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  isLoading.value = true
  try {
    await userStore.login({
      username: formData.value.username.trim(),
      password: formData.value.password.trim()
    })
    
    // 登录成功，立即跳转
    console.log('准备跳转到主页: /pages/index/index')
    
    // 使用 switchTab 跳转到 tabBar 页面（最可靠的方式）
    uni.switchTab({
      url: '/pages/index/index',
      success: (res) => {
        console.log('switchTab 跳转成功:', res)
        uni.showToast({ 
          title: '登录成功', 
          icon: 'success',
          duration: 1500
        })
      },
      fail: (err) => {
        console.error('switchTab 失败，错误信息:', err)
        console.log('尝试使用 reLaunch 跳转...')
        
        // 如果 switchTab 失败，尝试使用 reLaunch
        uni.reLaunch({
          url: '/pages/index/index',
          success: (res) => {
            console.log('reLaunch 跳转成功:', res)
            uni.showToast({ 
              title: '登录成功', 
              icon: 'success',
              duration: 1500
            })
          },
          fail: (reLaunchErr) => {
            console.error('reLaunch 也失败，错误信息:', reLaunchErr)
            // 最后尝试使用 navigateTo（虽然不能跳转到 tabBar，但至少可以测试路径是否正确）
            uni.showToast({
              title: '跳转失败，请检查控制台日志',
              icon: 'none',
              duration: 3000
            })
            console.error('所有跳转方式都失败了，请检查：')
            console.error('1. pages.json 中首页路径是否正确')
            console.error('2. 首页是否在 tabBar 配置中')
            console.error('3. 路径格式是否正确')
          }
        })
      }
    })
    
  } catch (error) {
    // 登录失败 (store 中已经提示过了)
    console.log('登录失败:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  padding: 0;
}

/* Logo区域 */
.logo-section {
  padding: 120rpx 60rpx 80rpx;
  text-align: center;
  color: #fff;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  border-radius: 20rpx;
  margin-bottom: 40rpx;
  background: rgba(255, 255, 255, 0.2);
}

.logo-placeholder {
  width: 160rpx;
  height: 160rpx;
  border-radius: 20rpx;
  margin: 0 auto 40rpx;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.logo-text {
  font-size: 48rpx;
  font-weight: bold;
  color: #fff;
}

.app-title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #fff;
}

.app-subtitle {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

/* 表单区域 */
.form-section {
  flex: 1;
  background: #fff;
  border-radius: 40rpx 40rpx 0 0;
  padding: 60rpx 40rpx 40rpx;
  margin-top: auto;
}

.input-wrapper {
  margin-bottom: 40rpx;
}

.input-label {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  padding-left: 8rpx;
}

.label-text {
  margin-left: 12rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 48rpx;
  border: none;
  margin-top: 60rpx;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.4);
  transition: all 0.3s;
}

.login-btn:active {
  transform: scale(0.98);
  box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.3);
}

.login-btn.btn-loading {
  opacity: 0.7;
}

.login-btn::after {
  border: none;
}

/* 提示信息 */
.tips-section {
  margin-top: 40rpx;
  text-align: center;
}

.tips-text {
  font-size: 24rpx;
  color: #999;
}
</style>