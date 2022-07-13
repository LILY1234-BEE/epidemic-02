import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import VueAMap from 'vue-amap'; //注意不要和 AMap原始名称覆盖
import VueParticles from 'vue-particles'
import { VueJsonp } from 'vue-jsonp'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueJsonp)
Vue.use(VueParticles)

Vue.config.productionTip = false
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
    ak: '6AQ1NGDOfXczMU9U6MGKsRn5bD1uupIO'
})


Vue.use(VueAwesomeSwiper)
    // import 'swiper/dist/css/swiper.css'

Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
    // 高德的key
    key: '371c570f66b66ed9395a246e1174ee36',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
    v: '1.4.15'

});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面meta */
    if (to.meta.content) {
        let head = document.getElementsByTagName('head');
        let meta = document.createElement('meta');
        meta.content = to.meta.content;
        head[0].appendChild(meta)
    }
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next()
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')