<template>
  <div class="post" v-if="post._id">
      <h1 class="title">{{ post.title }}</h1>
       
      <div class="intro">
          <div class="time">创建时间：{{ post.created_at }}</div>
          <div class="author" v-if="!userName === post.author.name">作者：{{ post.author.name }}</div>
          <div class="change">
              <span class="edit" @click="naviToEditPage">编辑</span>
              <span>|</span>
              <span class="delete" @click="deletePostById">删除</span>
          </div>
      </div>
      <div class="content" v-html="post.content"></div>
      <div class="pv">点击量：{{ post.pv }}</div>
  </div>
</template>

<script>
import { getPostById, deletePostById } from '../api/post';
import { getShortUserInfo } from '../api/user';

export default {
    data () {
        return {
            post: {},
            userName: ''
        }
    },
    created () {
        // 验证是否登录
        this.getShortUserInfo();
        // 获取文章详情
        this.getPostById(this.$route.params.postId);
    },
    methods: {
        getPostById (postId) {
            getPostById(postId)
            .then(res => {
                if (res.status !== 200) {
                    this.$message('请求出错，请重试')
                    return
                }
                this.post = res.data.body.data;
            })
            .catch(err => {
                this.$message(err)
            })
        },
        getShortUserInfo() {
            if (!this.$store.state.isLogin) {
                getShortUserInfo()
                .then(res => {
                    if (res.status === 200) {
                        this.userName = res.data.body.data.name
                        this.$store.commit('changeLoginStatus', true)
                    }
                })
            }
        },
        deletePostById () {
            this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deletePostById(this.post._id)
                .then(res => {
                    if (res.data.status !== 200) {
                        this.$message(res.data.message)
                        return
                    }
                    this.$message({
                        type: 'success',
                        message: '文章删除成功!'
                    });
                    this.$router.push('/')
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '文章删除失败'
                })   
            })
        },
        naviToEditPage () {
            this.$router.push({
                path: '/create',
                query: {
                    postId: this.post._id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.post {
    .title {
        text-align: center;
    }
    .intro {
        display: flex;
        justify-content: space-between;
        color: #616e7c;
        padding: 5px;
        margin: 0 300px;
    }
    .content {
        width: 60%;
        margin: 10px auto;
    }
    .pv {
        color: #616e7c;
        float: right;
        padding: 10px;
        margin-right: 100px;
    }
    .change {
        color: #337ab7;
        font-size: 14px;
        .edit, .delete {
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>