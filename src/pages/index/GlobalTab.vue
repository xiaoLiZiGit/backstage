<template>
    <div class="container-tab" ref="tagbox" v-show="tags.length > 0">
        <el-tag v-for="(tag, index) in tags"
                :key="index"
                :effect="tag.effect"
                :data-index="index"
                closable
                class="tag-item"
                @click="clickTag(tag)"
                @close="closeTag(tag, index)"
        >{{ tag.name }}</el-tag>
        <ul class="custom-menus"
            ref="menus"
            v-show="menusToggle">
            <li @click="customMenu('closeSelf')">关闭</li>
            <li @click="customMenu('closeOther')">关闭其他</li>
            <li @click="customMenu('closeAll')">关闭所有</li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'global-tab',
        created () {
            this.controlTags(this.$route.path);
        },
        mounted () {
            // 添加自定义菜单事件
            this.$refs.tagbox.addEventListener('contextmenu', this.openCustomMenus, false);
            window.addEventListener('click', this.closeCustomMenus, false);
        },
        beforeDestroy() {
            // 取消自定义菜单事件
            this.$refs.tagbox.removeEventListener('contextmenu', this. openCustomMenus);
            window.removeEventListener('click', this.closeCustomMenus);
        },
        data () {
            return {
                tags: [],
                menusToggle: false,
                menusTagIndex: -1
            }
        },
        computed: {
            ...mapState([
                'menus'
            ]),
            // 菜单映射
            menusMap () {
                let menus = this.menuslevelArr(this.menus);
                let menusMap = {};
                menus.forEach(menu => {
                    menusMap[menu.path] = menu;
                });
                return menusMap;
            }
        },
        methods: {
            openCustomMenus (e) {
                e.preventDefault();
                let isTagsNode = e.target.className.indexOf('tag-item') >= 0;
                if (isTagsNode) {
                    let pageX = e.pageX;
                    let pageY = e.pageY;
                    let menus = this.$refs.menus;
                    this.menusTagIndex = parseInt(e.target.dataset.index);
                    this.menusToggle = true;
                    menus.style.left = `${pageX}px`;
                    menus.style.top = `${pageY}px`;
                }
            },
            // 关闭自定义菜单
            closeCustomMenus () {
                this.menusToggle = false;
                this.menusTagIndex = -1;
            },
            // 自定义菜单，关闭操作
            customMenu (closeMethod) {
                if (this.menusTagIndex >= 0) {
                    let tag = this.tags[this.menusTagIndex];
                    switch (closeMethod) {
                        case 'closeSelf': this.closeTag(tag, this.menusTagIndex); break;
                        case 'closeOther': this.closeOtherTag(); break;
                        case 'closeAll': this.closeAllTag(); break;
                    }
                }
            },
            // 控制tag
            controlTags (path) {
                let menu = this.menusMap[path];
                if (menu != void 0) {
                    let index = -1;
                    for (let i = 0; i < this.tags.length; i++) {
                        let tag = this.tags[i];
                        if (menu.path == tag.path) {
                            index = i;
                        }
                    }
                    index < 0 && this.tags.push(menu);
                }
                this.controlTagsActive(path);
            },
            // 控制tag active选项
            controlTagsActive (path) {
                this.tags = this.tags.map(tag => {
                    return {
                        ...tag,
                        effect: path == tag.path ? 'dark' : 'plain'
                    }
                });
                this.$emit('selectTag', path);
            },
            // 将所有菜单都放置到同级数组中
            menuslevelArr (menus) {
                let arr = [];
                menus.forEach(menu => {
                    if (menu.children != void 0 && menu.children.length > 0) {
                        arr = this.menuslevelArr(menu.children).concat(arr);
                    }
                    if (menu.children == void 0 || menu.children.length == 0) {
                        arr.push(menu);
                    }
                });
                return arr;
            },
            // 点击tag
            clickTag (tag) {
                this.$router.push({
                    path: tag.path
                });
                this.controlTagsActive(tag.path);
            },
            // 关闭tag
            closeTag (tag, index) {
                // 是否是当前tag
                this.tags.splice(index, 1); // 删除点击tag
                if (this.tags.length == 0) {
                    this.$router.push({ path: '/' }); // 如果没有tag了，则进入第一个页面
                } else {
                    // 判断是否是当前tag, 如果是当前tag关闭则切换页面
                    let isCurrentTag = tag.path == this.$route.path;
                    let path = index - 1 < 0 ? this.tags[0].path : this.tags[index - 1].path;
                    if (isCurrentTag) {
                        this.controlTagsActive(path);
                        this.$router.push({
                            path: path
                        });
                    }
                }
            },
            // 关闭其他
            closeOtherTag () {
                let tag = this.tags[this.menusTagIndex];
                this.tags = [tag];
                this.$router.push({
                    path: tag.path
                });
                this.controlTagsActive(tag.path);
            },
            // 关闭所有
            closeAllTag () {
                this.tags = [];
                this.$router.push({
                    path: '/'
                });
                this.controlTagsActive(this.$route.path);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/assets/less/color.less';

    .container-tab {
        display: flex;
        padding: 4px 10px;
        border-bottom: 1px solid @bg-border-page-color;
        .tag-item {
            min-width: 16px;
            margin-right: 4px;
            overflow: hidden;
            cursor: pointer;
            &:last-child {
                margin: 0;
            }
        }
        .custom-menus {
            position: absolute;
            z-index: 999;
            color: #666;
            font-size: 10px;
            box-shadow: 2px 2px 4px #666;
            border-radius: 4px;
            background-color: #FFF;
            li {
                padding: 10px 16px;
                text-align: center;
                cursor: pointer;
                &:hover {
                    background-color: #eee;
                }
            }
        }
    }
</style>

<style lang="less">
    .container-tab {
        .tag-item {
            position: relative;
            padding-right: 24px;
            .el-tag__close {
                position: absolute;
                z-index: 999;
                right: 0px;
                padding-right: 16px;
                height: 30px;
                line-height: 34px;
                background-color: inherit;
                &:hover {
                    color: #666;
                    font-weight: bold;
                }
            }
        }
    }
</style>