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
  __name: "community",
  setup(__props) {
    composables_useTabDrawerCloser.useTabDrawerCloser();
    const postStore = stores_usePostStore.usePostStore();
    const categories = common_vendor.computed(() => postStore.categories);
    const currentCategoryId = common_vendor.ref(0);
    const filteredPosts = common_vendor.computed(() => {
      if (currentCategoryId.value === 0) {
        return postStore.posts;
      }
      return postStore.posts.filter((p) => p.categoryId === currentCategoryId.value);
    });
    return (_ctx, _cache) => {
      return {
        a: currentCategoryId.value === 0 ? 1 : "",
        b: common_vendor.o(($event) => currentCategoryId.value = 0),
        c: common_vendor.f(categories.value, (cat, k0, i0) => {
          return {
            a: common_vendor.t(cat.icon),
            b: common_vendor.t(cat.name),
            c: cat.id,
            d: currentCategoryId.value === cat.id ? 1 : "",
            e: common_vendor.o(($event) => currentCategoryId.value = cat.id, cat.id)
          };
        }),
        d: common_vendor.f(filteredPosts.value, (post, k0, i0) => {
          return {
            a: "a6ef5318-1-" + i0 + ",a6ef5318-0",
            b: common_vendor.p({
              post
            }),
            c: post.id
          };
        }),
        e: common_vendor.p({
          title: "社区"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a6ef5318"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/community/community.js.map
