<template>
	<div id="app">
		<div v-if="!isLogin">
			<login></login>
		</div>
		<div v-else>
			<Card shadow v-if="isP">
				<div style="min-height: 500px;width: 100%;">
					<iframe
						id="iframeId"
						:src="url"
						frameborder="0"
						class="pc iframe"
						scrolling="auto"
					>
					</iframe>
					<el-button
						size="small"
						class="pneu"
						type="primary"
						round
						@click="toPneu"
						>->全国疫情</el-button
					>
				</div>
			</Card>
			<div v-else>
				<el-container>
					<el-aside id="one" width="200px">
						<el-menu
							background-color="rgba(129, 126, 126, 0)"
							text-color="white"
							active-text-color="white"
							:default-active="active"
							class="el-menu-vertical-demo"
							@open="handleOpen"
							@close="handleClose"
							:collapse="isCollapse"
							router
							unique-opened
							collapse-transition
						>
							<div @click="toP" class="click">
								<span>{{ tenName }}</span>
							</div>

							<el-menu-item index="/">
								<i
									class="el-icon-loading"
									style="color:white;"
								></i>
								<span slot="title">疫情动态</span>
							</el-menu-item>
							<el-menu-item index="/map">
								<i
									class="el-icon-location-information"
									style="color:white;"
								></i>
								<span slot="title">疫情地图</span>
							</el-menu-item>
							<el-menu-item index="/real-time">
								<i
									class="el-icon-view"
									style="color:white;"
								></i>
								<span slot="title">实时疫情</span>
							</el-menu-item>
							<el-menu-item index="/statistics">
								<i
									class="el-icon-s-data"
									style="color:white;"
								></i>
								<span slot="title">数据统计</span>
							</el-menu-item>
							<el-menu-item index="/find">
								<i
									class="el-icon-search"
									style="color:white;"
								></i>
								<span slot="title">风险查询</span>
							</el-menu-item>

							<el-menu-item index="/fix-hospital">
								<i
									class="el-icon-office-building"
									style="color:white;"
								></i>
								<span slot="title">定点医院</span>
							</el-menu-item>
							<el-submenu index="1">
								<template slot="title">
									<i
										class="el-icon-user-solid"
										style="color:white;"
									></i>
									<span slot="title">基础配置</span>
								</template>
								<el-menu-item index="/manage"
									>用户管理</el-menu-item
								>
								<el-menu-item index="/role"
									>角色管理</el-menu-item
								>
								<el-menu-item index="/power"
									>权限设置</el-menu-item
								>
							</el-submenu>
							<el-submenu index="2">
								<template slot="title">
									<i
										class="el-icon-setting"
										style="color:white;"
									></i>
									<span slot="title">疫情管理</span>
								</template>
								<el-menu-item index="/hospital"
									>定点医院</el-menu-item
								>
								<el-menu-item index="/infoList"
									>资讯分类</el-menu-item
								>
								<el-menu-item index="/article"
									>新闻资讯</el-menu-item
								>
							</el-submenu>
							<el-submenu index="3">
								<template slot="title">
									<i
										class="el-icon-folder-opened"
										style="color:white;"
									></i>
									<span slot="title">疫情数据</span>
								</template>
								<el-menu-item index="/upList"
									>数据列表</el-menu-item
								>
								<el-menu-item index="/up"
									>数据上报</el-menu-item
								>
							</el-submenu>
						</el-menu>
					</el-aside>
					<el-container>
						<el-header>
							<el-radio-group
								v-model="isCollapse"
								fill="rgba(129, 126, 126, 0)"
							>
								<el-radio-button
									@click.native.prevent="
										OpenOrClose(isCollapse)
									"
									:label="true"
									><i :class="el"></i
								></el-radio-button>
							</el-radio-group>
							<div class="weather">
								<iframe
									scrolling="no"
									src="https://tianqiapi.com/api.php?style=tb&skin=pitaya"
									frameborder="0"
									width="350"
									height="20"
									allowtransparency="true"
									paddingleft="00"
								></iframe>
							</div>
							<el-dropdown
								:hide-on-click="false"
								id="upmeun"
								@command="handleCommand"
							>
								<span class="el-dropdown-link">
									<img
										src="./assets/登陆-fill.png"
										alt=""
									/><i
										class="el-icon-arrow-down el-icon--right"
									></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="toHome"
										>Home</el-dropdown-item
									>
									<el-dropdown-item command="tologout"
										>退出</el-dropdown-item
									>
								</el-dropdown-menu>
							</el-dropdown>
						</el-header>
						<el-main>
							<transition mode="out-in">
								<router-view></router-view>
							</transition>
						</el-main>
					</el-container>
				</el-container>
			</div>
		</div>
	</div>
</template>
<script src="https://apip.weatherdt.com/simple/static/js/weather-simple-common.js?v=2.0"></script>
<script>
import Login from "./Login";
export default {
	//注册Login
	components: {
		login: Login,
	},
	name: "app",
	//导航栏的方法
	data() {
		return {
			isP: false,
			url:
				"https://datav.aliyuncs.com/share/87211d34525957502d3326ecd0ea6b9c",
			isLogin: sessionStorage.getItem("token"),
			active: "/",
			isCollapse: false,
			el: "el-icon-s-unfold",
			tenName: "全国疫情可视化平台",
			screenWidth: "",
			screenHeight: "",
		};
	},
	created() {
		//获取地址
		this.active = location.pathname;
		// console.log(location, "======");
		// console.log(this.$route, "000");
		//名字改变
		setInterval(() => {
			this.nameChange(this.tenName);
		}, 4000);
	},
	methods: {
		toP() {
			this.isP = true;
		},
		toPneu() {
			this.isP = false;
		},
		handleCommand(command) {
			if (command == "tologout") {
				sessionStorage.clear();
				this.$router.go(0);
			} else {
				this.$router.replace("/");
			}
		},
		OpenOrClose(isCollapse) {
			if (isCollapse == false) {
				var one = document.getElementById("one");
				one.style.width = 65 + "px";
				this.isCollapse = true;
				var two = document.getElementById("one");
				this.el = "el-icon-s-fold";
			} else {
				var one = document.getElementById("one");
				one.style.width = 200 + "px";
				this.isCollapse = false;
				this.el = "el-icon-s-unfold";
			}
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		nameChange(name) {
			if (name == "全国疫情可视化平台") {
				this.tenName = "Ten";
			} else {
				this.tenName = "全国疫情可视化平台";
			}
		},
		Close(isCollapse) {
			var one = document.getElementById("one");
			one.style.width = 0 + "px";
			this.isCollapse = true;
			this.el = "el-icon-s-fold";
		},
		Open(width) {
			if (width == "0px") {
				var one = document.getElementById("one");
				one.style.width = 65 + "px";
				this.isCollapse = true;
				this.el = "el-icon-s-fold";
			}
		},
	},
	mounted() {
		this.screenWidth = document.body.clientWidth;
		this.screenHeight = document.body.clientHeight;
		window.onresize = () => {
			return (() => {
				this.screenWidth = document.body.clientWidth;
				this.screenHeight = document.body.clientHeight;
				if (this.screenWidth < 997) {
					this.Close(this.isCollapse);
				} else {
					var one = document.getElementById("one");
					this.Open(one.style.width);
				}
			})();
		};
	},
	watch: {
		$route: function(route) {
			console.log(route);
			this.active = route.path;
		},
	},
};
</script>

<style>
body {
	margin: 0px;
}
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	/* margin-top: 60px; */
}
.el-header {
	background: url("../src/assets/7.jpg") no-repeat left top/100% 100%;
	/* background-color:#093a7f; */
	color: #333;
	line-height: 40px;
	height: 50px !important;
	padding: 0 !important;
}

.el-aside {
	/* background-color: #039acf; */
	color: #333;
	/* line-height: 200px */
	min-height: 100vh;
	/* height: 100%; */
	background: url("../src/assets/4.jpg") no-repeat left top/100% 100%;
}

.el-main {
	/* background-color:#ecf5df; */
	color: #333;
	/* line-height: 160px; */
	height: calc(100% - 50px);
	min-height: 500px;
	padding: 8px !important;
	background: url("../src/assets/3.jpg") no-repeat left top/100% 100%;
}

.el-main > div {
	/* background-color:#ecf5df; */
	border-radius: 10px;
	height: calc(100% - 50px);
	padding: 10px;
	background: rgba(129, 126, 126, 0);
}
.el-menu-item.is-active {
	background-color: rgba(255, 255, 255, 0.5) !important;
	/* color: #fff; */
}
.click {
	background: url("../src/assets/6.jpg") no-repeat left top/100% 100%;
	/* background-color:#011536; */
	color: #fff;
	height: 60px;
	line-height: 50px;
	height: 50px;
	text-align: center;
	cursor: pointer;
	font-weight: bold;
	font-size: 14px;
	overflow: hidden;
	animation-name: myani;
	animation-duration: 6s;
	animation-iteration-count: infinite;
	animation-direction: alternate;
	animation-timing-function: linear;
}
@keyframes myani {
	50% {
		font-size: 18px;
	}
	/* 100%{

            } */
}
.el-menu-item,
.el-submenu__title,
.el-menu-item .el-submenu__title {
	height: 42px !important;
	line-height: 42px !important;
}

.weather {
	/* display: inline-block; */
	position: absolute;
	right: 50px;
	top: 10px;
}
#upmeun {
	/* display: inline-block; */
	position: absolute;
	right: 20px;
	top: 5px;
}
.el-dropdown-link {
	cursor: pointer;
	color: white;
}
.el-icon-arrow-down {
	font-size: 12px;
}

.el-dropdown-link img {
	display: inline-block;
	width: 30px;
	height: 30px;
	margin-top: 10px;
}
.pneu {
	position: absolute;
	right: 20px;
	top: 0;
}
.iframe {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: #fff;
	overflow-y: hidden;
}
.el-radio-button__inner {
	background-color: rgba(255, 255, 255, 0) !important;
	color: #fff !important;
}
</style>
