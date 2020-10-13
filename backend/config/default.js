module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'reve_blog_id',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}
