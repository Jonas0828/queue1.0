// pages/updateuserinfo/updateuserinfo.js
let eventChannel = undefined;
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    detailType:[
      {
        name: '开卡预约',
        id: '0'
      },
      {
        name: '开存折预约',
        id: '1'
      },
      {
        name: '开存单预约',
        id: '2'
      },
    ],
    currentRes: false,
    sexFlag: '',
    cardType: '',
    date: "",
    userinfo: {},
    cardflag: true,
    formData: {},
    back: false,
    rules: [{
      name: 'Name',
      rules: {
        required: true,
        message: '姓名必填'
      },
    }, {
        name: 'IdNo',
      rules: {
        required: true,
        message: '身份证号必填'
      },
    }, {
        name: 'PhoneNo',
      rules: [{
        required: true,
        message: '手机号码必填'
      }, {
        mobile: true,
        message: '手机号码格式不对'
      }],
    }, {
      name: 'Address',
      rules: {
        required: true,
        message: '居住地址必填'
      },
    }, {
      name: 'reserveDate',
      rules: {
        required: true,
        message: '预约日期必填'
      },
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
        title: '个人开户预约'
    });
    let date = new Date();
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
    let temp = this;
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('bankInfo', function (data) {
      console.log('填单界面获取到的全部信息');
      console.log(data);
      // 获取传递过来的数据
      temp.setData({
        bankInfo: data.data,
        currentRes: data.currentRes,
        reserveDate: data.currentRes ? nowDate : '',
        tradeName: data.name,
        back: data.back
      });
    });
    util.doServerAction({
      appHdr: {
        tradeCode: 'EFS_US_0003'
      },
      appBody: {
        UserID: wx.getStorageSync('userid'),
      },
      success: res => {
        console.log(res.data.Service.response);
        const userinfo = res.data.Service.response.body;
        let arr = userinfo.BirthDay.split('');
        let result = '';
        for (var i = 0; i < arr.length; i++) {
          result = result + (i == 4 || i == 6 ? '-' : '') + arr[i];
        };
        this.setData({
          userinfo: userinfo,
          cardflag: true,
          date: result,
          sexFlag: userinfo.Sex == '0' ? true:false,
          Sex: userinfo.Sex,
          [`formData.Name`]: userinfo.Name,
          [`formData.IdNo`]: userinfo.IdNo,
          [`formData.PhoneNo`]: userinfo.PhoneNo,
          [`formData.Address`]: userinfo.Address,
          [`formData.reserveDate`]: this.data.currentRes ?  nowDate: ''
        });
      }
    });
    this.setData({
      nowDate: nowDate,
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

  },
  radioChange: function(e) {
    this.setData({
      Sex: e.detail.value
    });
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  bindResDateChange: function (e) {
    this.setData({
      reserveDate: e.detail.value,
      [`formData.reserveDate`]: e.detail.value
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  selectCardType: function (e) {
    console.log('类型：',e.detail);
    this.setData({
      cardType: this.data.detailType[e.detail.value]
    });
  },
  // 提交信息
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
        if ('' == this.data.cardType){
          this.setData({
            error:'请选择开户类型'
          });
          return;
        }
        if ('' == this.data.Sex) {
          this.setData({
            error: '请选择性别'
          });
          return;
        }
        let userinfo = e.detail.value;
        userinfo.UserID = wx.getStorageSync('userid');
        userinfo.Sex = this.data.Sex;
        userinfo.cardType = this.data.cardType;
        userinfo.Realauth = '0',
        userinfo.FcrcgtFlag = '0',
        userinfo.BirthDay = userinfo.BirthDay.replace('-', '').replace('-', '');
        let tempDate = userinfo.reserveDate;
        userinfo.reserveDate = userinfo.reserveDate.replace('-', '').replace('-', ''),
        console.log('提交预约信息');
        console.log(userinfo);
        util.doServerAction({
          appHdr: {
            tradeCode: 'EFS_YY_0004'
          },
          appBody: {
            custNo: wx.getStorageSync('userid'),
            branchNo: this.data.bankInfo.DotID,
            busiDate: userinfo.reserveDate,
            busiTime: '210000',
            idType: '01',
            idNo: userinfo.IdNo,
            busiNo: '01',
            acctNo: '0000000000000000000',
            busiType: '',
            formNo: this.data.bankInfo.DotID,
            formInfo: JSON.stringify({
              userInfo: userinfo,
              bankInfo: this.data.bankInfo,
              cardType: this.data.cardType,
              tradeName: this.data.tradeName,
              reserveDate: tempDate,
              TrxType: '0100',
            }),
          },
          success: res => {
            console.log('预约0004信息', res);
            if ('25910000000000' == res.data.resp.appHdr.respCde){
              userinfo.reserveDate = tempDate;
              wx.navigateTo({
                url: '../reservenumber/reservenumber',
                success: resinner => {
                  resinner.eventChannel.emit('bankInfo', {
                    bankInfo: this.data.bankInfo,
                    userInfo: userinfo,
                    back: this.data.back
                  })
                }
              })
            } else{
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
})