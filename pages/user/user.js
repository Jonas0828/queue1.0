var auth = require('../../utils/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stretch:false,
    bottommenu:{
      start:'',
      end:''
    },
    menu:[{
      url: '../resource/picture/user/0.png',
      title:'用户信息',
      event:'jumptoinfotype'
    },
    {
      url: '../resource/picture/user/1.png',
      title: '预约记录',
      event: 'jumptoresords'
    },
    {
      url: '../resource/picture/user/2.png',
      title: '收支明细',
      event: ''
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let success = function () {
      wx.getUserInfo({
        withCredentials: false,
        lang: "zh_CN",
        success(res) {
          console.log(res.userInfo);
        }
      })
    };
    let fail = function(){

    }
    auth.getUserInfoAuth(success, fail);
    
  },
  jumptoinfotype: function () {
    wx.navigateTo({
      url: '../infotype/infotype',
    })
  },
  jumptoresords: function() {
    wx.navigateTo({
      url: '../reserverecords/reserverecords',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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