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
        text: '帖子',
        key: 2,
      }
    ],
    internlist: [],
    proflist: [],
    momentList: [],
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
    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {}
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.page = 1
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    // this.setData({
    //   current: "项目",
    // })
    // this.data.current = "项目";
    this.tabChangeHandle(null);

    // wx.request({
    //   url: `${getApp().globalData.baseUrl}/getLikeProj`,
    //   header: {
    //     Authorization: wx.getStorageSync('token'),
    //   },
    //   method: 'POST',
    //   data: {
    //     page: this.data.page,
    //   },
    //   success: (res) => {
    //     // console.log(res)
    //     this.setData({
    //       internlist: res.data.internlist,
    //     });
    //   },
    // });
    this.setData({
      pageLoading: false,
    });
  },

  loadMore() {
    if (this.data.current == "帖子") {
      this.loadMoreMoments();
      return;
    }
    // console.log(this.data.pageLoading);
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
      console.log("page = ", page);
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
            const proflistmore = res.data.internlist
            const proflisttmp = this.data.proflist.concat(proflistmore)
            // console.log(internlisttmp)
            this.setData({
              proflist: proflisttmp,
              page: page
            })
            // console.log(proflisttmp)
          } else {}
        },
        complete: () => {
          this.setData({
            pageLoading: false
          });
          wx.hideLoading();
        },
      });
    }
    // console.log(this.data.page);
  },

  tabChangeHandle(e) {
    // console.log(e.detail);
    this.setData({
      page: 1,
    });
    if (e != null) {
      this.setData({
        current: e.detail.label,
      });
      console.log(e);
    }

    // console.log(this.data.page, this.data.current);
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
          // console.log(res.data)
          this.setData({
            proflist: res.data.internlist,
          });
        },
      });
    } else if (this.data.current == "帖子") {
      this.data.momentList = []
      this.setData({
        momentList: []
      })
      this.loadMoments(1)
    }
  },

  jump2mDetail(e) {
    wx.navigateTo({
      url: '/pages/community/detail/index?momentId=' + e.currentTarget.dataset.id,
    })
  },

  loadMoreMoments() {
    this.data.page = this.data.page + 1;
    this.loadMoments(this.data.page);
  },

  loadMoments(p) {
    this.setData({
      pageLoading: true
    });
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: getApp().globalData.baseUrl + '/getLikeMoments',
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
          // console.log(this.data.momentList)
        } else {

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
});