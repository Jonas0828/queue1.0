// pages/infotype/infotype.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 'form',
        name: '基础信息',
        open: false,
        complete: {
          msg: '不完整'
        }
      },
      {
        id: 'widget',
        name: '人脸识别',
        open: false,
        complete: {
          msg: '不完整'
        }
      },
      {
        id: 'feedback',
        name: '实名认证',
        open: false,
        complete: {
          msg: '不完整'
        }
      },
    ]
  },
  updateInfo: function () {
    wx.navigateTo({
      url: '../updateuserinfo/updateuserinfo',
      events: {
       callback: (data) => {
         if (data.flag == true) {
           this.setData({
             flag: data.flag,
             list: [
               {
                 id: 'form',
                 name: '基础信息',
                 open: false,
                 complete: {
                   msg: '完整'
                 }
               },
               {
                 id: 'widget',
                 name: '人脸识别',
                 open: false,
                 complete: {
                   msg: '不完整'
                 }
               },
               {
                 id: 'feedback',
                 name: '实名认证',
                 open: false,
                 complete: {
                   msg: '不完整'
                 }
               },
             ]
           });
         }
       }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人信息'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('callback', {flag : this.data.flag});
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})