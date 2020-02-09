// pages/updateuserinfo/updateuserinfo.js
let eventChannel = undefined;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,

    radioItems: [
      { name: '男', value: '0' },
      { name: '女', value: '1' }
    ],  
    date: "1994-12-14",
   

    isAgree: false,
    formData: {
    },
    rules: [{
      name: 'radio',
      rules: { required: true, message: '性别是必选项' },
    }, {
      name: 'mobile',
      rules: [{ required: false, message: 'mobile必填' }, { mobile: false, message: 'mobile格式不对' }],
    }, {
      name: 'vcode',
      rules: { required: false, message: '验证码必填' },
    }, {
      name: 'idcard',
      rules: { required: false, message: 'idcard必填' },
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    eventChannel = this.getOpenerEventChannel();
    wx.setNavigationBarTitle({
      title: '基础信息补录'
    })
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

  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      [`formData.radio`]: e.detail.value
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        wx.navigateBack({
          success: (res) => {
            eventChannel.emit('callback', { flag: true });
          }
        })
      }
    })
  },
})