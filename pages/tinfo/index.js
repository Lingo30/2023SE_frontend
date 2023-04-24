// pages/tinfo/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'https://i.postimg.cc/vTSPVvKZ/default-Avatar.png',
    userId: "",
    username: "student",
    university: "北京航空航天大学",
    department: "计算机科学与技术",
    title: "",
    email: "",
    education: "default",
    labExperience: "default",
    articles: "default",
    selfHome: "default",
    pdf: "",
    following: 0,
  },

  init() {
    wx.setNavigationBarTitle({
      title: '导师信息',
    })
    wx.hideHomeButton();
    wx.request({
      url: getApp().globalData.baseUrl + '/tuser',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        useId: true,
        id: this.data.userId
      },
      success: (res) => {
        if (res.data.result == 1) {
          this.setData({
            avatar: res.data.avatar,
            username: res.data.username,
            university: res.data.university,
            department: res.data.department,
            title: res.data.title,
            email: res.data.email,
            education: res.data.education,
            labExperience: res.data.labExperience,
            articles: res.data.articles,
            selfHome: res.data.selfHome,
            following: res.data.following
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

  jump2project() {
    wx.navigateTo({
      url: '/pages/otherinternlist/stuseeprof/index?tId=' + this.data.userId,
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
        useId: true,
        id: this.data.userId
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userId: options.tId
    })
    this.data.userId = options.tId
    this.init()
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

  },

  follow() {
    wx.request({
      url: getApp().globalData.baseUrl + '/user/follow',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        userId: this.data.userId
      },
      success: (res) => {
        if (res.data.result == 1) {
          if (this.following == 1) {
            this.setData({
              following: 0
            })
            this.following = 0;
          } else {
            this.setData({
              following: 1
            })
            this.following = 1
          }
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "收藏失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    })
  },

  jump2chat() {
    // todo
  },
})