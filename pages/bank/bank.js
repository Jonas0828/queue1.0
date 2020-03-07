const util = require('../../utils/util.js');
const date = new Date();
const year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getDate()
let currentPage = undefined
if (month < 10) {
  month = '0' + month;
}

if (day < 10) {
  day = '0' + day;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    istrue: false,
    toggle: false,
    reserveInfoFlag: true,
    currentRes: false,
    isRsv: false,
    isMakeNumber: false,
    queueType: '',
    mapping: {
      '0100': '../displayfillform/displayfillform',
      '0101': '../displaydeposit/displaydeposit',
      '0201': '../displayoutmoney/displayoutmoney',
    },
    back: false,
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
      number: '',
      wait: '4',
      date: '',
    },
    gridsPerson: [{
      url: '../fillform/fillform',
      name: '个人开户',
      oper: (res, temp) => {
        res.eventChannel.emit('bankInfo', {
          data: temp.data.bankInfo,
          name: '个人开户',
          back: temp.data.back
        })
      }
    }, {
      url: '../bigdeposit/bigdeposit',
      name: '大额取款',
      oper: (res, temp) => {
        res.eventChannel.emit('bankInfo', {
          data: temp.data.bankInfo,
          name: '大额取款',
          back: temp.data.back
        })
      }
    }],
    gridsCompany: [{
      url: '../outmoney/outmoney',
      name: '转账业务',
      oper: (res, temp) => {
        res.eventChannel.emit('bankInfo', {
          data: temp.data.bankInfo,
          name: '转账业务',
          back: temp.data.back
        })
      }
    }],
    rsvInfo: {}
  },
  jumptodisplay: function (e) {
    let trxType = this.data.rsvInfo[e.currentTarget.dataset.index].TrxType;
    wx.navigateTo({
      url: this.data.mapping[trxType],
      success: res => {
        res.eventChannel.emit('recordsInfo', {
          data: this.data.rsvInfo[e.currentTarget.dataset.index]
        });
      }
    })
  },
  getnumber: function(e) {
    // 手机号验证
    this.phoneVerify(e, true)
  },
  getResvInfo: function(e) {
    let temp = this;
    console.log('查询预约信息');
    this.setData({
      queueType: e.currentTarget.dataset.type
    });
    util.doServerAction({
      trade: '3002',
      data: {
        Dotid: this.data.bankInfo.DotID,
        WorkDate: '' + year + month + day,
        BrType: e.currentTarget.dataset.type,
        UserID: wx.getStorageSync('userid'),
      },
      success: res => {
        console.log('--------------查询预约信息结果');
        console.log(res);
        console.log(res.data.Service.response);
        if (res.data.Service.response.RsvNum == '0') {
          // 无预约信息
          wx.showModal({
            title: '提示',
            content: '是否进行填单',
            cancelText: '排队',
            confirmText: '填单',
            confirmColor: '#55AAAD',
            success: res => {
              if (res.confirm) {
                console.log('填单')
                // temp.setData({
                //   currentRes: true
                // });
                wx.navigateTo({
                  url: e.currentTarget.dataset.type == '01' ? '../menua/menua' : '../menub/menub',
                 
                  success:(res) => {
                    res.eventChannel.emit('bankInfo', {
                      data: temp.data.bankInfo,
                    })
                  }
                })
              } else if (res.cancel) {
                console.log('排队')
                currentPage.makeNumberFinal();
              }
            },
          })
        } else {
          let arr = [];
          const result = res.data.Service.response.RSPINOFS;
          for (var i = 0; i < result.length; i++) {
            arr[i] = JSON.parse(result[i].rsvinfo);
          }
          console.log('转换结果', arr);
          this.setData({
            rsvInfo: arr,
            reserveInfoFlag: false,
            isRsv: true,
            isMakeNumber: true,
          });
          wx.setStorageSync('rsvInfo', {
            rsvInfo: arr,
            reserveInfoFlag: false
          });
        }
      }
    });
  },
  viewRecords: (e) => {
    currentPage.setData({
      isRsv: true,
      isMakeNumber: false
    });
  },
  closeDialog: function() {
    this.setData({
      istrue: false,
      toggle: true
    })
  },
  closeRsvDialog: function () {
    this.setData({
      isRsv: false
    })
    if (this.data.isMakeNumber) {
      currentPage.makeNumberFinal();
    }
  },
  cancleDialog: function (){
    this.setData({
      isRsv: false
    })
  },
  makeNumberFinal: function() {
    util.doServerAction({
      trade: '4001',
      data: {
        Dotid: this.data.bankInfo.DotID,
        WorkDate: '' + year + month + day,
        IDType: '01',
        IDCode: wx.getStorageSync('userInfo').IdNo,
        BrType: this.data.queueType,
        CustLvl: '01',
        TrxStatus: wx.getStorageSync('userid'),
      },
      success: res => {
        console.log('--------------排队结果');
        console.log(res.data);
        console.log(res.data.Service.response);
        this.setData({
          istrue: true,
          ticketInfo: {
            number: res.data.Service.response.QueSeq,
            wait: '4',
            date: year + '-' + month + '-' + day,
            bankInfo: this.data.bankInfo
          }
        })
        wx.setStorageSync('queue', true);
        wx.setStorageSync('queueinfo', {
          toggle: true,
          ticketInfo: {
            number: res.data.Service.response.QueSeq,
            wait: '4',
            date: year + '-' + month + '-' + day,
            bankInfo: this.data.bankInfo
          }
        });
      }
    });
  },
  opentrade: function(e) {
    // 检查个人基本信息是否完善
    const flag = wx.getStorageSync("UserinfoComplete");
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
                if (data.flag == true) {
                  currentPage.phoneVerify(e);
                }
              }
            },
          })
        },
      })
    } else {
      this.phoneVerify(e, false);
    }
  },

  phoneVerify: function(e, type) {
    //检查此次使用是否进行过手机号码验证
    const flag = wx.getStorageSync("phone");
    let temp = this;
    let grids = undefined;
    if (e.currentTarget.dataset.flag == 'true') {
      grids = this.data.gridsPerson;
    } else {
      grids = this.data.gridsCompany;
    }

    console.log(grids);
    if (!flag) {
      wx.navigateTo({
        url: '../phone/phone',
        events: {
          success: () => {
            if (type) {
              this.getResvInfo(e);
            } else {
              wx.navigateTo({
                url: grids[e.currentTarget.dataset.index].url,
                success: res => {
                  grids[e.currentTarget.dataset.index].oper(res, temp);
                }
              })
            }
          },
        }
      })
    } else {
      if (type) {
        this.getResvInfo(e);
      } else {
        wx.navigateTo({
          url: grids[e.currentTarget.dataset.index].url,
          success: res => {
            grids[e.currentTarget.dataset.index].oper(res, temp);
          }
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
    currentPage = this;
    eventChannel.on('bankinfo', function(data) {
      // 获取传递过来的数据
      temp.setData({
        bankInfo: data.data
      });
    })
    wx.setNavigationBarTitle({
      title: '网点信息'
    });
    if (wx.getStorageSync('queue')) {
      // 检测网点和日期和今天是否一致
      let queueinfo = wx.getStorageSync('queueinfo');
      let nowDate = year + '-' + month + '-' + day;
      let dotID = queueinfo.ticketInfo.bankInfo.DotID;
      console.log('网点load', nowDate + dotID);
      console.log(queueinfo.ticketInfo.date + temp.data.bankInfo.DotID);
      if (queueinfo.ticketInfo.date == nowDate && dotID == this.data.bankInfo.DotID) {
        this.setData(queueinfo);

        this.setData(wx.getStorageSync('rsvInfo'));

      }
    }
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
    if (wx.getStorageSync('back')) {
      currentPage.makeNumberFinal();
    } 
    wx.removeStorageSync('back')
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