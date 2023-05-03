import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin';
import {
  genTestUserSig
} from '../../TUIKit/debug/GenerateTestUserSig';


Page({
  data: {
    tabbarValue: '/pages/test/index',
    tabbarList: [],
    config: {
      userID: '123', //User ID
      SDKAPPID: 1400807644, // Your SDKAppID
      SECRETKEY: 'cbb4a6665a6cff26f55674d6c232d78c29a5cb9fdbe477df9c61cab8a04822c8', // Your secretKey
      EXPIRETIME: 604800,
    }
  },


  onLoad() {
    const userSig = genTestUserSig(this.data.config).userSig
    wx.$TUIKit = TIM.create({
      SDKAppID: this.data.config.SDKAPPID
    })
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
  },
  onUnload() {
    wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
  },
  onSDKReady() {
    const TUIKit = this.selectComponent('#TUIKit');
    TUIKit.init();
  },

  checkLogin() {
    if (!getApp().globalData.debugging) {
      if (!wx.getStorageSync('login')) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "请登录后进入！",
          duration: 2500,
          theme: 'warning',
          direction: 'column',
        });
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }
    }
  },
  onShow() {
    this.checkLogin();
    if (wx.getStorageSync('userType') == "student") {
      this.setData({
        tabbarList: getApp().globalData.tabbarList1
      })
    } else if (wx.getStorageSync('userType') == "teacher") {
      this.setData({
        tabbarList: getApp().globalData.tabbarList2
      })
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "请登录后进入！",
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
      wx.redirectTo({
        url: '/pages/login/index',
      })
    }
  },
  onTabbarChange(e) {
    this.setData({
      tabbarValue: e.detail.value,
    });
    wx.redirectTo({
      url: e.detail.value,
    })
  },
});