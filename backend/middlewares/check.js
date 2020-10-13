module.exports = {
  // 未登录用户跳转到登录注册页面
  checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录');
      return res.redirect('/signin');
    }
    // 已登录
    next();
  },
  // 已登录用户禁止访问登录注册页面
  checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录');
      return res.redirect('back');
    }
    next();
  }
}
