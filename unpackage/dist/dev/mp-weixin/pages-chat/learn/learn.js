"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "learn",
  setup(__props) {
    const db = common_vendor.tr.database();
    const currentWord = common_vendor.ref(null);
    const showDefinition = common_vendor.ref(false);
    const loading = common_vendor.ref(true);
    const fetchNextWord = async () => {
      loading.value = true;
      showDefinition.value = false;
      try {
        const res = await db.collection("dict_cet4").limit(1).get({ getOne: true });
        if (res.result.data) {
          currentWord.value = res.result.data;
        } else {
          currentWord.value = null;
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages-chat/learn/learn.vue:57", "获取失败", e);
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      } finally {
        loading.value = false;
      }
    };
    const handleResult = async (status) => {
      const nextReview = status === 0 ? Date.now() + 3e5 : Date.now() + 864e5;
      try {
        await db.collection("user_word_records").add({
          word_id: currentWord.value._id,
          status,
          next_review_time: nextReview,
          create_date: Date.now()
        });
        common_vendor.index.showToast({ title: status === 1 ? "太棒了" : "继续加油", icon: "none" });
        fetchNextWord();
      } catch (e) {
        common_vendor.index.__f__("error", "at pages-chat/learn/learn.vue:86", "保存进度失败", e);
      }
    };
    common_vendor.onMounted(() => {
      fetchNextWord();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : currentWord.value ? common_vendor.e({
        c: common_vendor.t(currentWord.value.word),
        d: common_vendor.t(currentWord.value.phonetic),
        e: showDefinition.value
      }, showDefinition.value ? {
        f: common_vendor.t(currentWord.value.translation)
      } : {
        g: common_vendor.o(($event) => showDefinition.value = true)
      }, {
        h: showDefinition.value
      }, showDefinition.value ? {
        i: common_vendor.o(($event) => handleResult(0)),
        j: common_vendor.o(($event) => handleResult(1))
      } : {}) : {}, {
        b: currentWord.value
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-chat/learn/learn.js.map
