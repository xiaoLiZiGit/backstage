<template>
    <div class="container-nav">
        <header class="system-title">
            <span v-show="!isCollapse">后台管理系统</span>
            <span v-show="isCollapse"
                  class="el-icon-s-promotion icon"
                  title="后台管理系统"></span>
        </header>
        <div class="menu-box">
            <el-menu :default-active="defaultPath"
                     class="el-menu-vertical-demo"
                     background-color="#03132a"
                     text-color="#FFF"
                     active-text-color="#1890ff"
                     :collapse="isCollapse"
                     :router="true"
                     :unique-opened="true"
                     @select="select"
            >
                <menu-item v-for="(menu, index) in menus"
                           :key="index"
                           :menu="menu"
                ></menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import MenuItem from './MenuItem';
    import { mapState } from 'vuex';

    export default {
        name: 'global-nav',
        created() {
            this.defaultPath = this.$route.path;
        },
        props: {
            // 是否折叠菜单
            isCollapse: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                defaultPath: ''
            }
        },
        computed: {
            ...mapState([
                'menus' // 菜单列表
            ])
        },
        methods: {
            select (path) {
                this.$emit('menuSelect', path);
            },
            setDefaultPath (path) {
                this.defaultPath = path;
            }
        },
        components: {
            MenuItem
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/assets/less/color.less';

    .container-nav {
        height: 100%;
        background-color: @bg-nav-header-color;
        .system-title {
            position: relative;
            width: 100%;
            height: 60px;
            color: #FFF;
            font-size: 20px;
            letter-spacing: 2px;
            border-bottom: 1px solid @bg-border-page-color;
            span {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                white-space: nowrap;
                &.icon {
                    font-size: 26px;
                }
            }
        }
        .menu-box {
            .el-menu-vertical-demo {
                position: relative;
                left: 1px;
            }
        }
    }

    @media screen and (max-width: 1024px) {
        .container-nav {
            .system-title {
                height: 50px;
            }
        }
    }
</style>

<style lang="less">
    .container-nav {
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 280px;
            min-height: 400px;
        }   
    }

    @media screen and (max-width: 1024px) {
        .container-nav {
            .el-menu-vertical-demo:not(.el-menu--collapse) {
                width: 201px;
                min-height: 400px;
            } 
        }
    }
</style>