// pages/main/main.js
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
    iconlist1:[{
      icons:{
      url: '../resource/picture/index/可用额度.png',
      name: '额度'
      }
    },{
        icons: {
          url: '../resource/picture/index/查询.png',
          name: '查询'
        }
    },{
        icons: {
          url: '../resource/picture/index/账单分期.png',
          name: '账单分期'
        }
    },{
        icons: {
          url: '../resource/picture/index/积分.png',
          name: '积分'
        }
    } ],
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
    "items": [
      {
        "id": "1",
        "imageUrl": "../resource/picture/index/2.jpg",
        "content": "来个贷款吧，大兄弟"
      },
      {
        "id": "2",
        "imageUrl": "../resource/picture/index/3.jpg",
        "content": "快易贷"
      },
      {
        "id": "3",
        "imageUrl": "../resource/picture/index/2.jpg",
        "content": "来个贷款吧，大兄弟"
      },
      {
        "id": "4",
        "imageUrl": "../resource/picture/index/3.jpg",
        "content": "快易贷"
      }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let width = '120' + 'px';
    let height = '50' + 'px';
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth;
        height = res.windowWidth / 256*81;
      },
    })
    console.log("图片宽度：" + width + "；图片高度：" + height);
    this.setSwiper(width, height);
  },
  setSwiper: function (width, height) {
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

  }
})