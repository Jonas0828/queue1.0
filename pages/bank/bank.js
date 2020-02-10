// pages/bank/bank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bank: {
      name: "太原高科技支行营业室",
      address: "山西省太原市学府园区V-3区",
      distance: "500m",
      phone: "0356-88888888",
      longitude: 116.3972282409668,
      latitude: 39.90960456049752
    },
    grids: [{
      url: '',
      name: '预约'
    },{
        url: '../reserverecords/reserverecords',
      name: '排队',
    },{
      url: '',
      name: '查询',
    }]
  },
  opentrade: function (e) {
    // 检查个人基本信息是否完善
    const flag = wx.getStorageInfoSync("complete");
    let currentPage = this;
    if (true) {
      wx.showModal({
        title: '提示',
        content: '您的个人信息不完整，请前往补录信息',
        showCancel: false,
        confirmColor: '#55AAAD',
        confirmText: '前往',
        success: () => {
          wx.navigateTo({
            url: '../infotype/infotype',
            events: {
              callback: function (data) {
                console.log(data.flag);
                if (data.flag == true) {
                  currentPage.phoneverify(e);
                }
              }
            },
          })
        },
      })
    } else {
      this.phoneverify(e);
    }
  },
  phoneverify: function (e) {
    //检查此次使用是否进行过手机号码验证
    const flag = wx.getStorageInfoSync("phone");
    if(!false){
      wx.navigateTo({
        url: '../phone/phone',
        events: {
          success: () => {
            wx.navigateTo({
              url: this.data.grids[e.currentTarget.dataset.index].url,
            })
          },
        }
      })
    }else{

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