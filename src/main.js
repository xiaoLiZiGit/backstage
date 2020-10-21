import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import { getRouteTable } from './router';

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 配置进度条
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
});
NProgress.inc();

Vue.config.productionTip = false;

// 路由前置守卫
router.beforeEach((to, from, next) => {
	if (to.meta.auth !== void 0 && !to.meta.auth) {
		next();
	} else {
		NProgress.start();
		let token = store.getters.token;
		if (token != '') {
			if (store.state.menus.length == 0) {
				store.dispatch('getMenus').then(({ menus, roots }) => {
					let routes = getRouteTable(roots);
					store.commit('setMenus', menus);
					router.addRoutes(routes);
					next({ ...to, replace: true });
				});
			} else {
				next();
			}
		} else {
			next('/login');
		}
	}
});

// 路由后置守卫
router.afterEach(() => {
	NProgress.done();
});

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
