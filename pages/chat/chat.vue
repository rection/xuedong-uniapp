<template>
  <GlobalLayout title="学习">
    <view class="box">
		<view class="top-box">
			<view class="top-massage">消息</view>
		</view>
		<view class="second-box">
			<view class="yidu-button">
				已读
			</view>
			<view class="weidu-button">
				未读
			</view>
		</view>
			<view class="message-list-container">
			    <view
			      class="message-item"
			      v-for="item in conversationList"
			      :key="item.id"
			      @click="goToChat(item)"
			    >
			      <image class="avatar" :src="item.user.avatarUrl" mode="aspectFill" />
			
			      <view class="content">
			        <view class="name">{{ item.user.name }}</view>
			        <view class="last-message">{{ item.lastMessage }}</view>
			      </view>
			
			      <view class="meta">
			        <view class="time">{{ item.time }}</view>
			        <view class="unread-count" v-if="item.unreadCount > 0">
			          {{ item.unreadCount }}
			        </view>
			      </view>
			    </view>
			  </view>
	</view>

  </GlobalLayout>
</template>

<script setup>
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js';
import { ref } from 'vue';
useTabDrawerCloser();
const conversationList = ref([
  {
    id: 'conv_1', // 会话ID
    user: {
      id: 'user_001', // 对方用户ID
      name: '张三',
      avatarUrl: '/static/images/avatar1.png', // 确保这个路径在你的项目中存在
    },
    lastMessage: '好的，明天见。',
    time: '09:30',
    unreadCount: 3,
  },
  {
    id: 'conv_2',
    user: {
      id: 'user_002',
      name: '李四',
      avatarUrl: '/static/images/avatar2.png',
    },
    lastMessage: '你文件发我一下。',
    time: '昨天',
    unreadCount: 0,
  },
  // ...更多会话
]);

// 2. 点击消息栏的跳转方法
const goToChat = (conversation) => {
  const targetUser = conversation.user;
  
  // 我们需要把对方的用户ID和名字传递给聊天页面
  // 名字可以用来设置聊天页的导航栏标题
  const url = `/pages/chat/chat?id=${targetUser.id}&name=${encodeURIComponent(targetUser.name)}`;
  
  console.log('跳转到:', );
  
  uni.navigateTo({
    url: "/pages-chat/chat/chat",
    fail: (err) => {
      console.error('跳转失败', err);
    }
  });
};
</script>

<style lang="scss" scoped>
.box{
	display: flex;
	flex-direction: column;
	height:100vh;
	background-color: #ffffff;
}
.top-box{
	margin-top: 10rpx;
	height: 52px;
}
.top-massage{
	padding-left: 30rpx;
	font-size: 44rpx;
	font-weight: 700;
	display: block;
	margin-bottom: 20rpx;
}
.yidu-button{
background-color: #ffffff; 
    color: #000000;         
    
    border-radius: 50rpx;      
    border: 1rpx solid #dcdcdc; 
    padding: 12rpx 35rpx;      
    margin-right: 25rpx;      
    font-size: 28rpx;
    font-weight: normal;
}
.weidu-button{
background-color: #ffffff;
    color: #000000;           
    border-radius: 50rpx;     
    border: 1rpx solid #dcdcdc; 
    padding: 12rpx 35rpx;     
    margin-right: 25rpx;       
    font-size: 28rpx;
    font-weight: normal;
}
.second-box{
	display: flex;
    flex-direction: row;
    padding: 10rpx 20rpx; /* (可选) 给容器一点内边距 */
	
}
.message-list-container {
  display: flex;
  flex-direction: column;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
  background-color: #ffffff;
  
  // 增加点击效果
  &:active {
    background-color: #f9f9f9;
  }
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  margin-right: 20rpx;
  background-color: #eee; // 图像加载前的占位符
}

.content {
  flex: 1; // 占据剩余空间
  min-width: 0; // 允许flex-shrink
}

.name {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  // 防止名字过长
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.last-message {
  font-size: 28rpx;
  color: #999;
  margin-top: 8rpx;
  // 防止消息过长
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 20rpx;
  color: #999;
  font-size: 24rpx;
}

.time {
  margin-bottom: 8rpx;
}

.unread-count {
  background-color: #fa3534;
  color: #ffffff;
  font-size: 22rpx;
  min-width: 36rpx;
  height: 36rpx;
  line-height: 36rpx;
  text-align: center;
  border-radius: 18rpx;
  padding: 0 10rpx; // 左右留白，让单个数字也好看
}
</style>