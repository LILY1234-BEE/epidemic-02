<template>
	<div>
		<div id="china"></div>
	</div>
</template>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/echarts/3.8.4/echarts.min.js"></script>
<script>
let echarts = require("echarts");
import "./echarts/china";
export default {
	data() {
		return {
			Mydata: [],
		};
	},
	computed: {},
	methods: {
		getMydata() {
			return {
				mydata: [
					{ name: "北京", value: 995 },
					{ name: "天津", value: 316 },
					{ name: "上海", value: 1551 },
					{ name: "重庆", value: 590 },
					{ name: "河北", value: 498 },
					{ name: "河南", value: 1301 },
					{ name: "云南", value: 230 },
					{ name: "辽宁", value: 377 },
					{ name: "黑龙江", value: 971 },
					{ name: "湖南", value: 1022 },
					{ name: "安徽", value: 993 },
					{ name: "山东", value: 863 },
					{ name: "新疆", value: 980 },
					{ name: "江苏", value: 686 },
					{ name: "浙江", value: 1306 },
					{ name: "江西", value: 935 },
					{ name: "湖北", value: 68149 },
					{ name: "广西", value: 264 },
					{ name: "甘肃", value: 182 },
					{ name: "山西", value: 225 },
					{ name: "内蒙古", value: 366 },
					{ name: "陕西", value: 521 },
					{ name: "吉林", value: 157 },
					{ name: "福建", value: 519 },
					{ name: "贵州", value: 147 },
					{ name: "广东", value: 2065 },
					{ name: "青海", value: 18 },
					{ name: "西藏", value: 1 },
					{ name: "四川", value: 857 },
					{ name: "宁夏", value: 75 },
					{ name: "海南", value: 171 },
					{ name: "台湾", value: 825 },
					{ name: "香港", value: 9107 },
					{ name: "澳门", value: 46 },
				],
			};
		},
		getOption() {
			return {
				title: {
					text: "全国地图大数据",
					subtext: "累积确诊人数",
				},
				tooltip: {
					trigger: "item",
					formatter: "{b}<br/>{c} (p / km2)",
				},
				toolbox: {
					show: true,
					orient: "vertical",
					left: "right",
					top: "center",
					feature: {
						dataView: { readOnly: false },
						restore: {},
						saveAsImage: {},
					},
				},
				visualMap: {
					min: 0,
					max: 1500,
					text: ["High", "Low"],
					realtime: false,
					calculable: true,
					inRange: {
						color: ["lightskyblue", "orangered", "#b80909"],
					},
				},
				series: [
					{
						name: "全国地图大数据",
						type: "map",
						mapType: "china", // 自定义扩展图表类型
						label: {
							show: true,
						},
						data: this.Mydata.mydata,

						// 自定义名称映射
					},
				],
			};
		},
		randomData() {
			return Math.round(Math.random() * 1000);
		},
		toDraw() {
			this.Mydata = this.getMydata();
			//   console.log(this.Mydata, "1111111111111");
			//初始化echarts实例
			let myChart = echarts.init(document.getElementById("china"));
			//使用制定的配置项和数据显示图表
			let optionMap = this.getOption();
			myChart.setOption(optionMap);
		},
	},
	created() {},
	mounted() {
		this.toDraw();
	},
};
</script>

<style scoped>
#china {
	height: 650px;
	background: url("../assets/5.jpg") no-repeat left top/100% 100%;
}
</style>
