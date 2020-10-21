<template>
    <div class="container-login">
        <div class="login-wrapper">
            <h1 class="title">后台管理系统</h1>
            <div class="login-box">
                <el-input class="input"
                          placeholder="账号..."
                          v-model="account">
                    <span slot="prefix"
                          class="el-icon-user icon"></span>
                </el-input>
                <el-input class="input"
                          placeholder="密码"
                          v-model="password"
                          type="password">
                    <span slot="prefix"
                          class="el-icon-lock icon"></span>
                </el-input>
                <el-button class="btn" type="primary" @click="loginRequestAjax">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { loginRequest } from '@/api/common.js';
    import { mapMutations } from 'vuex';

    export default {
        name: 'login',
        data () {
            return {
                account: '',
                password: ''
            }
        },
        methods: {
            ...mapMutations([
                'setToken'
            ]),
            loginRequestAjax () {
                if (this.account == '') {
                    this.$message.error('账号不能为空!');
                    return;
                }
                if (this.account != 'admin') {
                    this.$message.error('账号错误');
                    return;
                }
                if (this.password == '') {
                    this.$message.error('密码不能为空');
                    return;
                }
                if (this.password.length == 0) {
                    this.$message.error('密码错误');
                    return;
                }
                loginRequest({
                    account: this.account,
                    password: this.password
                }).then(res => {
                    if (res.success) {
                        let token = res.data.token;
                        this.setToken(token);
                        this.$router.push({
                            path: '/'
                        });
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    .container-login {
        position: relative;
        height: 100vh;
        background-image: url('./img/bg.jpg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .login-wrapper {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 460px;
            min-height: 200px;
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 5px;
            box-shadow: 0 0 1px #FFf;
            .title {
                width: 100%;
                height: 60px;
                line-height: 60px;
                font-weight: bold;
                letter-spacing: 10px;
                text-align: center;
                font-size: 22px;
                color: rgba(12, 12, 12, 0.5);
            }
            .login-box {
                padding: 10px 30px 40px 30px;
                .input {
                    margin-bottom: 20px;
                }
                .icon {
                    position: relative;
                    top: 10px;
                    left: 6px;
                }
                .btn {
                    width: 100%;
                }
            }
        }
    }
</style>