<template>
	<div id="Hospital">
		<div>
			<el-button
				type="primary"
				class="el-icon-circle-plus"
				@click="toAdd"
				size="mini"
			>
				新增</el-button
			>
		</div>
		<div class="tableDiv">
			<el-table
				class="table"
				size="small"
				:data="tableData"
				style="width: 100%"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="index" label="序号" width="48">
					<!-- 插槽作用域对象 仅能在当前使用
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{
						scope.$index + 1
					}}</span>
				</template> -->
				</el-table-column>
				<el-table-column label="医院名称" prop="name" width="220">
				</el-table-column>
				<el-table-column label="医院简介" prop="introduce" width="140">
				</el-table-column>
				<el-table-column label="医院地区" width="180">
					<!-- 插槽作用域对象 仅能在当前使用 -->
					<template slot-scope="scope">
						<!-- <i class="el-icon-time"></i> -->
						<span style="margin-left: 10px">
							{{ scope.row.province }} - {{ scope.row.city }} -
							{{ scope.row.area }}
						</span>
					</template>
				</el-table-column>
				<el-table-column label="医院地址" prop="address">
				</el-table-column>
				<el-table-column label="医院标记" prop="flags" width="80">
				</el-table-column>
				<el-table-column label="经度" prop="longitude" width="100">
				</el-table-column>
				<el-table-column label="纬度" prop="latitude" width="100">
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button
							type="text"
							size="mini"
							@click="handleEdit(scope.row)"
							>编辑</el-button
						>
						<el-button
							type="text"
							size="mini"
							@click="handleDelete(scope.row.id)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div>
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageParam.page"
				:page-sizes="[5, 12, 15, 20]"
				:page-size="pageParam.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</div>
		<el-dialog
			:title="title"
			:visible.sync="Visible"
			:before-close="beforeClose"
		>
			<el-dialog
				width="80%"
				:title="'获取' + (form.name || '') + '经纬度,点击选中.'"
				:visible.sync="innerVisible"
				append-to-body
			>
				<!-- <el-amap
					v-if="form.id"
					vid="amapDemo1"
					:center="[form.longitude, form.latitude]"
					:events="events"
					class="map"
				></el-amap>
				<el-amap
					v-else
					vid="amapDemo2"
					:events="events"
					class="map"
				></el-amap> -->

				<el-amap
					:center="
						form.id
							? [form.longitude, form.latitude]
							: [currentlng, currentlat]
					"
					vid="amapDemo"
					:events="events"
					class="map"
					zoom="12"
				>
					<el-amap-marker
						vid="component-marker"
						:position="markerPosition"
					></el-amap-marker
				></el-amap>
			</el-dialog>
			<el-form :model="form" ref="ruleFrom" :rules="rules">
				<el-form-item
					prop="name"
					label="名称"
					:label-width="formLabelWidth"
				>
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item
					prop="introduce"
					label="介绍"
					:label-width="formLabelWidth"
				>
					<el-input
						type="textarea"
						v-model="form.introduce"
						autocomplete="off"
					>
					</el-input>
				</el-form-item>
				<el-form-item
					prop="pca"
					label="省市区"
					:label-width="formLabelWidth"
				>
					<el-cascader
						clearable
						@change="pcaChange"
						v-model="form.pca"
						:options="regionData"
						:props="{ value: 'label' }"
					></el-cascader>
				</el-form-item>
				<el-form-item
					prop="address"
					label="详细地址"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="form.address"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					prop="flags"
					label="标记"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="form.flags"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					prop="longitude"
					label="经度"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="form.longitude"
						autocomplete="off"
					></el-input>
					<div class="butt">
						<el-button
							size="small"
							type="primary"
							@click="innerVisible = true"
							>选取经纬度</el-button
						>
					</div>
				</el-form-item>
				<el-form-item
					prop="latitude"
					label="纬度"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="form.latitude"
						autocomplete="off"
					></el-input>
					<div class="butt">
						<el-button
							size="small"
							type="primary"
							@click="innerVisible = true"
							>选取经纬度</el-button
						>
					</div>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="toCancel">取 消</el-button>

				<el-button type="primary" @click="toSave('ruleFrom')"
					>确 定</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import axios from "../../utils/request";
import { regionData } from "element-china-area-data";
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
let amapManager = new AMapManager();
export default {
	data() {
		var checkAge = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("序号不能为空"));
			}
			setTimeout(() => {
				if (!Number.isInteger(value)) {
					callback(new Error("请输入数字值"));
				}
				callback();
			}, 1000);
		};
		return {
			markerPosition: [],
			currentlng: 109.409542,
			currentlat: 24.321354,
			events: {
				click: (e) => {
					console.log(e.lnglat);
					this.markerPosition = [e.lnglat.lng, e.lnglat.lat];
					this.form.longitude = e.lnglat.lng;
					this.form.latitude = e.lnglat.lat;
					this.form.longitude;
					// this.innerVisible = false;
				},
			},
			innerVisible: false,
			regionData,
			// 分页
			total: 0,
			pageParam: {
				page: 1,
				pageSize: 10,
				name: "",
			},

			multipleSelection: [],
			tableData: [],
			//模态框可见性
			Visible: false,
			//模态框的数据
			form: {},
			//表单控件的宽度
			formLabelWidth: "120px",
			title: "录入医院信息",

			rules: {
				name: [
					{
						required: true,
						message: "请输入名称",
						trigger: "blur",
					},
				],
				introduce: [
					{
						required: true,
						message: "请输入介绍",
						trigger: "blur",
					},
				],
				pca: [
					{
						required: true,
						message: "请输入省市区",
						trigger: "blur",
					},
				],
				address: [
					{
						required: true,
						message: "请输入地址",
						trigger: "blur",
					},
				],
				flags: [
					{
						required: true,
						message: "请输入标记",
						trigger: "blur",
					},
				],
				longitude: [
					{
						required: true,
						message: "请输入经度",
						trigger: "blur",
					},
				],
				latitude: [
					{
						required: true,
						message: "请输入纬度",
						trigger: "blur",
					},
				],
			},
		};
	},
	computed: {},
	methods: {
		async pcaChange(val) {
			this.form = {
				...this.form,
				province: val[0],
				city: val[1],
				area: val[2],
			};
			this.$jsonp("http://api.map.baidu.com/geocoding/v3/", {
				address: `${val[0]}${val[1]}${val[2]}`,
				output: "json",
				ak: "6AQ1NGDOfXczMU9U6MGKsRn5bD1uupIO",
			})
				.then((json) => {
					// 得到我们想要的内容
					// console.log(json.result.location);
					this.currentlng = json.result.location.lng;
					this.currentlat = json.result.location.lat;
					this.markerPosition = [
						json.result.location.lng,
						json.result.location.lat,
					];
					this.form.longitude = json.result.location.lng;
					this.form.latitude = json.result.location.lat;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//分页
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
			// this.pageParam = {
			// 	...this.pageParam,
			// 	pageSize: val,
			// };
			this.pageParam.pageSize = val;
			this.pageQuery();
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.pageParam.page = val;
			this.pageQuery();
		},
		//多选
		handleSelectionChange(val) {
			//val是用户选中数据对象的数组
			this.multipleSelection = val.map((item) => item.id);
		},
		//批量删除
		// toBatchDelete() {

		// },
		//模态框关闭之前
		beforeClose(done) {
			this.$refs["ruleFrom"].resetFields();
			done();
		},
		//关闭模态框
		toCancel() {
			this.$refs["ruleFrom"].resetFields();
			this.Visible = false;
		},
		//点击新增按钮
		toAdd() {
			this.form = {};
			this.markerPosition = [this.currentlng, this.currentlat];
			this.Visible = true;
			this.title = "录入医院信息";
		},
		//点击确定按钮
		toSave(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					axios
						.post("/hospital/saveOrUpdate", this.form)
						.then((res) => {
							if (res.status == 200) {
								//保存成功，关闭模态框 刷新数据
								this.$notify({
									title: "成功",
									message: "这一条信息保存成功！",
									type: "success",
								});
								this.toCancel();
								this.pageQuery();
							} else {
								this.$notify.error({
									title: "失败",
									message: "error",
								});
							}
						});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		//编辑
		handleEdit(row) {
			this.title = "编辑医院信息";
			this.form = {
				...row,
				pca: [row.province, row.city, row.area],
			};
			this.markerPosition = [this.form.longitude, this.form.latitude];
			this.Visible = true;
		},
		//删除
		handleDelete(id) {
			this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					let res;
					//id医院对象的id
					//await 等待后面异步函数运行完毕，拿到响应数据
					if (id) {
						res = await axios.get("/hospital/deleteById", {
							params: { id },
						});
					} else {
						res = await axios.get("/hospital/deleteById", {
							ids: this.multipleSelection.toString(),
						});
					}
					console.log(res);
					this.$notify({
						title: res.status == 200 ? "成功" : "失败",
						message: res.statusText,
						type: res.status == 200 ? "success" : "error",
					});
					this.pageQuery();
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		// 分页查找
		async pageQuery() {
			let res = await axios.get("/hospital/pageQuery", {
				params: this.pageParam,
			});
			this.tableData = res.data.list;
			this.total = res.data.total;
		},
	},
	created() {
		this.pageQuery();
		//获取定位（一次）
		navigator.geolocation.getCurrentPosition(
			(data) => {
				// 信息都包含在data.coords里面
				this.markerPosition = [this.currentlng, this.currentlat];
				this.currentlng = data.coords.longitude;
				this.currentlat = data.coords.latitude;
			},
			(err) => {
				console.log(err);
				// err是形如 {code: 3, message: "Timeout expired"} 的对象
			}
		);
	},
	mounted() {},
};
</script>
<style>
#Hospital {
	background: rgba(129, 126, 126, 0.3);
}
.el-button--text {
	color: #fff;
	background: rgba(129, 126, 126, 0);
}
.el-table,
.el-table__expanded-cell {
	background: rgba(129, 126, 126, 0);
	color: white;
	font-weight: bold;
}
.el-table th,
.el-table tr {
	background: rgba(129, 126, 126, 0);
	color: white;
	font-weight: bold;
}
/* .table tr:hover > td { */
.el-table--enable-row-hover .el-table__body tr:hover > td {
	background: rgba(248, 248, 248, 0.1);
	/* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
	font-size: 13px;
}
.el-pagination__total {
	color: white;
}
.el-pagination__jump {
	color: white;
}
.butt {
	position: absolute;
	right: 0;
	top: 0;
}
</style>
