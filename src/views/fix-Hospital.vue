<template>
	<div id="fix-hospital">
		<!-- <div class="ball">
			<div class="title" id="top">
				<i class="el-icon-s-custom"></i> 上海市
			</div>
			<div class="title">医疗救治定点医院和发热门诊一览</div>
		</div> -->
		<el-carousel :interval="4000" type="card" height="250px">
			<el-carousel-item v-for="item in 4" :key="item"> </el-carousel-item>
		</el-carousel>
		<div class="search">
			<el-input
				size="small"
				class="input"
				v-model="pageParam.name"
				placeholder="请输入关键字"
				clearable
			>
			</el-input>
			<el-button type="primary" size="small" @click="toSearch"
				>搜索</el-button
			>
		</div>
		<div class="list">
			<div
				class="item"
				@click="toJump(item)"
				v-for="(item, index) in hospData"
				:key="index"
			>
				<div class="name">
					<div class="index">{{ index + 1 }}</div>
					<div class="Yyname">{{ item.name }}</div>
				</div>
				<div class="icon">
					<div class="icon1"><i class="el-icon-location"></i></div>
					<span class="juli"
						>{{
							distanceTwo(
								currentPosition.longitude,
								currentPosition.latitude,
								item.longitude,
								item.latitude
							)
						}}km</span
					>
				</div>

				<div class="tags">
					<el-tag type="warning" effect="dark" size="mini">
						{{ item.flags }}
					</el-tag>
				</div>
				<div class="address">
					{{ item.province }} {{ item.city }} {{ item.area }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "../utils/request";
export default {
	data() {
		return {
			currentPosition: {
				longitude: 109.409542,
				latitude: 24.321354,
			},
			pageParam: {
				page: 1,
				pageSize: 10,
				name: "",
			},
			hospData: [],
		};
	},
	computed: {},
	methods: {
		toSearch() {
			this.pageParam.page = 1;
			this.findAll();
		},
		//跳转页面
		toJump(hospital) {
			//使用js进行路由跳转页面
			// this.$router.push("/ddhospitalMap");
			this.$router.push({
				path: "/ddhospitalMap",
				query: {
					longitude: hospital.longitude,
					latitude: hospital.latitude,
				},
			});
		},
		distanceTwo(lng1, lat1, lng2, lat2) {
			var radLat1 = (lat1 * Math.PI) / 180.0;
			var radLat2 = (lat2 * Math.PI) / 180.0;
			var a = radLat1 - radLat2;
			var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
			var s =
				2 *
				Math.asin(
					Math.sqrt(
						Math.pow(Math.sin(a / 2), 2) +
							Math.cos(radLat1) *
								Math.cos(radLat2) *
								Math.pow(Math.sin(b / 2), 2)
					)
				);
			s = s * 6378.137; // EARTH_RADIUS;
			s = Math.round(s * 10000) / 10000;
			console.log("两地距离千米：", s);
			return s;
		},
		async findAll() {
			let res = await axios.get("/hospital/pageQuery", {
				params: this.pageParam,
			});

			this.hospData = res.data.list;
			this.total = res.data.total;
		},
	},
	created() {
		this.findAll();
		//获取当前位置
		navigator.geolocation.getCurrentPosition(
			(data) => {
				// console.log(data, "当前地理位置信息");
				this.currentPosition = data.coords;
				this.markerPosition = [
					this.currentPosition.longitude,
					this.currentPosition.latitude,
				];
			},
			(err) => {
				console.log(err);
			},
			{
				enableHighAccuracy: true, //高精度
				timeout: 5000, //超时时间
				maximumAge: 10000, //位置缓存时间
			}
		);
		this.center = [longitude, latitude];
	},
	mounted() {},
};
</script>
<style scoped>
.ball {
	background-image: url(../assets/hospital.png);
	height: 150px;
	margin: -18px;
	/* border-top-left-radius: 10px; */
	/* border-top-right-radius: 10px; */
}
.el-icon-s-custom {
	font-size: 20px;
}
#top {
	padding-top: 20px;
}
.title {
	color: #fff;
	font-size: 20px;
	font-weight: 700;
	height: 40px;
	margin-left: 17px;
}
.search {
	margin-top: 36px;
}
.input {
	display: inline-block;
	width: 185px;
	margin-right: 15px;
}
/* .list {
	width: 95%;
} */
.item {
	margin-bottom: 20px;
	padding-right: 10px;
}
.name {
	height: 48px;
	line-height: 48px;
	width: calc(100% - 110px);
	display: inline-block;
}
.index {
	border-radius: 50%;
	background-color: #f4f4f4;
	width: 20px;
	height: 20px;
	color: #333;
	display: inline-block;
	text-align: center;
	font-size: 15px;
	line-height: 20px;
}
.Yyname {
	display: inline-block;
	color: white;
}
.icon {
	width: 70px;
	height: 100px;
	float: right;
	text-align: center;
}
.juli {
	color: #999999;
	font-size: 14px;
}
.icon1 {
	margin-top: 15px;
	margin-bottom: 20px;
	color: #dee6f0;
}
.el-icon-location {
	font-size: 25px;
}
.tags {
	width: calc(100% - 110px);
	display: inline-block;
}
.address {
	display: inline-block;
	width: calc(100% - 110px);
	height: 28px;
	font-size: 12px;
	line-height: 28px;
	color: white;
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 200px;
	margin: 0;
}

.el-carousel__item:nth-child(6) {
	background: url("../../src/assets/hos3.jpg") no-repeat left top/100% 100%;
}
.el-carousel__item:nth-child(5) {
	background: url("../../src/assets/hos4.jpg") no-repeat left top/100% 100%;
}
.el-carousel__item:nth-child(3) {
	background: url("../../src/assets/hos1.jpg") no-repeat left top/100% 100%;
}
.el-carousel__item:nth-child(4) {
	background: url("../../src/assets/hos2.jpg") no-repeat left top/100% 100%;
}
#fix-hospital {
	background: url("../../src/assets/8.jpg") no-repeat left top/100% 100%;
}
.item:hover {
	background: rgba(248, 248, 248, 0.2);
	/* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
	color: #fff;
	/* font-size: 14px; */
}
</style>
