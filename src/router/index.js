import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            // 页面标题title
            title: '疫情动态-全国可视化平台'
        }
    },
    {
        path: '/map',
        name: 'Map',
        meta: {
            // 页面标题title
            title: '疫情地图-全国可视化平台'
        },
        component: () =>
            import ('../views/Map.vue')
    },
    {
        path: '/baiduMap',
        name: 'BaiduMap',
        meta: {
            // 页面标题title
            title: '疫情地图-全国可视化平台'
        },
        component: () =>
            import ('../views/BaiduMap.vue')
    },
    {
        path: '/real-time',
        name: 'Real-Time',
        component: () =>
            import ('../views/Real-Time.vue'),
        meta: {
            // 页面标题title
            title: '实时疫情-全国可视化平台'
        }
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () =>
            import ('../views/Statistics.vue'),
        meta: {
            // 页面标题title
            title: '数据统计-全国可视化平台'
        }
    },
    {
        path: '/find',
        name: 'Find',
        component: () =>
            import ('../views/Find.vue'),
        meta: {
            // 页面标题title
            title: '风险等级查询-全国可视化平台'
        }
    },
    {
        path: '/fix-hospital',
        name: 'fix-Hospital',
        component: () =>
            import ('../views/fix-Hospital.vue'),
        meta: {
            // 页面标题title
            title: '定点医院-全国可视化平台'
        }
    },
    {
        path: '/ddHospitalMap',
        name: 'DdHospitalMap',
        component: () =>
            import ('../views/DdHospitalMap.vue'),
    },
    {
        path: '/manage',
        name: 'Manage',
        component: () =>
            import ('../views/Deploy/Manage.vue'),
        meta: {
            // 页面标题title
            title: '用户管理-全国可视化平台'
        }
    },
    {
        path: '/role',
        name: 'Role',
        component: () =>
            import ('../views/Deploy/Role.vue'),
        meta: {
            // 页面标题title
            title: '角色管理-全国可视化平台'
        }
    },
    {
        path: '/power',
        name: 'Power',
        component: () =>
            import ('../views/Deploy/Power.vue'),
        meta: {
            // 页面标题title
            title: '权限设置-全国可视化平台'
        }
    },
    {
        path: '/hospital',
        name: 'Hospital',
        component: () =>
            import ('../views/Management/Hospital.vue'),
        meta: {
            // 页面标题title
            title: '定点医院-全国可视化平台'
        }
    },
    {
        path: '/infoList',
        name: 'InfoList',
        component: () =>
            import ('../views/Management/InfoList.vue'),
        meta: {
            // 页面标题title
            title: '资讯分类-全国可视化平台'
        }
    },
    {
        path: '/article',
        name: 'Article',
        component: () =>
            import ('../views/Management/Article.vue'),
        meta: {
            // 页面标题title
            title: '新闻资讯-全国可视化平台'
        }
    },
    {
        path: '/upList',
        name: 'UpList',
        component: () =>
            import ('../views/Information/UpList.vue'),
        meta: {
            // 页面标题title
            title: '数据列表-全国可视化平台'
        }
    },
    {
        path: '/up',
        name: 'Up',
        component: () =>
            import ('../views/Information/Up.vue'),
        meta: {
            // 页面标题title
            title: '数据上报-全国可视化平台'
        }

    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router