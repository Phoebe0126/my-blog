<template>
  <div class="wrapper">
       <div class="title">
           <div>标题</div>
           <el-input class="input" v-model="title"></el-input>
           <el-button type="danger" @click="saveArticle">发布文章</el-button>
       </div>
       <mavon-editor v-model="content"/>
  </div>
</template>

<script>
import { createNewArticle, getRawPostById, editPost } from '../api/post'
import { mapGetters } from 'vuex'

export default {
    data () {
      return {
          title: '',
          content: '',
          isSaved: false,
          postId: ''
      }
    },
    created () {
        // 是否为文章修改
        this.postId = this.$route.query.postId;
        // 获取原始文章内容
        if (this.postId) {
            this.getRawPostById()
        }
    },
    mounted () {
        // 检测刷新或关闭页面
        window.addEventListener('beforeunload', this.beforeUnloadFn)
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    methods: {
        getRawPostById () {
            getRawPostById(this.postId)
            .then(res => {
                if (res.data.status !== 200) {
                    this.$message(res.data.message)
                    return
                }
                const post = res.data.body.data
                this.title = post.title
                this.content = post.content
            })
            .catch(err => {
                this.$message(err)
            })
        },
        saveArticle () {
            const data = {
                title: this.title,
                content: this.content
            }
            // 判断修改还是新建
            if (this.postId) {
                editPost(this.postId, data)
                .then(res => {
                    if (res.data.status !== 200) {
                        this.$message(res.data.message)
                        return
                    }
                    this.isSaved = true;
                    this.$message('文章保存成功')
                })
            } else {
                createNewArticle(data) 
                .then(res => {
                    if (res.data.status !== 200) {
                        this.$message(res.data.message)
                        return
                    }
                    this.isSaved = true;
                    this.$message('文章保存成功')
                }) 
            } 
        },
        // 用户刷新、关闭提示
        beforeUnloadFn (e) {
            if (e) {
                console.log(e)
                e.preventDefault()
                e.returnValue = '确认离开？'
            }
            return '确认离开？'
        }
    },
    // 禁止用户在还未保存修改前突然离开
    beforeRouteLeave (to, from, next) {
        if (!this.isSaved && this.isLogin) {
            const answer = window.confirm('文章还未保存, 退出前是否需要保存?')
            if (answer) {
                if (!this.title) {
                    this.$message('标题未填写')
                    return
                }
                if (!this.content) {
                    this.$message('内容未填写')
                    return
                }
                this.saveArticle();
                next()
            } else {
                next()
            }
        }
        next()
   },
   beforeDestroy () {
       window.removeEventListener('beforeunload', this.beforeUnloadFn)
   }
}
</script>

<style lang="scss" scoped>
.wrapper {
    .title {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        div {
            font-size: 25px;
            font-weight: bold;
            margin-right: 10px;
        }
        .input {
            width: 85%;
        }
    }
}
</style>