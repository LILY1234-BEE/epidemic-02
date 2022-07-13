<template>
	<div id="up">
		<!-- {{ pcaData }} -->
		<!--  :props="{value:'label'}" 是将数据对象内的label值作为最终选中的值-->
		<el-cascader-panel
			:props="{ value: 'label' }"
			v-model="pcaData"
			:options="regionData"
			@change="pcaChange"
		></el-cascader-panel>
		<div class="formDivParent">
			<div class="formDiv">
				<el-form
					:model="form"
					:rules="rules"
					ref="ruleForm"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item size="small" label="确诊" prop="confirmed" class="test">
						<el-input
							min="0"
							type="number"
							v-model="form.confirmed"
						></el-input>
					</el-form-item>
					<el-form-item size="small" label="疑似" prop="suspected" class="test">
						<el-input
							min="0"
							type="number"
							v-model="form.suspected"
						></el-input>
					</el-form-item>
					<el-form-item size="small" label="死亡" prop="dead" class="test">
						<el-input
							min="0"
							type="number"
							v-model="form.dead"
						></el-input>
					</el-form-item>
					<el-form-item size="small" label="治愈" prop="cure" class="test">
						<el-input
							min="0"
							type="number"
							v-model="form.cure"
						></el-input>
					</el-form-item>
					<el-form-item size="small" label="重症" prop="severe" class="test">
						<el-input
							min="0"
							type="number"
							v-model="form.severe"
						></el-input>
					</el-form-item>
					<el-form-item size="small" label="境外输入" prop="outside" class="test">
						<el-input
							min="0"
							type="number"
							v-model="form.outside"
						></el-input>
					</el-form-item>

					<el-form-item>
						<el-button
							type="primary"
							@click="submitForm('ruleForm')"
							>上报</el-button
						>
					</el-form-item>
				</el-form>
			</div>
			<div class="tipDiv">
				温馨提示：<br />
				1. 选中城市 <br />2. 录入数据 <br />疫情防控，众志成城<br />
			</div>
		</div>
	</div>
</template>

<script>
import axios from "../../utils/request";
import { regionData } from "element-china-area-data";
import moment from "moment";
export default {
	data() {
		return {
			//省市区数据
			pcaData: "",
			regionData,
			form: {
				country: "中国",
				province: "",
				city: "",
				area: "",
				confirmed: "",
				suspected: "",
				dead: "",
				cure: "",
				severe: "",
				outside: "",
			},
			rules: {
				confirmed: [
					{
						required: true,
						message: "请输入正确的确诊数量",
						trigger: "blur",
					},
				],
				suspected: [
					{
						required: true,
						message: "请输入正确的确证数量",
						trigger: "blur",
					},
				],
				confirmed: [
					{
						required: true,
						message: "请输入正确的疑似数量",
						trigger: "blur",
					},
				],
				dead: [
					{
						required: true,
						message: "请输入正确的死亡数量",
						trigger: "blur",
					},
				],
				cure: [
					{
						required: true,
						message: "请输入正确的治愈数量",
						trigger: "blur",
					},
				],
				severe: [
					{
						required: true,
						message: "请输入正确的重症数量",
						trigger: "blur",
					},
				],
				outside: [
					{
						required: true,
						message: "请输入正确的确境外输入数量",
						trigger: "blur",
					},
				],
			},
		};
	},
	computed: {},
	methods: {
		moment,
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				// 验证省市区数据
				if (this.pcaData.length == 0) {
					this.$notify({
						title: "提示",
						message: "请选择省市区",
						type: "warning",
					});
					return;
				}
				if (valid) {
					//保存更新
					let res = await axios.post(
						"/epidemic/saveOrUpdate",
						this.form
					);
					this.$notify({
						title: res.status == 200 ? "成功" : "失败",
						message: res.statusText,
						type: res.status == 200 ? "success" : "error",
					});
					this.form = {};
					this.pcaData = [];
					this.$router.push("/uplist");
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		async pcaChange(val) {
			// console.log(val);
			// 找到该省市区当天的数据，
			//如果当天有数据，在表单中填充，做修改操作，如果当天没有数据，表单清空做新增操作
			let res = await axios.get("/epidemic/pageQuery", {
				params: {
					page: 1,
					pageSize: 10,
					province: val[0],
					city: val[1],
					area: val[2],
					inputTime: moment(new Date()).format("YYYY-MM-DD"),
				},
			});
			// console.log(res.data.list);
			if (res.data.list.length == 0) {
				this.form = {
					country: "中国",
					province: val[0],
					city: val[1],
					area: val[2],
					confirmed: "",
					suspected: "",
					dead: "",
					cure: "",
					severe: "",
					outside: "",
				};
			} else {
				//修改
				this.form = {
					...res.data.list[0],
				};
			}
		},
	},
	created() {},
	mounted() {},
};
</script>
<style>
/* BFC块级格式上下文 */
.formDivParent {
	/* 清除子元素浮动对父元素产生的影响 */
	overflow: hidden;
	margin-top: 20px;
}
.formDiv {
	/* display: inline-block; */
	width: 50%;
	/* vertical-align: top; */
	float: left;
}
.tipDiv {
	float: left;
	color: white;
	margin-left: 20px;
	font-size: 14px;
	line-height: 16px;
	font-weight: bolder;
}
.el-cascader-node__label{
	color: black !important;
	 box-sizing: border-box;
	 font-size: 15px;
	 font-weight: bold;
	/* background: rgba(255, 255, 255, 0.2); */
}
.el-cascader-panel{
	background: rgba(255, 255, 255, 0.5);
}
.test .el-form-item__label{
	color: white;
	font-weight: bold;
	font-size: 15px;
}
#up{
    background: url("../../assets/9.jpg") no-repeat left top/100% 100%;
}
</style>
