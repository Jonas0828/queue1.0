//app.js
const util = require('./utils/util.js');

App({
  onLaunch: function () {
    wx.login({
      success(res) {
        if (res.code) {
          // 获取登录临时凭证
          wx.setStorageSync('js_code', res.code);
          util.doServerAction({
            trade: '1004',
            data:{
              appid: 'wxb5b57efc5e90002d',
              secret: '08d688ea24d08bd717d91247203aa905',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success: res => {
              console.log(res.data.Service.response.ErrMsg);
              console.log('-------------------------------------');
              wx.setStorageSync('userid', res.data.Service.response.body.UserID);
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onHide: function () {
    wx.setStorageSync('phone', false);
  },
  globalData: {
    userInfo: null
  }
})