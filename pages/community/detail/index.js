// pages/community/detail/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    momentId: "",
    title: "",
    avatar: "",
    username: "",
    content: "",
    date: "",
    loginUsername: "",
    following: 0,
    commentContent: "",
    comments: []
  },

  init() {
    wx.setNavigationBarTitle({
      title: '帖子详情',
    })
    wx.hideHomeButton();
    this.loginUsername = wx.getStorageSync('username')
    this.setData({
      loginUsername: this.loginUsername
    })
    this.commentContent = ""
    wx.request({
      url: getApp().globalData.baseUrl + '/community/detail',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        momentId: this.momentId
      },
      success: (res) => {
        if (res.data.result == 1) {
          this.setData({
            title: res.data.title,
            avatar: res.data.avatar,
            username: res.data.username,
            date: res.data.date,
            content: res.data.content,
            comments: res.data.comments,
            following: res.data.following
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "加载失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    })
  },

  getInputValue(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this[`${key}`] = e.detail.value;
  },

  follow() {
    wx.request({
      url: getApp().globalData.baseUrl + '/community/follow',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        momentId: this.momentId
      },
      success: (res) => {
        if (res.data.result == 1) {
          if (this.data.following == 1) {
            this.setData({
              following: 0
            })
            this.following = 0;
          } else {
            this.setData({
              following: 1
            })
            this.following = 1
          }
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "收藏失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    })
  },

  comment() {
    if (!this.commentContent) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "评论内容不得为空！",
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
      return
    }
    wx.request({
      url: getApp().globalData.baseUrl + '/community/comment',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        momentId: this.momentId,
        content: this.commentContent
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
          var newComment = {
            commentUser: this.loginUsername,
            commentContent: this.commentContent
          }
          var commentsTmp = this.data.comments.concat(newComment)
          this.setData({
            comments: commentsTmp,
            commentContent: ""
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
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    this.setData({
      momentId: option.momentId
    })
    this.momentId = option.momentId
    this.init()
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