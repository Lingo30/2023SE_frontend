import {
  fetchHome
} from '../../services/home/home';
import {
  fetchGoodsList
} from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
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
      tags: ["3个月", "线下", "CV", "python", "3人"],
      tname: "刘偲教授",
      school: "北京航空航天大学"
    }, {
      id: 2,
      title: "计算机视觉实习",
      content: "对于diffusion model infer阶段算法加速",
      tags: ["5个月", "线上", "CV", "python", "1人"],
      tname: "朱军教授",
      school: "清华大学"
    }],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
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

    // this.setData({
    //   pageLoading: true,
    // });

    // fetchHome().then(({
    //   swiper,
    //   tabList
    // }) => {
    //   this.setData({
    //     tabList,
    //     imgSrcs: swiper,
    //     pageLoading: false,
    //   });
    //   this.loadGoodsList(true);
    // });
    wx.request({
      url: getApp().globalData.baseUrl + '/getRecommend',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
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

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
  },

  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/goods/search/index'
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