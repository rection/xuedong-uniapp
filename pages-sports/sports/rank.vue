<template>
	<view>
		<view class="rank">
			<!-- 男女 -->
			<view class="bg">
				<!-- <ul>
				<li v-for="(item,index) in clickBg" @click="bgIndex=index" class="g" :class="{'b':bgIndex==index}">
				     {{item}}
				 </li>
			</ul>
			 -->

				<view @click="onBg(2)" class="g" :class="{'cg':ong== 2}" style="text-align: center;">
					女生榜
				</view>
				<view @click="onBg(1)" class="b" :class="{'cb':onb== 2}" style="text-align: center;">
					男生榜
				</view>
			</view>
			<!-- 选择范围 学生 -->
			<view v-if="isStudent" class="range">
				<picker v-if="topIndex == 2" :range="range_option" name="ranges" @change="isRange" :value="suoin">
					<view class="range_box">
						<image class="range_box_pic" src="/static/images/range.png" mode=""></image>
					</view>
				</picker>

				<picker v-else :range="range_options" name="ranges" @change="isRange" :value="suoin">
					<view class="range_box">
						<image class="range_box_pic" src="/static/images/range.png" mode=""></image>
					</view>
				</picker>
			</view>
			<!-- 教师 -->
			<view v-else class="range">
				<picker v-if="topIndex == 2" :range="range_option" name="ranges" @change="isRange" :value="suoin">
					<view class="range_box">
						<image class="range_box_pic" src="/static/images/range.png" mode=""></image>
					</view>
				</picker>

				<picker v-else :range="range_options2" name="ranges" @change="isRange" :value="suoin">
					<view class="range_box">
						<image class="range_box_pic" src="/static/images/range.png" mode=""></image>
					</view>
				</picker>
			</view>

			<!-- 里程分类 -->
			<view class="rank_top">
				<ul>
					<li v-for="(item,index) in rankTop" :key="index" @click="isTop(index)" class="rank_top_mile"
						:class="{'changeTop':topIndex==index}">
						{{item}}
					</li>

				</ul>

			</view>
			<!-- 排行台 -->
			<view class="rank_mid">
				<!-- 进度 -->
				<view v-if="topIndex == 2">

					<view class="rank_2">

						<view class="rank_m2_km" style="text-align: center">
							<view class="rank_m2_user">
								<image style="height: 150rpx;width: 150rpx;border-radius: 50rpx;"
									:src="second.img"></image>
								<!-- 用户1 -->
								{{second.nick}}
							</view>
							{{second.persent}}%
							<br />
							{{second.thisDay}}<br />{{second.end}}
							<view style="font-size: 100rpx;">
								2
							</view>
						</view>

					</view>

					<view class="rank_1">

						<view class="rank_m1_km" style="text-align: center">
							<view class="rank_m1_user">
								<image class="rank-img" style="height: 150rpx;width: 150rpx;border-radius: 50rpx;"
									:src="first.img"></image>
								{{first.nick}}
							</view>
							{{first.persent}}%
							<br />
							{{first.thisDay}}<br />{{first.end}}
							<view style="font-size: 100rpx;">
								1
							</view>
						</view>
					</view>

					<view class="rank_3">

						<view class="rank_m3_km" style="text-align: center">
							<view class="rank_m3_user">
								<image class="rank-img" style="height: 150rpx;width: 150rpx;border-radius: 50rpx;"
									:src="third.img"></image>
								{{third.nick}}
							</view>
							{{third.persent}}%
							<br />
							{{third.thisDay}}<br />{{third.end}}
							<view style="font-size: 100rpx;">
								3
							</view>
						</view>

					</view>


				</view>
				<!-- 总里程 -->
				<view v-else-if="topIndex == 1">

					<view class="rank_2">

						<view class="rank_m2_km" style="text-align: center">
							<view class="rank_m2_user">
								<image style="height: 150rpx;width: 150rpx;border-radius: 50rpx;"
									:src="second.img"></image>
								<!-- 用户1 -->
								{{second.nick}}
							</view>
							{{second.runningMileage}}km
							<view style="font-size: 100rpx;">
								2
							</view>
						</view>

					</view>

					<view class="rank_1">

						<view class="rank_m1_km" style="text-align: center">
							<view class="rank_m1_user">
								<image class="rank-img" style="height: 150rpx;width: 150rpx;border-radius: 50rpx;"
									:src="first.img"></image>
								{{first.nick}}
							</view>
							{{first.runningMileage}}km
							<view style="font-size: 100rpx;">
								1
							</view>
						</view>
					</view>

					<view class="rank_3">

						<view class="rank_m3_km" style="text-align: center">
							<view class="rank_m3_user">
								<image class="rank-img" style="height: 150rpx;width: 150rpx;border-radius: 50rpx;"
									:src="third.img"></image>
								{{third.nick}}
							</view>
							{{third.runningMileage}}km
							<view style="font-size: 100rpx;">
								3
							</view>
						</view>

					</view>


				</view>

				<!-- 单次里程 -->
				<view v-else>

					<view class="rank_2">

						<view class="rank_m2_km" style="text-align: center">
							<view class="rank_m2_user">
								<image style="height: 150rpx;width: 150rpx;border-radius: 50rpx;"
									:src="second.img"></image>
								{{second.nick}}
							</view>
							{{second.each}}km
							<view style="font-size: 100rpx;">
								2
							</view>
						</view>

					</view>

					<view class="rank_1">

						<view class="rank_m1_km" style="text-align: center">
							<view class="rank_m1_user">
								<image class="rank-img" style="height: 150rpx;width: 150rpx;border-radius: 50rpx;"
									:src="first.img"></image>
								{{first.nick}}
							</view>
							{{first.each}}km
							<view style="font-size: 100rpx;">
								1
							</view>
						</view>
					</view>
					<view class="rank_3">
						<view class="rank_m3_km" style="text-align: center">
							<view class="rank_m3_user">
								<image class="rank-img" style="height: 150rpx;width: 150rpx;border-radius: 50rpx;"
									:src="third.img"></image>
								{{third.nick}}
							</view>
							{{third.each}}km
							<view style="font-size: 100rpx;">
								3
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 总进程 -->
	<view v-if="topIndex == 2">

		<view v-if="isExist" class="boxT">
			<view>我</view>
			<view class="shangBang" v-if="teachRank.sort == 2">（未上榜）</view>
			<view class="shangBang" v-if="teachRank.sort == 1">（已上榜）</view>
			<view class="lucT">
				<image :src="nowRank.image" mode="aspectFill"></image>
				<view>
					{{nowRank.userNickname}}
				</view>
			</view>
			<view class="m">
				<view>{{nowRank.runDistance}}% {{nowRank.daytime}} {{nowRank.endTime}}
				</view>
			</view>
		</view>
		<view class="box" v-for="(item,index) in combineArr.slice(3)" :key="item.teacherId">
			<view>{{index+3}}</view>
			<view class="luc">
				<image :src="item.img" mode="aspectFill"></image>
				<view><!-- 用户 -->
					{{item.nick}}
				</view>
			</view>
			<view class="km">
				<view>{{item.persent}}%
				</view>
			</view>
		</view>
	</view>
	<!-- 总里程 -->
	<view v-else-if="topIndex == 1">
		<view v-if="isExist" class="boxT">
			<view>我</view>
			<view class="shangBang" v-if="teachRank.sort == 2">（未上榜）</view>
			<view class="shangBang" v-if="teachRank.sort == 1">（已上榜）</view>
			<view class="lucT">
				<image :src="nowRank.image" mode="aspectFill"></image>
				<view>
					{{nowRank.userNickname}}
				</view>
			</view>
			<view class="km">
				<view>{{nowRank.runningMileage}}km
				</view>
			</view>
		</view>
		<view class="box" v-for="(item,index) in combineArr.slice(3)" :key="item.teacherId">
			<view>{{index+3}}</view>
			<view class="luc">
				<image :src="item.img" mode="aspectFill"></image>
				<view><!-- 用户 -->
					{{item.nick}}
				</view>
			</view>
			<view class="km">
				<view>{{item.runningMileage}}km
				</view>
			</view>
		</view>
	</view>
	<!-- 单次里程 -->
	<view v-else>
		<view v-if="isExist" class="boxT">
			<view>我</view>
			<view class="shangBang" v-if="teachRank.sort == 2">（未上榜）</view>
			<view class="shangBang" v-if="teachRank.sort == 1">（已上榜）</view>
			<view class="lucT">
				<image :src="nowRank.image" mode="aspectFill"></image>
				<view>
					{{nowRank.userNickname}}
				</view>
			</view>
			<view class="km">
				<view>{{nowRank.distance}}km
				</view>
			</view>
		</view>
		<view class="box" v-for="(item,index) in combineArr.slice(3)" :key="item.teacherId">
			<view>{{index+3}}</view>
			<view class="luc">
				<image :src="item.img" mode="aspectFill"></image>
				<view><!-- 用户 -->
					{{item.nick}}
				</view>
			</view>
			<view class="km">
				<view>{{item.each}}km
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue";
	// import {
	// 	totalMileSch,
	// 	totalMileDep,
	// 	totalMileCla,
	// 	eachMileSch,
	// 	eachMileDep,
	// 	eachMileCla,
	// 	totalProSch,
	// 	nowUser
	// } from '@/api/all.js';
	const range_options = ref(["全校", "院系", "班级"]);
	const range_options2 = ref(["全校", "院系"]);
	const range_option = ref(["全校"]);
	const rankTop = ref(["单次里程", "总里程", "总进度"]);
	const clickBg = ref(["女生榜", "男生榜"]);
	const topIndex = ref(1);
	const ong = ref(2);
	const onb = ref(1);
	const isStudent = ref(false);
	const isTotal = ref(false);
	const suoin = ref(0);
	const combineArr = ref([])
	const first = ref({})
	const second = ref({})
	const third = ref({})
	const rank = ref()
	//是否和用户性别一样
	const isExist = ref(false)
	const schoolTotalMile = ref({
		sex: 2,
		rank: 0,
		id:0
	})

	const deptTotalMile = ref({
		sex: 2,
		rank: 0,
		college: "",
		id:0
	})
	const classTotalMile = ref({
		sex: 2,
		sclass: "",
		id:0
	})
	const userNow = ref({
		id: 0,
		rank: 0
	})
	let teachRank = reactive({
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
		sort:"",
		id: 0
	})
	let nowRank = reactive({
		userNickname: "",
		image: "",
		runningMileage: 0,
		distance: 0,
		runDistance: 0,
		daytime: "",
		startTime: "",
		endTime: "",
		sex: ""
	})
	const getInfo = async () => {
		rank.value = uni.getStorageSync("rank")
		if (rank.value == 1) {
			/* 学生 */
			isStudent.value = true
		} else if (rank.value == 3 && rank.value == 2) {
			/* 教师 */
			isStudent.value = false
		}
	}
	getInfo()
	/* 将获得的数组分开 */
	const arr1 = ref([]);
	const arr2 = ref([]);
	const arr3 = ref([]);
	const arr4 = ref([]);
	const arr5 = ref([]);
	const arr6 = ref([]);
	const arr7 = ref([]);
	const arr8 = ref([]);
	const arr9 = ref([]);
	const arr10 = ref([]);
	const getTeaRan = () => {
		if (teachRank.teacherIdlist !== undefined && teachRank.teacherIdlist !== null) {
			arr1.value = teachRank.teacherIdlist.split(",");
		}
		if (teachRank.studnetIdlist !== undefined && teachRank.studnetIdlist !== null) {
			arr2.value = teachRank.studnetIdlist.split(",");
		}
		if (teachRank.runningMileagelist !== undefined && teachRank.runningMileagelist !== null) {
			arr3.value = teachRank.runningMileagelist.split(",");
		}
		if (teachRank.distance !== undefined && teachRank.distance !== null) {
			arr4.value = teachRank.distance.split(",");
		}
		if (teachRank.runDistance !== undefined && teachRank.runDistance !== null) {
			arr5.value = teachRank.runDistance.split(",");
		}
		if (teachRank.daytime !== undefined && teachRank.daytime !== null) {
			arr6.value = teachRank.daytime.split(",");
		}
		if (teachRank.startTime !== undefined && teachRank.startTime !== null) {
			arr7.value = teachRank.startTime.split(",");
		}
		if (teachRank.endTime !== undefined && teachRank.endTime !== null) {
			arr8.value = teachRank.endTime.split(",");
		}
		if (teachRank.nickNamelist !== undefined && teachRank.nickNamelist !== null) {
			arr9.value = teachRank.nickNamelist.split(",");

		}
		if (teachRank.imagelist !== undefined && teachRank.imagelist !== null) {
			arr10.value = teachRank.imagelist.split(",");
		}
		lianhe()
	}
	/* 再联合起来 */
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
				img: arr10.value[index],
			}))
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
				img: arr10.value[index],
			}))
		}
	}
	/* 置顶用户 */
	const getNowUser = async () => {
		
		userNow.value.id = uni.getStorageSync("id");
		userNow.value.rank = uni.getStorageSync("rank");
		const res = await nowUser(userNow.value)
		nowRank = res.data
	}
	const getTotalSch = async () => {
		/* schoolTotalMile.value.sex = uni.getStorageSync('ong'); */
		schoolTotalMile.value.sex = ong.value;
		schoolTotalMile.value.id = uni.getStorageSync("id");
		schoolTotalMile.value.rank = uni.getStorageSync("rank");
		const res = await totalMileSch(schoolTotalMile.value)
		teachRank = res.data
		getTeaRan()
		fst()
	}
	const getTotalDep = async () => {
		deptTotalMile.value.sex = ong.value;
		deptTotalMile.value.rank = uni.getStorageSync("rank");
		deptTotalMile.value.id = uni.getStorageSync("id");
		deptTotalMile.value.college = uni.getStorageSync("college");
		const res = await totalMileDep(deptTotalMile.value)
		teachRank = res.data
		getTeaRan()
		fst()
	}
	const getTotalCla = async () => {
		classTotalMile.value.sex = ong.value;
		classTotalMile.value.sclass = uni.getStorageSync("sclass");
		classTotalMile.value.id = uni.getStorageSync("id");
		const res = await totalMileCla(classTotalMile.value)
		teachRank = res.data
		getTeaRan()
		fst()
		
	}
	const getEachSch = async () => {
		schoolTotalMile.value.sex = ong.value;
		schoolTotalMile.value.rank = uni.getStorageSync("rank");
		schoolTotalMile.value.id = uni.getStorageSync("id");
		const res = await eachMileSch(schoolTotalMile.value)
		teachRank = res.data
		getTeaRan()
		fst()
	}
	const getEachDep = async () => {
		deptTotalMile.value.sex = ong.value;
		deptTotalMile.value.rank = uni.getStorageSync("rank");
		deptTotalMile.value.id = uni.getStorageSync("id");
		deptTotalMile.value.college = uni.getStorageSync("college");
		const res = await eachMileDep(deptTotalMile.value)
		teachRank = res.data
		getTeaRan()
		fst()
	}
	const getEachCla = async () => {
		classTotalMile.value.sex = ong.value;
		classTotalMile.value.sclass = uni.getStorageSync("sclass");
		classTotalMile.value.id = uni.getStorageSync("id");
		const res = await eachMileCla(classTotalMile.value)
		teachRank = res.data
		getTeaRan()
		fst()
	}
	const getProSch = async () => {
		schoolTotalMile.value.sex = ong.value;
		schoolTotalMile.value.rank = uni.getStorageSync("rank");
		schoolTotalMile.value.id = uni.getStorageSync("id");
		const res = await totalProSch(schoolTotalMile.value)
		teachRank = res.data
		getTeaRan()
		fst()
	}
	const onBg = (a) => {
		if (a == 2) {
			if (nowRank.sex == 2) {
				isExist.value = true
			} else {
				isExist.value = false
			}
			//女生
			classTotalMile.value.sex = 2
			deptTotalMile.value.sex = 2
			schoolTotalMile.value.sex = 2
			ong.value = 2
			onb.value = 1
			rankData()
		} else {
			if (nowRank.sex == 1) {
				isExist.value = true
			} else {
				isExist.value = false
			}
			classTotalMile.value.sex = 1
			deptTotalMile.value.sex = 1
			schoolTotalMile.value.sex = 1
			onb.value = 2
			ong.value = 1
			rankData()
		}
	}
	const isTop = (index) => {
		if (index == 2) {
			suoin.value = 0
		}
		topIndex.value = index
		rankData()
	}
	const isRange = (r) => {
		suoin.value = r.detail.value
		rankData()
	}
	const rankData = () => {
		if (topIndex.value == 0) {
			if (suoin.value == 0) {
				getEachSch()
				getNowUser()
			} else if (suoin.value == 1) {
				getEachDep()
				getNowUser()
			} else {
				getEachCla()
				getNowUser()
			}
		} else if (topIndex.value == 1) {
			if (suoin.value == 0) {
				getTotalSch()
				getNowUser()
			} else if (suoin.value == 1) {
				getTotalDep()
				getNowUser()

			} else {
				getTotalCla()
				getNowUser()
			
			}

		} else {
			getProSch()
			getNowUser()
		}
	}
	rankData()
	const fst = () => {
		first.value = combineArr.value[0] || {}
		second.value = combineArr.value[1] || {}
		third.value = combineArr.value[2] || {}
	}
</script>

<style lang="scss">
	.rank {
		.bg {

			.g {
				position: absolute;
				top: 130rpx;
				left: 50%;
				margin-left: -200rpx;
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 10% 10%;
				background-color: rgba(185, 186, 181, 0.5);
				//background-image: linear-gradient(to top,#c2c3bd,#939392);
				z-index: 3;
			}

			.b {
				position: absolute;
				top: 130rpx;
				left: 50%;
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 10% 10%;
				background-color: rgba(185, 186, 181, 0.5);
				//background-image: linear-gradient(to bottom,#c2c3bd,#939392);
				z-index: 3;
			}
		}

		.cg {
			background-image: linear-gradient(to bottom, #c2c3bd, #d9dad8);
			//color: #fff;
		}

		.cb {
			background-image: linear-gradient(to bottom, #d9dad8, #939392);
			//color: #fff;
		}

		.range {
			.range_box {
				.range_box_pic {
					height: 70rpx;
					width: 70rpx;
				}

				position: fixed;
				right: 20rpx;
				top: 20rpx;
				z-index: 5;
			}
		}

		.rank_top {
			// padding-left: 50%;
			height: 100rpx;
			width: 750rpx;
			//width: 100%;
			// margin: 0 -33%; 	      
			position: fixed;
			z-index: 4;
			font-size: 40rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			background-image: linear-gradient(to top, #fecc6f, #ffcb71);

			.rank_top_mile {
				display: inline-block;
				padding-right: 35rpx;
				padding-top: 20rpx;
				// background: lightblue;
			}
		}

		.changeTop {
			font-size: 50rpx;

		}





		.rank_mid {
			background-image: linear-gradient(to top, #f782a9, #ffcb71);
			height: 900rpx;
			width: 100%;
			position: relative;
			margin-bottom: 30rpx;

			.rank_2 {
				height: 270rpx;
				width: 25%;
				background-color: #ffe18b;
				display: inline-block;
				position: absolute;
				bottom: 0;
				left: 50%;
				margin-left: -37.5%;
				border-radius: 20rpx 20rpx 0 0;

				.rank_m2_km {
					font-size: 30rpx;
					margin: 20rpx;
					color: #fff;

					.rank_m2_user {
						width: 150rpx;
						height: 250rpx;
						font-size: 35rpx;
						overflow: hidden;
						position: absolute;
						top: -260rpx;
						left: 10rpx;
						color: #000;

					}
				}
			}

			.rank_1 {
				height: 330rpx;
				width: 25%;
				background-color: #FF6347;
				display: inline-block;
				position: absolute;
				//text-align: center;
				bottom: 0;
				left: 50%;
				margin-left: -12.5%;
				border-radius: 20rpx 20rpx 0 0;

				.rank_m1_km {
					font-size: 30rpx;
					margin: 20rpx;
					color: #fff;

					.rank_m1_user {
						width: 150rpx;
						height: 250rpx;
						font-size: 35rpx;
						margin: 20rpx;
						position: absolute;
						top: -260rpx;
						left: 10rpx;
						color: #000;
					}
				}
			}

			.rank_3 {
				height: 240rpx;
				width: 25%;
				background-color: #76d4eb;
				display: inline-block;
				position: absolute;
				bottom: 0;
				left: 50%;
				margin-left: 12.5%;
				border-radius: 20rpx 20rpx 0 0;

				.rank_m3_km {
					font-size: 30rpx;
					margin: 20rpx;
					color: #fff;

					.rank_m3_user {
						width: 150rpx;
						height: 250rpx;
						font-size: 35rpx;
						margin: 20rpx;
						position: absolute;
						top: -260rpx;
						left: 10rpx;
						color: #000;
					}
				}


			}

		}

	}

	.box {
		display: flex;
		flex-direction: row;
		position: relative;
		height: 100rpx;
		line-height: 80rpx;
		padding: 10rpx 0;
		padding-left: 20rpx;
		border-bottom: 1rpx solid #E0E0E0;
		// background-image: linear-gradient(to top,#E0E0E0,#F5F5F5);


		.luc {
			display: flex;
			flex-direction: row;
			margin-left: 100rpx;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 40rpx;
				/* background-color: #76d4eb; */
			}
		}

		.km {
			position: absolute;
			right: 30rpx;
		}

	}

	.boxT {
		display: flex;
		flex-direction: row;
		position: relative;
		height: 100rpx;
		line-height: 80rpx;
		padding: 10rpx 0;
		padding-left: 0rpx;
		border-bottom: 1rpx solid #E0E0E0;
		// background-image: linear-gradient(to top,#E0E0E0,#F5F5F5);
		background-color: papayawhip;

		.lucT {
			display: flex;
			flex-direction: row;
			

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				/* background-color: #76d4eb; */
			}
		}

		.shangBang {
			font-size: 25rpx;
			color: mediumpurple;
		}

		.km {
			position: absolute;
			right: 30rpx;
		}

		.m {
			position: absolute;
			right: 20rpx;
			font-size: 30rpx;
		}
	}
</style>