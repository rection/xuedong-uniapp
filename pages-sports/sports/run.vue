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
		ref
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
	const goRunMap = () => {
		uni.navigateTo({
			url: "sports/runMap"
		})
	}
	//5s倒计时
	const startCountdown = () => {
		const timer = setInterval(() => {
			if (countdown.value > 0) {
				countdown.value--
			} else {
				clearInterval(timer);
				countdown.value = 5;
				uni.vibrateShort({
					success() {
						goRunMap()
						closePopup()
						isRun.value = true
					}
				})
			}
		}, 1000)
	}
	//中心精度
	const longitude = ref(114.29963997797631);
	// 中心维度
	const latitude = ref(34.819942537402675);
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