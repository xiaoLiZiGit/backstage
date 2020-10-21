<template>
    <div class="container-header">
        <div class="left">
            <span v-if="!isCollapse"
                  @click="handleClose"
                  class="el-icon-s-fold"
            >
                <span class="text">收缩</span>
            </span>
            <span v-else
                  @click="handleOpen"
                  class="el-icon-s-unfold"
            >
                <span class="text">展开</span>
            </span>
        </div>
        <div class="right">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <span class="user">您好，admin</span>
            <el-popover placement="bottom"
                        trigger="hover"
                        popper-class="system-box"
                        width="100px">
                <ul class="system-list">
                    <li>个人中心</li>
                    <li>退出</li>
                </ul>
                <span class="el-icon-setting list" slot="reference"></span>
            </el-popover>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'global-header',
        props: {
            // 切换收缩 - 展开
            isCollapse: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            // 开启
            handleOpen () {
                this.$emit('handleOpen');
            },
            // 关闭
            handleClose () {
                this.$emit('handleClose');
            }

        },
    }
</script>

<style lang="less" scoped>
    @import '~@/assets/less/color.less';

    .container-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 100%;
        width: 100%;
        .left {
            span {
                display: flex;
                align-items: center;
                color: #666;
                font-size: 24px;
                cursor: pointer;
                &:hover {
                    color: #999;
                }
                .text {
                    margin-left: 10px;
                    font-size: 12px;
                }
            }
        }
        .right {
            display: flex;
            align-items: center;
            color: #666;
            font-size: 12px;
            .user {
                margin-left: 10px;
            }
            .list {
                position: relative;
                top: 1px;
                padding: 10px;
                font-size: 12px;
                cursor: pointer;
            }
        }
    }
</style>

<style lang="less">
    .system-box {
        padding: 0;
        .system-list {
            li {
                padding: 10px;
                color: #666;
                text-align: center;
                cursor: pointer;
                border-bottom: 1px dotted #eee;
                &:last-child {
                    border: 0;
                }
                &:hover {
                    background-color: #eee;
                }
            }
        }
    }
</style>