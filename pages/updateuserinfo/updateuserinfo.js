// pages/updateuserinfo/updateuserinfo.js
let eventChannel = undefined;
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    register: false,
    radioItems: [{
        name: '男',
        value: '0'
      },
      {
        name: '女',
        value: '1'
      }
    ],
    date: "",
    userinfo:{},
    cardflag: false,

    isAgree: false,
    formData: {},
    rules: [{
      name: 'name',
      rules: {
        required: true,
        message: '姓名必填'
      },
    }, {
        name: 'cardid',
      rules: {
        required: true,
        message: '身份证号必填'
      },
    }, {
      name: 'radio',
      rules: {
        required: true,
        message: '性别是必选项'
      },
    }, {
      name: 'mobile',
      rules: [{
        required: true,
        message: '手机号码必填'
      }, {
        mobile: true,
          message: '手机号码格式不对'
      }],
    }, {
      name: 'address',
      rules: {
        required: true,
        message: '居住地址必填'
      },
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    eventChannel = this.getOpenerEventChannel();
    wx.setNavigationBarTitle({
        title: '基础信息补录'
    }),
      // 查询有无该用户信息
      console.log(wx.getStorageSync('userid'));
      util.doServerAction({
        trade: '1003',
        data: {
          UserID: wx.getStorageSync('userid'),
        },
        success: res => {
          console.log(res.data.Service.response);
          if (res.data.Service.response.ErrCode == '00000000' && res.data.Service.response.body.IdNo == '') {
            console.log('用户信息注册');
            this.setData({
              registr: true
            });
          } else {
            console.log('用户信息更新');
            const userinfo = res.data.Service.response.body;
            let arr = userinfo.BirthDay.split('');
            let result = '';
            for (var i = 0; i < arr.length; i ++){
                result = result + (i == 4 || i == 6 ? '-' : '') + arr[i];
            };
            var radioItems = this.data.radioItems;
            for (var i = 0, len = radioItems.length; i < len; ++i) {
              radioItems[i].checked = radioItems[i].value == userinfo.Sex;
            }
            this.setData({
              userinfo: userinfo,
              cardflag: true,
              date: result,
              radioItems: radioItems,
              [`formData.radio`]: userinfo.Sex,
              Sex: userinfo.Sex
            });
          }
        }
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
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      [`formData.radio`]: e.detail.value,
      Sex: e.detail.value
    });
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
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
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  submitForm(e) {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (this.data.register && !valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
          let userinfo = e.detail.value;
          userinfo.UserID = wx.getStorageSync('userid');
          userinfo.Sex = this.data.Sex;
          userinfo.Realauth = '0',
          userinfo.FcrcgtFlag = '0',
          userinfo.BirthDay = userinfo.BirthDay.replace('-','').replace('-',''),
          console.log(userinfo);
          util.doServerAction({
            trade: this.data.register ? '1001' : '1002',
            data: userinfo,
            success: res => {
               wx.navigateBack({
                success: (res) => {
                  eventChannel.emit('callback', { flag: true });
                }
              })
            }
          });
       
      }
    })
  },
})