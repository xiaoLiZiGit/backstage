import ajax from '@/utils/ajax';

// 获取权限
export const getJurisdiction = (data = {}) => ajax({
    url: '/json/jurisdiction.json',
    params: data
});

// 登录
export const loginRequest = (data = {}) => ajax({
    url: '/json/login.json',
    params: data
})