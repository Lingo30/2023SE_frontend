// pages/tusercenter/edit/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "https://i.postimg.cc/vTSPVvKZ/default-Avatar.png",
    scroll_ctrl: true,
    username: "teacher",
    title: "教授",
    university: "北京航空航天大学",
    department: "计算机科学与技术",
    education: "default",
    labExperience: "default",
    articles: "default",
    selfHome: "default",
    departmentValue: "计算机科学与技术",
    departmentText: "计算机科学与技术",
    departments: [{
      label: "计算机科学与技术",
      value: "计算机科学与技术"
    }, {
      label: "电子信息工程",
      value: "电子信息工程"
    }, {
      label: "自动化科学与电气工程",
      value: "自动化科学与电气工程"
    }, {
      label: "仪器科学与光电工程",
      value: "仪器科学与光电工程"
    }, {
      label: "软件工程",
      value: "软件工程"
    }, {
      label: "网络空间安全",
      value: "网络空间安全"
    }, {
      label: "人工智能",
      value: "人工智能"
    }],
  },

  onColumnChange(e) {
    console.log('picker pick:', e);
  },

  onPickerChange(e) {
    console.log(e);
    const {
      key
    } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
      [`${key}Text`]: e.detail.label.join(" "),
      [`${key}Value`]: e.detail.value.join(" ")
    });
    this[`${key}Text`] = e.detail.label.join(" ");
    this[`${key}Value`] = e.detail.value.join(" ");
  },

  onPickerCancel(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  onDepartmentPicker() {
    this.setData({
      departmentVisible: true
    });
  },

  getInputValue(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.data[`${key}`] = e.detail.value;
  },

  init() {
    wx.setNavigationBarTitle({
      title: '编辑资料',
    })
    wx.hideHomeButton();
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
            departmentText: res.data.department,
            departmentValue: res.data.department,
            title: res.data.title,
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
          wx.redirectTo({
            url: '/pages/tusercenter/index',
          });
        }
      }
    })
  },

  onfocus() {
    this.setData({
      scroll_ctrl: false
    })
  },
  onblur() {
    this.setData({
      scroll_ctrl: true
    })
  },

  uploadAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['compressed'],
      success: (res) => {
        console.log(res.tempFiles[0].tempFilePath)
        let tempFilePath = res.tempFiles[0].tempFilePath;
        wx.uploadFile({
          url: getApp().globalData.baseUrl + '/user/uploadAvatar',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            'file': tempFilePath
          },
          header: {
            Authorization: wx.getStorageSync('token'),
          },
          success: (res2) => {
            let res2json = JSON.parse(res2.data);
            console.log(res2json)
            wx.request({
              url: 'https://console.tim.qq.com/v4/profile/portrait_set?sdkappid=1400807644&identifier=administrator&usersig=eJwtzNEKgjAYBeB32XXIr07dhC6UbswIo4i6VDb1L7QxR4uid8-Uy-Odw-mQ0*7oPKUmMfEcIKspo5C9wRonLkWHPQ5Gl*ahl8Eg7qVSKEjsUgAGUUjp3MiXQi1HD4LAA4BZDXZ-C5nvRxQ4X16wGf9vdlvsr7ZubePxnDJenJNUcpdlyYbnl0NUVezdZtAoWJPvD0uqM*4_&random=99999999&contenttype=json',
              method: 'POST',
              data: {
                From_Account: res2json.userEmail,
                ProfileItem: [{
                  "Tag": "Tag_Profile_IM_Image",
                  "Value": res2json.avaurl
                }]
              },
              success: (res) => {
                console.log("向IM导入头像成功")
              }
            })
            if (res2json.result == 1) {
              Toast({
                context: this,
                selector: '#t-toast',
                message: "修改成功！",
                duration: 2500,
                theme: 'success',
                direction: 'column',
              });
              this.setData({
                avatar: tempFilePath
              });
            } else {
              Toast({
                context: this,
                selector: '#t-toast',
                message: "上传失败！",
                duration: 2500,
                theme: 'error',
                direction: 'column',
              });
            }
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
    })
  },

  uploadPDF() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['.pdf'],
      success(res) {
        const tempFilePaths = res.tempFiles;
        console.log(tempFilePaths);
        wx.uploadFile({
          url: getApp().globalData.baseUrl + '/user/uploadPDF',
          filePath: tempFilePaths[0].path,
          name: 'file',
          formData: {
            'file': tempFilePaths[0].path
          },
          header: {
            Authorization: wx.getStorageSync('token'),
          },
          success: (res) => {
            let resjson = JSON.parse(res.data);
            if (resjson.result == 1) {
              Toast({
                context: this,
                selector: '#t-toast',
                message: "上传成功！",
                duration: 2500,
                theme: 'success',
                direction: 'column',
              });
            } else {
              Toast({
                context: this,
                selector: '#t-toast',
                message: resjson.msg,
                duration: 2500,
                theme: 'error',
                direction: 'column',
              });
            }
          },
          fail: (err) => {
            console.log(err)
          }
        })
      },
    })
  },

  finishEdit() {
    wx.request({
      url: getApp().globalData.baseUrl + '/tuser/edit',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        username: this.data.username,
        department: this.data.departmentValue,
        title: this.data.title,
        education: this.data.education,
        labExperience: this.data.labExperience,
        articles: this.data.articles,
        selfHome: this.data.selfHome
      },
      success: (res) => {
        if (res.data.result == 1) {
          console.log(this.data.username)
          wx.request({
            url: 'https://console.tim.qq.com/v4/profile/portrait_set?sdkappid=1400807644&identifier=administrator&usersig=eJwtzNEKgjAYBeB32XXIr07dhC6UbswIo4i6VDb1L7QxR4uid8-Uy-Odw-mQ0*7oPKUmMfEcIKspo5C9wRonLkWHPQ5Gl*ahl8Eg7qVSKEjsUgAGUUjp3MiXQi1HD4LAA4BZDXZ-C5nvRxQ4X16wGf9vdlvsr7ZubePxnDJenJNUcpdlyYbnl0NUVezdZtAoWJPvD0uqM*4_&random=99999999&contenttype=json',
            method: 'POST',
            data: {
              From_Account: res.data.userEmail,
              ProfileItem: [{
                "Tag": "Tag_Profile_IM_Nick",
                "Value": this.data.username
              }]
            },
            success: (res) => {
              console.log("修改昵称成功")
            }
          })
          Toast({
            context: this,
            selector: '#t-toast',
            message: "修改成功",
            duration: 2500,
            theme: 'success',
            direction: 'column',
          });
          wx.redirectTo({
            url: '/pages/tusercenter/index',
          })
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "修改失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    })
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