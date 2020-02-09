var auth = require('../../utils/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nearbank: {
      name: "太原高科技支行营业室",
      address: "山西省太原市学府园区V-3区",
      distance: "500m",
      longitude: 116.3972282409668,
      latitude: 39.90960456049752
    },
    stretch:false,
    bottommenu:{
      start:'',
      end:''
    },
    cardinfo:{
      cardno:"6212260504****2588",
      openbank:"太原低科技总行营业室"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let nearbank = wx.getStorageSync("nearbank");
    // this.setData({
    //   nearbank: nearbank
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#55AAAD"
    });
    auth.getUserInfoAuth(function(){
      wx.getUserInfo({
        withCredentials: false,
        lang: "zh_CN",
        success(res){
          console.log(res.userInfo);
        }
      })
    });
    
  },
  jumptoinfotype: function () {
    wx.navigateTo({
      url: '../infotype/infotype',
    })
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