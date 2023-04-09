import updateManager from './common/updateManager';

App({
  onLaunch: function () {},
  onShow: function () {
    updateManager();
  },
  globalData: {
    baseUrl: "http://114.116.221.67:8000",
    // baseUrl: "http://localhost:8000",
    universities: ["北京航空航天大学", "北京大学", "清华大学", "中国人民大学"],
    departments: ["计算机科学与技术", "电子信息工程", "自动化科学与电气工程", "仪器科学与光电工程", "软件工程", "网络空间安全", "人工智能"],

  },

});