// pages/bank/bank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toggle: false,
    bankInfo: {
      DotName: "",
      RegionName: "",
    },
    gridsPerson: [{
      url: '../service0/service0',
      name: '个人开户'
    }, {
      url: '../reserverecords/reserverecords',
      name: '大额取款',
    }],
    gridsCompany: [{
      url: '../service0/service0',
      name: '对公开户'
    }, {
      url: '../service0/service0',
      name: '对公开户'
    }, {
      url: '../service0/service0',
      name: '对公开户'
    }, {
      url: '../service0/service0',
      name: '对公开户'
    }, {
      url: '../service0/service0',
      name: '对公开户'
    }]
  },
  getnumber: function () {
    this.setData({
      toggle: true
    });
  },
  opentrade: function(e) {
    // 检查个人基本信息是否完善
    const flag = wx.getStorageSync("complete");
    let currentPage = this;
    if (!flag) {
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
              callback: function(data) {
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
  phoneverify: function(e) {
    //检查此次使用是否进行过手机号码验证
    const flag = wx.getStorageSync("phone");
    console.log(flag)
    if (!flag) {
      wx.navigateTo({
        url: '../phone/phone',
        events: {
          success: () => {
            if (1 == e.currentTarget.dataset.index) {
              wx.showModal({
                title: '提示',
                content: '是否预约过',
                showCancel: true,
                confirmColor: '#55AAAD',
                cancelText: '否',
                confirmText: '是',
                success: (res) => {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../queuenumber/queuenumber',
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '是否进行填单',
                      showCancel: true,
                      confirmColor: '#55AAAD',
                      cancelText: '否',
                      confirmText: '是',
                      success: (res) => {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '../fillform/fillform',
                          })
                        } else if (res.cancel) {
                          wx.navigateTo({
                            url: '../queuenumber/queuenumber',
                          })
                        }

                      },
                    })
                  }

                },
              })
            } else {
              wx.navigateTo({
                url: this.data.grids[e.currentTarget.dataset.index].url,
              })
            }

          },
        }
      })
    } else {
      if (1 == e.currentTarget.dataset.index) {
        wx.showModal({
          title: '提示',
          content: '是否预约过',
          showCancel: true,
          confirmColor: '#55AAAD',
          cancelText: '否',
          confirmText: '是',
          success: (res) => {
            if (res.confirm) {
              wx.navigateTo({
                url: '../queuenumber/queuenumber',
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '是否进行填单',
                showCancel: true,
                confirmColor: '#55AAAD',
                confirmText: '前往',
                success: (res) => {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../fillform/fillform',
                    })
                  } else if (res.cancel) {
                    wx.navigateTo({
                      url: '../queuenumber/queuenumber',
                    })
                  }

                },
              })
            }

          },
        })
      } else {
        wx.navigateTo({
          url: this.data.grids[e.currentTarget.dataset.index].url,
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('网点信息');
    console.log(options);
    let temp = this;
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('bankinfo', function(data) {
      // 获取传递过来的数据
      temp.setData({
        bankInfo: data.data
      });
    })
    // 交易类型 1-排队 2-预约
    this.setData({
      tradeType: options.tradeType
    });
    wx.setNavigationBarTitle({
      title: '网点信息'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})