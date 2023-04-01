import updateManager from './common/updateManager';

App({
  onLaunch: function () {},
  onShow: function () {
    updateManager();
  },
  globalData: {
    baseUrl: "http://10.192.14.249:8000",
  },

});