<template>
    <div class="container">
        <nav class="nav-box">
            <global-nav @menuSelect="menuSelect"
                        :isCollapse="isCollapse"
                        ref="globalNav"
            ></global-nav>
        </nav>
        <div class="content-box">
            <header class="header-box">
                <global-header @handleClose="isCollapse = true"
                               @handleOpen="isCollapse = false"
                               :isCollapse="isCollapse"
                ></global-header>
            </header>
            <nav class="tabs">
                <global-tab ref="globalTab" @selectTag="selectTag"></global-tab>
            </nav>
            <div class="page-box">
                <el-scrollbar style="height: 100%; width: 100%;">
                    <div class="page-content">
                        <router-view />
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
    import GlobalHeader from './GlobalHeader';
    import GlobalNav from './GlobalNav';
    import GlobalTab from './GlobalTab';

    export default {
        name: 'index',
        data () {
            return {
                isCollapse: false
            }
        },
        methods: {
            menuSelect (path) {
                this.$refs.globalTab.controlTags(path);
            },
            selectTag (path) {
                this.$refs.globalNav.setDefaultPath(path);
            }
        },
        components: {
            GlobalHeader,
            GlobalNav,
            GlobalTab
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/assets/less/color.less';

    .container {
        display: flex;
        height: 100vh;
        .nav-box {
            height: 100%;
        }
        .content-box {
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: calc(~'100% - 60px');
            min-width: calc(~'100% - 280px');
            .header-box {
                height: 60px;
                border-bottom: 1px solid @bg-border-page-color;
            }
            .page-box {
                min-height: calc(~'100vh - 101px');
                height: calc(~'100vh - 60px');
                .page-content {
                    padding: 10px 20px;
                    box-sizing: border-box;
                }
            }
        }
    }

    @media screen and (max-width: 1024px) {
        .container {
            .content-box {
                .header-box {
                    height: 50px;
                }
                .tabs {
                    display: none;
                }
            }
        }
    }
</style>

<style lang="less">
    .el-scrollbar__wrap{
        overflow-x: hidden;
    }
</style>