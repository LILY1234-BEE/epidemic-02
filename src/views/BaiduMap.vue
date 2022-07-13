<template>
	<div id="baidumap">
		<baidu-map class="map" center="柳州" scroll-wheel-zoom>
			<bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
			<!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
			<bm-overview-map
				anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
				:isOpen="true"
			></bm-overview-map>
			<bm-geolocation
				anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
				:showAddressBar="true"
				:autoLocation="true"
			></bm-geolocation>
			<bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
			<bm-panorama></bm-panorama>
			<bm-tile
				:isTransparentPng="true"
				tileUrlTemplate="//developer.baidu.com/map/jsdemo/demo/tiles/{Z}/tile{X}_{Y}.png"
			>
			</bm-tile>
		</baidu-map>
		<el-button
			size="small"
			class="gaodeMap"
			type="primary"
			round
			@click="toGaode"
			>->高德地图</el-button
		>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {},
	methods: {
		toGaode() {
			this.$router.replace("/Map");
		},
	},
	created() {},
	mounted() {},
};
</script>

<style>
.map {
	height: calc(100vh - 80px);
}
.gaodeMap {
	position: absolute;
	right: 20px;
	top: 69px;
}
</style>
