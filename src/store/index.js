import Vue from 'vue';
import Vuex from 'vuex';
import { getJurisdiction } from '@/api/common.js';
import { Message } from 'element-ui';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        menus: []
    },
    getters: {
        token (state) {
            if (state.token == '') {
                let token = sessionStorage.getItem('token');
                return token == null ? '' : token;
            }
            return state.token;
        }
    },
    mutations: {
        setToken (state, token) {
            state.token = token;
            sessionStorage.setItem('token', token);
        },
        // 设置菜单
        setMenus (state, menus) {
            state.menus = menus;
        }
    },
    actions: {
        // 获取菜单
        getMenus () {
            return new Promise(resolve => {
                getJurisdiction().then(res => {
                    if (res.success) {
                        let menus = res.data;
                        let roots = getRootList(res.data);
                        resolve({
                            menus,
                            roots
                        })
                    } else {
                        Message.error('获取菜单失败');
                    }
                })
            })
        }
    }
});

const getRootList = (list) => {
    let root = [];
    list.forEach(item => {
        if (item.children != void 0 && item.children.length > 0) {
            root = getRootList(item.children).concat(root);
        }
        root.push(item.path.substr(item.path.lastIndexOf('/') + 1));
    });
    return root;
}