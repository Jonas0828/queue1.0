// pages/bigdeposit/bigdeposit.js
let eventChannel = undefined;
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserveDate: '',
    formData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人转账预约'
    });
    let temp = this;
    eventChannel = this.getOpenerEventChannel();
    eventChannel.on('recordsInfo', function (data) {
      console.log('预约记录信息', data);
      let formInfo = JSON.parse(data.data.formField[0].formInfo);
      let arrRsv = formInfo.revInfo.reserveDate.split('');
      let resultRes = '';
      for (var j = 0; j < arrRsv.length; j++) {
        resultRes = resultRes + (j == 4 || j == 6 ? '-' : '') + arrRsv[j];
      };
      let revInfo = {
        reserveDate: resultRes,
        Money: formInfo.revInfo.Money,
        Account: formInfo.revInfo.Account,
        Name: formInfo.revInfo.Name,
      };
      // 获取传递过来的数据
      temp.setData({
        revInfo: revInfo
      });
    });
  },
  submitForm(e) {
    wx.navigateBack({

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