"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_usePostStore = require("../../stores/usePostStore.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const postStore = stores_usePostStore.usePostStore();
    const postId = common_vendor.ref(null);
    const commentText = common_vendor.ref("");
    const post = common_vendor.computed(() => {
      return postStore.getPostById(postId.value);
    });
    common_vendor.onLoad((options) => {
      if (options.id) {
        postId.value = Number(options.id);
      }
    });
    const handleLike = () => {
      postStore.toggleLike(postId.value);
    };
    const submitComment = () => {
      if (!commentText.value.trim())
        return;
      postStore.addComment(postId.value, commentText.value);
      common_vendor.index.showToast({ title: "评论成功", icon: "none" });
      commentText.value = "";
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: post.value
      }, post.value ? common_vendor.e({
        b: common_vendor.t(post.value.author[0]),
        c: common_vendor.t(post.value.author),
        d: common_vendor.t(post.value.createTime),
        e: common_vendor.t(post.value.categoryName),
        f: common_vendor.t(post.value.title),
        g: common_vendor.t(post.value.content),
        h: post.value.images && post.value.images.length
      }, post.value.images && post.value.images.length ? {
        i: common_vendor.f(post.value.images, (img, idx, i0) => {
          return {
            a: idx,
            b: img
          };
        })
      } : {}, {
        j: common_vendor.t(post.value.isLiked ? "❤️" : "🤍"),
        k: common_vendor.t(post.value.likeCount),
        l: post.value.isLiked ? 1 : "",
        m: common_vendor.o(handleLike),
        n: common_vendor.t(post.value.commentCount),
        o: common_vendor.f(post.value.comments, (comment, k0, i0) => {
          return {
            a: common_vendor.t(comment.author[0]),
            b: common_vendor.t(comment.author),
            c: common_vendor.t(comment.time),
            d: common_vendor.t(comment.content),
            e: comment.id
          };
        }),
        p: post.value.comments.length === 0
      }, post.value.comments.length === 0 ? {} : {}, {
        q: common_vendor.o(submitComment),
        r: commentText.value,
        s: common_vendor.o(($event) => commentText.value = $event.detail.value),
        t: !commentText.value,
        v: common_vendor.o(submitComment)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2fd5b0a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/index.js.map
