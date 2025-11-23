"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_useUserStore = require("../../stores/useUserStore.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const userStore = stores_useUserStore.useUserStore();
    const form = common_vendor.ref({});
    common_vendor.onMounted(() => {
      form.value = JSON.parse(JSON.stringify(userStore.userInfo));
    });
    const chooseAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          form.value.avatar = res.tempFilePaths[0];
        }
      });
    };
    const handleGenderChange = (e) => {
      form.value.gender = e.detail.value;
    };
    const saveProfile = () => {
      if (!form.value.username)
        return common_vendor.index.showToast({ title: "用户名不能为空", icon: "none" });
      userStore.updateUserInfo(form.value);
      common_vendor.index.showToast({ title: "保存成功", icon: "success" });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 1e3);
    };
    return (_ctx, _cache) => {
      return {
        a: form.value.avatar || "/static/default-avatar.png",
        b: common_vendor.o(chooseAvatar),
        c: form.value.username,
        d: common_vendor.o(($event) => form.value.username = $event.detail.value),
        e: common_vendor.t(["保密", "男", "女"][form.value.gender]),
        f: ["保密", "男", "女"],
        g: common_vendor.o(handleGenderChange),
        h: form.value.age,
        i: common_vendor.o(($event) => form.value.age = $event.detail.value),
        j: form.value.phone,
        k: common_vendor.o(($event) => form.value.phone = $event.detail.value),
        l: common_vendor.o(saveProfile)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5091c4c8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-my/my/my.js.map
