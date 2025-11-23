"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_useUserStore = require("../../stores/useUserStore.js");
const _sfc_main = {
  __name: "RightProfile",
  setup(__props) {
    const userStore = stores_useUserStore.useUserStore();
    const userInfo = common_vendor.computed(() => userStore.userInfo);
    const isLoggedIn = common_vendor.computed(() => userStore.isLoggedIn);
    const handleHeaderClick = () => {
      if (!isLoggedIn.value) {
        common_vendor.index.navigateTo({ url: "/pages/Login/login" });
      } else {
        goToProfile();
      }
    };
    const goToProfile = () => {
      if (!isLoggedIn.value) {
        return common_vendor.index.navigateTo({ url: "/pages/Login/login" });
      }
      common_vendor.index.navigateTo({ url: "/pages-my/my/my" });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            userStore.logout();
            common_vendor.index.showToast({ title: "已退出", icon: "none" });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/Login/login"
              });
            }, 800);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value.avatar
      }, userInfo.value.avatar ? {
        b: userInfo.value.avatar
      } : {
        c: common_vendor.t(userInfo.value.username[0])
      }, {
        d: common_vendor.t(userInfo.value.username),
        e: common_vendor.o(handleHeaderClick),
        f: common_vendor.t(userInfo.value.karma),
        g: common_vendor.t(userInfo.value.appAgeDays),
        h: common_vendor.o(goToProfile),
        i: isLoggedIn.value
      }, isLoggedIn.value ? {
        j: common_vendor.o(handleLogout)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef2d0c5a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/RightProfile/RightProfile.js.map
