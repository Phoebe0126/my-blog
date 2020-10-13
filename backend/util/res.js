const respond = (res, status, data, message) => {
  res.send(JSON.stringify({
    status,
    body: {data},
    message
  }))
}

module.exports = respond;
