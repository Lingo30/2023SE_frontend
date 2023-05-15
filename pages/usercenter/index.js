// pages/usercenter/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarValue: '/pages/usercenter/index',
    tabbarList: getApp().globalData.tabbarList1,
    avatar: 'https://i.postimg.cc/vTSPVvKZ/default-Avatar.png',
    username: "student",
    university: "北京航空航天大学",
    department: "计算机科学与技术",
    grades: "default",
    labExperience: "default",
    awards: "default",
    skillNames: [],
    pdf: "",
  },

  init() {
    wx.request({
      url: getApp().globalData.baseUrl + '/user',
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
            department: res.data.department,
            grades: res.data.grades,
            labExperience: res.data.labExperience,
            awards: res.data.awards,
            skillNames: res.data.skillNames,
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

  onTabbarChange(e) {
    this.setData({
      tabbarValue: e.detail.value,
    });
    wx.redirectTo({
      url: e.detail.value,
    })
  },
})