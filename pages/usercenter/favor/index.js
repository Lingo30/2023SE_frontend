import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
    page: 1,
    current: '项目',
    tabList: [{
        text: '项目',
        key: 0,
      },
      {
        text: '导师',
        key: 1,
      },
      {
        text: '社区',
        key: 2,
      }
    ],
    internlist: [{
        id: 1,
        title: '计算机视觉实习',
        content: '传统目标检测，无人驾驶',
        num: 3,
        alreadynum: 1,
        tags: ['3个月', '线下', 'CV', 'python'],
        tname: '刘偲教授',
        school: '北京航空航天大学',
        state: '招募中',
      },
      {
        id: 2,
        title: '计算机视觉实习',
        content: '对于diffusion model infer阶段算法加速',
        num: 1,
        alreadynum: 0,
        tags: ['5个月', '线上', 'CV', 'python'],
        tname: '朱军教授',
        school: '清华大学',
        state: '招募中',
      },
      {
        id: 3,
        title: '计算机视觉实习',
        content: '传统目标检测，无人驾驶',
        num: 3,
        alreadynum: 1,
        tags: ['3个月', '线下', 'CV', 'python'],
        tname: '刘偲教授',
        school: '北京航空航天大学',
        state: '招募中',
      },
      {
        id: 4,
        title: '计算机视觉实习',
        content: '传统目标检测，无人驾驶',
        num: 1,
        alreadynum: 1,
        tags: ['3个月', '线下', 'CV', 'python'],
        tname: '刘偲教授',
        school: '北京航空航天大学',
        state: '待评价',
      },
    ],
    proflist: [{
        id: 1,
        name: "刘偲",
        school: "北航",
        avatar: "http://114.116.221.67:8000/media/avatar/default.jpg"
      },
      {
        id: 2,
        name: "朱军",
        school: "清华",
        avatar: "http://114.116.221.67:8000/media/avatar/default.jpg"
      },
      {
        id: 3,
        name: "李崇轩",
        school: "人大",
        avatar: "http://114.116.221.67:8000/media/avatar/default.jpg"
      },
    ],
    goodsListLoadStatus: 0,
    pageLoading: false,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: {
      type: 'dots',
    },
    swiperImageProps: {
      mode: 'scaleToFill',
    },
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {}
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });

    wx.request({
      url: `${getApp().globalData.baseUrl}/getLikeProj`,
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        page: this.page,
      },
      success: (res) => {
        this.setData({
          internlist: res.data.internlist,
        });
      },
    });
    this.setData({
      pageLoading: false,
    });
  },

  loadMore() {
    console.log(this.data.pageLoading);
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
    if (this.data.current == "项目") {
      wx.request({
        url: `${getApp().globalData.baseUrl}/getLikeProj`,
        header: {
          Authorization: wx.getStorageSync('token'),
        },
        method: 'POST',
        data: {
          page: page,
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
      });
    } else if (this.data.current == "导师") {
      wx.request({
        url: `${getApp().globalData.baseUrl}/getLikeProf`,
        header: {
          Authorization: wx.getStorageSync('token'),
        },
        method: 'POST',
        data: {
          page: page,
        },
        success: (res) => {
          if (res.data.result == 1) {
            const proflistmore = res.data.proflist
            const proflisttmp = this.data.proflist.concat(proflistmore)
            // console.log(internlisttmp)
            this.setData({
              proflist: proflisttmp,
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
      });
    } else {

    }
    console.log(this.data.page);
  },

  tabChangeHandle(e) {
    console.log(e.detail);
    this.setData({
      page: 1,
    });
    this.setData({
      current: e.detail.label,
    });
    console.log(this.data.page, this.data.current);
    if (this.data.current == "项目") {
      wx.request({
        url: `${getApp().globalData.baseUrl}/getLikeProj`,
        header: {
          Authorization: wx.getStorageSync('token'),
        },
        method: 'POST',
        data: {
          page: this.page,
        },
        success: (res) => {
          this.setData({
            internlist: res.data.internlist,
          });
        },
      });
    } else if (this.data.current == "导师") {
      wx.request({
        url: `${getApp().globalData.baseUrl}/getLikeProf`,
        header: {
          Authorization: wx.getStorageSync('token'),
        },
        method: 'POST',
        data: {
          page: this.page,
        },
        success: (res) => {
          this.setData({
            proflist: res.data.proflist,
          });
        },
      });
    }
  },
});