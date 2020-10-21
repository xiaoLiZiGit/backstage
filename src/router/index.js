import Vue from 'vue';
import VueRouter from 'vue-router';
import routeTable from './routerTable';

Vue.use(VueRouter);

// 获取路由表
export const getRouteTable = (routeList) => {
    // 添加404页面
    routeList.push('404');
    return getAbleRouteTable(routeList, routeTable);
}

// 获取能够使用的路由表
const getAbleRouteTable = (rootArr, routeArr) => {
    let routes = [];
    for (let i = 0, len = routeArr.length; i < len; i++) {
        let route = routeArr[i];
        if (route.children !== void 0 && route.children.length > 0) {
            route.children = getAbleRouteTable(rootArr, route.children);
        }
        if (route.name === void 0) {
            routes.push(route);
            continue;
        }
        if (rootArr.indexOf(route.name) >= 0) {
            routes.push(route);
        }
    }
    routes.unshift({
        path: '',
        redirect: routes[0].path
    });
    return routes;
}

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            meta: {
                auth: false
            },
            component: () => import('@/pages/login')
        }
    ]
});

// 解决路由跳转报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}