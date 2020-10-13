module.exports = function (app) {

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/user', require('./user'));
  app.use('/posts', require('./posts'));
  app.use('/comments', require('./comments'));

}
