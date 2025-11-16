<template>
  <view class="chat-container">
    <view class="info">
      <text>正在和 {{ chatUserName }} (ID: {{ chatUserId }}) 聊天</text>
    </view>
    
    <scroll-view class="chat-messages" :scroll-y="true">
      </scroll-view>
    
    <view class="chat-input-bar">
      <input type="text" placeholder="发送消息" />
      <button size="mini">发送</button>
    </view>
    
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 用于存储从路由参数中获取的对方用户信息
const chatUserId = ref('');
const chatUserName = ref('');

// uniapp 的页面生命周期函数，在页面加载时触发
onLoad((options) => {
  // 1. options 对象包含了从上一个页面 navigateTo 传来的所有 URL 参数
  console.log('聊天页面加载，收到参数:', options);

  if (options.id && options.name) {
    chatUserId.value = options.id;
    chatUserName.value = decodeURIComponent(options.name); // 解码名字
    
    // 2. 关键：动态设置导航栏标题为对方的名字
    uni.setNavigationBarTitle({
      title: chatUserName.value
    });
  } else {
    console.error('缺少聊天对象ID或名字');
    // 实际应用中可能需要提示错误或返回上一页
  }

  // 3. 在这里，你可以使用 chatUserId.value 去你的 API 
  //    加载与该用户的历史聊天记录
  // fetchChatHistory(chatUserId.value);
});

</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh; // 占满整个屏幕
}
.info {
  padding: 20rpx;
  text-align: center;
  color: #999;
  font-size: 24rpx;
  background-color: #f7f7f7;
}

// 示例样式
.chat-messages {
  flex: 1; // 占据剩余空间
  background-color: #f4f4f4;
  padding: 20rpx;
}

.chat-input-bar {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-top: 1rpx solid #e0e0e0;
  background-color: #ffffff;
  
  input {
    flex: 1;
    background-color: #f7f7f7;
    border-radius: 10rpx;
    padding: 16rpx 20rpx;
    margin-right: 20rpx;
  }
}
</style>