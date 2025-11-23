"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/Login/login.js";
  "./pages/index/index.js";
  "./pages/community/community.js";
  "./pages/create/create.js";
  "./pages/chat/chat.js";
  "./pages/sports/sports.js";
  "./pages/detail/index.js";
  "./pages-sports/sports/rank.js";
  "./pages-sports/sports/run.js";
  "./pages-sports/sports/runmap.js";
  "./pages-sports/sports/records.js";
  "./pages-my/my/my.js";
  "./pages-my/setting/setting.js";
  "./pages-chat/learn/learn.js";
  "./pages-chat/review/review.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
const pinia = common_vendor.createPinia();
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
