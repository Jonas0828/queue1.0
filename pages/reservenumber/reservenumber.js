// pages/reservenumber/reservenumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserve: {
      number: '0003',
      name: '大额取现',
      date: '2020-02-02',
      time: '09:00',
      bankname: '太原高科技支行营业室',
      address: '山西省太原市学府园区V-3区',
    },
  flag:false
  },
  clickbtn: function () {
    wx.navigateBack({
      delta: this.data.flag ?1:3,
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
    wx.setNavigationBarTitle({
      title: '预约',
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