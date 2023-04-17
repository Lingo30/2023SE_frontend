import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    page: 1,
    pageLoading: false,
    momentList: []
  },

  init() {
    this.load(this.page);
  },

  jump2Detail(e) {
    wx.navigateTo({
      url: '/pages/community/detail/index?momentId=' + e.currentTarget.dataset.id,
    })
  },

  loadMore() {
    this.page = this.page + 1;
    this.load(this.page);
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

  onLoad() {
    this.page = 1;
  },

  onShow() {
    this.getTabBar().init();
    this.init();
  },
})