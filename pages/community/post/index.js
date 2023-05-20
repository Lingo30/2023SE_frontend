// pages/community/post/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    isInter: 0,
    hasInterAuthority: undefined,
  },


  post() {
    if (this.data.title == "") {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "帖子标题不得为空",
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
      return
    }
    wx.request({
      url: getApp().globalData.baseUrl + '/community/post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      data: {
        title: this.data.title,
        content: this.data.content,
        isInter: this.data.isInter
      },
      success: (res) => {
        if (res.data.result == 1) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "发表成功",
            duration: 2500,
            theme: 'success',
            direction: 'column',
          });
          wx.redirectTo({
            url: '/pages/community/index',
          })
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "发表失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      },
    });
  },

  choose(e) {
    this.data.isInter = e.detail.value
  },

  getInputValue(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.data[`${key}`] = e.detail.value;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: '发表帖子',
    })
    wx.hideHomeButton();
    wx.request({
      url: getApp().globalData.baseUrl + '/community/checkInter',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          hasInterAuthority: res.data.result
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})