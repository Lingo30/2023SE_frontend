// pages/items/review/mentorReview/index.js

import Toast from 'tdesign-miniprogram/toast/index';

Page({
  // 该页面传入数据：
  // token, sId
  // 在onLoad()函数中提取变量


  /**
   * 页面的初始数据
   */

  // 1. 数据域
  data: {
    value: 4,
    texts: ['不合格', '不合格', '一般', '一般', '良好', '良好', '较为优秀', '优秀', '超出预期', '超出预期'],
    iId: "default",
    sId: "default",
    sAvatarUrl: "http://114.116.221.67:8000/media/avatar/default.jpg",
    sName: "李逸卓",
    sSchool: "北京航空航天大学",
    sEmail: "20373493@buaa.edu.cn",
    comment: ""
  },

  // 2. 监听获取评分
  onChange(e) {
    const {
      value
    } = e.detail;
    this.setData({
      value,
    });
    console.log("value=", e.detail);
  },

  // 3. 监听获取评语
  getInputComment(e) {
    this.setData({
      comment: e.detail.value
    })
    console.log("comment=", e.detail.value);
  },

  // 4. 页面加载获取信息
  onLoad(options) {
    // 获取sId, iId
    this.setData({
      sId: options.sId,
      iId: options.iId
    })
    // 后端查询学生基本信息
    wx.request({
      url: getApp().globalData.baseUrl + '/getSInfo',
      method: 'POST',
      data: {
        sId: this.data.sId
      },
      success: (res) => {
        this.setData({
          sAvatarUrl: res.data.sAvatarUrl,
          sName: res.data.sName,
          sSchool: res.data.sSchool,
          sEmail: res.data.sEmail
        })
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "加载学生信息失败",
          duration: 2500,
          theme: 'error',
          direction: 'column',
        });
        wx.navigateBack();
      }
    })
  },

  // 5. 按钮上传事件绑定
  submit() {
    // 先上传, Toast
    wx.request({
      url: getApp().globalData.baseUrl + '/uploadMentorReview',
      method: 'POST',
      data: {
        iId: this.data.iId,
        sId: this.data.sId,
        stars: this.data.value * 2,
        comment: this.data.comment
      },
      success: (res) => {
        if (res.data.success) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "上传评价成功",
            duration: 2500,
            theme: 'check-circle-filled',
            direction: 'column',
          });
          wx.navigateBack();
        }  else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "!success, 上传评价失败",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "fail, 上传评价失败",
          duration: 2500,
          theme: 'error',
          direction: 'column',
        });
      }
    })
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});