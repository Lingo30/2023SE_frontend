// pages/sysNotification/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [{
      time: "2023/5/10 2:17",
      text: "欢迎您注册【Lab直聘】，快去主页逛逛，挑选心仪的项目与导师，开启一段难忘的科研之旅吧！"
    }, {
      time: "2023/5/15 2:17",
      text: "很遗憾地通知您，您没有通过【黄迪】老师【图像去雾算法研究】项目的审核，请尝试报名其他项目，不要灰心，再接再厉！"
    }, {
      time: "2023/5/15 3:14",
      text: "恭喜您！您已经通过【阮利】老师【元学习算法研究】项目的审核，项目已经正式立项，请联系导师开始研究吧！"
    }, {
      time: "2023/5/15 2:17",
      text: "很遗憾地通知您，您没有通过【黄迪】老师【图像去雾算法研究】项目的审核，请尝试报名其他项目，不要灰心，再接再厉！"
    }, {
      time: "2023/5/15 3:14",
      text: "恭喜您！您已经通过【阮利】老师【元学习算法研究】项目的审核，项目已经正式立项，请联系导师开始研究吧！"
    }],
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