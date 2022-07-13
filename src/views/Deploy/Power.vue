<template>
	<div id="power">
		<div>
			<!-- <div class="sea">层次树</div> -->
			<el-input placeholder="输入关键字进行搜索" v-model="filterText">
			</el-input>
			<el-tree
				class="filter-tree"
				:highlight-current="true"
				:default-expand-all="false"
				:data="data"
				:props="defaultProps"
				:filter-node-method="filterNode"
				node-key="id"
				@check="getData"
				ref="tree"
			>
			</el-tree>
		</div>
		<div>
			<div class="sea">详细信息</div>
			<el-button
				size="small"
				type="primary"
				icon="el-icon-plus"
				@click="addPower"
				>添加</el-button
			>
			<div class="widthDiv">
				<el-select
					size="small"
					v-model="parentid"
					placeholder="请选择大类"
				>
					<el-option
					class="option"
						v-for="item in data"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					>
					</el-option>
				</el-select>
				<el-button
					type="primary"
					size="small"
					icon="el-icon-search"
					@click="toSearch"
					>搜索</el-button
				>
			</div>
			<div>
				<el-table
					size="small"
					:data="priData"
					style="width: 100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column
						type="index"
						label="id"
						min-width="48"
						align="center"
					></el-table-column>
					<el-table-column
						prop="name"
						label="名称"
						min-width="140"
						align="center"
					></el-table-column>
					<el-table-column
						prop="description"
						label="描述"
						min-width="120"
						align="center"
					></el-table-column>
					<el-table-column
						prop="route"
						label="路由"
						min-width="120"
						align="center"
					></el-table-column>
					<el-table-column
						prop="routeName"
						label="路由名称"
						min-width="140"
						align="center"
					></el-table-column>
					<el-table-column
						prop="type"
						label="类型"
						min-width="100"
						align="center"
					></el-table-column>
					<el-table-column
						prop="icon"
						label="icon"
						min-width="100"
						align="center"
					></el-table-column>
					<el-table-column
						prop="hidden"
						label="hidden"
						min-width="80"
						align="center"
					></el-table-column>
					<el-table-column
						prop="num"
						label="数量"
						min-width="80"
						align="center"
					></el-table-column>
					<el-table-column
						prop="parentId"
						label="parentId"
						min-width="80"
						align="center"
					></el-table-column>
					<el-table-column label="操作" width="100" align="center">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="text"
								@click="handleEdit(scope.row)"
								>修改</el-button
							>
							<el-button
								size="mini"
								type="text"
								@click="handleDelete(scope.row.id)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-dialog
				:title="title"
				:visible.sync="visible"
				:before-close="beforeClose"
			>
				<el-form :model="form" :rules="rules" ref="ruleForm">
					<el-form-item
						label="名称"
						prop="name"
						:label-width="formLabelWidth"
					>
						<el-input
							v-model="form.name"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="描述"
						prop="description"
						:label-width="formLabelWidth"
					>
						<el-input
							v-model="form.description"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="路由"
						prop="route"
						:label-width="formLabelWidth"
					>
						<el-input
							v-model="form.route"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="路由名称"
						prop="routeName"
						:label-width="formLabelWidth"
					>
						<el-input
							v-model="form.routeName"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="类型"
						prop="type"
						:label-width="formLabelWidth"
					>
						<el-input
							v-model="form.type"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="icon"
						prop="icon"
						:label-width="formLabelWidth"
					>
						<el-input
							v-model="form.icon"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="hidden"
						prop="hidden"
						:label-width="formLabelWidth"
					>
						<el-input
							type="number"
							v-model.number="form.hidden"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="数量"
						prop="num"
						:label-width="formLabelWidth"
					>
						<el-input
							type="number"
							v-model.number="form.num"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="parentId"
						prop="parentId"
						:label-width="formLabelWidth"
					>
						<el-input
							type="number"
							v-model.number="form.parentId"
							autocomplete="off"
						></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="toCancel">取 消</el-button>
					<el-button type="primary" @click="toSave('ruleForm')"
						>确 定</el-button
					>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import axios from "../../utils/request";
export default {
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		},
	},

	methods: {
		async toSearch() {
			if (this.parentid == "") {
				this.findAll();
			} else {
				let res = await axios.get("/privilege/findByParentId", {
					params: { id: this.parentid },
				});
				this.priData = res.data;
				this.parentid = "";
			}
		},
		addPower() {
			this.form = {};
			this.visible = true;
			this.title = "添加权限信息";
		},
		handleSelectionChange(val) {
			// 映射
			this.multipleSelection = val.map((item) => item.id);
		},

		getData() {
			this.clickname = this.$refs.tree
				.getCheckedKeys()
				.concat(this.$refs.tree.getHalfCheckedKeys());
			console.log(this.clickname);
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},
		async findPrivilegeTree() {
			let res = await axios.get("/privilege/findPrivilegeTree");
			this.data = res.data;
		},
		async findAll() {
			let res = await axios.get("/privilege/findAll");
			this.priData = res.data;
			console.log(this.priData);
		},
		// 按取消
		toCancel() {
			this.$refs["ruleForm"].resetFields();
			this.visible = false;
		},
		// 模态框关闭之前
		beforeClose(done) {
			this.$refs["ruleForm"].resetFields();
			done();
		},
		// 编辑
		handleEdit(row) {
			this.visible = true;
			this.title = "修改权限信息";
			this.form = { ...row };
			this.form.pca = [row.province, row.city, row.area];
		},
		// 确定按钮的方法
		toSave(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					axios
						.post("/privilege/saveOrUpdate", this.form)
						.then((res) => {
							if (res.status == 200) {
								this.$notify({
									title: "成功",
									message: "保存成功",
									type: "success",
								});
								this.toCancel();
								this.findAll();
							} else {
								this.$notify.error({
									title: "失败",
									message: "保存失败",
								});
							}
						})
						.catch((err) => {
							console.error(err);
						});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		// 删除按钮
		handleDelete(id) {
			this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					let res;
					if (id != null) {
						res = await axios.delete("/privilege/deleteById", {
							params: { id },
						});
						console.log(id);
					}
					this.$notify({
						title: res.status == 200 ? "成功" : "失败",
						message: res.statusText,
						type: res.status == 200 ? "success" : "error",
					});
					if (res.status == 200) {
						this.findAll();
					}
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
	},
	created() {
		this.findPrivilegeTree();
		this.findAll();
	},
	data() {
		return {
			parentid: "",
			formLabelWidth: "120px",
			visible: false,
			form: {},
			clickname: [],
			priData: [],
			filterText: "",
			data: [],
			defaultProps: {
				children: "children",
				label: "name",
			},
			rules: {
				name: [
					{ required: true, message: "请输入名称", trigger: "blur" },
				],
				description: [
					{ required: true, message: "请输入描述", trigger: "blur" },
				],
				route: [
					{ required: true, message: "请选择路由", trigger: "blur" },
				],
				routeName: [
					{
						required: true,
						message: "请选择路由名称",
						trigger: "blur",
					},
				],
				type: [
					{ required: true, message: "请输入类型", trigger: "blur" },
				],
				icon: [
					{ required: true, message: "请输入icon", trigger: "blur" },
				],
				hidden: [
					{
						required: true,
						message: "请输入hidden",
						trigger: "blur",
					},
				],
				num: [
					{ required: true, message: "请输入数量", trigger: "blur" },
				],
				/* parentId: [
            { required: true, message: '请输入parentId', trigger: 'blur' },
          ], */
			},
		};
	},
};
</script>
<style>
.widthDiv {
	margin-left: 50px;
	width: 300px;
	display: inline-block;
	/* float: left; */
}

.sea {
	margin: 15px;
	font-size: 20px;
	font-weight: bold;
	color:white;
}
/* .el-input__inner{
	background: rgba(255, 255, 255, 0.5);
	color:white;
	font-weight: bold;
} */
.el-table, .el-table__expanded-cell {
	background: rgba(129, 126, 126, 0);
	color: white;
	font-weight: bold;
}

.el-table th, .el-table tr {
	background: rgba(129, 126, 126, 0);
	color: white;
	font-weight: bold;

}
.el-table--enable-row-hover .el-table__body tr:hover > td {
	background: rgba(248, 248, 248, 0.5);
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  	font-size: 14px;
}
.te {
  	color: #FFF;
	background: rgba(129, 126, 126, 0);
}
.el-button--text {
  color: #FFF;
  	background: rgba(129, 126, 126, 0);
}
#power{
  	background: rgba(129, 126, 126, 0.3);
}
</style>
