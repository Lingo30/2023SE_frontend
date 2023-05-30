// pages/items/manage/1_recruiting/index.js
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    iId: '1',
    iTitle: "这是一个特别长的标题元学习算法研究",
    iNum: 6,
    iCapacity: 4,
    iTime: "2023/12/31",
    iDuration: "7个月",
    iType: "线上",
    students_yet: [],
    students_already: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 1. 加载iID
    console.log("in onLoad() function");
    this.data.iId = options.iId;
    console.log("iId=", this.data.iId);
    // 2. 加载项目相关信息 [iId => iInfos]
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemShortInfo',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (res.data.success) {
          console.log("success!!!");
          console.log(res);
          this.setData({
            iTitle: res.data.iTitle,
            iNum: res.data.iNum,
            iCapacity: res.data.iCapacity,
            iDuration: res.data.iDuration,
            iTime: res.data.iTime,
            iType: res.data.iType,
            iInfo: res.data.iInfo
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "信息加载失败",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
          wx.navigateBack();
        }
      }
    });
  },

  comment(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      url: '/pages/items/review/mentorReview/index?sId=' + this.data.students_yet[index].sId + '&iId=' + this.data.iId
    });
  },

  commentOver() {
    if (this.data.students_yet.length == 0) {
      wx.request({
        url: getApp().globalData.baseUrl + '/reviewAllStudents',
        method: 'post',
        header: {
          Authorization: wx.getStorageSync('token'),
        },
        data: {
          iId: this.data.iId
        },
        success: (res) => {
          if (res.data.success) {
            console.log("success!!!");
            Toast({
              context: this,
              selector: '#t-toast',
              message: "项目评价全部完成",
              duration: 1000,
              theme: 'success',
              direction: 'column',
            });
            setTimeout(() => {
              wx.navigateBack();
            }, 1000);
          } else {
            Toast({
              context: this,
              selector: '#t-toast',
              message: "确认失败，请稍后重试",
              duration: 1500,
              theme: 'error',
              direction: 'column',
            });
            setTimeout(() => {
              wx.navigateBack();
            }, 1500);
          }
        }
      })
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "仍有学生未评价",
        duration: 1500,
        theme: 'error',
        direction: 'column',
      });
    }
  },

  jump2StudentAlready(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      /* 学生详情页url */
      url: '/pages/info/index' + '?sId=' + this.data.students_already[index].sId
    })
  },

  jump2StudentYet(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      /* 学生详情页url */
      url: '/pages/info/index' + '?sId=' + this.data.students_yet[index].sId
    })
  },

  onShow() {
    // 3. 加载两个学生数组
    wx.request({
      url: getApp().globalData.baseUrl + '/iId2alreadyANDyet',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId
      },
      method: 'post',
      success: (res) => {
        if (res.data.success) {
          this.setData({
            students_yet: res.data.yet,
            students_already: res.data.already
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "加载评价学生数据失败",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      }
    });
  }

});