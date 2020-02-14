// pages/reserverecords/reserverecords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      number: '0001',
      name: '个人开卡',
      date: '2020-02-02',
      time: '09:00',
      bankname: '太原高科技支行营业室',
      address: '山西省太原市学府园区V-3区',
    }, {
        number: '0002',
        name: '存款',
        date: '2020-02-02',
        time: '15:00',
        bankname: '太原高科技总行营业室',
        address: '山西省太原市学府园区A-3区',
      }]
  },
  jumptoreservenumber: function (e) {
    wx.navigateTo({
      url: '../reservenumber/reservenumber',
      success: (res) => {
        res.eventChannel.emit('reserveinfo', this.data.list[e.currentTarget.dataset.index])
      }
    })
  },
  jumptoqueuenumber: function () {
    wx.navigateTo({
      url: '../queuenumber/queuenumber',
    })
  },
  jumptoinfo: function () {
    wx.navigateTo({
      url: '../service0/service0',
    })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '预约记录'
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