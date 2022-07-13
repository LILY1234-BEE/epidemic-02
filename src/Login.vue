<template>
	<div id="login">
		<!-- :style="fixStyle" -->
		<!-- v-on:canplay="canplay" -->
		<vue-particles
			id="particles-js"
			color="#fff"
			:particleOpacity="0.7"
			:particlesNumber="60"
			shapeType="circle"
			:particleSize="4"
			linesColor="#fff"
			:linesWidth="1"
			:lineLinked="true"
			:lineOpacity="0.6"
			:linesDistance="100"
			:moveSpeed="4"
			:hoverEffect="true"
			hoverMode="grab"
			:clickEffect="true"
			clickMode="push"
			class="lizi"
		>
		</vue-particles>
		<video autoplay loop muted class="fillWidth">
			<source src="./assets/地球自转.mp4" type="video/mp4" />
		</video>

		<div class="login-container">
			<el-form
				:model="form"
				:rules="rules"
				status-icon
				ref="ruleForm"
				class="demo-ruleForm login-page"
			>
				<h3 class="title">疫情系统登录</h3>
				<el-form-item prop="username">
					<el-input
						type="text"
						v-model="form.username"
						placeholder="用户名"
					></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						type="password"
						v-model="form.password"
						placeholder="密码"
					></el-input>
				</el-form-item>
				<el-form-item style="width: 100%">
					<el-button
						type="primary"
						style="width: 100%"
						@click="toLogin('ruleForm')"
						:loading="logining"
						>登录</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			logining: false,
			form: {},
			rules: {
				username: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur",
					},
				],
				password: [
					{
						required: true,
						message: "请输入密码",
						trigger: "blur",
					},
				],
			},
			checked: false,
		};
	},
	methods: {
		toLogin(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.logining = true;
					let res = await axios.post("/user/login", this.form);
					if (this.form) {
						this.logining = true;
					}
					if (res.status == 200) {
						res.data.token;
						//存token到sessionStorage
						sessionStorage.setItem("token", res.data.token);
						// this.$router.replace("/");
						this.$router.go(0);
					} else {
						this.form.password = "";
						this.logining = false;
						// console.log(res);
						//提示登陆失败的信息
						this.$notify.error({
							title: "错误",
							message: res.statusText,
						});
					}
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
	},
};
</script>

<style scoped>
/* #login {
  height: 100vh;
  background: url("../src/assets/1.jpg") no-repeat left top/100% 100%;
} */
#login {
	height: 100vh;
	background-color: #000;
	/* width: 200%; */
	overflow: hidden;
}
.login-container {
	float: left;
	position: absolute;
	top: 0px;
	/* right: 40px; */
	/* background-color: aqua; */
	width: 100%;
	height: 100vh;
}
.login-page {
	border-radius: 5px;
	margin: auto;
	margin-top: 230px;
	/* margin-bottom: 180px; */
	width: 350px;
	padding: 15px 35px 15px;
	background: rgba(255, 255, 255, 0.2);
}
.title {
	color: #fff;
	text-align: center;
}
.fillWidth {
	width: 100%;
	height: 100%;
}
#particles-js {
	width: 100%;
	height: calc(100% - 100px);
	position: absolute;
}
</style>
