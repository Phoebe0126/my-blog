const express = require('express');
const router = express.Router();
const PostModel = require('../models/posts');
const respond = require('../util/res');
const checkLogin = require('../middlewares/check').checkLogin;

// 发表一篇文章
router.post('/create', (req, res) => {
  if (req.session.user) {

    const author = req.session.user._id
    const title = req.fields.title
    const content = req.fields.content

    // 校验参数
    if (!title.length) {
      respond(res, 400, null, '标题未填写')
      return
    }
    if (!content.length) {
      respond(res, 400, null, '内容未填写')
      return
    }

    let post = {
      author,
      title,
      content
    }

    // 存储文章
    PostModel.create(post)
    .then(result => {
      post = result.ops[0];
      respond(res, 200, {post}, '文章发表成功')
    })
    .catch(err => {
      respond(res, 500, null, err)
    })
  }
});

// 获取多篇文章
router.get('/', (req, res) => {

  // author非必须
  const author = req.query.author
  // 根据页数返回相应的文章
  const pageNum = Number(req.query.pageNum)
  const pageSize = Number(req.query.pageSize)

  PostModel.getPosts(author)
  .then(result => {
    // 数量少于所需则全返
    if (result.length < pageSize) {
      respond(res, 200, result, '查询文章成功')
    } else {
      const postData = result.slice((pageNum - 1) * pageSize, (pageNum - 1) * pageSize + pageSize)

      respond(res, 200, postData, '查询文章成功')
    }
  })
  .catch(err => {
    respond(res, 500, null, err)
  })

});

// 获取某一篇文章详情
router.get('/:postId', (req, res) => {

  const postId = req.params.postId

  Promise.all([
    PostModel.getPostById(postId),
    PostModel.incPv(postId)
  ])
  .then(result => {
    const post = result[0]

    if (!post) {
      respond(res, 400, null, '该文章不存在')
      return
    }
    respond(res, 200, post, '查询文章成功')
  })
  .catch(err => {
    respond(res, 500, null, err)
  })
});

// 获取某篇文章的原始内容
router.get('/raw/:postId', (req, res) => {
  if (!req.session.user) {
    respond(res, 400, null, '用户未登录')
    return
  }
  const postId = req.params.postId
  const userId = req.session.user._id

  PostModel.getRawPostById(postId)
  .then(result => {
    const post = result

    if (!post) {
      respond(res, 400, null, '该文章不存在')
      return
    }
    if (post.author._id.toString() !== userId.toString()) {
      respond(res, 400, null, '用户无权限')
      return
    }
    respond(res, 200, post, '查询文章成功')
  })

})

// 编辑某一篇文章
router.post('/edit/:postId', checkLogin, (req, res) => {
  const postId = req.params.postId
  const title = req.fields.title
  const content = req.fields.content
  const userId = req.session.user._id

  if (!title.length) {
    respond(res, 400, null, '未填写标题')
    return
  }
  if (!content.length) {
    respond(res, 400, null, '未填写内容')
    return
  }

  PostModel.getRawPostById(postId)
  .then(post => {

    if (!post) {
      respond(res, 400, null, '该文章不存在')
      return
    }
    if (post.author._id.toString() !== userId.toString()) {
      respond(res, 400, null, '用户无权限')
      return
    }

    PostModel.updatePostById(postId, {title, content})
    .then(() => {
      respond(res, 200, null, '文章修改成功')
    })
    .catch(err => {
      throw new Error(err)
    })

  })
  .catch(err => {
    respond(res, 500, null, err)
  })
});

// 删除某一篇文章
router.delete('/:postId', checkLogin, (req, res) => {

  const postId = req.params.postId
  const userId = req.session.user._id

  PostModel.getRawPostById(postId)
  .then(post => {

    if (!post) {
      respond(res, 400, null, '该文章不存在')
      return
    }
    if (post.author._id.toString() !== userId.toString()) {
      respond(res, 400, null, '用户无权限')
      return
    }

    PostModel.deletePost(postId)
    .then(() => {
      respond(res, 200, null, '文章删除成功')
    })
    .catch(err => {
      throw new Error(err)
    })

  })
  .catch(err => {
    respond(res, 500, null, err)
  })

});

module.exports = router;
