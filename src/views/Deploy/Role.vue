<template>
	<div id="rolemanager">
		<div>
			<el-button
				size="small"
				type="primary"
				icon="el-icon-circle-plus"
				@click="toAdd"
				>新增</el-button
			>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" label="序号" width="180">
			</el-table-column>
			<el-table-column prop="id" label="标号" width="180">
			</el-table-column>
			<el-table-column prop="name" label="名称" width="180">
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button type="text" size="mini" @click="handleEdit(scope.row)"
						>编辑</el-button
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
		<el-dialog
			:title="title"
			:visible.sync="visible"
			:before-close="beforeClose"
		>
			<el-form :model="form" :rules="rules" ref="ruleForm">
				<el-form-item
					label="标号"
					:label-width="formLabelWidth"
					prop="id"
				>
					<el-input v-model="form.id" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item
					label="名称"
					:label-width="formLabelWidth"
					prop="name"
				>
					<el-input
						v-model.number="form.name"
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
</template>

<script>
import axios from "../../utils/request";
export default {
	data() {
		return {
			tableData: [],
			// 模态框可见性 dialog/modal
			visible: false,
			// 模态框的数据
			form: {},
			// 表单检验规则
			// 模态框的标题
			title: "录入角色信息",
			rules: {
				id: [
					{ required: true, message: "请输入标号", trigger: "blur" },
				],
				name: [
					{ required: true, message: "请输入名称", trigger: "blur" },
				],
			},
			//表单控件标题的宽度
			formLabelWidth: "120px",
		};
	},
	computed: {},
	methods: {
		toAdd() {
			this.form = {};
			this.visible = true;
			this.title = "录入角色信息";
		},
		// 编辑
		handleEdit(row) {
			this.title = "编辑角色信息";
			this.form = { ...row };
			this.visible = true;
		},
		// 删除
		handleDelete(id) {
			// id就是要删除的分类的对象的id
			this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}) // 异步函数加 async
				.then(async () => {
					// await等待后面异步函数运行完完毕，拿到响应的数据，然后返回
					let res;
					if (id) {
						res = await axios.get("/role/deleteById", {
							params: { id },
						});
					} else {
					}
					this.$notify({
						title: res.status == 200 ? "成功" : "失败",
						message: res.statusText,
						type: res.status == 200 ? "success" : "error",
					});
					this.findAll();
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},

		//模态框关闭之前
		beforeClose(done) {
			this.$refs["ruleForm"].resetFields();
			done();
		},
		// 关闭模态框
		toCancel() {
			this.$refs["ruleForm"].resetFields();
			this.visible = false;
		},
		// 点击确定按钮
		toSave(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.form, "====");
					// alert("submit!");
					axios.post("/role/saveOrUpdate", this.form).then((res) => {
						if (res.status == 200) {
							// 保存成功，关闭模态框，刷新数据
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
					});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		findAll() {
			axios.get("/role/findAll").then((res) => {
				this.tableData = res.data;
			});
		},
	},

	created() {
		this.findAll();
	},
};
</script>
<style>
#rolemanager{
  	background: rgba(129, 126, 126, 0.3);
}
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
.el-button--text {
  color: #FFF;
	  background: rgba(129, 126, 126, 0);
}
</style>
