// pages/reservenumber/reservenumber.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserve: {
      number: '',
      name: '',
      bankname: '',
      time: '',
    },
  flag:false
  },
  clickbtn: function () {
    wx.navigateBack({
      delta: this.data.flag ?1:2,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    const currentPage = this;
    eventChannel.on('reserveinfo', function (data) {
      currentPage.setData({
        reserve:data,
        flag: true,
      });
    })
    eventChannel.on('totalInfo', function (data) {
      let totalInfo = data.totalInfo;
      currentPage.setData({
        reserve: {
          number: '888888',
          time: util.formatTime(new Date()),
          name: data.userInfo.cardType.name,
          bankname: totalInfo.bankInfo.DotName
        }
      });
    })
    wx.setNavigationBarTitle({
      title: '预约成功',
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