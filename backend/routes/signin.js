const express = require('express');
const router = express.Router();
const respond = require('../util/res');
const UserModel = require('../models/users');
const sha1 = require('sha1')
const checkNotLogin = require('../middlewares/check').checkNotLogin;

// 登录页
router.get('/', checkNotLogin, (req, res) => {
  res.send('登录页')
})

// 用户登录
router.post('/', (req, res) => {

  const { name, password } = req.fields
  // 校验参数
  if (!name.length) {
    respond(res, 400, null, '请填写用户名')
    return
  }
  if (!password.length) {
    respond(res, 400, null, '请填写密码')
    return
  }

  // 查询是否用户已注册
  UserModel.getUserByName(name)
  .then(user => {
    if (!user) {
      respond(res, 400, null, '用户不存在')
      return
    }
    // 密码是否正确
    if (sha1(password) !== user.password) {
      respond(res, 400, null, '用户名或密码错误')
      return
    }
    // 登录成功
    delete user.password
    req.session.user = user
    respond(res, 200, null, '登录成功')
    return
  })
  .catch(err => {
    respond(res, 500, null, err)
  })
})

module.exports = router;

