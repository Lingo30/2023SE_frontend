import Toast from 'tdesign-miniprogram/toast/index';
// pages/items/manage/2_ongoing/index.js
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
        sAvatarUrl: "string1",
        sSchool: "北京航空航天大学"
      },
      {
        sId: "2",
        sName: "string2",
        sAvatarUrl: "string2",
        sSchool: "string2"
      }, {
        sId: "3",
        sName: "string1",
        sAvatarUrl: "string1",
        sSchool: "北京航空航天大学"
      }, {
        sId: "4",
        sName: "string1",
        sAvatarUrl: "string1",
        sSchool: "北京航空航天大学"
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
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
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
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
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
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
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
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  },

  end() {
    wx.request({
      url: getApp().globalData.baseUrl + '/endTheItem',
      method: 'post',
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (res.data.success) {
          console.log("success!!!");
          Toast({
            context: this,
            selector: '#t-toast',
            message: "项目成功结束",
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
            message: "项目结束失败",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "信息结束失败",
          duration: 1500,
          theme: 'error',
          direction: 'column',
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  }

});