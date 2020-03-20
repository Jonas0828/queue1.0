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
      title: '个人大额取款预约'
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
          appHdr: {
            tradeCode: 'EFS_YY_0004'
          },
          appBody: {
            custNo: wx.getStorageSync('userid'),
            branchNo: this.data.bankInfo.DotID,
            busiDate: revInfo.reserveDate,
            busiTime: '210000',
            idType: '01',
            idNo: userinfo.IdNo,
            busiNo: '02',
            acctNo: '0000000000000000000',
            busiType: '',
            formNo: this.data.bankInfo.DotID,
            formInfo: JSON.stringify({
              revInfo: revInfo,
              bankInfo: this.data.bankInfo,
              reserveDate: tempDate,
              tradeName: this.data.tradeName,
              TrxType: '0101',
            }),
          },
          success: res => {
            if ('25910000000000' == res.data.resp.appHdr.respCde) {
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
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.resp.appHdr.respMsg,
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