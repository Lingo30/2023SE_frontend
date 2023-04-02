// pages/login/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRegister: 0,
    userId: "",
    username: "",
    password: "",
    password2: "",
    checkCode: "",
    emailValue: "",
    emailText: "",
    emails: [{
        label: '@buaa.edu.cn',
        value: '@buaa.edu.cn'
      },
      {
        label: '@pku.edu.cn',
        value: '@pku.edu.cn'
      }, {
        label: '@thu.edu.cn',
        value: '@thu.edu.cn'
      }
    ],
    universityValue: "",
    universityText: "",
    universities: [{
        label: '北京航空航天大学',
        value: '@buaa.edu.cn'
      },
      {
        label: '北京大学',
        value: '@pku.edu.cn'
      }, {
        label: '清华大学',
        value: '@thu.edu.cn'
      }
    ],
    userTypeValue: "",
    userTypeText: "",
    userTypes: [{
        label: '学生',
        value: 'student'
      },
      {
        label: '导师',
        value: 'teacher'
      },
    ],
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

  onUniversityPicker() {
    this.setData({
      universityVisible: true
    });
  },

  onUserTypePicker() {
    this.setData({
      userTypeVisible: true
    });
  },

  onTabsClick(e) {
    this.setData({
      isRegister: e.detail.value
    });
  },

  getInputValue(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this[`${key}`] = e.detail.value;
  },

  login() {
    if (!this.userId || !this.emailValue || !this.password) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请完整输入登录信息！',
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
    } else {
      // console.log(this.userId + this.emailValue + this.password);
      wx.request({
        url: getApp().globalData.baseUrl + '/login',
        method: 'post',
        data: {
          userId: this.userId + this.emailValue,
          password: this.password
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.result == 1) {
            wx.setStorage({
              key: "token",
              data: res.data.token
            });
            Toast({
              context: this,
              selector: '#t-toast',
              message: res.data.msg,
              duration: 2500,
              theme: 'success',
              direction: 'column',
            });
            wx.redirectTo({
              url: '/pages/home/home',
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
    }
  },

  register() {
    if (!this.username || !this.userTypeValue || !this.universityValue || !this.userId || !this.password || !this.password2 || !this.checkCode) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请完整输入注册信息！',
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
    } else if (this.password != this.password2) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '两次输入密码不一致！',
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
    } else {
      wx.request({
        url: getApp().globalData.baseUrl + '/register',
        method: 'post',
        data: {
          username: this.username,
          userType: this.userTypeValue,
          university: this.universityText,
          userId: this.userId + this.universityValue,
          password: this.password,
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
              url: '/pages/login/index',
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

  sendCheckCode() {
    let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
    let email = this.userId + this.universityValue;
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