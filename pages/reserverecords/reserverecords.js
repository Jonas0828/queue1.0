// pages/reserverecords/reserverecords.js
let eventChannel = undefined;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    mapping:{
      '0100': '../displayfillform/displayfillform',
      '0101': '../displaydeposit/displaydeposit'
    }
  },
  jumptodisplay: function(e){
    let trxType = this.data.list[e.currentTarget.dataset.index].TrxType;
    wx.navigateTo({
      url: this.data.mapping[trxType],
      success: res => {
        res.eventChannel.emit('recordsInfo', {
          data: this.data.list[e.currentTarget.dataset.index]
        });
      }
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '预约记录'
    });
    let temp = this;
    eventChannel = this.getOpenerEventChannel();
    eventChannel.on('reserveInfo', function (data) {
      console.log('获取到的预约记录', data);
      temp.setData({
        list: data.data
      });
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
    eventChannel.emit('makeNumber', {});
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