<template>
    <div class="menu-box">
        <el-submenu v-if="menu.children != void 0"
                :index="menu.path"
        >
            <template slot="title">
                <i v-if="menu.icon != void 0" :class="menu.icon"></i>
                <span slot="title">{{ menu.name }}</span>
            </template>
            <menu-item v-for="(item, index) in menu.children"
                    :key="index"
                    :menu="item"
            ></menu-item>
        </el-submenu>
        <el-menu-item v-else
                    :index="menu.path"
        >
            <i v-if="menu.icon != void 0" :class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
    </div>
</template>

<script>
    // 菜单解析
    export default {
        name: 'menu-item',
        props: {
            // 菜单项
            menu: {
                type: Object,
                default () {
                    return {};
                }
            }
        }
    }
</script>

<style lang="less">
    .menu-box {
        .el-menu--collapse > div > .el-submenu > .el-submenu__title span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
        }
        .el-menu--collapse > div > .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
            display: none;
        }
    }
</style>