<template>
	<div id="article">
		<!-- {{ pageParam }} -->
		<div>
			<el-button
				type="primary"
				class="el-icon-circle-plus"
				@click="toAdd"
				size="mini"
			>
				新增</el-button
			>
			<div class="widthDiv">
				<el-input
					size="mini"
					v-model="pageParam.title"
					placeholder="请输入内容"
					clearable
				>
				</el-input>
			</div>
			<div class="widthDiv">
				<el-select
					size="mini"
					v-model="pageParam.categoryId"
					placeholder="请选择分类"
					clearable
				>
					<el-option
						v-for="item in categoryData"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					>
					</el-option>
				</el-select>
			</div>
			<el-button
				size="small"
				type="primary"
				icon="el-icon-search"
				@click="toSearch"
				>搜索</el-button
			>
		</div>
		<el-table :data="tableData" style="width: 100%" size="mini">
			<el-table-column label="序号" width="60">
				<template slot-scope="scope">
					<span type="success">{{ scope.$index + 1 }}</span>
				</template>
			</el-table-column>
			<el-table-column label="标题" min-width="80px">
				<template slot-scope="scope">
					<span type="success">{{ scope.row.title }}</span>
				</template>
			</el-table-column>

			<el-table-column label="新闻分类" width="80">
				<template slot-scope="scope">
					<span size="medium">{{ scope.row.category.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="发布时间" width="180">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{
						moment(scope.row.publishTime).format(
							"YYYY-MM-DD HH:mm:ss"
						)
					}}</span>
				</template>
			</el-table-column>
			<el-table-column label="查看次数" width="80">
				<template slot-scope="scope">
					<span size="medium">{{ scope.row.readTimes }}</span>
				</template>
			</el-table-column>
			<el-table-column label="状态" width="80">
				<template slot-scope="scope">
					<span size="medium">{{ scope.row.status }}</span>
				</template>
			</el-table-column>
			<el-table-column label="点赞次数" width="80">
				<template slot-scope="scope">
					<span size="medium">{{ scope.row.thumpUp }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="120">
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
			width="80%"
			:title="title"
			:visible.sync="Visible"
			:before-close="beforeClose"
		>
			<el-form :model="form" ref="ruleFrom" :rules="rules">
				<el-form-item
					prop="title"
					label="标题"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="form.title"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					label="所属分类"
					:label-width="formLabelWidth"
					prop="categoryId"
				>
					<el-select
						size="small"
						clearable
						v-model="form.categoryId"
						placeholder="请选择分类"
					>
						<el-option
							v-for="item in categoryData"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="资讯"
					:label-width="formLabelWidth"
					prop="content"
				>
					<tinymce v-model="form.content"> </tinymce>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="toCancel">取 消</el-button>
				<el-button type="primary" @click="toSave('ruleFrom')"
					>确 定</el-button
				>
			</div>
		</el-dialog>
		<div>
			<el-pagination
				background
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
</template>

<script>
import axios from "../../utils/request";
import Tinymce from "../../components/Tinymce/index";
let moment = require("moment");
export default {
	watch: {
		"form.content": {
			handler(newName, oldName) {
				tinymce.activeEditor.setContent(newName);
			},
			immediate: true,
			deep: true,
		},
	},
	// 注册组件
	components: {
		// 组件名（标签名）：组件对象
		tinymce: Tinymce,
	},
	data() {
		return {
			Change: "请输入",
			//模态框可见性
			Visible: false,
			//模态框的数据
			form: {},
			categoryData: [],
			total: 0,
			tableData: [],
			formLabelWidth: "120px",
			// 分页查询的参数
			pageParam: {
				page: 1,
				pageSize: 10,
				title: "",
				categoryId: "",
			},
			// content: "",
			title: "录入资讯信息",
			rules: {
				title: [
					{
						required: true,
						message: "请输入名称",
						trigger: "blur",
					},
				],
				categoryId: [
					{
						required: true,
						message: "请输入分类",
						trigger: "change",
					},
				],
				content: [
					{
						required: true,
						message: "请输入内容",
						trigger: "blur",
					},
				],
			},
		};
	},
	computed: {},
	methods: {
		moment,
		//分类搜索
		async findAllCategory() {
			let res = await axios.get("/category/findAll");
			this.categoryData = res.data;
		},
		//搜索
		toSearch() {
			this.pageParam.page = 1;
			this.pageQuery();
		},
		// 分页查找
		async pageQuery() {
			let res = await axios.get("/article/pageQuery", {
				params: this.pageParam,
			});
			this.tableData = res.data.list;
			this.total = res.data.total;
		},
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

		//编辑
		handleEdit(row) {
			this.title = "编辑资讯信息";
			this.form = { ...row };
			// this.$refs.content.resetContent(this.form.content);
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
					res = await axios.get("/article/deleteById", {
						params: { id },
					});
					console.log(res);
					this.$notify({
						title: res.status == 200 ? "成功" : "失败",
						message: res.statusText,
						type: res.status == 200 ? "success" : "error",
					});
					this.pageQuery();
					// this.findAllCategory();
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		toAdd() {
			this.form = {};
			this.Visible = true;
			this.title = "录入资讯信息";
			this.Change = "";
		},
		//模态框关闭之前
		beforeClose(done) {
			this.$refs["ruleFrom"].resetFields();
			tinymce.activeEditor.setContent("");
			// this.$refs.content.resetFields("");
			done();
		},
		//关闭模态框
		toCancel() {
			tinymce.activeEditor.setContent("");
			this.$refs["ruleFrom"].resetFields();
			// this.$refs.content.resetContent("");
			this.Visible = false;
		},
		//点击确定按钮
		toSave(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					axios
						.post("/article/saveOrUpdate", this.form)
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
								// this.findAllCategory();
							} else {
								this.$notify.error({
									title: "失败",
									message: res.statusText,
									type: "error",
								});
							}
						});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
	},
	created() {
		this.pageQuery();
		this.findAllCategory();
	},
};
</script>
<style>
#article {
	background: rgba(129, 126, 126, 0.3);
}
.widthDiv {
	display: inline-block;
	width: 150px;
	margin-left: 10px;
	margin-right: 10px;
	margin-bottom: 10px;
}
>>> .imgWidth img {
	width: 100%;
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
.el-table--enable-row-hover .el-table__body tr:hover > td {
	background: rgba(248, 248, 248, 0.5);
	/* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
	font-size: 14px;
}
.el-button--text {
	color: #fff;
	background: rgba(129, 126, 126, 0);
}
</style>
