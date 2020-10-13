const Post = require('../lib/mongo').Post
const marked = require('marked')

// 转换post的content的格式，从md到html
// contentToHtml 只针对 PostModel 有效
Post.plugin('contentToHtml', {
  afterFind (posts) {
    return posts.map(post => {
      post.content = marked(post.content)
      return post
    })
  },
  afterFindOne (post) {
    if (post) {
      post.content = marked(post.content)
    }
    return post
  }
})

module.exports = {
  // 创建文章
  create (post) {
    return Post.create(post).exec()
  },
  // 根据文章id查找文章
  getPostById (postId) {
    return Post.findOne({ _id: postId })
           .populate({ path: 'author', model: 'User'})
           .addCreatedAt()
           .contentToHtml()
           .exec()
  },
  // 按创建时间降序获取用户的文章
  getPosts (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    return Post.find(query)
           .populate({ path: 'author', model: 'User' })
           .sort({ _id: -1 })
           .addCreatedAt()
           .contentToHtml()
           .exec()
  },
  // 增加文章的点击量，每次查看+1
  incPv (postId) {
    return Post.updateOne({ _id: postId }, { $inc: { pv: 1 } }).exec()
  },
  // 修改文章
  updatePostById (postId, post) {
    return Post.updateOne({_id: postId}, { $set: post }).exec()
  },
  // 获取原始文章
  getRawPostById (postId) {
    return  Post.findOne({_id: postId})
           .populate({ path: 'author', model: 'User'})
           .exec()
  },
  // 删除文章
  deletePost (postId) {
    return Post.deleteOne({_id: postId}).exec()
  }
}
