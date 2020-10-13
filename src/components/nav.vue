<template>
  <div class="nav-wrapper">
    <el-row type="flex" justify="end">
      <el-col :span="8" class="col">
          <div class="grid-content header-content">
              <div @click="naviToHome">首页</div>
              <div>文章</div>
              <div @click="naviToCreate">写文章</div>
              <div>我</div>
              <div v-if="!isLogin" @click="naviToSignin">登录</div>
              <div class="signup" @click="naviToSignup" v-if="!isLogin">注册</div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    methods: {
        naviToSignup () {
            if (this.$route.path !== '/signup') {
                this.$router.push('/signup')
            }
        },
        naviToSignin () {
             if (this.$route.path !== '/signin') {
                this.$router.push('/signin')
            }
        },
        naviToCreate () {
            if (this.$route.path !== '/create') {
                this.$router.push('/create')
            }
        },
        naviToHome () {
            if (this.$route.path !== '/' ) {
                this.$router.push('/')
            }
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    }
};
</script>

<style lang="scss">
.nav-wrapper {
     margin: 20px 0;
     font-size: 18px;
     font-weight: 400;
    .header-content {
        display: flex;
        margin: 30rpx 0;
        align-items: center;
        justify-content: right;
        div {
            margin: 0 10px;
        }
        div:hover {
            cursor: pointer;
            color: #26855B;
        }
        .signup {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #189c68;
            padding: 1px 20px;
            border-radius: 20px;
        }
    }
}

</style>
