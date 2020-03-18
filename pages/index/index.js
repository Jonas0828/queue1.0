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
    imagelist: [
      '../resource/picture/index/2.jpg',
      '../resource/picture/index/3.jpg',
      '../resource/picture/index/4.jpg'
    ],
    iconlist1: [{
      icons: {
        url: '../resource/picture/index/额度.png',
        name: '额度信息'
      }
    }, {
      icons: {
        url: '../resource/picture/index/查询.png',
        name: '查询账务'
      }
    }, {
      icons: {
        url: '../resource/picture/index/账单分期.png',
        name: '账单分期'
      }
    }, {
      icons: {
        url: '../resource/picture/index/积分.png',
        name: '积分商城'
      }
    }],
    iconlist2: [{
      icons: {
        url: '../resource/picture/index/攻略.png',
        name: '用卡攻略'
      }
    }, {
      icons: {
        url: '../resource/picture/index/卡片管理.png',
        name: '卡片管理'
      }
    }, {
      icons: {
        url: '../resource/picture/index/热点.png',
        name: '热点'
      }
    }, {
      icons: {
        url: '../resource/picture/index/保险.png',
        name: '保险'
      }
    }],
    "items": [{
        "id": "1",
        "imageUrl": "../resource/picture/index/2.jpg",
        "content": "金瑞香",
        "comment": "挣他一个亿"
      },
      {
        "id": "2",
        "imageUrl": "../resource/picture/index/3.jpg",
        "content": "快易贷",
        "comment": "预借现金，提前消费"
      }
    ],
    nearbank: {
      name: '当前区域未查询到银行网点'
    },
    morning: 6,
    noon: 12,
    afternoon: 18,
    newday: 24,
    time: 7,
    showDialog: false,
    istrue: false
  },
  jumptobanklist: function() {
    wx.navigateTo({
      url: '../banklist/banklist?openType=1',
      events: {
        bankinfo: data => {
          console.log(data);
          this.setData({
            nearbank: {
              name: data.data.DotName
            }
          });
        }
      }
    })
  },
  reserve: function () {
    wx.navigateTo({
      url: '../banklist/banklist?openType=2',
    })
  },
  queue: function () {
    wx.navigateTo({
      url: '../banklist/banklist?openType=2',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1C6CEF'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const temp = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          temp.hooktrue();
        } else {
          temp.hookfalse();
        }
      }
    });
  },
  hooktrue: function() {
    const temp = this;
    console.log('查询用户信息');
    util.doServerAction({
      appHdr: {
        tradeCode: 'EFS_US_0003'
      },
      appBody: {
        UserID: wx.getStorageSync('userid'),
      },
      success: res => {
        console.log(res.data.Service.response.body);
        if (res.data.Service.response.ErrCode == '00000000' && res.data.Service.response.body.IdNo == '') {
          console.log('用户信息不完整');
          wx.setStorageSync('UserinfoComplete', false);
        } else {
          // 检测用户信息完整性
          let userInfo = res.data.Service.response.body;
          console.log('缓存用户信息',userInfo);
          if (userInfo.Name == '' || userInfo.IdNo == '' || userInfo.PhoneNo ==''){
            wx.setStorageSync('UserinfoComplete', false);
            console.log('用户信息不完整');
          }else{
            console.log('用户信息完整');
            wx.setStorageSync('UserinfoComplete', true);
            wx.setStorageSync('userInfo', userInfo);
          }
        }
      }
    });
  },
  openDialog: function () {
    this.setData({
      istrue: true
    })
  },
  closeDialogDisagree: function () {
    this.setData({
      istrue: false,
    })
  },
  hookfalse: function() {
    this.openDialog();
  },
  closeDialogAgree: function(e) {
    this.setData({
      istrue: false,
    })
    this.hooktrue();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
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
  logout: function(e) {

  },
  opentrade: function(e) {
    wx.navigateTo({
      url: this.data.services[e.currentTarget.dataset.index].url,
    })

  }
})