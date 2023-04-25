import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    tabbarValue: '/pages/home/home',
    tabbarList: getApp().globalData.tabbarList1,
    page: 1,
    userId: '',
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

  onLoad(options) {
    const sId = options.sId
    this.setData({
      userId: sId
    })
  },

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
      url: getApp().globalData.baseUrl + '/profSeeStu',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        page: this.data.page,
        userId: this.data.userId
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
      url: getApp().globalData.baseUrl + '/profSeeStu',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        page: page,
        userId: this.data.userId
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

  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/search/search'
      // url: '/pages/goods/search/index'
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