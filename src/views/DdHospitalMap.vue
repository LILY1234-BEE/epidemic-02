<template>
	<div>
		{{ hospName }}
		<el-amap :center="center" vid="amapDemo1" class="map"
			><el-amap-marker
				vid="component-marker"
				:position="center"
			></el-amap-marker
		></el-amap>
		<el-button
			size="small"
			class="hosp"
			type="primary"
			round
			@click="toHosp"
			>->定点医院列表</el-button
		>
	</div>
</template>

<script>
export default {
	data() {
		return {
			center: [111.111, 111.111],
			hospName: "",
		};
	},
	computed: {},
	methods: {
		toHosp() {
			this.$router.replace("/fix-Hospital");
		},
	},
	created() {
		//接受其它页面跳转携带的参数
		// console.log(this.$route.query);
		let { longitude, latitude, name } = this.$route.query;
		this.center = [longitude, latitude];
		this.hospName = name;
	},
	mounted() {},
};
</script>
<style scoped>
.map {
	height: 630px;
}
.hosp {
	position: absolute;
	right: 20px;
	top: 70px;
}
</style>
