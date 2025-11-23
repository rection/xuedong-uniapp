"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_usePostStore = require("../../stores/usePostStore.js");
const _sfc_main = {
  __name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const postStore = stores_usePostStore.usePostStore();
    const goToDetail = () => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/index?id=${props.post.id}`
      });
    };
    const handleLike = () => {
      common_vendor.index.__f__("log", "at components/PostCard/PostCard.vue:79", "点击了点赞，ID:", props.post.id);
      postStore.toggleLike(props.post.id);
    };
    const previewImage = (index) => {
      common_vendor.index.previewImage({
        urls: props.post.images,
        current: index
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.post.avatar
      }, __props.post.avatar ? {
        b: __props.post.avatar
      } : {
        c: common_vendor.t(__props.post.author ? __props.post.author[0] : "U")
      }, {
        d: common_vendor.t(__props.post.author),
        e: common_vendor.t(__props.post.createTime),
        f: common_vendor.t(__props.post.categoryName),
        g: common_vendor.t(__props.post.title),
        h: common_vendor.t(__props.post.content),
        i: __props.post.images && __props.post.images.length > 0
      }, __props.post.images && __props.post.images.length > 0 ? {
        j: common_vendor.f(__props.post.images, (img, index, i0) => {
          return {
            a: index,
            b: img,
            c: common_vendor.o(($event) => previewImage(index), index)
          };
        })
      } : {}, {
        k: common_vendor.t(__props.post.isLiked ? "❤️" : "⬆️"),
        l: __props.post.isLiked ? 1 : "",
        m: common_vendor.t(__props.post.likeCount),
        n: __props.post.isLiked ? 1 : "",
        o: common_vendor.o(handleLike),
        p: common_vendor.t(__props.post.commentCount),
        q: common_vendor.o(goToDetail)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4466858"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/PostCard/PostCard.js.map
