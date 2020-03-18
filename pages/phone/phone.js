// pages/phone/phone.js
let eventChannel = undefined;
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    code: '',
    PhoneNo: '',
    isVerify: false
  },
  getnumber: function () {
    this.setData({
      code: '888888',
      isVerify: true
    });
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  clickbtn: function () {
    if(this.data.isVerify){
      wx.setStorageSync('phone', true);
      wx.navigateBack({
        success: (res) => {
          eventChannel.emit('success', {});
        }
      })
    }else{
      this.setData({
        error: '请获取验证码'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    eventChannel = this.getOpenerEventChannel();
    wx.setNavigationBarTitle({
      title: '身份验证',
    })
    util.doServerAction({
      appHdr: {
        tradeCode: 'EFS_US_0003'
      },
      appBody: {
        UserID: wx.getStorageSync('userid'),
      },
      success: res => {
        const userinfo = res.data.Service.response.body;
        console.log(userinfo);
        this.setData({
          PhoneNo: userinfo.PhoneNo
        });
      }
    });
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