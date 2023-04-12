// pages/usercenter/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'https://i.postimg.cc/vTSPVvKZ/default-Avatar.png',
    username: "student",
    university: "北京航空航天大学",
    department: "计算机科学与技术",
    grades: "default",
    labExperience: "default",
    awards: "default",
    skill: "default",
    pdf: "",
  },

  init() {
    this.getTabBar().init();
    wx.request({
      url: getApp().globalData.baseUrl + '/user',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {

      },
      success: (res) => {
        if (res.data.result == 1) {
          this.setData({
            avatar: res.data.avatar,
            username: res.data.username,
            university: res.data.university,
            department: res.data.department,
            grades: res.data.grades,
            labExperience: res.data.labExperience,
            awards: res.data.awards,
            skill: res.data.skill,
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "加载失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    })
  },

  jump2edit() {
    wx.navigateTo({
      url: '/pages/usercenter/edit/index',
    });
  },

  jump2project() {
    wx.navigateTo({
      url: '/pages/usercenter/project/index',
    });
  },

  jump2favor() {
    wx.navigateTo({
      url: '/pages/usercenter/favor/index',
    });
  },

  jump2company() {
    wx.navigateTo({
      url: '/pages/usercenter/company/index',
    });
  },

  // todo: maybe wrong
  previewPDF() {
    wx.request({
      url: getApp().globalData.baseUrl + '/user/pdf',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {

      },
      success: (res) => {
        if (res.data.result == 1) {
          this.pdf = res.data.pdf;
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "加载文件失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    });
    wx.downloadFile({
      url: this.pdf,
      success: function (res) {
        console.log("pdf协议文件已下载")
        let path = res.tempFilePath;
        wx.openDocument({
          filePath: path,
          fileType: 'pdf',
          success: function (rest) {
            console.log('打开文件成功')
            console.log(rest);
          },
          fail: function (error) {
            Toast({
              context: this,
              selector: '#t-toast',
              message: "打开文件失败！",
              duration: 2500,
              theme: 'error',
              direction: 'column',
            });
          },
        })
      },
      fail: function (err) {
        console.log('fail')
        console.log(err)
        Toast({
          context: this,
          selector: '#t-toast',
          message: "加载文件失败！",
          duration: 2500,
          theme: 'error',
          direction: 'column',
        });
      }
    })
  },

  logout() {
    wx.clearStorage();
    wx.redirectTo({
      url: '/pages/login/index',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
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
    this.init();
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