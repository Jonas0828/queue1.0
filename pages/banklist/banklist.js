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
    inputVal: "",
    location: {
      longitude: '',
      latitude: '',
      flag: true
    },
    codeIndex: [],
    openType: '', 
    selectList: [[],[],[]],
    list: []
  },
  savecode: function (e) {
    const address = this.data.selectList[0][e.detail.value[0]].RegionDsc + this.data.selectList[1][e.detail.value[1]].RegionDsc + this.data.selectList[2][e.detail.value[2]].RegionDsc;
    this.setData({
      codeIndex: this.data.selectList[2][e.detail.value[2]].CountyCode, 
      inputVal: address
    });
    util.doServerAction({
      appBody: {
        RegionCode: this.data.selectList[2][e.detail.value[2]].CountyCode,
      },
      appHdr: {
        tradeCode: 'EFS_WD_0001'
      },
      success: res => {
        console.log('选择地区查询网点');
        console.log(res);
        if (0 == res.data.Service.response.body.TotalNum) {
          this.setData({
            list: [],
          });
        } else {
          // console.log(this.data.location)
          // if(true == this.data.location.flag){
          //   // 先排序后展示
          //   let arr = res.data.Service.response.body.Details;
          //   let calData =[];
          //   for(let i=0; i<arr.length;i++){
          //     calData[i] = this.getDistance(arr[i].Dimension ,arr[i].Longitude);
          //   }
          //   console.log("距离计算结果：" + calData);
          //   console.log(this.bankinfosort(calData));
          // }else{
            // 展示
            this.setData({
              list: res.data.Service.response.body.Details,
            });
          // }
        } 
      }
    });
  },
  chooselocation: function(e) {
    const temp = this;
    auth.getUserLocationAuth(function() {
      wx.getLocation({
        type: 'gcj02',
        success: function(res) {
          temp.setData({
            location: {
              longitude: res.longitude,
              latitude: res.latitude,
              flag: true
            },
          });
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
                util.doServerAction({
                  appBody: {
                    RegionCode: areacode,
                  },
                  appHdr: {
                    tradeCode: 'EFS_WD_0001'
                  },
                  success: res => {
                    
                    if (0 == res.data.Service.response.body.TotalNum) {
                      temp.setData({
                        list: [],
                      });
                    }else{
                      temp.setData({
                        list: res.data.Service.response.body.Details,
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
            content: '获取地理位置信息失败，请打开手机GPS定位功能，1~2秒后点击左上角定位即可',
            showCancel: false,
            confirmColor: '#1C6CEF',
          })
        }
      })
    });
  },
  jumptobank: function (e) {
    console.log(this.data.list[e.currentTarget.dataset.index]);
    let bankinfo = this.data.list[e.currentTarget.dataset.index];
    if('' == bankinfo.RegionCode){
      return;
    }
    const notice = res => {
      res.eventChannel.emit('bankinfo', {
        data: bankinfo
      })
    }
    if ('1' == this.data.openType) {
      wx.navigateBack({
        success: res => {
          notice(res);
        }
      })
    } else if ('2' == this.data.openType) {
      wx.navigateTo({
        url: '../bank/bank',
        success: res => {
          notice(res);
        }
      })
    }
  },
  // 计算距离
  getDistance: function (lat, lng) {
    let lat1 = this.location.latitude;
    let lng1 = this.location.longitude;
    let lat2 = lat;
    let lng2 = lng;
    let rad1 = lat1 * Math.PI / 180.0;
    let rad2 = lat2 * Math.PI / 180.0;
    let a = rad1 - rad2;
    let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let r = 6378137;
    return distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
  },
  // 对距离数组进行排序
  bankinfosort: function (elements) {
    const temp = this;
    if (elements.length <= 1) {
      return elements;
    }
    let index = Math.floor(elements.length / 2);
    let pivot = elements.splice(index, 1)[0];//获取删除的数字 
    let arrLeft = [];
    let arrRight = [];
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] < pivot) {
        arrLeft.push(elements[i]);
      } else {
        arrRight.push(elements[i]);
      }
    }
    return this.bankinfosort(arrLeft).concat([pivot], this.bankinfosort(arrRight));
  }, 
  // 给查询输入域赋值
  setInputValue: function(e) {
    this.setData({
      inputVal: '阳城县',
      inputShowed: true
    });
  },
  refreshdata: function () {
    console.log(this.bankinfosort([4, 5, 2, 3, 7, 1, 8, 9, 6, 4.4, 5.5]));
    this.queryProvince();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('网点列表');
    console.log(options);
    // 页面打开方式 1 需要返回打开页面；2 直接进行业务选择 
    this.setData({
      openType: options.openType,
    }); 
    wx.setNavigationBarTitle({
      title: '选择网点'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.queryProvince(); 
    this.chooselocation();
  },
  queryProvince: function () {
    util.doServerAction({
      appBody: {
        ProvinceCode: '',
        CityCode: '',
        QueryType: '1'
        //   QueryType 查询类型：1-省  2-市  3-县/区 
      },
      appHdr: {
        tradeCode: 'EFS_WD_0002'
      },
      success: res => {
        console.log('查询省份');
        console.log(res.data.Service.response.body.Details);
        this.setData({
          'selectList[0]': res.data.Service.response.body.Details
        });
      }
    });
    util.doServerAction({
      appBody: {
        ProvinceCode: '110000',
        CityCode: '',
        QueryType: '2'
        //   QueryType 查询类型：1-省  2-市  3-县/区 
      },
      appHdr: {
        tradeCode: 'EFS_WD_0002'
      },
      success: res => {
        console.log('查询市');
        console.log(res.data.Service.response.body.Details);
        this.setData({
          'selectList[1]': res.data.Service.response.body.Details
        });
      }
    });
    util.doServerAction({
      appBody: {
        ProvinceCode: '',
        CityCode: '110000',
        QueryType: '3'
        //   QueryType 查询类型：1-省  2-市  3-县/区
      },
      appHdr: {
        tradeCode: 'EFS_WD_0002'
      },
      success: res => {
        console.log('查询区');
        console.log(res.data.Service.response);
        this.setData({
          'selectList[2]': res.data.Service.response.body.Details
        });
      }
    });
  },
  columnchange: function (e) {
    let columnindex = e.detail.column; // 第几列 
    let index = e.detail.value; //index值 
    console.log('第几列改变值：' + columnindex + ';代码值：' + this.data.selectList[columnindex][index].ProvinceCode);
    if (0 == columnindex) {
      // 根据代码值去加载市 
      util.doServerAction({
        appBody: {
          ProvinceCode: this.data.selectList[columnindex][index].ProvinceCode,
          CityCode: '',
          QueryType: '2'
          //   QueryType 查询类型：1-省  2-市  3-县/区
        },
        appHdr: {
          tradeCode: 'EFS_WD_0002'
        },
        success: res => {
          console.log('多列查询市');
          console.log(res.data.Service.response.body.Details); //市列表 
          util.doServerAction({
            appBody: {
              ProvinceCode: '',
              CityCode: res.data.Service.response.body.Details[0].CityCode,
              QueryType: '3'
              //   QueryType 查询类型：1-省  2-市  3-县/区
            },
            appHdr: {
              tradeCode: 'EFS_WD_0002'
            },
            success: result => {
              console.log('多列查询区-1-');
              console.log(result.data.Service.response.body);
              if (0 != result.data.Service.response.body.TotalNum) {
                this.setData({
                  'selectList[1]': res.data.Service.response.body.Details,
                  'selectList[2]': result.data.Service.response.body.Details
                });
              } else {
                this.setData({
                  'selectList[1]': res.data.Service.response.body.Details,
                  'selectList[2]': [{
                    CityCode: '',
                    CountyCode: res.data.Service.response.body.Details[0].CityCode,
                    ProvinceCode: '',
                    RegionDsc: res.data.Service.response.body.Details[0].RegionDsc
                  }]
                });
              }
            }
          });
        }
      });
    } else if (1 == columnindex) {
      // 根据代码值去加载区 
      console.log(this.data.selectList[columnindex][index].CityCode);
      util.doServerAction({
        appBody: {
          ProvinceCode: '',
          CityCode: this.data.selectList[columnindex][index].CityCode,
          QueryType: '3'
          //   QueryType 查询类型：1-省  2-市  3-县/区 
        },
        appHdr: {
          tradeCode: 'EFS_WD_0002'
        },
        success: res => {
          console.log('多列查询区-2-');
          console.log(res);
          if (0 != res.data.Service.response.body.TotalNum) {
            this.setData({
              'selectList[2]': res.data.Service.response.body.Details
            });
          } else {
            this.setData({
              'selectList[2]': [{
                CityCode: '',
                CountyCode: this.data.selectList[columnindex][index].CityCode,
                ProvinceCode: '',
                RegionDsc: this.data.selectList[columnindex][index].RegionDsc
              }]
            });
          }
        }
      });
    }
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