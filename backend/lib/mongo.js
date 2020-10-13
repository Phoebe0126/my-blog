const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

// 根据id获取用户的创建时间
mongolass.plugin('addCreatedAt', {
  afterFind (results) {
    return results.map(user => {
      user.created_at = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm')
      return user
    })
  },
  afterFindOne (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

exports.User = mongolass.model('User', {
  name: {
    type: 'string',
    required: true
  },
  avatar: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  info: {
    type: 'string',
    required: true
  },
  gender: {
    type: 'number',
    enum: [0, 1, 2],
    default: 0
  }
})
// 设置了 name 的唯一索引，保证用户名是不重复的
exports.User.index({name: 1}, {unique: true}).exec()

exports.Post = mongolass.model('Post', {
  author: {
    type: Mongolass.Types.ObjectId,
    required: true
  },
  title: {
    type: 'string',
    required: true
  },
  content: {
    type: 'string',
    required: true
  },
  pv: {
    type: 'number',
    default: 0
  }
});

// 按照创建时间降序查
exports.Post.index({author: 1, _id: -1}).exec()

exports.Comment = mongolass.model('Comment', {
  author: {
    type: Mongolass.Types.ObjectId,
    required: true
  },
  content: {
    type: 'string',
    required: true
  },
  postId: {
    type: mongolass.Types.ObjectId,
    required: true
  }
})

exports.Post.index({author: 1, _id: -1}).exec()
