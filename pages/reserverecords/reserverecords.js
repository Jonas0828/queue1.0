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
      this.setData({
        selectA: true,
        [this.data.select]: false,
        list: this.data.listAll,
        select: 'selectA'
      });
    } else if ('1' == index){
      for (let i of this.data.listAll) {
        if ('1' == i.trxStatus){
          temp.push({
           status: ''                                                                                                                                    

          });
        }
        if ('0' == result[i].trxStatus) {
          arr[i].status = '已处理'
        } else if ('1' == result[i].trxStatus) {
          arr[i].status = '未处理'
        } else if ('2' == result[i].trxStatus) {
          arr[i].status = '已过期'
        } else {
          arr[i].status = '未知'
        }  
      }
      this.setData({
        selectB: true,
        [this.data.select]: false,
        list: this.data.listAll,
        select: 'selectB'
      });
    } else if ('2' == index) {
      this.setData({
        selectC: true,
        [this.data.select]: false,
        list: this.data.listAll,
        select: 'selectC'
      });
    } else if ('3' == index) {
      this.setData({
        selectD: true,
        [this.data.select]: false,
        list: this.data.listAll,
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
        const result = res.data.Service.response.RSPINOFS;
        for (let i = 0; i < result.length; i++) {
          arr[i] = JSON.parse(result[i].rsvinfo); 
        }
        console.log('转换结果', arr);
        
        this.setData({
          list: arr,
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