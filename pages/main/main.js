// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      centerpoint:{
        longitude:112.5633343366814,
        latitude:37.801786607080054
      }
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
    wx.getSetting({
      success(res){
        
      },
      fail(res){

      },
      complete(res) {

      }
    })  
    // wx.authorize({
    //   scope: 'scope.userLocation',
    //   success(){

    //   },
    //   fail(){

    //   },
    //   complete(){

    //   }
    // })
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