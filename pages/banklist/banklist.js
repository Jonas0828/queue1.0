// pages/banklist/banklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    list: [{
      bank: {
        name: "太原高科技支行营业室",
        address: "山西省太原市学府园区V-3区",
        distance: "500m",
        longitude: 116.3972282409668,
        latitude: 39.90960456049752
      },
    },{
        bank: {
          name: "太原高科技支行营业室",
          address: "山西省太原市学府园区V-3区",
          distance: "500m",
          longitude: 116.3972282409668,
          latitude: 39.90960456049752
        },
    },{
        bank: {
          name: "太原高科技支行营业室",
          address: "山西省太原市学府园区V-3区",
          distance: "500m",
          longitude: 116.3972282409668,
          latitude: 39.90960456049752
        },
    },{
        bank: {
          name: "太原高科技支行营业室",
          address: "山西省太原市学府园区V-3区",
          distance: "500m",
          longitude: 116.3972282409668,
          latitude: 39.90960456049752
        },
    }]
  },
  jumptobank: function () {
    wx.navigateTo({
      url: '../bank/bank',
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索'
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