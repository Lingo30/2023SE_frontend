// pages/info/index.js
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
    email: "",
    grades: "default",
    labExperience: "default",
    awards: "default",
    skill: "default",
    pdf: "",
  },

  init() {
    wx.setNavigationBarTitle({
      title: '学生信息',
    })
    wx.hideHomeButton();
    wx.request({
      url: getApp().globalData.baseUrl + '/user',
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
            email: res.data.email,
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

  jump2project() {
    wx.navigateTo({
      url: '/pages/otherinternlist/profseestu/index?sId=' + this.data.userId,
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
      userId: options.sId
    })
    this.data.userId = options.sId
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

  jump2chat() {
    // todo
  }
})