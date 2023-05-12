// pages/login/index.js
import Toast from 'tdesign-miniprogram/toast/index';
import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin';
import {
  genTestUserSig
} from '../../debug/GenerateTestUserSig';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    config: {
      userID: '', //User ID
      SDKAPPID: 1400807644, // Your SDKAppID
      SECRETKEY: 'cbb4a6665a6cff26f55674d6c232d78c29a5cb9fdbe477df9c61cab8a04822c8', // Your secretKey
      EXPIRETIME: 604800,
    },
    isRegister: 0,
    userId: '',
    username: '',
    password: '',
    password2: '',
    checkCode: '',
    emailValue: '',
    emailText: '',
    emails: [{
        label: '@buaa.edu.cn',
        value: '@buaa.edu.cn',
      },
      {
        label: '@pku.edu.cn',
        value: '@pku.edu.cn',
      },
      {
        label: '@thu.edu.cn',
        value: '@thu.edu.cn',
      },
      {
        label: '@ruc.edu.cn',
        value: '@thu.edu.cn',
      },
    ],
    universityValue: '',
    universityText: '',
    universities: [{
        label: '北京航空航天大学',
        value: '@buaa.edu.cn',
      },
      {
        label: '北京大学',
        value: '@pku.edu.cn',
      },
      {
        label: '清华大学',
        value: '@thu.edu.cn',
      },
      {
        label: '中国人民大学',
        value: '@ruc.edu.cn',
      },
    ],
    userTypeValue: '',
    userTypeText: '',
    userTypes: [{
        label: '学生',
        value: 'student',
      },
      {
        label: '导师',
        value: 'teacher',
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
      [`${key}Text`]: e.detail.label.join(' '),
      [`${key}Value`]: e.detail.value.join(' '),
    });
    this[`${key}Text`] = e.detail.label.join(' ');
    this[`${key}Value`] = e.detail.value.join(' ');
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
      emailVisible: true,
    });
  },

  onUniversityPicker() {
    this.setData({
      universityVisible: true,
    });
  },

  onUserTypePicker() {
    this.setData({
      userTypeVisible: true,
    });
  },

  onTabsClick(e) {
    this.setData({
      isRegister: e.detail.value,
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
      const reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
      const email = this.userId + this.emailValue;
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
        url: `${getApp().globalData.baseUrl}/login`,
        method: 'post',
        data: {
          userId: this.userId + this.emailValue,
          password: this.password,
        },
        success: (res) => {
          console.log(this.userId + this.emailValue);
          this.setData({
            "config.userID": this.userId + this.emailValue
          })
          const userSig = genTestUserSig(this.data.config).userSig
          wx.$chat_SDKAppID = this.data.config.SDKAPPID;
          wx.$chat_userID = this.data.config.userID;
          wx.$chat_userSig = userSig;
          wx.$TUIKitTIM = TIM;
          wx.$TUIKit.registerPlugin({
            'tim-upload-plugin': TIMUploadPlugin
          });
          wx.$TUIKit.registerPlugin({
            'tim-profanity-filter-plugin': TIMProfanityFilterPlugin
          });
          wx.$TUIKit.login({
            userID: this.data.config.userID,
            userSig
          });
          wx.setStorage({
            key: 'currentUserID',
            data: [],
          });
          wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
          if (res.data.result == 1) {
            wx.setStorage({
              key: 'token',
              data: res.data.token,
            });
            wx.setStorage({
              key: "userType",
              data: res.data.userType
            });
            wx.setStorage({
              key: "username",
              data: res.data.username
            });
            if (res.data.userType == "student") {
              wx.redirectTo({
                url: '/pages/home/home',
              })
            } else if (res.data.userType == "teacher") {
              wx.redirectTo({
                url: '/pages/thome/thome',
              })
            } else {
              Toast({
                context: this,
                selector: '#t-toast',
                message: "登录失败！请重新登录",
                duration: 2500,
                theme: 'error',
                direction: 'column',
              });
              return
            }
            wx.setStorage({
              key: 'login',
              data: true,
            });
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
        },
      });
    }
  },

  register() {
    if (
      !this.username ||
      !this.userTypeValue ||
      !this.universityValue ||
      !this.userId ||
      !this.password ||
      !this.password2 ||
      !this.checkCode
    ) {
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
      const reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
      const email = this.userId + this.universityValue;
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
      // 向IM创建用户
      wx.request({
        url: 'https://console.tim.qq.com/v4/im_open_login_svc/account_import?sdkappid=1400807644&identifier=administrator&usersig=eJwtzEsLgkAUBeD-MltDrjrjC1oYRYseUFaDS2PGuJivcTAp*u*ZujzfOZwPuexjs5OKhMQ2gSzGjEKWGjMcORUFlthqlepKzYNW5GldoyChRQF88FxKp0b2NSo5OGPMBoBJNRZ-c33H8llAnfkFH8P-YRPxvFpH4kgtmZ3Ea8WN65k-gy42*m1TvXfyljT3THvJknx-V4I1Mw__&random=99999999&contenttype=json',
        method: 'POST',
        data: {
          UserID: this.userId + this.universityValue,
          Nick: this.username,
          FaceUrl: ""
        },
        success: (res) => {
          console.log("yes")
        }
      })
      wx.request({
        url: `${getApp().globalData.baseUrl}/register`,
        method: 'post',
        data: {
          username: this.username,
          userType: this.userTypeValue,
          university: this.universityText,
          userId: this.userId + this.universityValue,
          password: this.password,
          checkCode: this.checkCode,
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
        },
      });
    }
  },

  sendCheckCode() {
    const reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
    const email = this.userId + this.universityValue;
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
      url: `${getApp().globalData.baseUrl}/sendCheckCode`,
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
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad( /*options*/ ) {
    wx.setStorage({
      key: 'login',
      data: false,
    });
    wx.$TUIKit = TIM.create({
      SDKAppID: this.data.config.SDKAPPID
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

  // onUnload() {
  //   console.log(wx.$TUIKit)
  //   wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
  // },
  onSDKReady() {}

});