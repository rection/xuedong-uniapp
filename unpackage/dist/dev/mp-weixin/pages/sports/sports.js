"use strict";
const common_vendor = require("../../common/vendor.js");
const composables_useTabDrawerCloser = require("../../composables/useTabDrawerCloser.js");
if (!Array) {
  const _easycom_GlobalLayout2 = common_vendor.resolveComponent("GlobalLayout");
  _easycom_GlobalLayout2();
}
const _easycom_GlobalLayout = () => "../../components/GlobalLayout/GlobalLayout.js";
if (!Math) {
  _easycom_GlobalLayout();
}
const _sfc_main = {
  __name: "sports",
  setup(__props) {
    composables_useTabDrawerCloser.useTabDrawerCloser();
    const progress = common_vendor.ref(0);
    const totalDistance = common_vendor.ref(0);
    common_vendor.ref(0);
    const nickname = common_vendor.ref("");
    const image = common_vendor.ref(null);
    common_vendor.ref(60);
    const goRecords = () => {
      common_vendor.index.navigateTo({
        url: "/pages-sports/sports/records"
      });
    };
    function goRun() {
      common_vendor.index.navigateTo({
        url: "/pages-sports/sports/run"
      });
    }
    const GetProgress = () => {
      return `background: conic-gradient(skyblue 0deg, skyblue ${progress.value}deg, transparent ${progress.value}deg, transparent 360deg);`;
    };
    const onRank = () => {
      common_vendor.index.navigateTo({
        url: "/pages-sports/sports/rank"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(totalDistance.value),
        b: image.value,
        c: common_vendor.t(nickname.value),
        d: common_vendor.s(GetProgress()),
        e: common_vendor.o(goRun),
        f: common_vendor.o(onRank),
        g: common_vendor.o(goRecords),
        h: common_vendor.p({
          title: "运动"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd6cce7c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/sports/sports.js.map
