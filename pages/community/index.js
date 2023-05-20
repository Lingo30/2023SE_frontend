import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    tabbarValue: '/pages/community/index',
    tabbarList: getApp().globalData.tabbarList1,
    page: 1,
    pageLoading: false,
    momentList: [],
    isInter: 0,
    tabList: [{
      text: "普通帖",
      key: 0
    }, {
      text: "内推帖",
      key: 1
    }],
  },

  tabChangeHandle(e) {
    this.setData({
      page: 1,
      isInter: e.detail.value,
      momentList: []
    })
    this.load(this.data.page);
  },

  init() {
    this.setData({
      isInter: 0,
      page: 1,
      momentList: []
    })
    this.load(this.data.page);
  },

  jump2Detail(e) {
    wx.navigateTo({
      url: '/pages/community/detail/index?momentId=' + e.currentTarget.dataset.id,
    })
  },

  jump2post() {
    wx.navigateTo({
      url: '/pages/community/post/index',
    })
  },

  loadMore() {
    this.data.page = this.data.page + 1;
    this.load(this.data.page);
  },

  load(p) {
    this.setData({
      pageLoading: true
    });
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: getApp().globalData.baseUrl + '/community',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        page: p,
        isInter: this.data.isInter
      },
      success: (res) => {
        if (res.data.result == 1) {
          let momentMore = res.data.momentList
          let momentTmp = this.data.momentList.concat(momentMore)
          this.setData({
            momentList: momentTmp,
          })
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.msg,
            duration: 2500,
            theme: 'warning',
            direction: 'column',
          });
        }
      },
      complete: () => {
        this.setData({
          pageLoading: false
        });
        wx.hideLoading();
      },
    });
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

  onLoad() {
    this.checkLogin();
    this.setData({
      page: 1,
      isInter: 0,
      momentList: []
    })
  },

  onShow() {
    this.checkLogin();
    this.setData({
      page: 1,
      momentList: []
    })
    this.load(this.data.page);
  },

  onTabbarChange(e) {
    this.setData({
      tabbarValue: e.detail.value,
    });
    wx.redirectTo({
      url: e.detail.value,
    })
  },
})