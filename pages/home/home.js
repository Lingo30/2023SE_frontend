import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    tabbarValue: '/pages/home/home',
    tabbarList: getApp().globalData.tabbarList1,
    page: 1,
    current: "推荐",
    tabList: [{
      text: "综合",
      key: 0
    }, {
      text: "学校",
      key: 1
    }, {
      text: "专业",
      key: 2
    }, {
      text: "长期",
      key: 3
    }, {
      text: "短期",
      key: 4
    }, {
      text: "线上",
      key: 5
    }, {
      text: "线下",
      key: 6
    }],
    internlist: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
  },

  privateData: {
    tabIndex: 0,
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
    this.init();
  },

  onLoad() {},

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {}
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.page = 1;
    this.current = "推荐";
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });

    wx.request({
      url: getApp().globalData.baseUrl + '/getRecommend',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        page: this.data.page,
        current: this.data.current
      },
      success: (res) => {
        this.setData({
          internlist: res.data.internlist
        })
      }
    })
    this.setData({
      pageLoading: false,
    });
  },

  loadMore() {
    // console.log(this.data.pageLoading)
    if (this.data.pageLoading) {
      return;
    }
    const page = this.data.page + 1;
    this.setData({
      pageLoading: true,
    });
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: getApp().globalData.baseUrl + '/getRecommend',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        page: page,
        current: this.data.current
      },
      success: (res) => {
        if (res.data.result == 1) {
          const internmore = res.data.internlist
          const internlisttmp = this.data.internlist.concat(internmore)
          // console.log(internlisttmp)
          this.setData({
            internlist: internlisttmp,
            page: page
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
    })
    /******************  for test ****************/
    // let internmore = [{
    //   id: 1,
    //   title: "计算机视觉实习",
    //   content: "传统目标检测，无人驾驶",
    //   num: 3,
    //   alreadynum: 1,
    //   tags: ["3个月", "线下", "CV", "python"],
    //   tname: "刘偲教授",
    //   school: "北京航空航天大学"
    // }]
    // const internlisttmp = this.data.internlist.concat(internmore)
    // this.setData({
    //   internlist: internlisttmp,
    //   page: page,
    //   pageLoading: false
    // })
    // wx.hideLoading();
    /****************test end  *****************/
    console.log(page)
  },

  tabChangeHandle(e) {
    console.log(e.detail)
    this.setData({
      page: 1
    })
    this.setData({
      current: e.detail.label
    })
    console.log(this.data.page, this.data.current)
    wx.request({
      url: getApp().globalData.baseUrl + '/getRecommend',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        page: this.data.page,
        current: this.data.current
      },
      success: (res) => {
        this.setData({
          internlist: res.data.internlist
        })
      }
    })
  },

  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/search/search'
      // url: '/pages/goods/search/index'
    });
  },

  navToActivityDetail({
    detail
  }) {
    const {
      index: promotionID = 0
    } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },

  onTabbarChange(e) {
    this.setData({
      tabbarValue: e.detail.value,
    });
    wx.redirectTo({
      url: e.detail.value,
    })
  },
});