<template>
	<div id="map">
		<el-amap
			vid="amapDemo"
			:zoom="10"
			:plugin="plugin"
			locate="true"
			autoPosition="true"
			useNative="true"
		>
			<el-amap-marker
				vid="component-marker"
				:position="center"
			></el-amap-marker>
		</el-amap>
		<el-button
			size="small"
			class="baiduMap"
			type="primary"
			round
			@click="toBaidu"
			>->百度地图</el-button
		>
	</div>
</template>

<script>
export default {
	data() {
		return {
			plugin: [
				{
					pName: "ToolBar",
					events: {
						init(instance) {
							console.log(instance);
						},
					},
				},
			],
		};
	},
	computed: {},
	methods: {
		toBaidu() {
			this.$router.replace("/baiduMap");
		},
	},
	created() {
		navigator.geolocation.getCurrentPosition(
			(data) => {
				// console.log(data, "当前地理位置信息");
				this.currentPosition = data.coords;
				this.markerPosition = [
					this.currentPosition.longitude,
					this.currentPosition.latitude,
				];
			},
			(err) => {
				console.log(err);
			},
			{
				enableHighAccuracy: true, //高精度
				timeout: 5000, //超时时间
				maximumAge: 10000, //位置缓存时间
			}
		);
	},
	mounted() {},
};
</script>
<style scoped>
#map {
	height: calc(100vh - 80px);
}
.baiduMap {
	position: absolute;
	right: 20px;
	top: 70px;
}
</style>
