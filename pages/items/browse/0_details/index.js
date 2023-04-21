// pages/items/details/index.js
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  // 1. 全部数据
  data: {
    iId: "123",
    i_tLiked: true,
    iTitle: '计算机视觉',
    tName: '刘偲',
    tPosition: '教授',
    iNum: 2,
    iCapacity: 3,
    iPlace: '北京航空航天大学',
    iDuration: '3个月',
    tInfo: '以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介',
    // item_info: 365
    iTime: '2023年4月15日',
    iType: '线上',
    iInfo: '以下是项目简介以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简介以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简介以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简介以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简以下是项目简',
    imgSrc: '',
    internlist: [],
  },

  // 2. 生命周期函数---onLoad
  onLoad( /*options*/ ) {
    // 2-1. 获取项目id
    console.log("in onLoad() function");
    this.data.iId = "TODO";
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemInfo',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        console.log("success!!!");
        this.setData({
          iTitle: res.data.iTitle,
          iNum: res.data.iNum,
          iCapacity: res.data.iCapacity,
          iDuration: res.data.iDuration,
          iPlace: res.data.iPlace,
          // TODO: 其实应该新增一个tAvatar，但是我太懒了
          tName: res.data.tName,
          tPosition: res.data.tPosition,
          tInfo: res.data.tInfo,
          iTime: res.data.iTime,
          iType: res.data.iType,
          iInfo: res.data.iInfo,
          i_tLiked: res.data.i_tLiked,
          internlist: res.data.otherItems
        });
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "信息加载失败",
          duration: 2500,
          theme: 'error',
          direction: 'column',
        });
        wx.navigateBack();
      }
    })
  },

  // 3. 收藏函数
  star() {
    wx.request({
      url: getApp().globalData.baseUrl + '/likeOrUnlike',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (res.data.success) {
          this.setData({
            i_tLiked: !this.data.i_tLiked
          });
          Toast({
            context: this,
            selector: '#t-toast',
            message: this.data.i_tLiked ? '收藏操作成功' : '取消收藏成功',
            icon: this.data.i_tLiked ? 'star-filled' : 'star',
            direction: 'column',
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "收藏操作失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    })
  },

  // 4. 导师详情函数
  jump2Mentor() {
    console.log("Bind-tap成功！！！");
    wx.navigateTo({
      /* 导师详情页url */
      url: 'TODO_url' + '?iId=' + this.data.iId
    })
  },

  // 5. 申请项目页面
  apply() {
    // 5-1. request
    wx.request({
      url: getApp().globalData.baseUrl + '/apply',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (res.data.success) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '申请成功！',
            duration: 1500,
            icon: 'check-circle',
            direction: 'column',
          });
          // 5-2. 跳转
          wx.navigateBack();
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "申请失败，请稍后重试",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    })

  },

  // 6. 沟通跳转
  jump2chat() {
    wx.request({
      url: getApp().globalData.baseUrl + '/getTId',
      method: 'post',
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (res.data.success) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '即将跳转至沟通页面！',
            duration: 1500,
            icon: 'loading',
            direction: 'column',
          });
          // 5-2. 跳转
          wx.navigateTo({
            // TODO: 沟通页面url
            url: 'TODO-url' + '?tId' + res.data.tId
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "跳转失败，请稍后重试",
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
          message: "跳转失败，请稍后重试",
          duration: 2500,
          theme: 'error',
          direction: 'column',
        });
      }
    });
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