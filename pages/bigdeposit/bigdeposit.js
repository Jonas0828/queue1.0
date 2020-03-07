// pages/bigdeposit/bigdeposit.js
let eventChannel = undefined;
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserveDate: '',
    formData: {},
    back: false,
    rules: [{
        name: 'reserveDate',
        rules: {
          required: true,
          message: '预约日期必填'
        },
      },
      {
        name: 'Money',
        rules: {
          required: true,
          message: '取现金额必填'
        },
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '个人大额取现预约'
    });
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date = new Date(date);
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    };
    let nowDate = year + '-' + month + '-' + day;
    this.setData({
      nowDate: nowDate
    });
    let temp = this;
    eventChannel = this.getOpenerEventChannel();
    eventChannel.on('bankInfo', function (data) {
      console.log(data);
      // 获取传递过来的数据
      temp.setData({
        bankInfo: data.data,
        tradeName : data.name,
        back: data.back
      });
    });
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  bindResDateChange: function(e) {
    console.log(e);
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  submitForm(e) {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        console.log(firstError);
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        let revInfo = e.detail.value;
        console.log('预约信息', revInfo);
        revInfo.UserID = wx.getStorageSync('userid');
        let tempDate = revInfo.reserveDate;
        revInfo.reserveDate = revInfo.reserveDate.replace('-', '').replace('-', '');
        let userinfo = wx.getStorageSync('userInfo');
        console.log('提交预约信息');
        console.log(revInfo);
        util.doServerAction({
          trade: '3001',
          data: {
            UserID: wx.getStorageSync('userid'),
            Dotid: this.data.bankInfo.DotID,
            RsvDate: revInfo.reserveDate,
            IDType: '01',
            IDCode: userinfo.IdNo,
            BrType: '01', // 对私 01 对公02
            TrxType: '0101', // 对公对私+两位顺序
            TrxStatus: '0',
            TrxData: JSON.stringify({
              revInfo: revInfo,
              bankInfo: this.data.bankInfo,
              reserveDate: tempDate,
              tradeName: this.data.tradeName,
              TrxType: '0101',
            }),
          },
          success: res => {
            console.log('--------------预约序号');
            console.log(res.data.Service.response);
            if ('00000000' == res.data.Service.response.ErrCode) {
              revInfo.reserveDate = tempDate;
              revInfo.tradeName = this.data.tradeName;
              wx.navigateTo({
                url: '../reservenumber/reservenumber',
                success: resinner => {
                  resinner.eventChannel.emit('depositInfo', {
                    bankInfo: this.data.bankInfo,
                    revInfo:revInfo,
                    back: this.data.back
                  })
                }
              })
            } else if ('999999' == res.data.Service.response.ErrCode) {
              wx.showModal({
                title: '提示',
                content: res.data.Service.response.ErrMsg,
                showCancel: false
              })
            }
          }
        });
      }
    })
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