// pages/usercenter/company/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyEmail: "",
    hasInterAuthority: false,
    interEmail: "",
    checkCode: "",
    emailValue: "",
    emailText: "",
    emails: [{
      label: '@huawei.com',
      value: '@huawei.com'
    }],

  },

  init() {
    wx.setNavigationBarTitle({
      title: '企业认证',
    })
    wx.hideHomeButton();
    wx.request({
      url: getApp().globalData.baseUrl + '/community/checkInter',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'POST',
      success: (res) => {
        this.data.hasInterAuthority = res.data.result;
        this.data.interEmail = res.data.email;
        this.setData({
          hasInterAuthority: res.data.result,
          interEmail: res.data.email
        })
      },
    });
  },

  onColumnChange(e) {
    console.log('picker pick:', e);
  },

  onPickerChange(e) {
    console.log(e);
    const {
      key
    } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
      [`${key}Text`]: e.detail.label.join(" "),
      [`${key}Value`]: e.detail.value.join(" ")
    });
    this[`${key}Text`] = e.detail.label.join(" ");
    this[`${key}Value`] = e.detail.value.join(" ");
  },

  onPickerCancel(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  onEmailPicker() {
    this.setData({
      emailVisible: true
    });
  },

  getInputValue(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this[`${key}`] = e.detail.value;
  },

  sendCheckCode() {
    let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
    let email = this.companyEmail + this.emailValue;
    if (!reg.test(email)) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '邮箱格式不符合要求！',
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
      return;
    }
    wx.request({
      url: getApp().globalData.baseUrl + '/sendCheckCode',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      method: 'post',
      data: {
        email: email,
      },
      success: (res) => {
        if (res.data.result == 1) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.msg,
            duration: 2500,
            theme: 'success',
            direction: 'column',
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.msg,
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    });
  },

  verify() {
    if (!this.companyEmail || !this.emailValue || !this.checkCode) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请完整输入认证信息！',
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
    } else {
      wx.request({
        url: getApp().globalData.baseUrl + '/user/companyVerify',
        method: 'post',
        header: {
          Authorization: wx.getStorageSync('token'),
        },
        data: {
          email: this.companyEmail + this.emailValue,
          checkCode: this.checkCode
        },
        success: (res) => {
          if (res.data.result == 1) {
            Toast({
              context: this,
              selector: '#t-toast',
              message: res.data.msg,
              duration: 2500,
              theme: 'success',
              direction: 'column',
            });
            wx.redirectTo({
              url: '/pages/usercenter/index',
            });
          } else {
            Toast({
              context: this,
              selector: '#t-toast',
              message: res.data.msg,
              duration: 2500,
              theme: 'error',
              direction: 'column',
            });
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.init()
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