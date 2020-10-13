const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/check').checkLogin;

// 创建一条留言
router.post('/', checkLogin, (req, res) => {
  res.send('创建留言')
})

// 删除一条留言
router.delete('/:commentId', checkLogin, (req, res) => {
  res.send('删除留言')
})

module.exports = router;
