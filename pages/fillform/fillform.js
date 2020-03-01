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
    sexFlag: '',
    cardType: '',
    date: "",
    userinfo: {},
    cardflag: true,
    formData: {},
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
    }),
    util.doServerAction({
      trade: '1003',
      data: {
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
        });
      }
    });
    let temp = this;
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('bankInfo', function (data) {
      console.log('填单界面获取到的全部信息');
      console.log(data);
      // 获取传递过来的数据
      temp.setData({
        bankInfo: data.data,
      });
    });
    let date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    let nowDate = year + '-' + month + '-' + day;
    console.log(nowDate);
    this.setData({
      nowDate: nowDate
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
        userinfo.BirthDay = userinfo.BirthDay.replace('-', '').replace('-', ''),
        userinfo.reserveDate = userinfo.reserveDate.replace('-', '').replace('-', ''),
        console.log('提交预约信息');
        console.log(userinfo);
        util.doServerAction({
          trade: '3001',
          data: {
            UserID: wx.getStorageSync('userid'),
            Dotid: this.data.bankInfo.DotID,
            RsvDate: userinfo.reserveDate,
            IDType: '01',
            IDCode: userinfo.IdNo,
            BrType: '0',
            TrxType: '0',
            TrxStatus: '0',
            TrxData: JSON.stringify({
              userInfo: userinfo,
              bankInfo: this.data.bankInfo,
              cardType: this.data.cardType
            }),
          },
          success: res => {
            console.log('--------------预约序号');
            console.log(res.data.Service.response);
            if ('00000000' == res.data.Service.response.ErrCode){
              wx.navigateTo({
                url: '../reservenumber/reservenumber',
                success: resinner => {
                  resinner.eventChannel.emit('bankInfo', {
                    bankInfo: this.data.bankInfo,
                    userInfo: userinfo,
                    rsvSeq: res.data.Service.response.RsvSeq
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
})