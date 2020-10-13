<template>
  <div class="wrapper">
      <div class="navi">
        <div class="mask"></div>
        <div class="content">
            <h1 class="default" v-if="!userName">快来创建属于你的博客吧！</h1>
            <h1 v-if="userName">{{ userName }}</h1>
            <div v-if="userName" class="info">{{ info }}</div>
            <el-button class="button" type="warning" @click="naviToEdit">写文章</el-button>
        </div>
      </div>
      <h1 class="all-articles">所有文章</h1>
      <home-articles :articles="articles"></home-articles>
      <!-- 翻页 -->
      <div class="pager">
          <div class="previous" v-if="pageNum > 1" @click="subPageNum">←&nbsp;Previous</div>
          <div class="next" v-if="articles.length === pageSize" @click="addPageNum">NEXT&nbsp;→</div>
      </div>
  </div>
</template>

<script>
import { getShortUserInfo } from '../api/user';
import HomeArticles from '@/components/home-articles';
import { getPosts } from '../api/post';

export default {
    components: {
        HomeArticles
    },
    data () {
        return {
            userName: '',
            info: '',
            pageNum: 1,
            pageSize: 10,
            articles: []
        }
    },
    created () {
        // 获取用户信息
        this.getShortUserInfo();
        // 获取所有文章
        this.getPosts();
    },
    methods: {
        naviToEdit () {
            this.$router.push('/create')
        },
        getShortUserInfo () {
            getShortUserInfo()
            .then(res => {
                const resData = res.data;
                if (resData.status !== 200) {
                    this.$message(resData.message)
                    return
                }
                this.$store.commit('changeLoginStatus', true)
                const userData = resData.body.data;
                this.userName = userData.name;
                this.info = userData.info;
            })
        },
        getPosts () {
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            getPosts(params)
            .then(res => {
                // 如果为空则取消更新数据
                const articles = res.data.body.data;
                if (articles.length === 0) {
                   this.pageNum -= 1;
                   return;
                }
               this.articles = res.data.body.data;
            })
        },
        addPageNum () {
            this.pageNum++;
            this.getPosts();
        },
        subPageNum () {
            this.pageNum--;
            this.getPosts();
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    padding-bottom: 50px;
    .navi {
        width: 100%;
        height: 400px;
        background: url("https://heverdemo.files.wordpress.com/2019/08/autumn-mood-forest-cold-dawn-397096-1.jpg")  no-repeat;
        background-size: cover;
        background-position: 50% 77%;
        position: relative;
        .mask {
            position: absolute;
            top: 0;
            left: 0;
            height:100%;
            width:100%;
            background-color: #1279BE;
            opacity: .5;
        }
        .content {
            position: absolute;
            color: #fff;
            left: 100px;
            top: 60px;
            h1 {
                font-size: 40px;
                margin-bottom: 40px;
            }
            div {
                margin-bottom: 20px;
            }
            .info {
                font-size: 20px;
            }
            .button {
                position: absolute;
                left: 0;
                top: 100%;
            }
        }
    }
    .all-articles {
        text-align: center;
    }
    .pager {
        margin: 20px 0;
        padding: 10px 210px;
        font-family: "Helvetica Neue";
        font-size: 18px;
        font-weight: 800;
        .next, .previous {
            padding: 15px 30px;
            border: 1px solid #ccc;
            cursor: pointer;
            &:hover {
                background-color: #0085a1;
                border: 1px solid #0085a1;
                color: #fff;
            }
        }
        .next {
            float: right;
        }
        .previous {
            margin-left: 40px;
            float: left;
        }
    }
}
</style>