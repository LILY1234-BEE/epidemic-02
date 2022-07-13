<template>
	<div id="home">
		<div class="block">
			<span class="demonstration"></span>
			<el-carousel height="360px">
				<el-carousel-item v-for="item in carouselList" :key="item.key">
					<img
						ref="imgHeight"
						:src="item.src"
						object-fit="cover"
						style="margin-left: 97px"
					/>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div>
			<swiper>
				<swiper-slide>
					<div align="center"><img alt="" /></div>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>

		<div class="current">
			<div class="title">{{ currentTime }}</div>
			<el-row :gutter="5">
				<el-col
					v-for="(item, index) in epidemicData.currentData"
					:key="index"
					:span="8"
				>
					<div class="currentBg">
						<div class="colorDiv">
							<div v-if="index == 0" class="color">
								{{ item.num }}
							</div>
							<div v-if="index == 1" class="color1">
								{{ item.num }}
							</div>
							<div v-if="index == 2" class="color2">
								{{ item.num }}
							</div>
						</div>
						<div>{{ item.name }}</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="history">
			<div class="title">截至日期：{{ currentTime }}24时</div>
			<el-row :gutter="5">
				<el-col
					v-for="(item, index) in epidemicData.historyData"
					:key="index"
					:span="8"
				>
					<div class="currentBg historyBg">
						<div class="colorDiv">
							<div v-if="index == 0" class="color3">
								{{ item.num }}
							</div>
							<div v-if="index == 1" class="color4">
								{{ item.num }}
							</div>
							<div v-if="index == 2" class="color5">
								{{ item.num }}
							</div>
							<div v-if="index == 3" class="color6">
								{{ item.num }}
							</div>
							<div v-if="index == 4" class="color7">
								{{ item.num }}
							</div>
							<div v-if="index == 5" class="color8">
								{{ item.num }}
							</div>
						</div>

						<div>{{ item.name }}</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="tableDiv">
			<div class="title">国内病例</div>

			<el-table
				:header-cell-style="cellClass"
				:data="tableData"
				style="width: 100%"
			>
				<el-table-column
					align="center"
					prop="province"
					label="地区"
					width="180"
				>
				</el-table-column>
				<el-table-column
					align="center"
					prop="confirmed"
					label="新增确诊"
					width="180"
				>
				</el-table-column>
				<el-table-column
					align="center"
					prop="suspected"
					label="新增疑似"
					width="180"
				>
				</el-table-column>
				<el-table-column
					align="center"
					prop="dead"
					label="新增死亡"
					width="180"
				>
				</el-table-column>
				<el-table-column
					align="center"
					prop="cure"
					label="新增治愈"
					width="180"
				>
				</el-table-column>
				<el-table-column
					align="center"
					prop="severe"
					label="新增重症"
					width="180"
				>
				</el-table-column>
				<el-table-column
					align="center"
					prop="outside"
					label="境外输入"
					width="180"
				>
				</el-table-column>
			</el-table>
		</div>
		<!-- <div class="table2Div"> -->

		<div class="articleDiv">
			<div class="title">最新进展</div>
			<div class="content">
				<!-- 列表展示区 -->
				<div class="contenList">
					<div
						@click="
							currentArticle = item;
							dialogVisible = true;
						"
						v-for="(item, index) in listData"
						:key="item.id"
					>
						<div class="listHeader">
							<div class="circle"></div>
							<el-tag
								v-if="index == 0"
								size="small"
								type="danger"
								effect="dark"
							>
								最新
							</el-tag>
							<span>{{
								moment(item.publishTime).format(
									"YYYY-MM-DD HH:mm:ss"
								)
							}}</span>
						</div>
						<div class="listContent">
							{{ item.title }}
						</div>
					</div>
				</div>
				<!-- 列表分页 -->
				<div class="contenPage">
					<el-pagination
						@current-change="currentChange"
						layout="prev, pager, next"
						:total="total"
					>
					</el-pagination>
				</div>
			</div>
		</div>
		<div>
			<el-dialog
				:title="currentArticle.title"
				:visible.sync="dialogVisible"
				width="70%"
			>
				<div>
					{{
						moment(currentArticle.publishTime).format(
							"YYYY-MM-DD HH:mm:ss"
						)
					}}
				</div>
				<span class="imgWidth" v-html="currentArticle.content"></span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogVisible = false"
						>确 定</el-button
					>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import Swiper from "swiper";
import axios from "../utils/request";
let moment = require("moment");
export default {
	data() {
		return {
			setBannerH() {
				this.bannerH = document.body.clientWidth / 2;
			},
			carouselList: [
				{ src: require("../assets/S1.jpg") },
				{ src: require("../assets/S2.jpg") },
				{ src: require("../assets/S3.jpg") },
			],
			dialogVisible: false,
			//当前查看内容的资讯内容
			currentArticle: {},
			//进展总数
			total: 0,
			//最新进展数据
			listData: [],
			//分页参数
			pageParam: {
				page: 1,
				pageSize: 10,
				categoryId: 3,
			},
			//国内病例数据
			tableData: [],
			//当天时间
			currentTime: this.moment(new Date()).format("M月D日"),
			//当天疫情数据和历史疫情数据
			epidemicData: {
				currentData: [
					{
						name: "新增确诊",
						num: this.getRandom(0, 10),
					},
					{
						name: "本土新增",
						num: this.getRandom(0, 3),
					},
					{
						name: "境外输入",
						num: this.getRandom(0, 10),
					},
				],
				historyData: [
					{
						name: "现有确诊",
						num: this.getRandom(10, 100),
					},
					{
						name: "现有重症",
						num: this.getRandom(10, 20),
					},
					{
						name: "累积境外输入",
						num: this.getRandom(500, 2000),
					},
					{
						name: "累积确诊",
						num: this.getRandom(80000, 100000),
					},
					{
						name: "累积出院",
						num: this.getRandom(70000, 80000),
					},
					{
						name: "累积死亡",
						num: this.getRandom(500, 1000),
					},
				],
			},
		};
	},
	computed: {},
	methods: {
		moment,
		//当前页码
		currentChange(val) {
			this.pageParam.page = val;
			this.findArticle();
		},
		async findArticle() {
			//分页获取最新进展的资讯信息
			let res = await axios.get("/article/pageQuery", {
				params: this.pageParam,
			});
			this.listData = res.data.list;
			this.total = res.data.total;
		},
		//表头背景
		cellClass({ columnIndex }) {
			// console.log(columnIndex, "----------");
			let color = "#e0e0fe";
			if (columnIndex == 1) color = "#dd837f";
			if (columnIndex == 2) color = "#f4d3aa";
			if (columnIndex == 3) color = "#fdcccb";
			if (columnIndex == 4) color = "#c5eab4";
			if (columnIndex == 5) color = "#d2d2d2";
			if (columnIndex == 6) color = "#fbda68";
			return {
				backgroundColor: color,
				color: "#000",
				fontWeight: "normal",
				height: "50px",
			};
		},
		getRandom(num1, num2) {
			return Math.round(Math.random() * (num2 - num1) + num1);
		},
	},
	async created() {
		this.findArticle();
		let res = await axios.get("/epidemic/pageQuery", {
			params: { page: 1, pageSize: 20 },
		});
		this.tableData = res.data.list;
	},
};
</script>
<style>
.title {
	color: white;
	margin-bottom: 5px;
	font-size: 17.5px;
	font-weight: bold;
	/* line-height: 2em; */
}
.currentBg {
	background-color: white;
	width: 134px;
	height: 110px;
	border-radius: 50%;
	padding: 10px 0;
	box-sizing: border-box;
	text-align: center;
	line-height: 30px;
	font-size: 17.5px;
	font-weight: bold;
	size: 1cm;
	margin-bottom: 50px;
	margin-left: 123px;
}

/* .colorDiv {
  color: coral;
  font-weight: bold;
  font-size: 21.5px;
} */
.historyBg {
	background-color: white;
}
.contenList {
	background-color: #f8f8f8;
	padding: 20px;
}
.listHeader > * {
	margin-right: 5px;
}
.listHeader span:last-child {
	vertical-align: -1px;
}
.circle {
	width: 10px;
	height: 10px;
	border-radius: 45%;
	background-color: blue;
	display: inline-block;
}
.listContent {
	padding: 16px;
	border-radius: 5px;
	color: #333;
	background-color: #fff;
	margin-top: 5px;
	font-size: 14px;
	margin-bottom: 10px;
}

.colorDiv .color {
	color: #ff6a57;
	font-weight: bold;
	font-size: 21.5px;
}
.colorDiv .color1 {
	color: #e86d48;
	font-weight: bold;
	font-size: 21.5px;
	margin-top: 10px;
}
.colorDiv .color2 {
	color: #ec9217;
	font-weight: bold;
	font-size: 21.5px;
	margin-top: 10px;
}
.currentBg .color3 {
	color: coral;
	font-weight: bold;
	font-size: 21.5px;
	margin-top: 10px;
}
.currentBg .color4 {
	color: #545499;
	font-weight: bold;
	font-size: 21.5px;
	margin-top: 10px;
}
.colorDiv .color5 {
	color: #2b48e2;
	font-weight: bold;
	font-size: 21.5px;
	margin-top: 10px;
}
.currentBg .color6 {
	color: darkorange;
	font-weight: bold;
	font-size: 21.5px;
	margin-bottom: 2px;
	margin-top: 10px;
}
.currentBg .color7 {
	color: #10aeb5;
	font-weight: bold;
	font-size: 21.5px;
	margin-top: 10px;
}
.currentBg .color8 {
	color: #e42107;
	font-weight: bold;
	font-size: 21.5px;
	margin-top: 10px;
}

/* 设置v-html字符串图片样式 */
>>> .imgWidth img {
	width: 100%;
}
.el-table,
.el-table__expanded-cell {
	background: rgba(129, 126, 126, 0) !important;
	color: white;
	font-weight: bold;
}

.el-table tr {
	background: rgba(129, 126, 126, 0) !important;
	color: white;
	font-weight: bold;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
	background: rgba(248, 248, 248, 0.5) !important;
	/* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
	font-size: 14px;
}
.el-button--text {
	color: #fff;
	background: rgba(129, 126, 126, 0) !important;
}
#home {
	background: rgba(129, 126, 126, 0.3);
	/* height: 100%; */
}
.block img {
	width: 85%;
	height: 360px;

	margin-bottom: 2cm;
}
.el-carousel__item[data-v-fae5bece]:nth-child(2n + 1) {
	background-color: white;
}
.el-carousel__item[data-v-fae5bece]:nth-child(2n) {
	background-color: white;
}
</style>
