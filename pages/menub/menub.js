// pages/menub/menub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menulist: [
      {
        name: '对公转账'
      }
    ],
    gridsCompany: [{
      url: '../outmoney/outmoney',
      name: '转账业务',
      oper: (res, temp) => {
        res.eventChannel.emit('bankInfo', {
          data: temp.data.bankInfo,
          name: '转账业务',
          back: true
        })
      }
    }],
  },
  jumptooper: function (e) {
    let temp = this;
    wx.navigateTo({
      url: this.data.gridsPerson[e.currentTarget.dataset.index].url,
      success: res => {
        this.data.gridsPerson[e.currentTarget.dataset.index].oper(res, temp);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let temp = this;
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('bankInfo', function (data) {
      console.log('menub获取到的全部信息');
      console.log(data);
      // 获取传递过来的数据
      temp.setData({
        bankInfo: data.data,
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

  }
})