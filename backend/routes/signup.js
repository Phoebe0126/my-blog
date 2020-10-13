const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
const UserModel = require('../models/users');

const checkNotLogin = require('../middlewares/check').checkNotLogin;
const respond = require('../util/res');
// 注册页
router.get('/', checkNotLogin, (req, res) => {
  res.send('注册页')
})

// 用户注册路由
router.post('/', (req, res) => {

  let { name, gender, info, password } = req.fields
  // const avatar = req.fields.avatar.path.split(path.sep).pop()
  // let avatar = req.fields.avatar;

  if (!(name && info && password)) {
    respond(res, 400, null, '个人信息输入不完整')
    return
  }
  // 校验参数
  if (!(name.length >= 1 && name.length <= 10)) {
    respond(res, 400, null, '名字请限制在 1-10 个字符')
    return
  }
  if (![0,1,2].includes(gender)) {
    respond(res, 400, null, '性别不合法')
    return
  }
  if (info.length < 1 || info.length > 30) {
    respond(res, 400, null, '个人简介请限制到1-30个字符')
    return
  }
  if (password.length < 6) {
    respond(res, 400, null, '密码至少6个字符')
    return
  }

  // 加密密码
  password = sha1(password)

  // 写入数据库的用户信息
  let user = {
    name,
    password,
    gender,
    info,
    avatar: ''
  }

  UserModel.create(user)
  .then(result => {

    // 获取存入数据库后的用户，包含_id
    user = result.ops[0]
    delete user.password
    // 存入session
    req.session.user = user
    respond(res, 200, null, '用户注册成功')
  })
  .catch(err => {
    // 用户名重复
    if (err.message.match('duplicate key')) {
      respond(res, 400, null, '用户名重复')
      return
    }
  })
})

module.exports = router;





