const Mock = require('mockjs');
// const Random = Mock.Random;/

const adminInfo = [
  {
    mail: '4399@qq.com',
    userPwd: '1234qwer',
  }
]

Mock.mock('/login', 'post', function (options) {
  let user = JSON.parse(options.body).userInfo
  let flg = false
  adminInfo.forEach(function (item) {
    if (item.mail === user.mail && item.userPwd === user.userPwd) {
      flg = true
    }
  })
  if (flg) {
    return user
  } else {
    return null
  }
});