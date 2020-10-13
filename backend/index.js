const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')
// const bodyParser = require('body-parser')

const app = express()

// 解析请求体数据
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// 跨域设置
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  
  if (req.method == 'OPTIONS') {
    res.sendStatus(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

// 设置模板目录
app.set('views', path.join(__dirname, 'views'))

// 设置模板引擎为ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// session中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置secret来计算hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新session
  saveUninitialized: false, // 设置为false，强制创建一个session
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将session存到MongoDB中
    url: config.mongodb
  })
}))

// flash显示通知
app.use(flash())

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),// 头像上传到img目录下
  keepExtensions: true// 保留文件后缀
}))

// 挂载路由
routes(app)

// 监听端口
app.listen(config.port, () => {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
