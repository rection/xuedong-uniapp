// stores/useUserStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    // --- 1. 用户详细信息 ---
    userInfo: {
      username: '点击登录',
      avatar: '', 
      gender: 0, // 0:保密, 1:男, 2:女
      phone: '',
      age: '',
      karma: 1,
      appAgeDays: 1
    },
    isLoggedIn: false,

    // --- 2. 打卡数据 ---
    totalDays: 0,
    lastCheckInDate: '' 
  }),

  getters: {
    // 判断今天是否已打过卡
    isCheckedInToday: (state) => {
      const today = new Date().toLocaleDateString();
      return state.lastCheckInDate === today;
    }
  },

  actions: {
    // --- 核心：初始化所有数据 ---
    hydrate() {
      // 1. 读取打卡数据
      const checkinData = uni.getStorageSync('user_checkin_data');
      if (checkinData) {
        this.totalDays = checkinData.totalDays || 0;
        this.lastCheckInDate = checkinData.lastCheckInDate || '';
      }

      // 2. 读取用户信息
      const userData = uni.getStorageSync('user_info_data');
      if (userData) {
        this.userInfo = userData;
        this.isLoggedIn = true;
      }
    },

    // --- 功能 A: 打卡逻辑 (之前丢失的部分) ---
    checkIn() {
      const today = new Date().toLocaleDateString();

      // 如果今天已经打过了，返回 false
      if (this.lastCheckInDate === today) {
        return false;
      }

      // 执行打卡
      this.totalDays++;
      this.lastCheckInDate = today;

      // 保存打卡数据
      this.saveCheckInToStorage();
      return true;
    },

    // 专门保存打卡数据
    saveCheckInToStorage() {
      uni.setStorageSync('user_checkin_data', {
        totalDays: this.totalDays,
        lastCheckInDate: this.lastCheckInDate
      });
    },

    // --- 功能 B: 用户登录与资料逻辑 ---
    updateUserInfo(info) {
      this.userInfo = { ...this.userInfo, ...info };
      this.isLoggedIn = true;
      this.saveUserToStorage();
    },

    logout() {
      this.userInfo = {
        username: '点击登录',
        avatar: '',
        gender: 0,
        phone: '',
        age: '',
        karma: 1,
        appAgeDays: 1
      };
      this.isLoggedIn = false;
      // 清除用户信息缓存
      uni.removeStorageSync('user_info_data');
      
      // (可选) 如果你想退出登录同时也清除打卡记录，取消下面这行的注释
      // uni.removeStorageSync('user_checkin_data'); 
      // this.totalDays = 0;
    },

    // 专门保存用户数据
    saveUserToStorage() {
      uni.setStorageSync('user_info_data', this.userInfo);
    }
  }
});