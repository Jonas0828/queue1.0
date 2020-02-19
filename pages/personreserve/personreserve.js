// pages/personreserve/personreserve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnInfo:[{
      name: '开卡预约',
      url: '../fillform/fillform',
      id: 0
    },{
      name: '开存折预约',
      url: '../fillform/fillform',
      id: 1,
    },{
      name: '开存单预约',
      url: '../fillform/fillform',
      id: 2
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择开户类型',
    })
    let temp = this;
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('bankinfo', function (data) {
      console.log('卡折选择界面获取到的全部信息');
      console.log(data);
      // 获取传递过来的数据
      temp.setData({
        bankInfo: data.data
      });
    })
  },
  jumptofillform: function (e) {
    console.log(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../fillform/fillform',
      success: res => {
        res.eventChannel.emit('totalInfo', {
          data: {
            bankInfo: this.data.bankInfo,
            selectType: this.data.btnInfo[e.currentTarget.dataset.index]
          }
        })
      }
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