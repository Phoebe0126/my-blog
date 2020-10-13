<template>
  <div class="wrapper">
      <div class="article" v-for="post in articles" :key="post._id">
          <div class="title" @click="naviToDetail(post._id)">{{ post.title }}</div>
          <div class="time">{{ post.created_at }} </div>
          <div class="thumb" v-html="post.content.split('\n')[0]"></div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        articles: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        naviToDetail (postId) {
            this.$router.push(`/detail/${postId}`);
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    .article {
        width: 800px;
        margin-left: 20%;
        color: #27272a;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        margin-top: 20px;
        .title {
            transition: color .1s ease;
            font-size: 30px;
            &:hover {
                color: #a0a1a7;
                cursor: pointer;
            }
        }
        .time {
            color: #616e7c;
            font-size: 16px;
            margin: 10px 0;
        }
        .thumb {
            line-height: 1.6;
        }
    }
}
</style>