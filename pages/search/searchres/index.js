import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    page: 1,
    current: "推荐",
    searchcontent: "",
    searchtags: {},
    internlist: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.init();
  },

  onLoad(options) {
    const school = options.school.split(',')
    const skills = options.skills.split(',')
    const type = options.type
    const time = options.time
    const tags = {}
    tags["school"] = school
    tags["skills"] = skills
    tags["type"] = type
    tags["time"] = time
    this.setData({
      searchcontent: options.searchcontent,
      searchtags: tags
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
    this.searchtags = {};
    this.internlist = [];
    this.loadHomePage();
  },

  loadHomePage() {
    this.setData({
      pageLoading: true,
    });

    wx.request({
      url: getApp().globalData.baseUrl + '/searchIntern',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        searchcontent: this.data.searchcontent,
        tags: this.data.searchtags,
        page: this.data.page
      },
      success: (res) => {
        console.log(res.data.internlist)
        if (res.data.result == 1) {
          this.setData({
            internlist: res.data.internlist
          })
        } else {

        }


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
    this.setData({
      pageLoading: true,
    });
    wx.showLoading({
      title: '加载中',
    });
    console.log(this.data.searchcontent, this.data.searchtags, this.data.page)
    wx.request({
      url: getApp().globalData.baseUrl + '/searchIntern',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        searchcontent: this.data.searchcontent,
        tags: this.data.searchtags,
        page: this.data.page
      },
      success: (res) => {
        if (res.data.result == 1) {
          const internmore = res.data.internlist
          const internlisttmp = this.data.internlist.concat(internmore)
          console.log(internlisttmp)
          const page = this.data.page + 1;
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
    console.log(this.data.page)
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