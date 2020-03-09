// pages/reservenumber/reservenumber.js
const util = require('../../utils/util.js');
let eventChannel = undefined;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: false,
    reserve: {
      number: '',
      name: '',
      bankname: '',
      time: '',
    },
    back: false,
    flag: false
  },
  finish: function () {
    wx.navigateBack({
      delta: this.data.flag?1:2,
    })
  },
  queue: function() {
    wx.setStorageSync('back', this.data.back);
    wx.navigateBack({
      delta: 3,
      success:(res) => {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    eventChannel = this.getOpenerEventChannel()
    const currentPage = this;
    eventChannel.on('reserveinfo', function (data) {
      currentPage.setData({
        reserve: data,
        display: true,
        flag:true
      });
    }) 
    eventChannel.on('bankInfo', function (data) {
      console.log(data);
      currentPage.setData({
        reserve: {
          time: data.userInfo.reserveDate,
          name: data.userInfo.cardType.name,
          bankname: data.bankInfo.DotName,
        },
        back: data.back,
        display: !data.back
      });
    })
    eventChannel.on('depositInfo', function (data) {
      console.log(data);
      currentPage.setData({
        reserve: {
          time: data.revInfo.reserveDate,
          name: data.revInfo.tradeName,
          bankname: data.bankInfo.DotName,
        },
        back: data.back,
        display: !data.back
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