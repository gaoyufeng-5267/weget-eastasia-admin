const Mock = require('mockjs');
// const Random = Mock.Random;/

const adminInfo = [
  {
    userName: '4399@qq.com',
    userPwd: '4399@qq.com',
  }
]

Mock.mock('/login', 'post', function (options) {
  let user = JSON.parse(options.body).userInfo
  let flg = false
  adminInfo.forEach(function (item) {
    if (item.userName === user.userName && item.userPwd === user.userPwd) {
      flg = true
    }
  })
  if (flg) {
    return user
  } else {
    return null
  }
});