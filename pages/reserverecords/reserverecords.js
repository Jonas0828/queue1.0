// pages/reserverecords/reserverecords.js
let eventChannel = undefined;
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    mapping:{
      '0100': '../displayfillform/displayfillform',
      '0101': '../displaydeposit/displaydeposit',
      '0200': '../displayoutmoney/displayoutmoney',
      '0102': '../displaypersonout/displaypersonout'
    },
    selectA:false,
    selectB:false,
    selectC: false,
    selectD: false,
    select: '',
    listAll:[]
  },
  jumptodisplay: function(e){
    let trxType = this.data.list[e.currentTarget.dataset.index].TrxType;
    wx.navigateTo({
      url: this.data.mapping[trxType],
      success: res => {
        res.eventChannel.emit('recordsInfo', {
          data: this.data.list[e.currentTarget.dataset.index]
        });
      }
    })
  }, 
  changeSelect:function (e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    let temp = [];
    if ('0' == index){
      for (let i of this.data.listAll) {
          let item = {
            tradeName: i.tradeName,
            bankInfo: i.bankInfo,
            reserveDate: i.reserveDate,
          };
          if ('0' == i.trxStatus) {
            item.status = '已办理'
          } else if ('1' == i.trxStatus) {
            item.status = '未办理'
          } else if ('2' == i.trxStatus) {
            item.status = '已过期'
          }
          temp.push(item);
      }
      this.setData({
        selectA: true,
        [this.data.select]: false,
        list: temp,
        select: 'selectA'
      });
    } else if ('1' == index){
      for (let i of this.data.listAll) {
        if ('0' == i.trxStatus) {
          let item = {
            tradeName: i.tradeName,
            bankInfo: i.bankInfo,
            reserveDate: i.reserveDate,
            status: '已办理'
          }
          temp.push(item);
        }   
      }
      this.setData({
        selectB: true,
        [this.data.select]: false,
        list: temp,
        select: 'selectB'
      });
    } else if ('2' == index) {
      for (let i of this.data.listAll) {
        if ('1' == i.trxStatus) {
          let item = {
            tradeName: i.tradeName,
            bankInfo: i.bankInfo,
            reserveDate: i.reserveDate,
            status: '未办理'
          }
          temp.push(item);
        }
      }
      this.setData({
        selectC: true,
        [this.data.select]: false,
        list: temp,
        select: 'selectC'
      });
    } else if ('3' == index) {
      for (let i of this.data.listAll) {
        if ('2' == i.trxStatus) {
          let item = {
            tradeName: i.tradeName,
            bankInfo: i.bankInfo,
            reserveDate: i.reserveDate,
            status: '已过期'
          }
          temp.push(item);
        }
      }
      this.setData({
        selectD: true,
        [this.data.select]: false,
        list: temp,
        select: 'selectD'
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '预约记录'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.doServerAction({
      trade: '3003',
      data: {
        UserID: wx.getStorageSync('userid'),
        IDType: '01',
        IDCode: wx.getStorageSync('userInfo').IdNo
      },
      success: res => {
        console.log('预约信息查询结果', res);
        let arr = [];
        let arrView = [];
        const result = res.data.Service.response.RSPINOFS;
        for (let i = 0; i < result.length; i++) {
          arr[i] = JSON.parse(result[i].rsvinfo); 
          arr[i].trxStatus = result[i].trxStatus;
          arrView[i] = JSON.parse(result[i].rsvinfo);
          if ('0' == result[i].trxStatus){
            arrView[i].status = '已办理'
          } else if ('1' == result[i].trxStatus){
            arrView[i].status = '未办理'
          } else if ('2' == result[i].trxStatus) {
            arrView[i].status = '已过期'
          }
        }
        console.log('展示数据',arrView);
        this.setData({
          list: arrView,
          listAll: arr,
          selectA:true,
          select:'selectA'
        })
      }
    })
    
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