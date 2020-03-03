const util = require('../../utils/util.js');
const date = new Date();
const year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getDate()
let currentPage = undefined
if (month < 10) {
  month = '0' + day;
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
          currentRes: temp.data.currentRes
        })
      }
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
    }],
    rsvInfo:{}
  },
  getnumber: function(e) {
    // 手机号验证
    this.phoneVerify(e, true)     
  },
  getResvInfo: function(e){
    let temp = this;
    console.log('查询预约信息');
    console.log(e.currentTarget.dataset.type);
    console.log(day)
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
        if (res.data.Service.response.RsvNum == '0'){
          // if(true){
          // 无预约信息
          wx.showModal({
            title: '提示',
            content: '如需进行填单操作，在当前页面选择交易填单后再进行排队，否继续排队',
            cancelText: '否',
            confirmText: '是',
            confirmColor: '#55AAAD',
            success: res => {
              if (res.confirm) {
                console.log('用户点击确定')
                temp.setData({
                  currentRes: true
                });
              } else if (res.cancel) {
                console.log('用户点击取消进行排队')
                currentPage.makeNumberFinal();
              }
            },
          })
        }else{
          let arr=[];
          const result = res.data.Service.response.RSPINOFS;
          for(var i=0;i<result.length; i++){
            arr[i] = JSON.parse(result[i].rsvinfo);
          }
          console.log('转换结果', arr);
          this.setData({
            rsvInfo: arr,
            reserveInfoFlag: false
          });
          // 有预约信息
          temp.viewRecords(true);
        }
      }
    });
  },
  viewRecords: (type) => {
    wx.navigateTo({
      url: '../reserverecords/reserverecords',
      events: {
        makeNumber: () => {
          if('true' == new String(type)){
            currentPage.makeNumberFinal();
          }
        }
      },
      success: res => {
        res.eventChannel.emit('reserveInfo', {
          data: currentPage.data.rsvInfo
        })
      }
    })
  },
  closeDialog: function() {
    this.setData({
      istrue: false,
      toggle: true
    })
  },
  makeNumberFinal: function () {
    console.log('日', day);
    util.doServerAction({
      trade: '4001',
      data: {
        Dotid: this.data.bankInfo.DotID,
        WorkDate: '' + year + month + day,
        IDType: '01',
        IDCode: wx.getStorageSync('userInfo').IdNo,
        BrType: '01',
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
      }
    });
  },
  opentrade: function(e) {
    console.log(e.currentTarget.dataset.index);
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
      this.phoneVerify(e, false);
    }
  },
  phoneVerify: function(e, type) {
    //检查此次使用是否进行过手机号码验证
    const flag = wx.getStorageSync("phone");
    let temp = this;
    console.log(flag)
    if (!flag) {
      wx.navigateTo({
        url: '../phone/phone',
        events: {
          success: () => {
            if (type){
              this.getResvInfo(e);
            }else{
              wx.navigateTo({
                url: this.data.gridsPerson[e.currentTarget.dataset.index].url,
                success: res => {
                  this.data.gridsPerson[e.currentTarget.dataset.index].oper(res, temp);
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
          url: this.data.gridsPerson[e.currentTarget.dataset.index].url,
          success: res => {
            this.data.gridsPerson[e.currentTarget.dataset.index].oper(res, temp);
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