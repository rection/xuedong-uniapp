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
  _easycom_GlobalLayout();
}
const _sfc_main = {
  __name: "create",
  setup(__props) {
    composables_useTabDrawerCloser.useTabDrawerCloser();
    const postStore = stores_usePostStore.usePostStore();
    const categories = common_vendor.computed(() => postStore.categories);
    const selectedCategory = common_vendor.ref(null);
    const formData = common_vendor.ref({
      title: "",
      content: "",
      images: []
    });
    const onCategoryChange = (e) => {
      const index = e.detail.value;
      selectedCategory.value = categories.value[index];
    };
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 9 - formData.value.images.length,
        success: (res) => {
          formData.value.images = [...formData.value.images, ...res.tempFilePaths];
        }
      });
    };
    const removeImage = (index) => {
      formData.value.images.splice(index, 1);
    };
    const submitPost = () => {
      if (!selectedCategory.value)
        return common_vendor.index.showToast({ title: "请选择版块", icon: "none" });
      if (!formData.value.title)
        return common_vendor.index.showToast({ title: "请输入标题", icon: "none" });
      if (!formData.value.content)
        return common_vendor.index.showToast({ title: "请输入内容", icon: "none" });
      postStore.addPost({
        title: formData.value.title,
        content: formData.value.content,
        images: formData.value.images,
        categoryId: selectedCategory.value.id,
        categoryName: selectedCategory.value.name
      });
      common_vendor.index.showToast({ title: "发布成功" });
      formData.value = { title: "", content: "", images: [] };
      selectedCategory.value = null;
      setTimeout(() => {
        common_vendor.index.switchTab({ url: "/pages/index/index" });
      }, 1e3);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(selectedCategory.value ? selectedCategory.value.name : "点击选择板块 >"),
        b: categories.value,
        c: common_vendor.o(onCategoryChange),
        d: formData.value.title,
        e: common_vendor.o(($event) => formData.value.title = $event.detail.value),
        f: formData.value.content,
        g: common_vendor.o(($event) => formData.value.content = $event.detail.value),
        h: common_vendor.f(formData.value.images, (img, index, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => removeImage(index), index),
            c: index
          };
        }),
        i: formData.value.images.length < 9
      }, formData.value.images.length < 9 ? {
        j: common_vendor.o(chooseImage)
      } : {}, {
        k: common_vendor.o(submitPost),
        l: common_vendor.p({
          title: "创建"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98f0e4ec"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/create/create.js.map
