const Comment = require('../lib/mongo').Comment

module.exports = {
  create (comment) {
    return Comment.create(comment).exec()
  },
  getComments () {
    
  }
}
