// pages/bank/bank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istrue: false,
    toggle: false,
    bankInfo: {
      DotName: "",
      RegionName: "",
    },
    btnInfo: [{
      name: '对私',
    }, {
      name: '对公',
    }, {
      name: 'VIP',
    }],
    ticketInfo: {
      number: '0005',
      wait: '4',
      date: '2020-02-14',
    },
    gridsPerson: [{
      url: '../fillform/fillform',
      name: '个人开户'
    }, {
      // url: '../reserverecords/reserverecords',
      name: '大额取款',
    }],
    gridsCompany: [{
      // url: '../service0/service0',
      name: '对公开户'
    }, {
      // url: '../service0/service0',
      name: '转账业务'
    }]
  },
  getnumber: function() {
    this.setData({
      istrue: true,
      ticketInfo: {
        number: '0005',
        wait: '4',
        date: '2020-02-14',
        bankInfo: this.data.bankInfo
      }
    })
  },
  closeDialog: function() {
    this.setData({
      istrue: false,
      toggle: true
    })
  },
  opentrade: function(e) {
    console.log(e.currentTarget.dataset.index);
    // 检查个人基本信息是否完善
    const flag = wx.getStorageSync("UserinfoComplete");
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
                  currentPage.phoneVerify(e);
                }
              }
            },
          })
        },
      })
    } else {
      this.phoneVerify(e);
    }
  },
  phoneVerify: function(e) {
    //检查此次使用是否进行过手机号码验证
    const flag = wx.getStorageSync("phone");
    console.log(flag)
    if (!flag) {
      wx.navigateTo({
        url: '../phone/phone',
        events: {
          success: () => {         
              wx.navigateTo({
                url: this.data.gridsPerson[e.currentTarget.dataset.index].url,
                success: res => {
                  res.eventChannel.emit('bankInfo', {
                    data: this.data.bankInfo
                  })
                }
              })
          },
        }
      })
    } else {
      wx.navigateTo({
        url: this.data.gridsPerson[e.currentTarget.dataset.index].url,
        success: res => {
          res.eventChannel.emit('bankInfo', {
            data: this.data.bankInfo
          })
        }
      })
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