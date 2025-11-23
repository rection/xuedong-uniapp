"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // --- 地图核心数据 ---
      latitude: 34.827381,
      longitude: 114.204921,
      // --- 跑步数据 ---
      distanceVal: "0.00",
      timeStr: "00:00:00",
      startTime: 0,
      timer: null,
      // --- 地图覆盖物 ---
      covers: [{
        id: 0,
        latitude: 34.82767,
        longitude: 114.201835,
        width: 30,
        height: 30,
        iconPath: "/static/images/ball.png"
        // 确保路径以 / 开头
      }],
      // 轨迹
      // pages-sports/sports/runmap.vue 的 data() 中
      // pages-sports/sports/runmap.vue 的 data() 中
      polyline: [{
        points: [
          // 【必须至少有两个点】地图才能画出线来，哪怕这两个点是重叠的！
          { latitude: 34.827675, longitude: 114.201831 },
          { latitude: 34.827675, longitude: 114.201831 }
          // 👈 复制这一行，凑够两个点
        ],
        color: "#31c27c",
        width: 4,
        arrowLine: true
        // 为了保险起见，这行最好还是直接删掉
      }],
      // 电子围栏
      polygonsarray: [{
        points: [
          {
            latitude: 34.831042,
            longitude: 114.20018
          },
          {
            latitude: 34.828483,
            longitude: 114.200195
          },
          {
            latitude: 34.826494,
            longitude: 114.20039
          },
          {
            latitude: 34.825798,
            longitude: 114.200257
          },
          {
            latitude: 34.824146,
            longitude: 114.200257
          },
          {
            latitude: 34.82402,
            longitude: 114.20147
          },
          {
            latitude: 34.824007,
            longitude: 114.204526
          },
          {
            latitude: 34.824096,
            longitude: 114.205724
          },
          {
            latitude: 34.8242,
            longitude: 114.208264
          },
          {
            latitude: 34.824704,
            longitude: 114.209355
          },
          {
            latitude: 34.824894,
            longitude: 114.209892
          },
          //外圈
          {
            latitude: 34.825083,
            longitude: 114.210046
          },
          {
            latitude: 34.825864,
            longitude: 114.210061
          },
          {
            latitude: 34.827453,
            longitude: 114.210015
          },
          {
            latitude: 34.829155,
            longitude: 114.209985
          },
          {
            latitude: 34.829445,
            longitude: 114.209939
          },
          {
            latitude: 34.82947,
            longitude: 114.208157
          },
          {
            latitude: 34.8301,
            longitude: 114.208111
          },
          {
            latitude: 34.830491,
            longitude: 114.20808
          },
          {
            latitude: 34.831134,
            longitude: 114.20656
          },
          {
            latitude: 34.831159,
            longitude: 114.204333
          },
          {
            latitude: 34.831096,
            longitude: 114.20206
          },
          {
            latitude: 34.831058,
            longitude: 114.200278
          },
          {
            latitude: 34.830763,
            longitude: 114.20045
          },
          {
            latitude: 34.829692,
            longitude: 114.200366
          },
          {
            latitude: 34.828172,
            longitude: 114.200345
          },
          {
            latitude: 34.82762,
            longitude: 114.200429
          },
          {
            latitude: 34.827309,
            longitude: 114.201586
          },
          {
            latitude: 34.827326,
            longitude: 114.202554
          },
          {
            latitude: 34.828311,
            longitude: 114.202765
          },
          {
            latitude: 34.830383,
            longitude: 114.202807
          },
          {
            latitude: 34.830435,
            longitude: 114.202849
          },
          {
            latitude: 34.830919,
            longitude: 114.201628
          },
          {
            latitude: 34.830901,
            longitude: 114.200513
          }
        ],
        strokeColor: "#1E90FF",
        fillColor: "#1E90FF33",
        width: 2
      }]
    };
  },
  // 页面生命周期：页面初次渲染完成
  onReady() {
    common_vendor.index.__f__("log", "at pages-sports/sports/runmap.vue:223", "地图页面已就绪");
    this.initRun();
  },
  // 页面生命周期：页面卸载
  onUnload() {
    this.stopRun();
  },
  methods: {
    // 初始化跑步逻辑
    initRun() {
      this.startTime = Date.now();
      this.timer = setInterval(() => {
        const diff = Math.floor((Date.now() - this.startTime) / 1e3);
        const h = Math.floor(diff / 3600).toString().padStart(2, "0");
        const m = Math.floor(diff % 3600 / 60).toString().padStart(2, "0");
        const s = (diff % 60).toString().padStart(2, "0");
        this.timeStr = `${h}:${m}:${s}`;
      }, 1e3);
      common_vendor.index.startLocationUpdateBackground({
        success: () => {
          common_vendor.index.__f__("log", "at pages-sports/sports/runmap.vue:249", "后台定位开启成功");
          common_vendor.index.onLocationChange(this.onLocationChange);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages-sports/sports/runmap.vue:254", "定位开启失败，请检查manifest权限", err);
          common_vendor.index.showToast({ title: "定位失败", icon: "none" });
        }
      });
    },
    // 位置变化回调
    onLocationChange(res) {
      this.latitude = res.latitude;
      this.longitude = res.longitude;
      this.covers[0].latitude = res.latitude;
      this.covers[0].longitude = res.longitude;
      this.polyline[0].points.push({
        latitude: res.latitude,
        longitude: res.longitude
      });
    },
    // 点击退出按钮
    handleStopRun() {
      common_vendor.index.showModal({
        title: "结束跑步",
        content: `本次跑步时长：${this.timeStr}
确定结束吗？`,
        confirmText: "结束",
        confirmColor: "#ff4d4f",
        success: (res) => {
          if (res.confirm) {
            this.stopRun();
            common_vendor.index.navigateBack();
          }
        }
      });
    },
    // 停止运行清理
    stopRun() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      common_vendor.index.stopLocationUpdate();
      common_vendor.index.offLocationChange(this.onLocationChange);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.distanceVal),
    b: common_vendor.t($data.timeStr),
    c: $data.latitude,
    d: $data.longitude,
    e: $data.polygonsarray,
    f: $data.covers,
    g: $data.polyline,
    h: common_vendor.o((...args) => $options.handleStopRun && $options.handleStopRun(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aa42b794"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-sports/sports/runmap.js.map
