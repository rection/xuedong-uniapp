"use strict";
const common_vendor = require("../../common/vendor.js");
const composables_useTabDrawerCloser = require("../../composables/useTabDrawerCloser.js");
const stores_usePostStore = require("../../stores/usePostStore.js");
if (!Array) {
  const _easycom_GlobalLayout2 = common_vendor.resolveComponent("GlobalLayout");
  _easycom_GlobalLayout2();
}
const _easycom_GlobalLayout = () => "../../components/GlobalLayout/GlobalLayout.js";
if (!Math) {
  (PostCard + _easycom_GlobalLayout)();
}
const PostCard = () => "../../components/PostCard/PostCard.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    composables_useTabDrawerCloser.useTabDrawerCloser();
    const postStore = stores_usePostStore.usePostStore();
    const posts = common_vendor.computed(() => postStore.posts);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(posts.value, (post, k0, i0) => {
          return {
            a: "1cf27b2a-1-" + i0 + ",1cf27b2a-0",
            b: common_vendor.p({
              post
            }),
            c: post.id
          };
        }),
        b: posts.value.length === 0
      }, posts.value.length === 0 ? {} : {}, {
        c: common_vendor.p({
          title: "主页"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
