import updateManager from './common/updateManager';

App({
  onLaunch: function () {
    const isLogin = wx.getStorageSync('login');
    const userType = wx.getStorageSync('userType');
    if (!this.globalData.debugging) {
      if (!isLogin) {
        // 跳转到登录页面
        wx.reLaunch({
          url: '/pages/login/index'
        })
      } else if (userType == "student") {
        wx.reLaunch({
          url: '/pages/home/home'
        })
      } else if (userType == "teacher") {
        wx.reLaunch({
          url: '/pages/thome/thome'
        })
      }
    };
    // wx.$TUIKit = TIM.create({
    //   SDKAppID: this.globalData.config.SDKAPPID,
    // });
    // const userSig = genTestUserSig(this.globalData.config).userSig
    // wx.$chat_SDKAppID = this.globalData.config.SDKAPPID;
    // wx.$TUIKitTIM = TIM;
    // wx.$chat_userID = this.globalData.config.userID;
    // wx.$chat_userSig = userSig;
    // wx.$TUIKit.registerPlugin({
    //   'tim-upload-plugin': TIMUploadPlugin
    // });
    // wx.$TUIKit.registerPlugin({
    //   'tim-profanity-filter-plugin': TIMProfanityFilterPlugin
    // });
    // wx.$TUIKit.login({
    //   userID: this.globalData.config.userID,
    //   userSig
    // });
    // // 监听系统级事件
    // wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
  },
  // onUnload() {
  //   wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady, this);
  // },
  onShow: function () {
    updateManager();
  },
  globalData: {
    baseUrl: "https://intth1.2022martu1.cn",
    debugging: true,
    universities: ["北京航空航天大学", "北京大学", "清华大学", "中国人民大学"],
    departments: ["计算机科学与技术", "电子信息工程", "自动化科学与电气工程", "仪器科学与光电工程", "软件工程", "网络空间安全", "人工智能"],
    // config: {
    //   userID: '123',
    //   SECRETKEY: 'cbb4a6665a6cff26f55674d6c232d78c29a5cb9fdbe477df9c61cab8a04822c8', // Your secretKey
    //   SDKAPPID: 1400807644, // Your SDKAppID
    //   EXPIRETIME: 604800,
    // },
    tabbarList1: [{
        tabbarValue: '/pages/home/home',
        label: '项目',
        icon: 'view-module'
      },
      {
        tabbarValue: '/pages/proflist/proflist',
        label: '导师',
        icon: 'tips'
      },
      {
        tabbarValue: '/TUI-conversationlist/pages/index',
        label: '消息',
        icon: 'notification'
      },
      {
        tabbarValue: '/pages/community/index',
        label: '社区',
        icon: 'home'
      },
      {
        tabbarValue: '/pages/usercenter/index',
        label: '我的',
        icon: 'user'
      },
    ],
    tabbarList2: [{
        tabbarValue: '/pages/thome/thome',
        label: '项目',
        icon: 'view-module'
      },
      {
        tabbarValue: '/pages/stulist/stulist',
        label: '学生',
        icon: 'user-talk'
      },
      {
        tabbarValue: '/pages/items/manage/0_newintern/newintern',
        label: '发布',
        icon: 'add'
      },
      {
        tabbarValue: '/TUI-conversationlist/pages/index',
        label: '消息',
        icon: 'notification'
      },
      {
        tabbarValue: '/pages/tusercenter/index',
        label: '我的',
        icon: 'user'
      },
    ],
    skillsToPass: null
  },
  // onSDKReady(event) {
  //   // 监听到此事件后可调用 SDK 发送消息等 API，使用 SDK 的各项功能。
  // }
});