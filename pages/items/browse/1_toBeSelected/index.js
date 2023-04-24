// pages/items/details/index.js
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  // 1. 全部数据
  data: {
    iId: "default",
    i_tLiked: false,
    iTitle: "计算机视觉图像去雾元学习MAMLReptileSGD自然语言处理",
    tName: "default",
    tPosition: "default",
    iNum: null,
    iCapacity: null,
    iPlace: "default",
    iDuration: 'n个月',
    tInfo: 'default',
    tAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    iTime: 'YYYY年M月D日',
    iType: '线上',
    iInfo: 'default',
    imgSrc: '',
    internlist: [{
      iCapacity: 3,
      iContent: "胶囊机器人三维感知与图传系统",
      iId: "17",
      iNum: 0,
      iPlace: "ACT",
      iTitle: "胶囊机器人三维感知与图传系统",
      tName: "杨建磊",
      tPosition: "副教授  博士生导师"
    }, {
      iCapacity: 3,
      iContent: "胶囊机器人三维感知与图传系统",
      iId: "17",
      iNum: 0,
      iPlace: "ACT",
      iTitle: "胶囊机器人三维感知与图传系统",
      tName: "杨建磊",
      tPosition: "副教授  博士生导师"
    }]
  },

  // 2. 生命周期函数---onLoad
  onLoad(options) {
    // 2-1. 获取项目id
    console.log("in onLoad() function");
    this.data.iId = options.iId;
    console.log("iId=", this.data.iId);
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
        console.log(res);
        this.setData({
          iTitle: res.data.iTitle,
          iNum: res.data.iNum,
          iCapacity: res.data.iCapacity,
          iDuration: res.data.iDuration,
          iPlace: res.data.iPlace,
          tAvatarUrl: res.data.tAvatarUrl,
          tName: res.data.tName,
          tPosition: res.data.tPosition,
          tInfo: res.data.tInfo,
          iTime: res.data.iTime,
          iType: res.data.iType,
          iInfo: res.data.iInfo,
          i_tLiked: res.data.i_tLiked,
          internlist: res.data.otherItems
        });
        console.log(this.data.internlist);
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
    });
  },

  // 3. 收藏函数
  star() {
    console.log(this.data.iId);
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
    wx.navigateTo({
      /* 导师详情页url */
      url: 'TODO_url' + '?iId=' + this.data.iId
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

  // 7. 其他项目跳转
  jump2Item(e) {
    let targetIId = (this.data.internlist)[e.currentTarget.id].iId;
    wx.navigateTo({
      url: '/pages/items/browse/0_details/index?iId=' + targetIId,
    })
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