"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_useUserStore = require("../../stores/useUserStore.js");
const _sfc_main = {
  __name: "LeftMenu",
  setup(__props) {
    const userStore = stores_useUserStore.useUserStore();
    const isAnimating = common_vendor.ref(false);
    const totalDays = common_vendor.computed(() => userStore.totalDays);
    const isCheckedIn = common_vendor.computed(() => userStore.isCheckedInToday);
    common_vendor.onMounted(() => {
      userStore.hydrate();
    });
    const handleCheckIn = () => {
      if (isCheckedIn.value) {
        common_vendor.index.showToast({ title: "今天已经打过卡啦~", icon: "none" });
        return;
      }
      isAnimating.value = true;
      setTimeout(() => isAnimating.value = false, 200);
      const success = userStore.checkIn();
      if (success) {
        common_vendor.index.showToast({ title: "打卡成功！+1", icon: "success" });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(isCheckedIn.value ? "🎉" : "📅"),
        b: common_vendor.t(isCheckedIn.value ? "今日已打卡" : "每日打卡"),
        c: common_vendor.t(totalDays.value),
        d: common_vendor.t(isCheckedIn.value ? "完成" : "GO"),
        e: isCheckedIn.value ? 1 : "",
        f: isAnimating.value ? 1 : "",
        g: common_vendor.o(handleCheckIn)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-242799f8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/LeftMenu/LeftMenu.js.map
