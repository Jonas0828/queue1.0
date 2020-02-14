const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const qqutil = new QQMapWX({
  key: 'BXTBZ-SGWC6-27ASE-MGXND-PQMIE-WVFH2'
});
const auth = require('../../utils/auth.js');
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    btnaddress: '定位',
    codeIndex: [],
    selectList: [
      [{
        name: '北京市',
        code: '00',
      }, {
        name: '山西省',
        code: '01',
      }, {
        name: '湖北省',
        code: '02',
      }, {
        name: '河南省',
        code: '03',
      }],
      [{
        name: '晋城市',
        code: '00',
      }, {
        name: '太原市',
        code: '01',
      }, {
        name: '高平市',
        code: '02',
      }, {
        name: '晋中市',
        code: '03',
      }],
      [{
        name: '阳城县',
        code: '00',
      }, {
        name: '泽州县',
        code: '01',
      }, {
        name: '东城区',
        code: '02',
      }, {
        name: '南城区',
        code: '03',
      }]
    ],
    list: []
  },
  savecode: function (e) {
    const address = this.data.selectList[0][e.detail.value[0]].name + this.data.selectList[1][e.detail.value[1]].name + this.data.selectList[2][e.detail.value[2]].name;
    this.setData({
      codeIndex: e.detail.value,
      inputVal: address,
      inputShowed: true
    });
  },
  quereyBank: function() {
    util.doServerAction({
      trade: '2001',
      data: {
        RegionCode: '',
      },
      success: res => {
        console.log('全部网点');
        console.log(res.data.Service.response.body.Details);
        this.setData({
          list: res.data.Service.response.body.Details
        });
      }
    });
  },
  chooselocation: function(e) {
    const temp = this;
    auth.getUserLocationAuth(function() {
      wx.getLocation({
        type: 'gcj02',
        success: function(res) {
          // 获取地区代码
          qqutil.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: (res, data) => {
              if (res.status === 0) {
                console.log('查询地区代码成功');
                console.log(data);
                const areacode = data.reverseGeocoderSimplify.adcode;
                temp.setData({
                  inputVal: data.reverseGeocoderSimplify.address,
                  inputShowed: true
                });
                console.log('获取到的地区代码：' + areacode);
              } else {
                console.log('查询地区代码异常，错误码：' + res.status + '；错误信息：' + res.message);
              }
            },
            fail: res => {
              console.log('查询地区代码失败');
              console.log(res);
            },
            complete: res => {
              console.log('查询地区代码完成');
              console.log(res);
            }
          });
        },
        fail: function(res) {
          wx.showModal({
            title: '提示',
            content: '获取地理位置信息失败，请打开手机GPS定位功能，重新点击输入域即可',
            showCancel: false,
            confirmColor: '#55AAAD',
          })
        }
      })
    });
  },
  jumptobank: function() {
    wx.navigateTo({
      url: '../bank/bank',
    })
  },
  showInput: function() {
    this.chooselocation();
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  // 给查询输入域赋值
  setInputValue: function(e) {
    this.setData({
      inputVal: '阳城县',
      inputShowed: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '选择网点'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.quereyBank();
    this.chooselocation();
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