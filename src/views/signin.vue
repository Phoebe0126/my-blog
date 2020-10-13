<template>
  <div class="wrapper">
        <div class="content">
            <!-- 关闭图标 -->
            <div class="close-icon" @click="naviToHome"><i class="iconfont">&#xe60b;</i></div>
            <!-- 说明文字 -->
            <h2 class="text">用户登录</h2>
            <!-- 表单 -->
            <el-form :model="userForm" status-icon :rules="rules" ref="userForm"  label-width="80px" class="userForm">
                <el-form-item label="用户名" prop="name">
                    <el-col :span="20">
                        <el-input v-model="userForm.name" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-col :span="20">
                        <el-input type="password" v-model="userForm.password" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                      <el-col :span="20" class="login-button">
                            <el-button @click="submitForm" type="primary">立即登录</el-button>
                            <el-button>取消</el-button>
                      </el-col>
                </el-form-item>
               
            </el-form>
        </div>
  </div>
</template>

<script>
import { login } from '../api/login'

export default {
    data () {
        return {
            userForm: {
                name: '',
                password: ''
            }
        }
    },
    computed: {
        rules () {
            return {
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6,  message: '密码至少6位字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        naviToHome () {
            this.$router.push('/')
        },
        submitForm () {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    login(this.userForm)
                    .then(res => {
                        if (res.data.status !== 200) {
                            this.$message(res.data.message)
                            return
                        }
                        // 登录成功
                        this.$message('登录成功')
                        this.$store.commit('changeLoginStatus', true)
                        this.$router.push({
                            path: '/',
                            query: {
                                user: this.userForm.name
                            }
                        })
                    })
                    .catch(err => {
                        this.$message(err)
                    })
                }
            })
        }
    } 
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    height: 100%;
    padding-top: 80px;
    background: #E8F3EC;
    .content {
        background: #fff;
        margin: 0 auto;
        width: 500px;
        height: 300px;
        box-shadow: 0 2px 10px rgba(0,0,0,.15);
        position: relative;
        padding-top: 20px;
        .text {
            text-align: center;
        }
        .close-icon {
            position: absolute;
            right: 7px;
            top: 7px;
            color: #aaa;
            .iconfont {
                font-size: 30px !important;
            }
            &:hover {
                cursor: pointer;
                color:rgba(0,0,0,.54);
            }
        }
        .userForm {
            margin: 20px 0;
            .login-button {
                padding-left: 60px;
            }
        }
    }
}
</style>