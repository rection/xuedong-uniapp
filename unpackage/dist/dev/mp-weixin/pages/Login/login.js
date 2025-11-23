"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_useUserStore = require("../../stores/useUserStore.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const username = common_vendor.ref("");
    const userStore = stores_useUserStore.useUserStore();
    const handleLogin = () => {
      if (!username.value.trim())
        return common_vendor.index.showToast({ title: "请输入用户名", icon: "none" });
      const initData = {
        username: username.value,
        avatar: "",
        // 可以在这里设置默认头像
        karma: 1,
        appAgeDays: 1,
        gender: 0,
        phone: "",
        age: ""
      };
      userStore.updateUserInfo(initData);
      common_vendor.index.showToast({ title: "登录成功", icon: "success" });
      setTimeout(() => {
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      }, 1e3);
    };
    return (_ctx, _cache) => {
      return {
        a: username.value,
        b: common_vendor.o(($event) => username.value = $event.detail.value),
        c: common_vendor.o(handleLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef4c4b0c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Login/login.js.map
