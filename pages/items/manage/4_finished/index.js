import Toast from 'tdesign-miniprogram/toast/index';
// pages/items/manage/4_finished/index.js
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
    iInfo: "本项目旨在探索元学习算法在少样本学习任务中的应用。我们将使用基于神经网络的元学习算法来学习一个泛化能力强的模型，使其在仅有极少量的样本数据时也能够快速准确地进行分类、回归等任务。我们将采用多种元学习算法，并结合不同的网络结构和损失函数进行实验比较。此外，我们还将探索如何将元学习应用于自适应学习，使得模型能够自动适应新的任务和环境。我们将在多个经典的数据集上进行实验，并对比不同算法在不同数据集上的表现。最终，本项目旨在提高模型的泛化能力，为少样本学习提供更好的解决方案。",
    students: [{
        sId: "1",
        sName: "string1",
        sAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        sSchool: "北京航空航天大学"
      },
      {
        sId: "2",
        sName: "string2",
        sAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        sSchool: "string2"
      }, {
        sId: "3",
        sName: "string1",
        sAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        sSchool: "北京航空航天大学"
      }, {
        sId: "4",
        sName: "string1",
        sAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        sSchool: "北京航空航天大学"
      }
    ],
    noReview: false,
    reviews: [{
        stars: 8,
        comment: "This is my review."
      },
      {
        stars: 9,
        comment: "This is my review2.This is my review2.This is my review2.This is my review2.This is my review2.This is my review2."
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // TODO: component中测试
    console.log("in onLoad() function");
    this.data.iId = options.iId;
    console.log("iId=", this.data.iId);
    // 获取项目简单信息
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemShortInfo',
      method: 'post',
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
      },
      fail: () => {
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
    });
    // 获取项目学生列表
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemStudents',
      method: 'post',
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (res.data.success) {
          console.log("success!!!");
          console.log(res);
          this.setData({
            students: res.data.students
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
      },
      fail: () => {
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
    });
    // 获取项目评论列表
    wx.request({
      url: getApp().globalData.baseUrl + "/getReviewMentor",
      method: "post",
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (typeof res.data.reviews === undefined) {
          this.data.noReview = true;
          Toast({
            context: this,
            selector: '#t-toast',
            message: "评论信息加载失败",
            duration: 1000,
            theme: 'error',
            direction: 'column',
          });
        } else {
          this.setData({
            reviews: res.data.reviews,
            noReview: (res.data.reviews.length == 0)
          })
        }
      }
    });
  },

  jump2Student(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      /* 学生详情页url */
      url: '/pages/info/index' + '?sId=' + this.data.students[index].sId
    })
  },

});