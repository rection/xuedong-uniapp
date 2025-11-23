"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "run",
  setup(__props) {
    const popup = common_vendor.ref(null);
    const msgType = common_vendor.ref("");
    const messageText = common_vendor.ref("");
    const isRun = common_vendor.ref(true);
    const countdown = common_vendor.ref(5);
    const onMin = (type) => {
      isRun.value = false;
      msgType.value = type;
      messageText.value = `这是一条${type}消息提示`;
      popup.value.open();
      startCountdown();
    };
    const closePopup = () => {
      popup.value.close();
    };
    const goRunMap = () => {
      common_vendor.index.navigateTo({
        // 确保路径以 / 开头，且文件名全小写（和你的实际文件名一致）
        url: "/pages-sports/sports/runmap",
        fail: (res) => {
          common_vendor.index.__f__("error", "at pages-sports/sports/run.vue:100", "跳转失败:", res);
          common_vendor.index.showToast({
            title: "找不到页面，请检查pages.json",
            icon: "none"
          });
        }
      });
    };
    const startCountdown = () => {
      const timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(timer);
          countdown.value = 5;
          common_vendor.index.vibrateShort({
            fail: () => common_vendor.index.__f__("log", "at pages-sports/sports/run.vue:121", "设备不支持震动，忽略")
          });
          goRunMap();
          closePopup();
          isRun.value = true;
        }
      }, 1e3);
    };
    const longitude = common_vendor.ref(114.201831);
    const latitude = common_vendor.ref(34.827675);
    const covers = common_vendor.reactive([{
      id: 0,
      title: "map",
      width: 40,
      height: 40,
      latitude: 34.82767,
      // 这里建议给个默认值，防止地图不显示图标
      longitude: 114.201835,
      iconPath: "../../static/images/ball.png"
    }]);
    const polygonsarray = [{
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
    }];
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isRun.value
      }, isRun.value ? {
        b: common_vendor.o(($event) => onMin("success")),
        c: common_vendor.o(($event) => onMin("success"))
      } : {}, {
        d: polygonsarray,
        e: latitude.value,
        f: longitude.value,
        g: covers,
        h: common_vendor.t(countdown.value),
        i: common_vendor.p({
          type: msgType.value,
          message: messageText.value,
          duration: 2e3
        }),
        j: common_vendor.sr(popup, "5b4a42c8-0", {
          "k": "popup"
        }),
        k: common_vendor.p({
          ["mask-click"]: false,
          type: "center"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-sports/sports/run.js.map
