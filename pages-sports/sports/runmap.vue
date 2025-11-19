<template>
	<map class="map" :scale="16" @click="go" :latitude="latitude" :longitude="longitude" show-compass
		:polygons="polygonsarray" :markers="covers" :show-location="true" :polyline="polyline">
		<!-- <map style="width: 750rpx;height: 1450rpx;" :polygons="polygonsarray" :latitude='latitude'
		:longitude='longitude' :markers="covers">
	</map> -->
		<view class="bigbox">
			<view class="box1">
				<text>里程</text>
				<text class="lctext"> {{ distance.distance }} km</text>
			</view>
			<view class="box3"></view>
			<view class="box2">
				<view class="time">
					<text>计时</text>
					<text> {{ distance.time }}</text>
				</view>
				<view class="speed">
					<view>平均配速</view>
					<view> {{ distance.avgPace }} m/s</view>
				</view>
			</view>
		</view>
		<button class="btn" @click="gotorun">退出跑步</button>
		<!-- 退出跑步弹出层 -->
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="popup-content">
				<text class="font">本次校园跑</text>
				<text class="fontone">里程数</text>
				<text class="fonttwo">{{ distance.distance }}</text>
				<text class="fontthere">km</text>
				<view class="button">
					<button class="btnrun1" @click="goon">继续跑步</button>
					<button class="btnrun2" @click="gorun">确定退出</button>
				</view>
			</view>
		</uni-popup>
		<!-- 超出范围提示框 -->
		<uni-popup ref="alertDialog" :mask-click="false">
			<view class="popup-content-Dialog">
				<text class="texterror">警告</text>
				<text class="text">你已超出当前规定范围！</text>
				<text class="text">请在{{ countdown }}s内回到规定的区域！</text>
			</view>
		</uni-popup>
	</map>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onBeforeUnmount
	} from "vue";
	// import {
	// 	receiveRunData
	// } from "../../api/all.js"
	// import {
	// 	countDown,
	// 	deletetime,
	// 	pauseTimer,
	// 	resumeTimer,
	// 	startTimer
	// } from '../../utils/time.js'
	//定时器实例（开始跑步）
	const timer = ref(null);
	const countdowntimer = ref(null);
	//消息提示框实例
	const alertDialog = ref(null);
	//获取定时器开始的时间
	const inputTime = new Date()
	//实时获取跑步进行的时间(s)
	const time = ref(0)
	// 60s倒计时
	const countdown = ref(60)
	//判断教师还是学生
	const rank = ref(0)
	//提示消息
	const showToastlist = ref({
		icon: "none",
		title: "",
	});
	//这里需要建一个额外的预存储列表
	const pre_polyline = reactive([{
		points: [],
	}])
	//创建存储位置信息的列表
	const polyline = reactive([{
		points: [],
		//彩虹线
		// arrowLine: true和color不能同时使用   bug
		colorList: ['#31c27c'],
		arrowLine: true,
		width: 3,
		dottedLine: false,
		// length: 0.1, // 箭头线的长度
	}]);
	//创建距离等信息的列表
	const distance = ref({
		distance: 0, //距离
		avgPace: "", //速度
		startTime: "", //开始时间
		time: "", //跑步时间
		endTime: "", //结束时间
		// daytime: "", //本次跑步日期
		// status: 0,
		rank: null,
		teacherId: null,
		studentId: null
	})
	// distance.value.number = uni.getStorageSync("num");
	distance.value.rank = uni.getStorageSync("rank");
	distance.value.id = uni.getStorageSync("id")
	//内置方法，点击地图获得经纬度
	const go = (e) => {
		console.log(e);
		// console.log(e.detail);
	}
	const popup = ref(null);
	//跳转到跑步页面
	const gotorun = () => {
		//位置暂停
		// pauseTracking();
		clearInterval(timer.value)
		//时间暂停
		pauseTimer()
		popup.value.open()
		// getstudata()
		distance.value.distance = 0
	}


	//定义音乐播放
	const audioCtx = wx.createInnerAudioContext();

	audioCtx.src = 'http://www.yinsuge.com/d/file/p/2020/07-10/1db34042c92faa2223aeb21ce500c89d.mp3'; // 音频文件的路径
	audioCtx.autoplay = true; // 是否自动播放
	audioCtx.loop = false; // 是否循环播放
	audioCtx.onPlay(() => {
		console.log('开始播放');
	});
	audioCtx.onError((res) => {
		console.error('播放失败', res.errMsg);
	});
	let countdowntime = 60
	//定义一个定时器函数
	const interval = () => {
		const countdowntimer = setInterval((() => {
			countdowntime--
			audioCtx.play(); //播放声音(超出范围)
			if (countdowntime >= 0) {
				countdown.value = countdowntime
				//震动开始
				wx.vibrateLong({
					success(res) {
						console.log('短时震动成功');
					},
					fail(err) {
						console.error('短时震动失败', err);
					}
				})
			} else {
				clearInterval(countdowntimer)
				countdowntime = 60
				console.log("倒计时结束,成绩无效！");
				uni.navigateBack({
					url: "run",
				});
			}
		}), 1000)
	}
	// //本次跑步日期 年-月-日
	// const getCurrentDate = () => {
	// 	let now = new Date();
	// 	let year = now.getFullYear();
	// 	let month = now.getMonth() + 1;
	// 	let day = now.getDate();
	// 	return year + ":" + month + ":" + day;
	// }
	//开始结束日期 时-分-秒
	const getHmsTime = () => {
		let now = new Date();
		//时
		let hour = now.getHours();
		hour = hour < 10 ? '0' + hour : hour;
		//分
		let minute = now.getMinutes();
		minute = minute < 10 ? '0' + minute : minute;
		//秒
		let second = now.getSeconds();
		second = second < 10 ? '0' + second : second
		return hour + ":" + minute + ":" + second;
	}
	//退回到跑步主页面
	const gorun = () => {
		// 发请求，成功之后清除定时器，返回上一页
		// clearInterval(timer.value);
		uni.navigateBack({
			url: "run",
		});
		clearInterval(timer.value)
		//本次跑步日期
		// const nowtime = getCurrentDate();
		// console.log(nowtime);
		// distance.value.daytime = nowtime
		//获取当前时间的完整日期字符串
		// const date = new Date().getTime();
		const date = getHmsTime();
		// distance.value.status = 1;
		// console.log(date);
		distance.value.endTime = date;
		postrundata()
	}

	//继续跑步
	const goon = () => {
		resumeTimer()
		//locationbackground();
		popup.value.close()
	}

	//中心精度
	const longitude = ref(114.29963997797631);
	// 中心维度
	const latitude = ref(34.819942537402675);
	//当前位置及图标
	const covers = reactive(
		[{
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			width: 40., //宽
			height: 40, //高
			latitude: "", // 纬度
			longitude: "", // 经度
			iconPath: "../../static/images/ball.png",
		}, ]);
	//在地图上圈圈的经纬度数组
	const polygonsarray = [{
		points: [{
				latitude: 34.82258363375708,
				longitude: 114.29657892575403
			},
			{
				latitude: 34.81935106916706,
				longitude: 114.29642007706457
			},
			{
				latitude: 34.816440509500474,
				longitude: 114.29642007706457
			},
			{
				latitude: 34.81642505554147,
				longitude: 114.2990858911154
			},
			{
				latitude: 34.81777890293356,
				longitude: 114.2997361317764
			},
			{
				latitude: 34.818487212527124,
				longitude: 114.30088785703731
			},
			{
				latitude: 34.81878719699698,
				longitude: 114.3035779042608
			},
			{
				latitude: 34.82130039511718,
				longitude: 114.30305934810735
			},
			{
				latitude: 34.82268538259811,
				longitude: 114.30106281341409
			},
			{
				latitude: 34.822782888650345,
				longitude: 114.2971053193371
			},
			{
				latitude: 34.82258363375708,
				longitude: 114.29657892575403
			}, //外圈
			{
				latitude: 34.82226375990623,
				longitude: 114.29725293635761
			},
			{
				latitude: 34.82008803955604,
				longitude: 114.29724161175443
			},
			{
				latitude: 34.81744003256819,
				longitude: 114.29720870580786
			},
			{
				latitude: 34.81783395253705,
				longitude: 114.29869993994532
			},
			{
				latitude: 34.818247217539415,
				longitude: 114.2991245929785
			},
			{
				latitude: 34.818797861819604,
				longitude: 114.29983119166081
			},
			{
				latitude: 34.81903750791217,
				longitude: 114.30045491294948
			},
			{
				latitude: 34.81909607230631,
				longitude: 114.30170490867886
			},
			{
				latitude: 34.81917459849804,
				longitude: 114.3019746953396
			},
			{
				latitude: 34.81915701567685,
				longitude: 114.30294510017598
			},
			{
				latitude: 34.81954608957878,
				longitude: 114.30300851347306
			},
			{
				latitude: 34.81992536165093,
				longitude: 114.30288658702807
			},
			{
				latitude: 34.82074209461848,
				longitude: 114.30280039689671
			},
			{
				latitude: 34.82135511973474,
				longitude: 114.30252269952325
			},
			{
				latitude: 34.82169278061147,
				longitude: 114.30216996543845
			},
			{
				latitude: 34.822469125304806,
				longitude: 114.30086104193504
			},
			{
				latitude: 34.82240325151242,
				longitude: 114.29968485368624
			},
			{
				latitude: 34.82214888300385,
				longitude: 114.29964623313128
			},
			{
				latitude: 34.82211107215139,
				longitude: 114.2982188241973
			},
			{
				latitude: 34.82226375990623,
				longitude: 114.29725293635761
			},
		],
		strokeColor: "#1E90FF",
	}, ];
	//启动定位
	onMounted(() => {
		//前后台定位接口
		locationbackground();
		//获取当前时间的完整日期字符串
		// const starttime = new Date().getTime();
		const starttime = getHmsTime()
		// console.log(starttime);
		distance.value.startTime = starttime;
		//查看是否打开定位
		const systemSetting = uni.getSystemSetting()
		if (systemSetting.locationEnabled === false) {
			uni.showToast({
				title: '请打开手机定位服务',
				icon: 'none'
			})
			return;
		}
	});
	//结束定位
	onBeforeUnmount(() => {
		uni.stopLocationUpdate()
		if (alertDialog.value.close()) {
			clearInterval(countdowntimer);
		}
	})

	//前后台定位接口
	const locationbackground = () => {
		console.log("1111111111")
		//开始后台定位
		uni.startLocationUpdateBackground({
			type: 'gcj02',
			success() {
				//开始监听GPS数据
				onLocationChange();
				console.log("接口调用成功")
				//我们先调用countDown函数，可以避免在打开界面后停一秒后才开始倒计时
				countDown(distance.value.time, inputTime);
				//
				deletetime(time.value, inputTime)
				//定时器 每隔一秒变化一次
				timer.value = setInterval(() => {
					distance.value.time = countDown(distance.value.time, inputTime)
					time.value = deletetime(time.value, inputTime)
				}, 1000);
			},
			fail: (err) => {

				//授权失败后引导用户打开定位信息
				opensetting();
			}
		});
	}

	// 暂停位置更新和轨迹追踪
	// const pauseTracking = () => {
	//     // 停止后台位置更新请求
	//     uni.stopLocationUpdateBackground({
	//         success() {
	//             console.log('后台位置更新已停止');
	//         }
	//     });
	//     // 清除轨迹点
	//     polyline.value.points = [];
	// };

	//获取位置变化信息
	const onLocationChange = () => {
		uni.onLocationChange((res) => {
			// 这里可以获取到当前位置的经纬度信息
			covers[0].latitude = res.latitude;
			covers[0].longitude = res.longitude;
			/* polyline[0].points.push({
				latitude: res.latitude,
				longitude: res.longitude
			}) */
			pre_polyline[0].points.push({
				latitude: res.latitude,
				longitude: res.longitude
			})



			//判断是否在范围
			const isArea = isPointInPolygon(res.longitude, res.latitude, polygonsarray[0].points)
			if (!isArea) {

				// interval();
				// alertDialog.value.open();
			} else {
				alertDialog.value.close();
				clearInterval(countdowntimer);
			}
			// console.log('是否在电子围栏范围内', isArea)
			//计算距离
			function calculationDistance(ps) {

				var LC = 0;
				ps.forEach(function(f, index) {
					let lng1 = f.longitude;
					let lat1 = f.latitude;
					let lng2 = f.longitude;
					let lat2 = f.latitude;
					if (ps[index + 1]) {
						lng2 = ps[index + 1].longitude;;
						lat2 = ps[index + 1].latitude;
					}
					let radLat1 = lat1 * Math.PI / 180.0;
					let radLat2 = lat2 * Math.PI / 180.0;
					let a = radLat1 - radLat2;
					let b = (lng1 * Math.PI / 180.0) - (lng2 * Math.PI / 180.0);
					let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
						Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
					if ((s * 6370996.81) <= 10) {
						LC = LC + s * 6370996.81;
						polyline[0].points.push({
							latitude: f.latitude,
							longitude: f.longitude
						});
					} else {
						LC = LC;
						pre_polyline[0].points.pop();
					}
				})

				//距离
				distance.value.distance = (LC / 1000).toFixed(3);

				//速度
				distance.value.avgPace = (distance.value.distance * 1000 / (time.value)).toFixed(3);
				if (distance.value.avgPace > 0) {
					return (distance.value.avgPace)
				} else {
					distance.value.avgPace = 0
				}
			};
			calculationDistance(pre_polyline[0].points);

		})
	}
	//如果不允许获取位置信息 
	const opensetting = () => {
		uni.showModal({
			title: '提示',
			content: '您拒绝了位置的授权，不可使用地图选择功能',
			showCancel: false,
			success: function(res) {
				uni.openSetting({
					success(res) {
						let userLocation = res.authSetting['scope.userLocation'];
						if (userLocation) {
							uni.chooseLocation({
								success: res => {
									onLocationChange()
									console.log('位置名称：' + res.name);
									console.log('详细地址：' + res.address);
									console.log('纬度：' + res.latitude);
									console.log('经度：' + res.longitude);
								}
							})
						} else {
							// 用户拒接授权 给提示
							uni.showToast({
								title: '您已拒绝位置授权',
								duration: 2000
							});
						}
					}
				})
			}
		})
	}

	// 判断点是否在多边形范围内
	const isPointInPolygon = (lng, lat, polygon) => {
		var cnt = 0;
		console.log(polygon.length);
		for (var i = 0; i < polygon.length; i++) {
			const g = lng;
			const t = lat;
			const p1g = polygon[i].longitude;
			const p1t = polygon[i].latitude;
			const p2g = polygon[i === polygon.length - 1 ? 0 : i + 1].longitude;
			const p2t = polygon[i === polygon.length - 1 ? 0 : i + 1].latitude;
			const ming = Math.min(p1g, p2g);
			const maxg = Math.max(p1g, p2g);
			const mint = Math.min(p1t, p2t);
			const maxt = Math.max(p1t, p2t);
			if ((mint <= t && t <= maxt && ming <= g) && (maxg <= g || (p2g + (p1g - p2g) * ((t - p2t) / (p1t -
					p2t)) < g))) {
				cnt++
			}
		}
		//zjh：cnt为奇数时点在多边形内部return值为真，cnt为偶数时点在多边形外部return值为假
		return cnt % 2 === 1;
		//cnt为偶数时点在多边形内部return值为真，cnt为奇数时点在多边形外部return值为假
		//return cnt % 2 === 0;

	}



	//发送请求存储跑步记录
	const postrundata = async () => {
		rank.value = uni.getStorageSync('rank')
		if (rank.value == 1) {
			distance.value.studentId = uni.getStorageSync("id")
			const res = await receiveRunData(distance.value);
		} else {
			distance.value.teacherId = uni.getStorageSync("id")
			const res = await receiveRunData(distance.value);
		}
		showToastlist.value.title = res.message;
		if (res.code == 200) {
			console.log('请求成功');
			uni.showToast({
				icon: "none",
				title: showToastlist.value.title,
			});
		} else if (res.code == 201) {
			console.log('请求失败');
			uni.showToast({
				icon: "none",
				title: "保存失败",
			});
		}
		console.log(distance.value);
	};


	//时间222222222222222222
	let hour = 0;
	let minute = 0;
	let second = 0;
	let h = 0;
	let m = 0;
	let s = 0;
	let times = 0;
	let isPaused = false;
	let pausedTime = 0;
	

	const countDown = () => {
		let nowTime = new Date().getTime();
		if (!isPaused) {
			times = (nowTime - inputTime) / 1000;
		} else {
			times = pausedTime;
		}
		h = parseInt(times / 3600);
		hour = h < 10 ? "0" + h : h;
		m = parseInt(times / 60 % 60);
		minute = m < 10 ? "0" + m : m;
		s = parseInt(times % 60);
		second = s < 10 ? "0" + s : s;

		let time = hour + ':' + minute + ':' + second;
		return time;
	}
	//暂停
	const pauseTimer = () => {
		if (!isPaused) {
			isPaused = true;
			pausedTime = times;
		}
	}
	//继续
	const resumeTimer = () => {
		if (isPaused) {
			isPaused = false;
			let nowTime = new Date().getTime();
			inputTime = nowTime - (pausedTime * 1000);
		}
	}

	const deletetime = () => {
		let nowTime = new Date().getTime();
		return (nowTime - inputTime) / 1000;
	}



	onMounted(() => {
		startTimer();
	});
</script>

<style lang="scss" scoped>
	.map {
		height: 100vh;
		width: 100vw;
		z-index: 1;

		.bigbox {
			color: white;
			z-index: 2;
			background-color: rgba($color: #000000, $alpha: 0.5);
			margin: 150rpx auto;
			border-radius: 30px;
			display: flex;
			height: 20vh;
			width: 70vw;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;

			.box1 {
				text-align: center;
				width: 35vw;

				.lctext {
					display: block;
				}
			}

			.box3 {
				margin-top: 1vh;
				width: 3px;
				height: 18vh;
				background-color: #fff;
			}

			.box2 {
				display: flex;
				text-align: center;
				flex-direction: column;
				justify-content: space-evenly;
				width: 35vw;
				height: 20vh;

				.time {
					display: flex;
					flex-direction: column;
				}
			}
		}

		.btn {
			width: 100px;
			height: 100px;
			border-radius: 50px;
			line-height: 100px;
			background-color: red;
			position: relative;
			bottom: -35%;
		}

		.popup-content {
			display: flex;
			height: 60vh;
			width: 100vw;
			// padding: 10px;
			background-image: url("http://139.198.127.41:9000/sph/20231119/run.png");
			background-size: 100% 100%;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			bottom: -50%;

			.font {
				font-size: 30px;
				margin-bottom: 5%;
			}

			.fontone {
				font-size: 20px;
				margin-bottom: 5%;
				color: #fff;
			}

			.fonttwo {
				font-size: 35px;
				margin-bottom: 5%;
				color: #79bbff;
			}

			.fontthere {
				font-size: 20px;
				margin-bottom: 5%;
				color: #fff;
			}

			.button {
				display: flex;
				flex-direction: row;

				.btnrun1 {
					padding: 0%;
					left: 68%;
					width: 28vw;
					height: 14vh;
					border-radius: 50%;
					line-height: 14vh;
					background-color: #79bbff;
				}

				.btnrun2 {
					padding: 0%;
					right: 68%;
					width: 28vw;
					height: 14vh;
					border-radius: 50%;
					line-height: 14vh;
					background-color: #79bbff;
				}
			}
		}

		.popup-content-Dialog {
			display: flex;
			border-radius: 10px;
			height: 20vh;
			width: 70vw;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			background-color: #ffffff;
		}

		.text {
			font-size: 20px;
			color: #333;
		}

		.texterror {
			color: red;
			font-size: 18px;
			margin-bottom: 2vh;
		}
	}
</style>