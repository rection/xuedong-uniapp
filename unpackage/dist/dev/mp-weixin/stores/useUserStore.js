"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    // --- 1. 用户详细信息 ---
    userInfo: {
      username: "点击登录",
      avatar: "",
      gender: 0,
      // 0:保密, 1:男, 2:女
      phone: "",
      age: "",
      karma: 1,
      appAgeDays: 1
    },
    isLoggedIn: false,
    // --- 2. 打卡数据 ---
    totalDays: 0,
    lastCheckInDate: ""
  }),
  getters: {
    // 判断今天是否已打过卡
    isCheckedInToday: (state) => {
      const today = (/* @__PURE__ */ new Date()).toLocaleDateString();
      return state.lastCheckInDate === today;
    }
  },
  actions: {
    // --- 核心：初始化所有数据 ---
    hydrate() {
      const checkinData = common_vendor.index.getStorageSync("user_checkin_data");
      if (checkinData) {
        this.totalDays = checkinData.totalDays || 0;
        this.lastCheckInDate = checkinData.lastCheckInDate || "";
      }
      const userData = common_vendor.index.getStorageSync("user_info_data");
      if (userData) {
        this.userInfo = userData;
        this.isLoggedIn = true;
      }
    },
    // --- 功能 A: 打卡逻辑 (之前丢失的部分) ---
    checkIn() {
      const today = (/* @__PURE__ */ new Date()).toLocaleDateString();
      if (this.lastCheckInDate === today) {
        return false;
      }
      this.totalDays++;
      this.lastCheckInDate = today;
      this.saveCheckInToStorage();
      return true;
    },
    // 专门保存打卡数据
    saveCheckInToStorage() {
      common_vendor.index.setStorageSync("user_checkin_data", {
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
        username: "点击登录",
        avatar: "",
        gender: 0,
        phone: "",
        age: "",
        karma: 1,
        appAgeDays: 1
      };
      this.isLoggedIn = false;
      common_vendor.index.removeStorageSync("user_info_data");
    },
    // 专门保存用户数据
    saveUserToStorage() {
      common_vendor.index.setStorageSync("user_info_data", this.userInfo);
    }
  }
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/useUserStore.js.map
