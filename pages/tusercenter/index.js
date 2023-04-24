// pages/tusercenter/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarValue: '/pages/usercenter/index',
    tabbarList: getApp().globalData.tabbarList2,
    avatar: 'https://i.postimg.cc/vTSPVvKZ/default-Avatar.png',
    username: "teacher",
    title: "教授",
    university: "北京航空航天大学",
    department: "计算机科学与技术",
    education: "default",
    labExperience: "default",
    articles: "default",
    selfHome: "default",
    pdf: "",
  },

  init() {
    wx.request({
      url: getApp().globalData.baseUrl + '/tuser',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        useId: false,
        id: ""
      },
      success: (res) => {
        if (res.data.result == 1) {
          this.setData({
            avatar: res.data.avatar,
            username: res.data.username,
            university: res.data.university,
            title: res.data.title,
            department: res.data.department,
            education: res.data.education,
            labExperience: res.data.labExperience,
            articles: res.data.articles,
            selfHome: res.data.selfHome,
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
      url: '/pages/tusercenter/edit/index',
    });
  },

  previewPDF() {
    wx.request({
      url: getApp().globalData.baseUrl + '/user/pdf',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        useId: false,
        id: ""
      },
      success: (res) => {
        if (res.data.result == 1) {
          this.pdf = res.data.pdf;
          wx.downloadFile({
            url: this.pdf,
            success: (res) => {
              console.log("pdf协议文件已下载")
              let path = res.tempFilePath;
              wx.openDocument({
                filePath: path,
                fileType: 'pdf',
                success: (rest) => {
                  console.log('打开文件成功')
                },
                fail: (error) => {
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
            fail: (err) => {
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
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "加载文件失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
          return
        }
      }
    });
  },

  logout() {
    wx.clearStorage();
    wx.setStorage({
      key: 'login',
      data: false,
    });
    wx.redirectTo({
      url: '/pages/login/index',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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

  },
  onTabbarChange(e) {
    this.setData({
      tabbarValue: e.detail.value,
    });
    wx.redirectTo({
      url: e.detail.value,
    })
  },
})