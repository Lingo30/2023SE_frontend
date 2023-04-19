// pages/msg/msg.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageLoading: false,
    page: 1,
    "msglist": [{
        "id": 1,
        "name": "老板",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "2022-09-14",
        "content": "谢谢！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
        "time": "04-15",
        "content": "麻烦学长了！"
      },
      {
        "id": 2,
        "name": "学长",
        "avatar": "http://114.116.221.67:8000/media/avatar/default.jpg",
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
  onShow() {
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
        const msgmore = res.data.msglist
        const msglisttmp = this.data.msglist.concat(msgmore)
        // console.log(internlisttmp)
        this.setData({
          msglist: msglisttmp,
          page: page,
          pageLoading: false
        })
      },
      complete: () => {
        wx.hideLoading();
      },
    })
    console.log(this.data.page)
  },
})