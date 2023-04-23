// pages/proflist/proflist.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarValue: '/pages/proflist/proflist',
    tabbarList: getApp().globalData.tabbarList1,
    pageLoading: false,
    content: "",
    page: 1,
    onepagenum: 13,
    showlist: [{
        id: 1,
        name: "刘偲",
        school: "北航",
        avatar: "https://intth1.2022martu1.cn/media/avatar/default.jpg"
      },
      {
        id: 2,
        name: "朱军",
        school: "清华",
        avatar: "https://intth1.2022martu1.cn/media/avatar/default.jpg"
      },
      {
        id: 3,
        name: "李崇轩",
        school: "人大",
        avatar: "https://intth1.2022martu1.cn/media/avatar/default.jpg"
      },
    ],
    proflist: [{
        id: 1,
        name: "刘偲",
        school: "北航",
        avatar: "https://intth1.2022martu1.cn/media/avatar/default.jpg"
      },
      {
        id: 2,
        name: "朱军",
        school: "清华",
        avatar: "https://intth1.2022martu1.cn/media/avatar/default.jpg"
      },
      {
        id: 3,
        name: "李崇轩",
        school: "人大",
        avatar: "https://intth1.2022martu1.cn/media/avatar/default.jpg"
      },
    ],
    goodsListLoadStatus: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  changeContent(e) {
    this.setData({
      content: e.detail.value
    })
    console.log("输入内容：", this.data.content)
  },

  getProflist(e) {
    this.setData({
      pageLoading: true,
    });
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: getApp().globalData.baseUrl + '/searchProf',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        content: this.data.content
      },
      success: (res) => {
        this.setData({
          proflist: res.data.proflist,
          showlist: res.data.proflist.slice(0, this.data.onepagenum)
        })
      },
      complete: () => {
        wx.hideLoading();
      },
    })
    this.setData({
      pageLoading: false,
      page: 1
    });
  },

  init() {
    this.page = 1;
    this.onepagenum = 13;
    this.showlist = [];
    this.proflist = [];
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });

    wx.request({
      url: getApp().globalData.baseUrl + '/getProflist',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          proflist: res.data.proflist,
          showlist: res.data.proflist.slice(0, this.data.onepagenum)
        })
      }
    })
    this.setData({
      pageLoading: false,
    });
  },

  loadMore() {
    const numtmp = this.data.page * this.data.onepagenum;
    let lasttmp;
    if (numtmp + this.data.onepagenum > this.data.proflist.length) {
      lasttmp = this.data.proflist.length
    } else {
      lasttmp = numtmp + this.data.onepagenum
    }
    console.log(lasttmp)
    if (lasttmp >= this.data.proflist.length) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "不能加载更多了～",
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
    }
    // console.log(this.data.pageLoading)
    if (this.data.pageLoading) {
      return;
    }
    this.setData({
      pageLoading: true,
    });
    wx.showLoading({
      title: '加载中',
    });
    const proflistmore = this.data.proflist.slice(numtmp, lasttmp);
    this.setData({
      showlist: this.data.showlist.concat(proflistmore),
      page: this.data.page + 1,
      pageLoading: false
    });
    wx.hideLoading();
    // wx.request({
    //   url: getApp().globalData.baseUrl + '/getProflist',
    //   header: {
    //     Authorization: wx.getStorageSync('token'),
    //   },
    //   method: 'POST',
    //   data: {
    //     page: this.data.page,
    //     content: this.data.content
    //   },
    //   success: (res) => {
    //     const proflistmore = res.data.proflist
    //     const proflisttmp = this.data.proflist.concat(proflistmore)
    //     // console.log(internlisttmp)
    //     this.setData({
    //       proflist: proflisttmp,
    //       page: page,
    //       pageLoading: false
    //     })
    //   },
    //   complete: () => {
    //     wx.hideLoading();
    //   },
    // })
    // console.log(this.data.page)
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