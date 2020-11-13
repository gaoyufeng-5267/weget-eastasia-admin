
const Mock = require('mockjs');
// const Random = Mock.Random;/

const adminInfo = [
  {
    mail: '4399@qq.com',
    userPwd: '1234qwer',
  }
]
// ログイン
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
// パスワード忘れた
Mock.mock('/mailForget', 'post', "200");
// トップページ
Mock.mock('/top','get',function(){
  let infoData = [
    {
      code: "200",
      message: "",
      data:{
        memberTotalCount: "6666", //会員数
        addMemberCountByCurrentMonth: "555", //当月入会数
        quitMemberCountByCurrentMonth: "125", // 当月退会数
        shopTotalCount: "1200", // 店舗数
        records: [
          {
            month: "11",
            soldTotalAmount: "1120000",
            soldTotalCount:"2034"
          },
          {
            month: "10",
            soldTotalAmount: "1050000",
            soldTotalCount:"2034"
          },
          {
            month: "9",
            soldTotalAmount: "2120000",
            soldTotalCount:"2034"
          }
        ]
      }
    }
  ]
  return infoData;
});

