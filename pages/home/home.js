import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
    page: 1,
    current: "推荐",
    tabList: [{
      text: "推荐",
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
    internlist: [{
        id: 1,
        title: "计算机视觉实习",
        content: "传统目标检测，无人驾驶",
        num: 3,
        alreadynum: 1,
        tags: ["3个月", "线下", "CV", "python"],
        tname: "刘偲教授",
        school: "北京航空航天大学",
        state: "招募中"
      },
      {
        id: 2,
        title: "计算机视觉实习",
        content: "对于diffusion model infer阶段算法加速",
        num: 1,
        alreadynum: 0,
        tags: ["5个月", "线上", "CV", "python"],
        tname: "朱军教授",
        school: "清华大学",
        state: "招募中"
      },
      {
        id: 3,
        title: "计算机视觉实习",
        content: "传统目标检测，无人驾驶",
        num: 3,
        alreadynum: 1,
        tags: ["3个月", "线下", "CV", "python"],
        tname: "刘偲教授",
        school: "北京航空航天大学",
        state: "招募中"
      },
      {
        id: 4,
        title: "计算机视觉实习",
        content: "传统目标检测，无人驾驶",
        num: 1,
        alreadynum: 1,
        tags: ["3个月", "线下", "CV", "python"],
        tname: "刘偲教授",
        school: "北京航空航天大学",
        state: "待评价"
      }
    ],
    goodsListLoadStatus: 0,
    pageLoading: false,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: {
      type: 'dots'
    },
    swiperImageProps: {
      mode: 'scaleToFill'
    },
  },

  goodListPagination: {
    index: 0,
    num: 20,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
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
        page: this.page,
        current: this.current
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
    console.log(this.data.pageLoading)
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
        page: this.data.page,
        current: this.data.current
      },
      success: (res) => {
        const internmore = res.data.internlist
        const internlisttmp = this.data.internlist.concat(internmore)
        // console.log(internlisttmp)
        this.setData({
          internlist: internlisttmp,
          page: page,
          pageLoading: false
        })
      },
      complete: () => {
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
    console.log(this.data.page)
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
        page: this.page,
        current: this.current
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
});