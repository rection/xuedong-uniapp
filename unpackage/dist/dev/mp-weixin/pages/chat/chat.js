"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const composables_useTabDrawerCloser = require("../../composables/useTabDrawerCloser.js");
const stores_signStore = require("../../stores/signStore.js");
if (!Array) {
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_GlobalLayout2 = common_vendor.resolveComponent("GlobalLayout");
  (_easycom_uni_badge2 + _easycom_uni_icons2 + _easycom_GlobalLayout2)();
}
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_GlobalLayout = () => "../../components/GlobalLayout/GlobalLayout.js";
if (!Math) {
  (_easycom_uni_badge + _easycom_uni_icons + _easycom_GlobalLayout)();
}
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    composables_useTabDrawerCloser.useTabDrawerCloser();
    const signStore = stores_signStore.useSignStore();
    let learned = common_vendor.ref(1);
    let reviewed = common_vendor.ref(1);
    const onCheckInClick = () => {
      const success = signStore.handleCheckIn();
      if (success) {
        common_vendor.index.showToast({ title: "签到成功", icon: "success" });
      } else {
        common_vendor.index.showToast({ title: "今日已签到啦~", icon: "none" });
      }
    };
    const learnCi = () => {
      setTimeout(() => {
        common_vendor.index.navigateTo({ url: "/pages-chat/learn/learn" });
      }, 500);
    };
    const reviewCi = () => {
      setTimeout(() => {
        common_vendor.index.navigateTo({ url: "/pages-chat/review/review" });
      }, 500);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_assets._imports_0,
        c: common_vendor.p({
          text: "2",
          type: "error",
          absolute: "rightTop",
          offset: [-5, -5]
        }),
        d: common_vendor.p({
          type: common_vendor.unref(signStore).isSigned ? "checkbox-filled" : "calendar-filled",
          size: "32",
          color: "#333"
        }),
        e: !common_vendor.unref(signStore).isSigned
      }, !common_vendor.unref(signStore).isSigned ? {} : {
        f: common_vendor.t(common_vendor.unref(signStore).signDays)
      }, {
        g: common_vendor.t(common_vendor.unref(signStore).formattedDate),
        h: common_vendor.o(onCheckInClick),
        i: common_vendor.o(learnCi),
        j: common_vendor.t(common_vendor.unref(learned)),
        k: common_vendor.o(reviewCi),
        l: common_vendor.t(common_vendor.unref(reviewed)),
        m: common_vendor.o(() => {
        }),
        n: common_vendor.p({
          title: "学习"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a633310"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chat/chat.js.map
