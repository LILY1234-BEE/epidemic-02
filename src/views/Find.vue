<template>
	<div id="Grade">
		<div id="titile">疫情风险等级查询</div>
		<div id="smalltitle" letter-spacing>防控新冠肺炎疫情</div>
		<el-button type="primary" @click="text">选择</el-button>
		<div class="Find">
			<el-cascader-panel
				:props="{ value: 'label' }"
				v-model="pcaData"
				:options="regionData"
			></el-cascader-panel>
		</div>
		<div class="aimg" v-show="a">
			<div class="img1"></div>
			<div class="atitle1">低风险地区</div>

			<div class="atitle4">
				<el-tag size="mini" type="danger" effect="dark">注意</el-tag>
				去往此地需要出示健康安全码
			</div>
			<div class="atitle3">有关信息来自地上报的疫情风险等级</div>
			<div class="atitle2">截至2021-01-10</div>
		</div>
		<div class="bimg" v-show="b">
			<div class="img2"></div>
			<div class="btitle1">中高风险地区</div>

			<div class="btitle4">
				<el-tag size="mini" type="danger" effect="dark">注意</el-tag>

				去当地旅游、出差，需要注意防范
			</div>
			<div class="btitle5">中高风险地区去往其他地区需要进行隔离14天</div>
			<div class="btitle3">有关信息来自当地上报的疫情风险等级</div>
			<div class="btitle2">截至2021-01-10</div>
		</div>
		<div id="ade">{{ tese }}</div>
	</div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
	data() {
		return {
			a: "",
			b: "",
			regionData,
			pcaData: "",
			tese: "",
			red: ["邢台市", "沈阳市", "大连市", "黑河市"],
		};
	},
	computed: {},
	methods: {
		text() {
			if (this.pcaData[0] == "北京市") {
				this.b = true;
				this.a = false;
			} else if (this.pcaData[1] in this.red) {
				this.b = true;
			} else {
				this.a = true;
				this.b = false;
			}
		},
	},
	created() {},
	mounted() {},
};
</script>
<style>
#titile {
	width: 100%;
	height: 90px;
	/* background-color: rgba(4, 32, 117, 0.877); */
	color: seashell;
	margin: 0 auto;
	text-align: center;
	font-size: 35px;
	line-height: 100px;
	/* border-radius: 10px; */
}
#smalltitle {
	width: 100%;
	height: 40px;
	text-align: center;
	font-size: 15px;
	letter-spacing: 5px;
	color: rgba(109, 204, 248, 0.959);
	/* background-color: rgba(4, 32, 117, 0.877); */
}
.img1 {
	width: 149px;
	height: 159px;
	background: url("../assets/C1.jpg");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	margin: 0 auto;
}
.img2 {
	width: 149px;
	height: 159px;
	background: url("../assets/C2.jpg");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	margin: 0 auto;
}

.bimg {
	width: 450px;
	height: 500px;
	position: absolute;
	left: 800px;
	top: 270px;
}
.btitle1 {
	width: 180px;
	height: 45px;
	margin: 0 auto;
	font-size: 30;
	color: red;
}
.btitle2 {
	width: 120px;
	height: 20px;
	margin: 0 auto;
	color: #c7c5c5;
	font-size: 15;
}
.btitle3 {
	width: 260px;
	height: 20px;
	margin: 0 auto;
	color: #c7c5c5;
	font-size: 15;
}
.btitle4 {
	width: 280px;
	height: 25px;
	margin: 0 auto;
	font-size: 15;
}
.btitle5 {
	width: 310px;
	height: 30px;
	margin: 0 auto;
	font-size: 15;
}
.aimg {
	width: 450px;
	height: 300px;
	position: absolute;
	left: 800px;
	top: 270px;
}
.atitle1 {
	width: 160px;
	height: 45px;
	margin: 0 auto;
	font-size: 30;
	color: rgb(25, 230, 25);
}
.atitle2 {
	width: 120px;
	height: 20px;
	margin: 0 auto;
	color: #c7c5c5;
	font-size: 15;
}
.atitle3 {
	width: 240px;
	height: 20px;
	margin: 0 auto;
	color: #c7c5c5;
	font-size: 15;
}
.atitle4 {
	width: 250px;
	margin: 0 auto;
	height: 30px;
}
.Find .el-cascader-panel {
	width: 550px;
}
.el-cascader-node__label {
	color: black !important;
	box-sizing: border-box;
	font-size: 15px;
	font-weight: bold;
	/* background: rgba(255, 255, 255, 0.2); */
}
.el-cascader-panel {
	background: rgba(255, 255, 255, 0.5);
}
.test .el-form-item__label {
	color: white;
	font-weight: bold;
	font-size: 15px;
}
</style>
