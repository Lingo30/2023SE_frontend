// pages/msg/msg.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabbarValue: '/pages/msg/msg',
    tabbarList: [],
    pageLoading: false,
    page: 1,
    "msglist": [{
        "id": 1,
        "name": "老板",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "2022-09-14",
        "content": "谢谢！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "https://intth1.2022martu1.cn/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      }
    ],
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
    if (wx.getStorageSync('userType') == "student") {
      this.setData({
        tabbarList: getApp().globalData.tabbarList1
      })
    } else if (wx.getStorageSync('userType') == "teacher") {
      this.setData({
        tabbarList: getApp().globalData.tabbarList2
      })
    } else {
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

  init() {
    this.page = 1;
    this.msglist = [];
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });

    wx.request({
      url: getApp().globalData.baseUrl + '/getMsglist',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        page: this.data.page
      },
      success: (res) => {
        this.setData({
          msglist: res.data.msglist
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
      url: getApp().globalData.baseUrl + '/getMsglist',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        page: page
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.result == 1) {
          const msgmore = res.data.msglist
          const msglisttmp = this.data.msglist.concat(msgmore)
          // console.log(internlisttmp)
          this.setData({
            msglist: msglisttmp,
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
  onTabbarChange(e) {
    this.setData({
      tabbarValue: e.detail.value,
    });
    wx.redirectTo({
      url: e.detail.value,
    })
  },
})