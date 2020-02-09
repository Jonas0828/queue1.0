// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagelist: ['../resource/picture/main/1.jpg', '../resource/picture/main/2.jpg','../resource/picture/main/3.jpg','../resource/picture/main/5.jpg', '../resource/picture/main/6.jpg', '../resource/picture/main/7.jpg','../resource/picture/main/9.jpg'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let width = '320' + 'px';
    let height = '50' + 'px';
    wx.getSystemInfo({
      success: function(res) {
        width = res.windowWidth;
        height = res.windowWidth /16 * 9
      },
    })
    console.log("图片宽度：" + width + "；图片高度：" + height);
    this.setSwiper(width, height);
  },
  setSwiper: function (width, height) {
    this.setData({
      swiper: {
        width: width + 'px',
        height: height + 'px',
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