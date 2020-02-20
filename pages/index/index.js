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
    services: [{
      url: '../resource/picture/index/queue.png',
      name: '排队',
      event: 'queue'
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
    userInfo: {
      name: ""
    },
    hasUserInfo: false,
    morning: 6,
    noon: 12,
    afternoon: 18,
    newday: 24,
    time: 7,
    showDialog: false,
    istrue: false
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
                // const areacode = '110108';
                console.log('获取到的地区代码：' + areacode);
                // 查询网点
                util.doServerAction({
                  trade: '2001',
                  data: {
                    RegionCode: areacode,
                  },
                  success: res => {
                    console.log('获取最近网点')
                    if ('0' == res.data.Service.response.body.TotalNum) {
                      temp.setData({
                        nearbank: {
                          name: '当前区域未查询到银行网点'
                        }
                      });
                    } else {
                      temp.setData({
                        nearbank: {
                          name: res.data.Service.response.body.Details[0].DotName
                        },
                      });
                    }
                  }
                });
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
            content: '获取地理位置信息失败，请打开手机GPS定位功能，1~2秒后点击附近网点左侧定位按钮',
            showCancel: false,
            confirmColor: '#55AAAD',
          })
        }
      })
    });
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
    // 交易类型 1-排队  2-预约
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

    let width = '120' + 'px';
    let height = '50' + 'px';
    wx.getSystemInfo({
      success: function(res) {
        width = res.windowWidth;
        height = res.windowWidth / 256 * 81;
      },
    })
    console.log("图片宽度：" + width + "；图片高度：" + height);
    this.setSwiper(width, height);
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatHour(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: 24
    });
  },
  setSwiper: function(width, height) {
    this.setData({
      swiper: {
        width: width + 'px',
        height: height + 'px',
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const temp = this;
    // this.chooselocation();
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
    // 查询用户信息
    util.doServerAction({
      trade: '1003',
      data: {
        UserID: wx.getStorageSync('userid'),
        // UserID: 'aaaaaaa',
      },
      success: res => {
        console.log(res.data.Service.response.body);
        if (res.data.Service.response.ErrCode == '00000000' && res.data.Service.response.body.IdNo == '') {
          console.log('用户信息不完整');
          wx.setStorageSync('UserinfoComplete', false);
          wx.getUserInfo({
            withCredentials: false,
            lang: "zh_CN",
            success(res) {
              console.log(res.userInfo.nickName);
              temp.setData({
                hasUserInfo:true,
                userInfo: {
                  name: res.userInfo.nickName
                }
              });
            }
          })
        } else {
          // 检测用户信息完整性
          let userInfo = res.data.Service.response.body;
          console.log(userInfo);
          if (userInfo.Name == '' || userInfo.IdNo == '' || userInfo.PhoneNo ==''){
            wx.setStorageSync('UserinfoComplete', false);
            console.log('用户信息不完整');
          }else{
            console.log('用户信息完整');
            wx.setStorageSync('UserinfoComplete', true);
          }
          temp.setData({
            hasUserInfo: true,
            userInfo: {
              name: res.data.Service.response.body.Name
            }
          });
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
      hasUserInfo: false
    })
  },
  hookfalse: function() {
    this.openDialog();
  },
  closeDialogAgree: function(e) {
    console.log(1111111);
    console.log(e.detail);
    this.setData({
      istrue: false,
    })
    this.hooktrue();
  },
  getuserinfo: function () {
    const temp = this;
    wx.getSetting({
      success(res) {   
        temp.hookfalse();
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const temp = this;
    // 查询用户信息
    util.doServerAction({
      trade: '1003',
      data: {
        UserID: wx.getStorageSync('userid'),
        // UserID: 'aaaaaaa',
      },
      success: res => {
        console.log(res.data.Service.response.body);
        if (res.data.Service.response.ErrCode == '00000000' && res.data.Service.response.body.IdNo == '') {
          wx.getUserInfo({
            withCredentials: false,
            lang: "zh_CN",
            success(res) {
              console.log(111111111);
              temp.setData({
  
                userInfo: {
                  name: res.userInfo.nickName
                }
              });
            }
          })
        } else {
          console.log(2222222222222);
          console.log(res.data.Service.response.body.Name);
          temp.setData({
            userInfo: {
              name: res.data.Service.response.body.Name
            }
          });
        }
      }
    });
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