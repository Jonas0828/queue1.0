// pages/bookmoney/bookmoney.js
Page({

  /**
   * 页面的初始数据
   */

    /**
     * 页面的初始数据
     */
    data: {
        array: ['赣州银行广场支行', '赣州银行阳光支行', '赣州银行抚州支行', '赣州银行宜春支行', '赣州银行于都支行', '赣州银行萍乡支行', '赣州银行南昌支行'],
        index:0,
        date: "2020-02-10",
        time: '9:00'
 
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
  bindNetWorkChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        index:e.detail.value,
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  bindTimeChange:function(e){
    this.setData({
      time:e.detail.value,
      [`formData.time`]: e.detail.value
    })
  },
  submitForm(){
    wx.navigateTo({
      url: '../fillform/fillform',
    })
  }
})