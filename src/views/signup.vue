<template>
  <div class="wrapper">
      <div class="content">
          <!-- 关闭图标 -->
          <div class="close-icon" @click="naviToHome"><i class="iconfont">&#xe60b;</i></div>
          <!-- 说明文字 -->
          <div class="text experience">开始体验吧！</div>
          <div class="text create">首先，请先创建你的个人博客账户</div>
          <!-- 表单 -->
          <el-form :model="userForm" status-icon :rules="rules" ref="userForm"  label-width="80px" class="userForm">
                <el-form-item label="用户名" prop="name">
                    <el-col :span="20">
                        <el-input v-model="userForm.name" ></el-input>
                    </el-col>
                </el-form-item>
                <el-row type="flex" class="row-bg" justify="end">
                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                </el-row>
                <el-form-item label="性别" prop="gender">
                    <el-col :span="20">
                        <el-radio-group v-model="userForm.gender">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-col :span="20">
                        <el-input type="password" v-model="userForm.password" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="个人简介" prop="info">
                    <el-col :span="20">
                        <el-input v-model="userForm.info" placeholder="简单介绍一下自己吧" type="textarea" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                      <el-col :span="20">
                            <el-button type="danger" round @click="submitForm">立即创建</el-button>
                      </el-col>
                </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
import { postUserInfo } from '../api/login';

export default {
    data () {
        return {
            userForm: {
                name: '',
                gender: 1,
                password: '',
                info: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6,  message: '密码至少6位字符', trigger: 'blur' }
                ],
                info: [
                    { required: true, message: '请输入个人简介', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm () {
            this.$refs.userForm.validate((valid) => {
            if (valid) {
                postUserInfo(this.userForm)
                .then(res => {
                    if (res.data.status !== 200) {
                        this.$message(res.data.message)
                        return
                    }
                    // 返回首页
                    this.$message('注册成功')
                    this.$store.commit('changeLoginStatus', true)
                    this.$router.push({
                        path: '/',
                        query: {
                            user: this.userForm.name
                        }
                    });
                })
                .catch(err => {
                    this.$message(err);
                })
                
            } else {
                return false;
            }
            });
        },
        naviToHome () {
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    height: 100vh;
    .content {
        background: url("https://cdn-images-1.medium.com/max/1350/1*gnUBeL-INIVDk0_GyL8x1g.png") no-repeat;
        background-size: 100%;
        margin: 50px auto;
        width: 900px;
        height: 452px;
        box-shadow: 0 2px 10px rgba(0,0,0,.15);
        padding-top: 20px;
        position: relative;
        text-align: center;
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
        .text {
            margin: 10px 0;
        }
        .experience {
            font-size: 32px;
            color: rgba(0,0,0,.84);
        }
        .create {
            font-size: 19px;
            color: rgba(0,0,0,.68);
        }
        .userForm {
            margin-top: 20px;
            width: 300px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}
</style>