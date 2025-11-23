"use strict";
const common_vendor = require("../common/vendor.js");
const useSignStore = common_vendor.defineStore("sign", () => {
  const getTodayString = () => {
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const signDays = common_vendor.ref(common_vendor.index.getStorageSync("sign_days") || 0);
  const lastSignDate = common_vendor.ref(common_vendor.index.getStorageSync("sign_last_date") || "");
  const isSigned = common_vendor.computed(() => {
    return lastSignDate.value === getTodayString();
  });
  const formattedDate = common_vendor.computed(() => {
    return getTodayString();
  });
  const handleCheckIn = () => {
    if (isSigned.value)
      return false;
    signDays.value += 1;
    lastSignDate.value = getTodayString();
    common_vendor.index.setStorageSync("sign_days", signDays.value);
    common_vendor.index.setStorageSync("sign_last_date", lastSignDate.value);
    return true;
  };
  return {
    signDays,
    isSigned,
    formattedDate,
    handleCheckIn
  };
});
exports.useSignStore = useSignStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/signStore.js.map
