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
      }
    },
    moveview: {
      x:0 
    },
    menucolorleft: "#55AAAD",
    menucolorcenter: "black"
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
    const temp = this;
    map.getUserLocation(function(){
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          temp.setData({
            centerpoint: {
              longitude: longitude,
              latitude: latitude
            }
          }); 
        },
      }) 
    });
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
          menucolorleft: "#55AAAD",
          menucolorcenter: "black"
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
          menucolorcenter: "#55AAAD",
          menucolorleft: "black"
        });
      }
    }).exec();
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