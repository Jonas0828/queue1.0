Component({
  data: {
    selected: 0,
    color: "#B3B3B3",
    selectedColor: "#1C6CEF",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/pages/resource/picture/tarbar/main.png",
      selectedIconPath: "/pages/resource/picture/tarbar/mainselect.png",
      text: "首页"
    }, {
        pagePath: "/pages/user/user",
        iconPath: "/pages/resource/picture/tarbar/user.png",
        selectedIconPath: "/pages/resource/picture/tarbar/userselect.png",
      text: "用户"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})