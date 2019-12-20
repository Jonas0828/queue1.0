// pages/main/main.js
var map = require('../../utils/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map:{
      centerpoint: {
        longitude: 116.3972282409668,
        latitude: 39.90960456049752
      },
      scale: 16
    },
    moveview: {
      x:0 
    },
    menu: {
      menucolorleft: "#55AAAD",
      menucolorcenter: "black"
    },
    nearbank:{
      name:"太原高科技支行营业室",
      address:"山西省太原市学府园区V-3区",
      distance:"500m",
      longitude: 116.3972282409668,
      latitude: 39.90960456049752
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("初始化-----------");
    this.chooselocation();
  },
  openbank: function(){
    wx.openLocation({
      latitude: this.data.nearbank.latitude,
      longitude: this.data.nearbank.longitude,
      scale: this.data.map.scale,
      name: this.data.nearbank.name,
      address: this.data.nearbank.address,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  tableft: function(e){
    const temp = this;
    let query = this.createSelectorQuery();
    query.select(".menucenter").fields({
      computedStyle: ["color"]
    }, function(res){
      if (0 != e.currentTarget.dataset.x) {
        temp.setData({
          moveview: {
            x: 0
          },
          menu: {
            menucolorleft: "#55AAAD",
            menucolorcenter: "black"
          }
        });
      }
    }).exec();
  },
  tabcenter: function (e) {
    const temp = this;
    let query = this.createSelectorQuery();
    query.select(".menucenter").fields({
      rect: true,
      computedStyle: ["color"]
    }, function (res) {
      if (0 == e.currentTarget.dataset.x) {
        temp.setData({
          moveview: {
            x: res.left
          },
          menu:{
            menucolorcenter: "#55AAAD",
            menucolorleft: "black"
          }
        });
      }
    }).exec();
  },
  chooselocation: function(e){
    const temp = this;
    map.getUserLocationAuth(function () {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          let mapContext = wx.createMapContext("map", this);
          console.log("定位到当前位置-------------");
          mapContext.moveToLocation({
                longitude: longitude,
                latitude: latitude
          });
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: '获取地理位置信息失败，请打开手机GPS定位功能',
            showCancel: false,
            confirmColor: '#55AAAD',
          })
        }
      })
    });
  },
  jumptorecords: function(){
    wx.navigateTo({
      url: '../user/user',
    });
  },
  jumptonearbank: function(){
    wx.navigateTo({
      url: '../user/user',
    });
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