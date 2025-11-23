<template>
  <GlobalLayout title="运动">
    
	<view class="tubiao">
		<view class="round"></view>
		<view class="goal">
			<view>目标</view>
			<view id="s">{{totalDistance}}</view>
			<view>km</view>
		</view>
		<view class="touxiang">
			<image :src="image" mode="aspectFill"></image>
			<view>{{nickname}}</view>
		</view>
		<view class="small" :style="GetProgress()"></view>
		<view class="big"></view>
		<view class="starts"></view>
		<view class="starts start"></view>
		<view class="starts start2"></view>
	</view>
	<view class="content">
		<view class="content-run" @click="goRun">
			<view>阳光跑</view>
		</view>
		<view class="content-right">
			<view class="rankings" @click="onRank">
				<view>排行榜</view>
			</view>
			<view class="record" @click="goRecords">运动记录</view>
		</view>
	</view>

  </GlobalLayout>
</template>

<script setup>
import { useTabDrawerCloser } from '@/composables/useTabDrawerCloser.js'
useTabDrawerCloser()
	import {
		onMounted,
		ref
	} from "vue"
	// import {
	// 	onShow
	// } from '@dcloudio/uni-app'
	// import {
	// 	getBindCode, addCodeEmail
	// } from '../../api/all.js'
	const progress = ref(0);
	const totalDistance = ref(0);
	const runningMileage = ref(0);
	const nickname = ref('');
	const image = ref(null);
	const time = ref(60)

	const goRecords = () => {
		uni.navigateTo({
			url: "/pages-sports/sports/records"
		})
	}


	// const token = uni.getStorageSync('token')
	// if (!token) {
	// 	uni.redirectTo({
	// 		url: '/pages/login/login'
	// 	})
	// } 


	function goRun() {
		uni.navigateTo({
			url:"/pages-sports/sports/run"
		})
	}
	//100% 214deg  0就是0
	const GetProgress = () => {

		return `background: conic-gradient(skyblue 0deg, skyblue ${progress.value}deg, transparent ${progress.value}deg, transparent 360deg);`
	}
	const onRank = () => {
		uni.navigateTo({
			url: "/pages-sports/sports/rank"
		})

	}
	
</script>

<style lang="scss" scoped>
	#s {
		font-weight: 600;
		font-size: 58rpx;
		margin: 10rpx 0;
	}

	.tubiao {
		position: relative;
		height: 750rpx;
		background: linear-gradient(to bottom, rgb(170, 233, 255), rgb(255, 216, 115));
		overflow: hidden;
		position: relative;
		overflow: hidden;

		.big {
			width: 450rpx;
			height: 450rpx;
			border-radius: 50%;
			background: linear-gradient(to top, rgb(60, 122, 255), rgb(160, 198, 254));
			position: absolute;
			top: 380rpx;
			left: 165rpx;
		}

		.small {
			width: 500rpx;
			height: 500rpx;
			border-radius: 50%;
			transform: rotate(253deg);
			position: absolute;
			top: 360rpx;
			left: 140rpx;
		}

		.goal {
			position: absolute;
			bottom: 100rpx;
			left: 345rpx;
			color: white;
			text-align: center;
			font-size: 42rpx;
			z-index: 100;
		}

		.touxiang {
			display: flex;
			flex-direction: column;
			text-align: center;
			margin-top: 135rpx;

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				margin: 10rpx auto;
				background-color: #fff;
			}
		}

		// .small {
		// 	position: absolute;
		// 	width: 20rpx;
		// 	height: 20rpx;
		// 	border: 1rpx solid purple;
		// 	border-radius: 50%;
		// 	background-color: purple;
		// 	left: 165rpx;
		// 	top: 650rpx;
		// }

		.starts {
			position: absolute;
			width: 5rpx;
			height: 5rpx;
			background-color: white;
			border-radius: 50%;
			box-shadow: 0 0 5rpx 5rpx rgb(255, 255, 255);
			left: 120rpx;
			top: 120rpx;
			transform: rotate(-45deg) translate3d(1px, 3px, 0);
			transform-origin: 0% 0%;
		}

		.start {
			left: 190rpx;
			top: 360rpx;
			transform: rotate(-39deg) translate3d(1px, 3px, 0);
			transform-origin: 0% 0%;
		}

		.start2 {
			left: 650rpx;
			top: 400rpx;
			transform: rotate(-30deg) translate3d(1px, 3px, 0);
			transform-origin: 0% 0%;
		}
	}

	.starts:after {
		content: '';
		display: block;
		top: 0px;
		left: 4px;
		border: 0px solid #fff;
		border-width: 2px 90px 2px 90px;
		border-color: transparent transparent transparent rgba(255, 255, 255, .3);
	}

	.tubiao::before {
		position: absolute;
		bottom: 0;
		border-radius: 45rpx 45rpx 0 0;
		z-index: 99;
		content: "";
		height: 70rpx;
		width: 750rpx;
		background-color: white;
	}

	.content {
		margin: 100rpx 50rpx;
		display: flex;
		flex-direction: row;

		.content-run {
			font-size: 46rpx;
			height: 300rpx;
			width: 300rpx;
			// color: #4a4a4a;
			color: white;
			font-weight: 580;
			border-radius: 35rpx;
			line-height: 300rpx;
			text-align: left;
			padding-left: 40rpx;
			background: url(../../static/images/run.png) no-repeat;
			background-position: right;
			background-size: 100rpx;
			background-color: #ff9c11;
		}

		.content-right {
			margin: 0 30rpx;

			.rankings,
			.record {
				font-size: 38rpx;
				// color: #4a4a4a;
				color: white;
				padding-left: 30rpx;
				font-weight: 600;
				height: 130rpx;
				width: 300rpx;
				background-color: blue;
				border-radius: 35rpx;
				line-height: 130rpx;
				text-align: left;
			}

			.rankings {
				background: url(../../static/images/paihang.png) no-repeat;
				background-position: right;
				background-size: 140rpx;
				background-color: #b265ff;
			}

			.record {
				margin-top: 40rpx;
				background: url(../../static/images/times.png) no-repeat;
				background-size: 130rpx;
				background-position: right;
				background-color: #7dcbff;
			}
		}
	}
</style>