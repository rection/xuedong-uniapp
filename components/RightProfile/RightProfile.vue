<template>
  <view class="right-profile-container">
    <view class="profile-header">
      <view class="avatar"></view> 
      <text> username </text> <!-- 传入用户名 -->
    </view>
    
    <view class="stats">
      <view>
        <text class="count">1</text>
        <text class="label">Karma</text>
      </view>
      <view>
        <text class="count">9 天</text>
        <text class="label">软件年龄</text>
      </view>
    </view>
    
    <view class="menu-list">
      <view class="item-button" @click="goTomy">个人资料</view>
      <view class="item-button" @click="goToSetting">设置</view>
    </view>
  </view>
</template>
<script setup>
	const goTomy = () =>{
		uni.navigateTo({
			url:"/pages-my/my/my"
		})
	}
	const goToSetting = () =>{
		uni.navigateTo({
			url:"/pages-my/setting/setting"
		})
	}
</script>
<style lang="scss" scoped>
.right-profile-container {
  padding: 20px;
  padding-top: 60px;
}
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #eee;
    margin-bottom: 10px;
  }
}
.stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  view {
    display: flex;
    flex-direction: column;
    align-items: center;
    .count { font-weight: bold; font-size: 16px; }
    .label { font-size: 12px; color: #666; }
  }
}
.menu-list {
  .item-button {
    font-size: 16px;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>