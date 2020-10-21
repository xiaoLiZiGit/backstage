module.exports = {
    publicPath: './',
    devServer: {
        port: 3000
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            // 设置名称
            args[0] = {
                ...args[0],
                title: '后台管理系统',
                static_resource: './'
            }
            return args;
        });
    }
}