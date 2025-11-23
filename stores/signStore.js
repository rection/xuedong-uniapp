// stores/signStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSignStore = defineStore('sign', () => {
  
  // 获取今天的日期字符串 YYYY-MM-DD
  const getTodayString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // State: 读取本地缓存
  const signDays = ref(uni.getStorageSync('sign_days') || 0); // 总签到天数
  const lastSignDate = ref(uni.getStorageSync('sign_last_date') || ''); // 上次签到日期

  // Getter: 判断今天是否已签到
  const isSigned = computed(() => {
    return lastSignDate.value === getTodayString();
  });

  // Getter: 格式化日期显示
  const formattedDate = computed(() => {
    return getTodayString();
  });

  // Action: 签到逻辑
  const handleCheckIn = () => {
    if (isSigned.value) return false; // 今天已签到，不执行

    // 更新数据
    signDays.value += 1;
    lastSignDate.value = getTodayString();

    // 存入本地缓存 (持久化)
    uni.setStorageSync('sign_days', signDays.value);
    uni.setStorageSync('sign_last_date', lastSignDate.value);

    return true;
  };

  return {
    signDays,
    isSigned,
    formattedDate,
    handleCheckIn
  };
});