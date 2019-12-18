function getUserLocation(hook){
  //检查是否对地理位置授权
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userLocation']) {
        hook();
      }else{
        //进行地理位置授权
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            console.log('地理位置授权成功');
            hook();
          },
          fail() {
            console.log('地理位置授权失败');
            wx.showModal({
              title: '授权失败',
              content: '小程序需要地理位置授权',
              confirmText: '前往设置',
              confirmColor: '#55AAAD',
              success(res){
                if(res.confirm){
                  wx.openSetting({
                    success(res){
                      if (res.authSetting['scope.userLocation']) {
                        hook();
                      }
                    }
                  })
                }
                if(res.cancel){
                  wx.showModal({
                    title: '警告',
                    content: '小程序无法正常使用',
                    showCancel: false,
                    confirmColor: '#55AAAD',
                  })
                }
              }
            })
          }
        })
      }
    }
  })
}


module.exports = {
  getUserLocation: getUserLocation
}