<template>
	<div id="manage">
		<div>
			<el-button
				size="small"
				type="primary"
				icon="el-icon-plus"
				@click="toAdd"
				>添加</el-button
			>
		</div>
		<div>
			<el-table
				size="small"
				:data="tableData"
				style="width: 100%"
				@selection-change="handleSelectionChange"
			>
				<el-table-column
					type="index"
					label="序号"
					min-width="48"
				></el-table-column>
				<el-table-column
					prop="username"
					label="用户名"
					min-width="197"
				></el-table-column>
				<el-table-column
					prop="realname"
					label="姓名"
					min-width="193"
				></el-table-column>
				<el-table-column
					prop="gender"
					label="姓别"
					min-width="183"
				></el-table-column>
				<el-table-column
					prop="telephone"
					label="手机号"
					min-width="193"
				></el-table-column>
				<el-table-column label="出生日期" min-width="193">
					<template slot-scope="scope">
						<span>
							{{
								moment(scope.row.birth).format("YYYY年MM月DD日")
							}}</span
						>
					</template>
				</el-table-column>
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
			<div>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageParam.page"
					:page-sizes="[5, 10, 15, 20]"
					:page-size="pageParam.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
		</div>
		<el-dialog
			:title="title"
			:visible.sync="visible"
			:before-close="beforeClose"
		>
			<el-form :model="form" :rules="rules" ref="ruleForm">
				<el-form-item
					label="用户名"
					prop="username"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="form.username"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					label="密码"
					prop="password"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="form.password"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					label="姓名"
					prop="realname"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="form.realname"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					label="性别"
					prop="gender"
					:label-width="formLabelWidth"
				>
					<!-- <el-input v-model="form.gender" autocomplete="off"></el-input> -->
					<el-radio v-model="form.gender" label="男">男</el-radio>
					<el-radio v-model="form.gender" label="女">女</el-radio>
				</el-form-item>
				<el-form-item
					label="出生日期"
					prop="birth"
					:label-width="formLabelWidth"
				>
					<!-- <el-input v-model="form.birth" autocomplete="off"></el-input> -->
					<el-date-picker
						type="date"
						placeholder="选择日期"
						value-format="timestamp"
						v-model="form.birth"
						style="width: 40%;"
					></el-date-picker>
				</el-form-item>
				<el-form-item
					label="手机"
					prop="telephone"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="form.telephone"
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
let moment = require("moment");
import axios from "../../utils/request.js";
export default {
	data() {
		return {
			form: {},
			total: 0,
			tableData: [],
			visible: false,
			title: "添加用户信息",
			formLabelWidth: "120px",
			pageParam: {
				page: 1,
				pageSize: 10,
				name: "",
			},
			rules: {
				username: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur",
					},
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
				],
				realname: [
					{ required: true, message: "请选择姓名", trigger: "blur" },
				],
				gender: [
					{ required: true, message: "请选择性别", trigger: "blur" },
				],
				birth: [
					{
						required: true,
						message: "请输入出生日期",
						trigger: "blur",
					},
				],
				telephone: [
					{ required: true, message: "请输入手机", trigger: "blur" },
				],
			},
		};
	},
	methods: {
		moment,
		handleSelectionChange(val) {
			// 映射
			this.multipleSelection = val.map((item) => item.id);
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
		// 点击新增按钮
		toAdd() {
			this.form = {};
			this.visible = true;
			this.title = "添加用户信息";
		},
		// 编辑
		handleEdit(row) {
			this.visible = true;
			this.title = "修改用户信息";
			this.form = { ...row };
			this.form.pca = [row.province, row.city, row.area];
		},
		// 确定按钮的方法
		toSave(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					axios
						.post("/baseUser/saveOrUpdate", this.form)
						.then((res) => {
							if (res.status == 200) {
								this.$notify({
									title: "成功",
									message: "保存成功",
									type: "success",
								});
								this.toCancel();
								this.pageQuery();
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
						res = await axios.get("/baseUser/deleteById", {
							params: { id },
						});
					}
					this.$notify({
						title: res.status == 200 ? "成功" : "失败",
						message: res.statusText,
						type: res.status == 200 ? "success" : "error",
					});
					if (res.status == 200) {
						this.pageQuery();
					}
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		//   分页查找
		async pageQuery() {
			let res = await axios.get("/baseUser/pageQuery", {
				params: this.pageParam,
			});
			this.tableData = res.data.list;
			this.total = res.data.total;
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
			this.pageParam.pageSize = val;
			this.pageQuery();
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.pageParam.page = val;
			this.pageQuery();
		},
	},
	created() {
		this.pageQuery();
	},
};
</script>
<style>
#manage {
	height: 100%;
  	background: rgba(129, 126, 126, 0.3);
}
.el-button--text {
  color: #FFF;
  	background: rgba(129, 126, 126, 0);
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
.el-pagination__total{
	color: white;
}
.el-pagination__jump{
	color: white;
}
</style>
