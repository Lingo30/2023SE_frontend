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
    }
  },
  onShow: function () {
    updateManager();
  },
  globalData: {
    baseUrl: "https://intth1.2022martu1.cn",
    debugging: true,
    universities: ["北京航空航天大学", "北京大学", "清华大学", "中国人民大学"],
    departments: ["计算机科学与技术", "电子信息工程", "自动化科学与电气工程", "仪器科学与光电工程", "软件工程", "网络空间安全", "人工智能"],
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
        tabbarValue: '/pages/test/index',
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
        tabbarValue: '/pages/msg/msg',
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

});