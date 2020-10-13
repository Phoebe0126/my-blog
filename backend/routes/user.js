const express = require('express');
const router = express.Router();
const respond = require('../util/res');
const UserModel = require('../models/users');

// 获取用户首页展示信息
router.get('/getShortInfo', (req, res) => {

  if (!req.session.user) {
    respond(res, 400, null, '用户未登录')
    return
  }
  const name = req.session.user.name;

  UserModel.getUserByName(name)
  .then(user => {
    if (!user) {
      respond(res, 400, null, '用户不存在')
      return
    }
    const data = {
      name: user.name,
      info: user.info
    };
    respond (res, 200 , data, '查询成功')
  })
  .catch(err => {
    respond(res, 500, null, err)
  })
})


module.exports = router;

