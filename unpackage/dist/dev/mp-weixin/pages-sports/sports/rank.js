"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "rank",
  setup(__props) {
    const range_options = common_vendor.ref(["全校", "院系", "班级"]);
    const range_options2 = common_vendor.ref(["全校", "院系"]);
    const range_option = common_vendor.ref(["全校"]);
    const rankTop = common_vendor.ref(["单次里程", "总里程", "总进度"]);
    common_vendor.ref(["女生榜", "男生榜"]);
    const topIndex = common_vendor.ref(1);
    const ong = common_vendor.ref(2);
    const onb = common_vendor.ref(1);
    const isStudent = common_vendor.ref(false);
    common_vendor.ref(false);
    const suoin = common_vendor.ref(0);
    const combineArr = common_vendor.ref([]);
    const first = common_vendor.ref({});
    const second = common_vendor.ref({});
    const third = common_vendor.ref({});
    const rank = common_vendor.ref();
    const isExist = common_vendor.ref(false);
    const schoolTotalMile = common_vendor.ref({
      sex: 2,
      rank: 0,
      id: 0
    });
    const deptTotalMile = common_vendor.ref({
      sex: 2,
      rank: 0,
      college: "",
      id: 0
    });
    const classTotalMile = common_vendor.ref({
      sex: 2,
      sclass: "",
      id: 0
    });
    const userNow = common_vendor.ref({
      id: 0,
      rank: 0
    });
    let teachRank = common_vendor.reactive({
      teacherIdlist: "",
      studnetIdlist: "",
      runningMileagelist: "",
      distance: "",
      runDistance: "",
      daytime: "",
      startTime: "",
      endTime: "",
      nickNamelist: "",
      imagelist: "",
      status: "",
      sort: "",
      id: 0
    });
    let nowRank = common_vendor.reactive({
      userNickname: "",
      image: "",
      runningMileage: 0,
      distance: 0,
      runDistance: 0,
      daytime: "",
      startTime: "",
      endTime: "",
      sex: ""
    });
    const getInfo = async () => {
      rank.value = common_vendor.index.getStorageSync("rank");
      if (rank.value == 1) {
        isStudent.value = true;
      } else if (rank.value == 3 && rank.value == 2) {
        isStudent.value = false;
      }
    };
    getInfo();
    const arr1 = common_vendor.ref([]);
    const arr2 = common_vendor.ref([]);
    const arr3 = common_vendor.ref([]);
    const arr4 = common_vendor.ref([]);
    const arr5 = common_vendor.ref([]);
    const arr6 = common_vendor.ref([]);
    const arr7 = common_vendor.ref([]);
    const arr8 = common_vendor.ref([]);
    const arr9 = common_vendor.ref([]);
    const arr10 = common_vendor.ref([]);
    const getTeaRan = () => {
      if (teachRank.teacherIdlist !== void 0 && teachRank.teacherIdlist !== null) {
        arr1.value = teachRank.teacherIdlist.split(",");
      }
      if (teachRank.studnetIdlist !== void 0 && teachRank.studnetIdlist !== null) {
        arr2.value = teachRank.studnetIdlist.split(",");
      }
      if (teachRank.runningMileagelist !== void 0 && teachRank.runningMileagelist !== null) {
        arr3.value = teachRank.runningMileagelist.split(",");
      }
      if (teachRank.distance !== void 0 && teachRank.distance !== null) {
        arr4.value = teachRank.distance.split(",");
      }
      if (teachRank.runDistance !== void 0 && teachRank.runDistance !== null) {
        arr5.value = teachRank.runDistance.split(",");
      }
      if (teachRank.daytime !== void 0 && teachRank.daytime !== null) {
        arr6.value = teachRank.daytime.split(",");
      }
      if (teachRank.startTime !== void 0 && teachRank.startTime !== null) {
        arr7.value = teachRank.startTime.split(",");
      }
      if (teachRank.endTime !== void 0 && teachRank.endTime !== null) {
        arr8.value = teachRank.endTime.split(",");
      }
      if (teachRank.nickNamelist !== void 0 && teachRank.nickNamelist !== null) {
        arr9.value = teachRank.nickNamelist.split(",");
      }
      if (teachRank.imagelist !== void 0 && teachRank.imagelist !== null) {
        arr10.value = teachRank.imagelist.split(",");
      }
      lianhe();
    };
    const lianhe = () => {
      if (arr1.value.length <= 0) {
        combineArr.value = arr2.value.map((item, index) => ({
          studentId: item,
          teacherId: arr1.value[index],
          runningMileage: arr3.value[index],
          each: arr4.value[index],
          persent: arr5.value[index],
          thisDay: arr6.value[index],
          start: arr7.value[index],
          end: arr8.value[index],
          nick: arr9.value[index],
          img: arr10.value[index]
        }));
      } else {
        combineArr.value = arr1.value.map((item, index) => ({
          teacherId: item,
          studentId: arr2.value[index],
          runningMileage: arr3.value[index],
          each: arr4.value[index],
          persent: arr5.value[index],
          thisDay: arr6.value[index],
          start: arr7.value[index],
          end: arr8.value[index],
          nick: arr9.value[index],
          img: arr10.value[index]
        }));
      }
    };
    const getNowUser = async () => {
      userNow.value.id = common_vendor.index.getStorageSync("id");
      userNow.value.rank = common_vendor.index.getStorageSync("rank");
      const res = await nowUser(userNow.value);
      nowRank = res.data;
    };
    const getTotalSch = async () => {
      schoolTotalMile.value.sex = ong.value;
      schoolTotalMile.value.id = common_vendor.index.getStorageSync("id");
      schoolTotalMile.value.rank = common_vendor.index.getStorageSync("rank");
      const res = await totalMileSch(schoolTotalMile.value);
      teachRank = res.data;
      getTeaRan();
      fst();
    };
    const getTotalDep = async () => {
      deptTotalMile.value.sex = ong.value;
      deptTotalMile.value.rank = common_vendor.index.getStorageSync("rank");
      deptTotalMile.value.id = common_vendor.index.getStorageSync("id");
      deptTotalMile.value.college = common_vendor.index.getStorageSync("college");
      const res = await totalMileDep(deptTotalMile.value);
      teachRank = res.data;
      getTeaRan();
      fst();
    };
    const getTotalCla = async () => {
      classTotalMile.value.sex = ong.value;
      classTotalMile.value.sclass = common_vendor.index.getStorageSync("sclass");
      classTotalMile.value.id = common_vendor.index.getStorageSync("id");
      const res = await totalMileCla(classTotalMile.value);
      teachRank = res.data;
      getTeaRan();
      fst();
    };
    const getEachSch = async () => {
      schoolTotalMile.value.sex = ong.value;
      schoolTotalMile.value.rank = common_vendor.index.getStorageSync("rank");
      schoolTotalMile.value.id = common_vendor.index.getStorageSync("id");
      const res = await eachMileSch(schoolTotalMile.value);
      teachRank = res.data;
      getTeaRan();
      fst();
    };
    const getEachDep = async () => {
      deptTotalMile.value.sex = ong.value;
      deptTotalMile.value.rank = common_vendor.index.getStorageSync("rank");
      deptTotalMile.value.id = common_vendor.index.getStorageSync("id");
      deptTotalMile.value.college = common_vendor.index.getStorageSync("college");
      const res = await eachMileDep(deptTotalMile.value);
      teachRank = res.data;
      getTeaRan();
      fst();
    };
    const getEachCla = async () => {
      classTotalMile.value.sex = ong.value;
      classTotalMile.value.sclass = common_vendor.index.getStorageSync("sclass");
      classTotalMile.value.id = common_vendor.index.getStorageSync("id");
      const res = await eachMileCla(classTotalMile.value);
      teachRank = res.data;
      getTeaRan();
      fst();
    };
    const getProSch = async () => {
      schoolTotalMile.value.sex = ong.value;
      schoolTotalMile.value.rank = common_vendor.index.getStorageSync("rank");
      schoolTotalMile.value.id = common_vendor.index.getStorageSync("id");
      const res = await totalProSch(schoolTotalMile.value);
      teachRank = res.data;
      getTeaRan();
      fst();
    };
    const onBg = (a) => {
      if (a == 2) {
        if (nowRank.sex == 2) {
          isExist.value = true;
        } else {
          isExist.value = false;
        }
        classTotalMile.value.sex = 2;
        deptTotalMile.value.sex = 2;
        schoolTotalMile.value.sex = 2;
        ong.value = 2;
        onb.value = 1;
        rankData();
      } else {
        if (nowRank.sex == 1) {
          isExist.value = true;
        } else {
          isExist.value = false;
        }
        classTotalMile.value.sex = 1;
        deptTotalMile.value.sex = 1;
        schoolTotalMile.value.sex = 1;
        onb.value = 2;
        ong.value = 1;
        rankData();
      }
    };
    const isTop = (index) => {
      if (index == 2) {
        suoin.value = 0;
      }
      topIndex.value = index;
      rankData();
    };
    const isRange = (r) => {
      suoin.value = r.detail.value;
      rankData();
    };
    const rankData = () => {
      if (topIndex.value == 0) {
        if (suoin.value == 0) {
          getEachSch();
          getNowUser();
        } else if (suoin.value == 1) {
          getEachDep();
          getNowUser();
        } else {
          getEachCla();
          getNowUser();
        }
      } else if (topIndex.value == 1) {
        if (suoin.value == 0) {
          getTotalSch();
          getNowUser();
        } else if (suoin.value == 1) {
          getTotalDep();
          getNowUser();
        } else {
          getTotalCla();
          getNowUser();
        }
      } else {
        getProSch();
        getNowUser();
      }
    };
    rankData();
    const fst = () => {
      first.value = combineArr.value[0] || {};
      second.value = combineArr.value[1] || {};
      third.value = combineArr.value[2] || {};
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => onBg(2)),
        b: ong.value == 2 ? 1 : "",
        c: common_vendor.o(($event) => onBg(1)),
        d: onb.value == 2 ? 1 : "",
        e: isStudent.value
      }, isStudent.value ? common_vendor.e({
        f: topIndex.value == 2
      }, topIndex.value == 2 ? {
        g: common_assets._imports_0$1,
        h: range_option.value,
        i: common_vendor.o(isRange),
        j: suoin.value
      } : {
        k: common_assets._imports_0$1,
        l: range_options.value,
        m: common_vendor.o(isRange),
        n: suoin.value
      }) : common_vendor.e({
        o: topIndex.value == 2
      }, topIndex.value == 2 ? {
        p: common_assets._imports_0$1,
        q: range_option.value,
        r: common_vendor.o(isRange),
        s: suoin.value
      } : {
        t: common_assets._imports_0$1,
        v: range_options2.value,
        w: common_vendor.o(isRange),
        x: suoin.value
      }), {
        y: common_vendor.f(rankTop.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => isTop(index), index),
            d: topIndex.value == index ? 1 : ""
          };
        }),
        z: topIndex.value == 2
      }, topIndex.value == 2 ? {
        A: second.value.img,
        B: common_vendor.t(second.value.nick),
        C: common_vendor.t(second.value.persent),
        D: common_vendor.t(second.value.thisDay),
        E: common_vendor.t(second.value.end),
        F: first.value.img,
        G: common_vendor.t(first.value.nick),
        H: common_vendor.t(first.value.persent),
        I: common_vendor.t(first.value.thisDay),
        J: common_vendor.t(first.value.end),
        K: third.value.img,
        L: common_vendor.t(third.value.nick),
        M: common_vendor.t(third.value.persent),
        N: common_vendor.t(third.value.thisDay),
        O: common_vendor.t(third.value.end)
      } : topIndex.value == 1 ? {
        Q: second.value.img,
        R: common_vendor.t(second.value.nick),
        S: common_vendor.t(second.value.runningMileage),
        T: first.value.img,
        U: common_vendor.t(first.value.nick),
        V: common_vendor.t(first.value.runningMileage),
        W: third.value.img,
        X: common_vendor.t(third.value.nick),
        Y: common_vendor.t(third.value.runningMileage)
      } : {
        Z: second.value.img,
        aa: common_vendor.t(second.value.nick),
        ab: common_vendor.t(second.value.each),
        ac: first.value.img,
        ad: common_vendor.t(first.value.nick),
        ae: common_vendor.t(first.value.each),
        af: third.value.img,
        ag: common_vendor.t(third.value.nick),
        ah: common_vendor.t(third.value.each)
      }, {
        P: topIndex.value == 1,
        ai: topIndex.value == 2
      }, topIndex.value == 2 ? common_vendor.e({
        aj: isExist.value
      }, isExist.value ? common_vendor.e({
        ak: common_vendor.unref(teachRank).sort == 2
      }, common_vendor.unref(teachRank).sort == 2 ? {} : {}, {
        al: common_vendor.unref(teachRank).sort == 1
      }, common_vendor.unref(teachRank).sort == 1 ? {} : {}, {
        am: common_vendor.unref(nowRank).image,
        an: common_vendor.t(common_vendor.unref(nowRank).userNickname),
        ao: common_vendor.t(common_vendor.unref(nowRank).runDistance),
        ap: common_vendor.t(common_vendor.unref(nowRank).daytime),
        aq: common_vendor.t(common_vendor.unref(nowRank).endTime)
      }) : {}, {
        ar: common_vendor.f(combineArr.value.slice(3), (item, index, i0) => {
          return {
            a: common_vendor.t(index + 3),
            b: item.img,
            c: common_vendor.t(item.nick),
            d: common_vendor.t(item.persent),
            e: item.teacherId
          };
        })
      }) : topIndex.value == 1 ? common_vendor.e({
        at: isExist.value
      }, isExist.value ? common_vendor.e({
        av: common_vendor.unref(teachRank).sort == 2
      }, common_vendor.unref(teachRank).sort == 2 ? {} : {}, {
        aw: common_vendor.unref(teachRank).sort == 1
      }, common_vendor.unref(teachRank).sort == 1 ? {} : {}, {
        ax: common_vendor.unref(nowRank).image,
        ay: common_vendor.t(common_vendor.unref(nowRank).userNickname),
        az: common_vendor.t(common_vendor.unref(nowRank).runningMileage)
      }) : {}, {
        aA: common_vendor.f(combineArr.value.slice(3), (item, index, i0) => {
          return {
            a: common_vendor.t(index + 3),
            b: item.img,
            c: common_vendor.t(item.nick),
            d: common_vendor.t(item.runningMileage),
            e: item.teacherId
          };
        })
      }) : common_vendor.e({
        aB: isExist.value
      }, isExist.value ? common_vendor.e({
        aC: common_vendor.unref(teachRank).sort == 2
      }, common_vendor.unref(teachRank).sort == 2 ? {} : {}, {
        aD: common_vendor.unref(teachRank).sort == 1
      }, common_vendor.unref(teachRank).sort == 1 ? {} : {}, {
        aE: common_vendor.unref(nowRank).image,
        aF: common_vendor.t(common_vendor.unref(nowRank).userNickname),
        aG: common_vendor.t(common_vendor.unref(nowRank).distance)
      }) : {}, {
        aH: common_vendor.f(combineArr.value.slice(3), (item, index, i0) => {
          return {
            a: common_vendor.t(index + 3),
            b: item.img,
            c: common_vendor.t(item.nick),
            d: common_vendor.t(item.each),
            e: item.teacherId
          };
        })
      }), {
        as: topIndex.value == 1
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages-sports/sports/rank.js.map
