//app.js
App({
  onLaunch: function () {
    
  },
  onHide: function () {
    wx.setStorageSync('phone', false);
  },
  globalData: {
    userInfo: null
  }
})