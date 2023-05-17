// pages/sysNotification/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    lastId: 4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 系统通知：/getNotifications 接口调用
    wx.request({
      url: getApp().globalData.baseUrl + '/getNotifications',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      success: (res) => {
        if (res.data.arr) {
          this.setData({
            arr: res.data.arr,
            lastId: res.data.arr.length - 1
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "系统通知(/getNotifications)加载有误！！！",
            duration: 2500,
            theme: 'warning',
            direction: 'column',
          });
        }
      }
    })
  }
})