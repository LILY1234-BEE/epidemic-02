<template>
	<div id="infoList">
		<div>
			<el-button
				type="primary"
				class="el-icon-circle-plus"
				@click="toAdd"
				size="mini"
			>
				新增</el-button
			>
			<el-button
				type="danger"
				class="el-icon-remove"
				@click="handleDelete(null)"
				size="mini"
				:disabled="multipleSelection.length == 0"
			>
				批量删除</el-button
			>
		</div>
		<el-table
			:data="tableData"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection"> </el-table-column>
			<el-table-column label="序号" width="48">
				<template slot-scope="scope">
					<!-- <i class="el-icon-time"></i> -->
					<span style="margin-left: 10px">{{
						scope.$index + 1
					}}</span>
				</template>
			</el-table-column>
			<el-table-column label="分类名称" width="160">
				<template slot-scope="scope">
					<span size="medium">{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="分类简介" width="780">
				<template slot-scope="scope">
					<span size="medium">{{ scope.row.description }}</span>
				</template>
			</el-table-column>
			<el-table-column label="序号">
				<template slot-scope="scope">
					<span size="medium">{{ scope.row.no }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="150">
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
		<el-dialog
			:title="title"
			:visible.sync="Visible"
			:before-close="beforeClose"
		>
			<el-form :model="form" ref="ruleFrom" :rules="rules">
				<el-form-item
					prop="name"
					label="名称"
					:label-width="formLabelWidth"
				>
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item
					prop="description"
					label="介绍"
					:label-width="formLabelWidth"
				>
					<el-input
						type="textarea"
						v-model="form.description"
						autocomplete="off"
					>
					</el-input>
				</el-form-item>
				<el-form-item
					prop="no"
					label="序号"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model.number="form.no"
						autocomplete="off"
					></el-input>
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
			ID: 1,
			multipleSelection: [],
			tableData: [],
			//模态框可见性
			Visible: false,
			//模态框的数据
			form: {},
			//表单控件的宽度
			formLabelWidth: "120px",
			title: "录入分类信息",

			rules: {
				name: [
					{
						message: "请输入活动名称",
						trigger: "blur",
					},
					{
						min: 3,
						max: 10,
						message: "长度在 3 到 10 个字符",
						trigger: "blur",
					},
				],
				description: [
					{
						message: "请输入活动描述",
						trigger: "blur",
					},
					{ min: 5, message: "长度最少5个字符", trigger: "blur" },
				],
				no: [
					{
						validator: checkAge,
						trigger: "blur",
					},
				],
			},
		};
	},
	computed: {},
	methods: {
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
			this.Visible = true;

			this.title = "录入分类信息";
		},
		//点击确定按钮
		toSave(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					axios
						.post("/category/saveOrUpdate", this.form)
						.then((res) => {
							if (res.status == 200) {
								//保存成功，关闭模态框 刷新数据
								this.$notify({
									title: "成功",
									message: "这一条信息保存成功！",
									type: "success",
								});
								this.toCancel();
								this.findAll();
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
			this.title = "编辑分类信息";
			this.form = { ...row };
			this.Visible = true;
		},
		//删除
		handleDelete(id) {
			console.log(id);
			this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					let res;
					//id分类对象的id
					//await 等待后面异步函数运行完毕，拿到响应数据
					if (id) {
						res = await axios.get("/category/deleteById", {
							params: { id },
						});
					} else {
						res = await axios.post("/category/batchDelete", {
							ids: this.multipleSelection.toString(),
						});
					}
					console.log(res);
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
		findAll() {
			axios.get("/category/findAll").then((res) => {
				// console.log(res.data);
				this.tableData = res.data;
			});
		},
	},
	created() {
		this.findAll();
		/* axios({
			url:'',
			 method:'',
			 data:{},
			 params:{}
		}).then((res)=>{
			res.data
		}) */
		//axios.get第二个参数是配置对象
		// axios.get('url',{params:{}}).then((res)=>{})
		/* axios
			.get("/category/findAll", {
				paranms: {},
				headers: {
					test: "123",
					Authorization:
						"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJOZz09Iiwic3ViIjoiYWRtaW4xIiwiaXNzIjoiMDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjYiLCJpYXQiOjE2MDkyOTA5NTEsImF1ZCI6InJlc3RhcGl1c2VyIiwiZXhwIjoxNjA5NDYzNzUxLCJuYmYiOjE2MDkyOTA5NTF9.7AX-fIPVC5_5VQMBDgQJG1oFqvsgdxHNhFHBxsrcYk0",
				},
			})
			.then((res) => {
				console.log(res.data.data);
				this.tableData = res.data.data;
			}); */
		/* axios.get("/category/findAll").then((res) => {
			// console.log(res.data);
			this.tableData = res.data;
		}); */

		//axios.post第二个参数是给后台的数据
		// axios.post('url',{}).then((res)=>{})
	},
};
</script>
<style>

#infoList{
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
