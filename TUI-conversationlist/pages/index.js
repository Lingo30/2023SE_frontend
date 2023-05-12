Page({
  data: {
    tabbarValue: '/TUI-conversationlist/pages/index',
    tabbarList: '',
  },
  checkLogin() {
    if (!getApp().globalData.debugging) {
      if (!wx.getStorageSync('login')) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "请登录后进入！",
          duration: 2500,
          theme: 'warning',
          direction: 'column',
        });
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }
    }
  },
  onShow() {
    this.checkLogin();
    if (wx.getStorageSync('userType') == "student") {
      this.setData({
        tabbarList: getApp().globalData.tabbarList1
      })
    } else if (wx.getStorageSync('userType') == "teacher") {
      this.setData({
        tabbarList: getApp().globalData.tabbarList2
      })
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "请登录后进入！",
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
      wx.redirectTo({
        url: '/pages/login/index',
      })
    }
  },
  onTabbarChange(e) {
    this.setData({
      tabbarValue: e.detail.value,
    });
    wx.redirectTo({
      url: e.detail.value,
    })
  },
  // 其他代码


  onLoad() {
    const TUIKit = this.selectComponent('#TUIKit');
    TUIKit.init();
  },
  onUnload() {
    console.log(wx.$TUIKit)
    wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
  },
});