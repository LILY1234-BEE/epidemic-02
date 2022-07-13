<template>
	<div id="list">
		<div>
			<el-button class="butDiv" size="small" @click="upDate"
				>上报</el-button
			>
		</div>
		<div class="tableDiv">
			<el-table size="small" :data="tableData" style="width: 100%">
				<el-table-column label="序号" width="48">
					<template slot-scope="scope">
						<!-- <i class="el-icon-time"></i> -->
						<span style="margin-left: 10px">{{
							scope.$index + 1
						}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="country" label="国" width="120">
				</el-table-column>
				<el-table-column prop="province" label="省" width="120">
				</el-table-column>
				<el-table-column prop="city" label="市" width="100">
				</el-table-column>
				<el-table-column min-width="100px" prop="area" label="区">
				</el-table-column>
				<el-table-column
					align="center"
					prop="confirmed"
					label="新增确诊"
					width="80"
				>
				</el-table-column>
				<el-table-column align="center" label="疑似" width="60">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<el-tag type="warning" size="mini">{{
								scope.row.suspected
							}}</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="dead"
					label="死亡"
					width="60"
				>
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<el-tag type="info" size="mini">{{
								scope.row.dead
							}}</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" label="治愈" width="60">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<el-tag size="mini" type="success">{{
								scope.row.cure
							}}</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" label="重症" width="60">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<el-tag size="mini" type="danger">{{
								scope.row.severe
							}}</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="outside"
					label="境外输入"
					width="80"
				>
				</el-table-column>
				<el-table-column
					align="center"
					prop="inputTime"
					label="上报时间"
					width="160"
				>
				</el-table-column>
				<el-table-column label="操作" width="80">
					<template slot-scope="scope">
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
let moment = require("moment");
export default {
	data() {
		return {
			tableData: [],
			pageParam: {
				page: 1,
				pageSize: 10,
			},
			total: 0,
		};
	},
	computed: {},
	methods: {
		moment,
		upDate() {
			this.$router.push("/up");
		},
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
					res = await axios.get("/epidemic/deleteById", {
						params: { id },
					});
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
		// 分页查找
		async pageQuery() {
			let res = await axios.get("/epidemic/pageQuery", {
				params: this.pageParam,
			});
			this.tableData = res.data.list;
			this.total = res.data.total;
			this.tableData.forEach((item) => {
				item.inputTime = moment(item.inputTime).format(
					"YYYY-MM-DD HH:mm:ss"
				);
			});
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
	},
	created() {
		this.pageQuery();
	},
	mounted() {},
};
</script>
<style>
.butDiv {
	background-color: #2cb5ac;
	color: white;
	border-radius: 5px;
}
#list {
	background: rgba(129, 126, 126, 0.5);
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
.el-pagination__total {
	color: white;
}
.el-pagination__jump {
	color: white;
}
</style>
