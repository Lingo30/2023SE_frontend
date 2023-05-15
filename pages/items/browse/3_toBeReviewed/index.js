// pages/items/browse/toBeReviewed/index.js

import Toast from 'tdesign-miniprogram/toast/index';

Page({

  /**
   * 页面的初始数据
   */

  // 1. 数据域
  data: {
    value: 4,
    texts: ['不合格', '不合格', '一般', '一般', '良好', '良好', '较为优秀', '优秀', '超出预期', '超出预期'],
    iId: "default",
    tAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    tId: "1",
    tName: "default",
    tPosition: "default",
    tInfo: '计算机视觉图像去雾元学习MAMLReptileSGD自然语言处理计算机视觉图像去雾元学习MAMLReptileSGD自然语言处理计算机视觉图像去雾元学习MAMLReptileSGD自然语言处理计算机视觉图像去雾元学习MAMLReptileSGD自然语言处理',
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
    // 1. 获取iId
    this.setData({
      iId: options.iId
    })
    // 2. 获得导师信息 tId => tInfos
    wx.request({
      url: getApp().globalData.baseUrl + '/iId2tInfos',
      method: 'POST',
      data: {
        iId: this.data.iId
      },
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      success: (res) => {
        this.setData({
          tId: res.data.tId,
          tName: res.data.tName,
          tPosition: res.data.tPosition,
          tInfo: res.data.tInfo,
          tAvatarUrl: res.data.tAvatar
        })
      }
    })
  },

  // 5. 按钮上传事件绑定
  submit() {
    // 先上传, Toast

    wx.request({
      url: getApp().globalData.baseUrl + '/uploadStudentReview',
      method: 'POST',
      data: {
        iId: this.data.iId,
        mainStars: this.data.value * 2,
        comment: this.data.comment
      },
      header: {
        Authorization: wx.getStorageSync('token')
      },
      success: (res) => {
        if (res.data.success) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "上传评价成功",
            duration: 1500,
            theme: 'check-circle-filled',
            direction: 'column',
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "上传评价失败",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
        }
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "上传评价失败",
          duration: 1500,
          theme: 'error',
          direction: 'column',
        });
      }
    });
  }

});