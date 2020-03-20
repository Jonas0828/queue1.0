// pages/updateuserinfo/updateuserinfo.js
let eventChannel = undefined;
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    detailType: [
      {
        name: '开卡预约',
        id: '0'
      },
      {
        name: '开存折预约',
        id: '1'
      },
      {
        name: '开存单预约',
        id: '2'
      },
    ],
    sexFlag: '',
    cardType: '',
    date: "",
    userinfo: {},
    cardflag: true,
    card: false,
    zhe: false,
    dan: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '预约信息展示'
    });
    let temp = this;
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('recordsInfo', function (data) {
      console.log('预约记录信息', data);
      let formInfo = JSON.parse(data.data.formField[0].formInfo);
      const userinfo = formInfo.userInfo;
      let arr = userinfo.BirthDay.split('');
      let result = '';
      let resultRes ='';
      for (var i = 0; i < arr.length; i++) {
        result = result + (i == 4 || i == 6 ? '-' : '') + arr[i];
      };
      let arrRsv = userinfo.reserveDate.split('');
      for (var j = 0; j < arrRsv.length; j++) {
        resultRes = resultRes + (j == 4 || j == 6 ? '-' : '') + arrRsv[j];
      };
      if (formInfo.cardType.id == '0'){
        temp.setData({
          card: true
        });
      } else if (formInfo.cardType.id == '1'){
        temp.setData({
          zhe: true
        });
      } else if (formInfo.cardType.id == '2'){
        temp.setData({
          dan: true
        });
      }
      temp.setData({
        userinfo: userinfo,
        cardflag: true,
        date: result,
        sexFlag: userinfo.Sex == '0' ? true : false,
        reserveDate: resultRes
      });
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

  },
  // 提交信息
  submitForm(e) {
    wx.navigateBack({
      
    })
  }
})