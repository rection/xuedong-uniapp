<template>
	<view>
		<view class="map">
			<view class="map-section">
				<map style="width: 750rpx;height: 1450rpx;" :polygons="polygonsarray" :latitude='latitude'
					:longitude='longitude' :markers="covers">
					<!-- 遮罩层 -->
					<view class="window">
						<view class="wbox">
							当前<br>
							<text class="txt">91</text>人正在跑步<br>
							总里程已达<text class="txt">36W</text>公里
						</view>
						<view class="run" v-if="isRun">
							<view class="run-little" @click.stop="onMin('success')">
								<view class="run-little-text">跑最低</view>
								<view>0.5km</view>
								<view class="run-little-go">GO</view>
							</view>
							<view class="run-more" @click.stop="onMin('success')">
								<view class="run-more-text">跑更多</view>
								<view>公里</view>
								<view class="run-more-go">GO</view>
							</view>
						</view>
					</view>
				</map>
			</view>
		</view>
	</view>
	<!-- 弹出层 -->
	<!-- 提示信息弹窗 -->
	<uni-popup ref="popup" :mask-click="false" type="center">
		<uni-popup-message :type="msgType" :message="messageText" :duration="2000">
			<view class="waitpopup" z-index="9" opacity="5">
				<p class="settime">请耐心等待</p>
				<!-- 倒计时 -->
				<p class="countDown">{{countdown}}</p>
				<!-- <p v-if="countdown !== null" class="settime" style="margin-bottom: 1vh;">{{ countdown }} -->
				<!-- </p> -->
				<!-- <i class="t-icon t-icon-kongjianGPS" style="width: 14vw; height: 7vh; "></i> -->
			</view>
		</uni-popup-message>
	</uni-popup>
</template>
<script setup>
	import {
		ref,reactive
	} from "vue";
	import {
		onMounted
	} from "vue"
	const popup = ref(null)
	const msgType = ref('')
	const messageText = ref('')
	const isRun = ref(true)
	const countdown = ref(5)
	const onMin = (type) => {
		isRun.value = false
		msgType.value = type
		messageText.value = `这是一条${type}消息提示`	
		// this.$refs.message.open()
		popup.value.open()
		//倒计时
		startCountdown()
		/*//判断网络是否为流量
		uni.getNetworkType({
			success(res){
				console.log(res.networkType)
				if(res.networkType = 'wifi'){
					uni.showToast({
						title:'请使用流量',
						icon:'none',
						duration:3000
					})
				}else if(res.networkType === '4g' && res.networkType === '5g'){
					isRun.value = false
					msgType.value = type
					messageText.value = `这是一条${type}消息提示`	
					// this.$refs.message.open()
					popup.value.open()
					//倒计时
					startCountdown()
				}
			}
		})*/
	}
	//关闭等待页面
	const closePopup = () => {
		popup.value.close()
	}
	//跳转到地图页面
// 修改 pages-sports/sports/run.vue

const goRunMap = () => {
    uni.navigateTo({
        // 确保路径以 / 开头，且文件名全小写（和你的实际文件名一致）
        url: "/pages-sports/sports/runmap", 
        fail: (res) => {
            console.error("跳转失败:", res);
            uni.showToast({
                title: "找不到页面，请检查pages.json",
                icon: "none"
            })
        }
    })
}
	//5s倒计时
// 修改 pages-sports/sports/run.vue

const startCountdown = () => {
    const timer = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--
        } else {
            clearInterval(timer);
            countdown.value = 5;

            // 1. 尝试震动 (如果设备支持就震，不支持也不报错卡死)
            uni.vibrateShort({
                fail: () => console.log('设备不支持震动，忽略')
            });

            // 2. 【关键】把跳转代码移到外面！无论震动是否成功，都要执行跳转！
            goRunMap()
            closePopup()
            isRun.value = true
        }
    }, 1000)
}
	//中心精度
	const longitude = ref(114.201831);
	// 中心维度
	const latitude = ref(34.827675);
	const covers = reactive([{
			id: 0,
			title: 'map',
			width: 40,
			height: 40,
			latitude: 34.82767, // 这里建议给个默认值，防止地图不显示图标
			longitude: 114.201835,
			iconPath: "../../static/images/ball.png",
		}]);
	const polygonsarray = [{
		points: [{
					latitude: 34.831042,
					longitude:114.20018
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
				}, //外圈
				{
					latitude: 34.825083,
					longitude: 114.210046
				},
				{
					latitude:34.825864,
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
					longitude:114.200429
				},
				{
					latitude: 34.827309,
					longitude: 114.201586
				},
				{
					latitude: 34.827326,
					longitude:114.202554
				},
				{
					latitude: 34.828311,
					longitude: 114.202765
				},
				{
					latitude: 34.830383,
					longitude: 114.202807
				},{
					latitude: 34.830435,
					longitude: 114.202849
				},{
					latitude: 34.830919,
					longitude: 114.201628
				},
				{
					latitude: 34.830901,
					longitude:114.200513
				}
			],
		strokeColor: "#1E90FF",
		    fillColor: "#1E90FF33",
		    width: 2
	}];
</script>

<style lang="scss">
	.map {
		position: relative;

		.map-section {
			.run {
				display: flex;
				justify-content: space-between;
				position: relative;
				top: 700rpx;
				font-size: 48rpx;
				color: white;
				font-weight: 600;
				.run-little,
				.run-more {
					width: 250rpx;
					height: 360rpx;
					padding-top: 25rpx;
				}

				.run-little-go,
				.run-more-go {
					height: 150rpx;
					width: 150rpx;
					border-radius: 50%;
					background-color: white;
					line-height: 150rpx;
					text-align: center;
				}

				.run-little {
					padding-left: 70rpx;
					border-radius: 0 35rpx 35rpx 0;
					background: linear-gradient(to top, rgb(180, 157, 255), rgb(94, 89, 255));

					.run-little-go {
						color: purple;
						margin-top: 30rpx;
					}
				}

				.run-more {
					border-radius: 35rpx 0 0 35rpx;
					padding-left: 30rpx;
					background: linear-gradient(to bottom, rgb(19, 74, 255), rgb(192, 239, 255));

					.run-more-go {
						color: #3b6cff;
						margin-top: 30rpx;
					}
				}
			}
		}
	}
		.waitpopup {
			width: 70vw;
			height: 25vh;
			background-color: #fff;
			border-radius: 15px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
	
			.settime {
				font-size: 30px;
				margin-top: 2vh;
			}
			.countDown {
				height: 100rpx;
				width: 100rpx;
				background: linear-gradient(to top, rgb(203, 230, 255), rgb(160, 198, 254));
				border-radius: 50%;
				text-align: center;
				line-height: 100rpx;
				margin-top: 10rpx;
			}
		}
	 .window {
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
	    width: 100vw;
	    height: 100vh;
	    background-color: rgb(128, 154, 215);
	    z-index: 2;
	    opacity: 0.9;
	
	    .wbox {
	      margin-top: 2vh;
	      margin-left: 5vw;
	      color: white;
	
	      .txt {
	        font-size: 30px;
	        font-weight: 500;
	
	      }
	    }
 }
</style>