<template>
	<div id="current">
		<div>
			<div class="left">
				<el-button
					class="button1"
					type="primary"
					background-color="#10aeb5"
					@click="toDraw1"
					plain
					>现有确诊省top</el-button
				>
				<el-button
					class="button2"
					type="primary"
					background-color="#10aeb5"
					@click="toDraw2"
					plain
					>现有确诊/累积确诊趋势</el-button
				>
				<el-button
					class="button3"
					type="primary"
					background-color="#10aeb5"
					@click="toDraw3"
					plain
					>累积确诊/治愈</el-button
				>
			</div>
		</div>
		<div>
			<div id="currentAdd"></div>
		</div>
		<div id="currenAdd1" v-show="show"></div>
		<div id="currenAdd2" v-show="show2"></div>
		<div id="currenAdd3" v-show="show3"></div>
	</div>
</template>

<script>
let echarts = require("echarts");
export default {
	data() {
		return {
			show: true,
			show2: false,
			show3: false,
		};
	},
	computed: {},
	methods: {
		getOption1() {
			return {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						// crossStyle: {
						//     color: '#999'
						// }
					},
				},
				toolbox: {
					feature: {
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ["line", "bar"] },
						restore: { show: true },
						// saveAsImage: {show: true}
					},
				},
				legend: {
					data: ["累积确诊", "治愈"],
				},
				xAxis: [
					{
						type: "category",
						data: [
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月",
							"1月",
						],
						axisLabel: {
							show: true,
							textStyle: {
								color: "#fff",
							},
						},
						axisPointer: {
							type: "shadow",
						},
					},
				],
				yAxis: [
					{
						axisLine: {
							show: true,
							lineStyle: {
								color: "white",
							},
						},
						type: "value",
						name: "人数",
						min: 0,
						max: 100000,
						interval: 10000,
						axisLabel: {
							formatter: "{value} ",
						},
					},
				],
				series: [
					{
						name: "累积确诊",
						type: "bar",
						color: "#c23531",
						data: [
							13779,
							28060,
							32741,
							81000,
							85000,
							87000,
							88000,
							91000,
							91100,
							93000,
							95500,
							98000,
						],
					},
					{
						name: "治愈",
						color: "#10aeb5",
						type: "bar",
						data: [
							1000,
							10000,
							20000,
							50000,
							66511,
							70331,
							83230,
							85030,
							86000,
							87262,
							90551,
							95332,
						],
					},
				],
			};
		},
		getOption2() {
			return {
				color: ["#eb794e", "#d92121"],
				title: {
					text: "现有确诊/累积确诊趋势",
				},
				tooltip: {
					trigger: "axis",
				},
				legend: {
					data: ["现有确诊", "累积确诊"],
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "10%",
					containLabel: true,
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: [
						"二月",
						"三月",
						"四月",
						"五月",
						"六月",
						"七月",
						"八月",
						"九月",
						"十月",
						"十一月",
						"十二月",
						"一月",
					],
					axisLabel: {
						show: true,
						textStyle: {
							color: "#fff",
						},
					},
				},
				yAxis: {
					type: "value",
					axisLine: {
						show: true,
						lineStyle: {
							color: "white",
						},
					},
					lineStyle: {
						color: "white",
					},
				},
				series: [
					{
						name: "现有确诊",
						type: "line",

						data: [
							2630,
							13779,
							32741,
							2895,
							811,
							128,
							582,
							2281,
							675,
							368,
							525,
							1297,
							1323,
						],
					},
					{
						name: "累积确诊",
						type: "line",

						data: [
							28060,
							62000,
							80000,
							81000,
							85000,
							87000,
							88000,
							91000,
							91100,
							93000,
							93500,
							98000,
						],
					},
				],
			};
		},
		getOption3() {
			return {
				title: {
					text: "现有确诊省Top10",
				},
				color: [
					"#d92121",
					"#e97049",
					"#e97049",
					"#e97049",
					"#e97049",
					"#e97049",
					"#e97049",
					"#e97049",
					"#e97049",
					"#e97049",
					"#e97049",
					"#e97049",
				],
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
					},
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "10%",
					containLabel: true,
				},
				xAxis: [
					{
						type: "category",
						data: [
							"香港",
							"台湾",
							"上海市",
							"河北省",
							"辽宁省",
							"北京市",
							"广东省",
							"四川省",
							"陕西省",
							"福建省",
						],
						axisLabel: {
							show: true,
							textStyle: {
								color: "#fff",
							},
						},
						axisTick: {
							alignWithLabel: true,
						},
					},
				],
				yAxis: [
					{
						type: "value",
						name: "人数",
						axisLine: {
							show: true,
							lineStyle: {
								color: "white",
							},
						},
					},
				],
				series: [
					{
						name: "直接访问",
						type: "bar",
						barWidth: "30%",
						data: [195, 107, 94, 92, 72, 38, 36, 26, 25, 23],
					},
				],
			};
		},
		toDraw1() {
			let chart = echarts.init(document.getElementById("currenAdd1"));
			let option = this.getOption3();
			chart.setOption(option);
			this.show = true;
			this.show2 = false;
			this.show3 = false;
		},
		toDraw2() {
			let chart = echarts.init(document.getElementById("currenAdd2"));
			let option2 = this.getOption2();
			chart.setOption(option2);
			this.show = false;
			this.show2 = true;
			this.show3 = false;
		},
		toDraw3() {
			let chart = echarts.init(document.getElementById("currenAdd3"));
			let option3 = this.getOption1();
			chart.setOption(option3);
			this.show = false;
			this.show2 = false;
			this.show3 = true;
		},
		getOption() {
			return {
				title: {
					text: "2020年新冠疫情",
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						crossStyle: {
							color: "#999",
						},
					},
				},
				toolbox: {
					feature: {
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ["line", "bar"] },
						saveAsImage: { show: true },
					},
				},
				legend: {
					data: ["新增确诊", "新增重症", "新增治愈", "新增死亡"],
				},
				xAxis: [
					{
						type: "category",
						data: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月",
						],
						axisLabel: {
							show: true,
							textStyle: {
								color: "#fff",
							},
						},
						axisPointer: {
							type: "shadow",
						},
					},
				],
				yAxis: [
					{
						type: "value",
						name: "数量",
						min: 0,
						max: 1000,
						interval: 100,
						axisLabel: {
							formatter: "{value} 人",
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "white",
							},
						},
					},
				],
				series: [
					{
						name: "新增确诊",
						type: "line",
						data: [
							320,
							254,
							336,
							850,
							592,
							235,
							100,
							20,
							163,
							13,
							14,
							30,
						],
					},
					{
						name: "新增重症",
						type: "line",
						data: [
							200,
							180,
							300,
							520,
							436,
							196,
							30,
							7,
							93,
							0,
							5,
							2,
						],
					},
					{
						name: "新增治愈",
						type: "line",
						data: [100, 24, 26, 130, 60, 16, 93, 13, 70, 12, 9, 28],
					},
					{
						name: "新增死亡",
						type: "line",
						data: [20, 50, 10, 200, 96, 23, 25, 0, 0, 1, 0, 0],
					},
				],
			};
		},
		toDraw() {
			let chart = echarts.init(document.getElementById("currentAdd"));
			let option = this.getOption();
			chart.setOption(option);
		},
	},
	created() {
		//   console.log(document.getElementById("currenAdd"));
	},
	mounted() {
		//   console.log(document.getElementById("currenAdd"),"--------");
		this.toDraw();
		this.toDraw1();
		this.toDraw2();
	},
};
</script>
<style scoped>
#currentAdd {
	height: 300px;
}
#currenAdd1 {
	width: 950px;
	height: 340px;
}
#currenAdd2 {
	width: 950px;
	height: 340px;
}
#currenAdd3 {
	width: 950px;
	height: 340px;
}
.el-row {
	width: 900px;
	height: 30px;
}
.button1 {
	display: block;
	margin-left: 10px;
	margin-top: 50px;
}
.button2 {
	display: block;
	margin-top: 50px;
}
.button3 {
	display: block;
	margin-top: 50px;
}
.left {
	position: absolute;
	right: 100px;
	top: 370px;
}
#current {
	background: url("../assets/5.jpg") no-repeat left top/100% 100%;
}
</style>
