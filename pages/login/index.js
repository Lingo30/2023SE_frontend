// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRegister: 0,
    userId: "",
    username: "",
    password: "",
    password2: "",
    checkCode: "",
    emailValue: "",
    emailText: "",
    emails: [{
        label: '@buaa.edu.cn',
        value: '@buaa.edu.cn'
      },
      {
        label: '@pku.edu.cn',
        value: '@pku.edu.cn'
      }, {
        label: '@thu.edu.cn',
        value: '@thu.edu.cn'
      }
    ],
    universityValue: "",
    universityText: "",
    universities: [{
        label: '北京航空航天大学',
        value: '@buaa.edu.cn'
      },
      {
        label: '北京大学',
        value: '@pku.edu.cn'
      }, {
        label: '清华大学',
        value: '@thu.edu.cn'
      }
    ],
    userTypeValue: "",
    userTypeText: "",
    userTypes: [{
        label: '学生',
        value: '0'
      },
      {
        label: '导师',
        value: '1'
      },
    ],
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
      [`${key}Value`]: e.detail.value.join(" "),
      [`${key}Text`]: e.detail.label.join(" ")
    });
  },

  onPickerCancel(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  onEmailPicker() {
    this.setData({
      emailVisible: true
    });
  },

  onUniversityPicker() {
    this.setData({
      universityVisible: true
    });
  },

  onUserTypePicker() {
    this.setData({
      userTypeVisible: true
    });
  },

  onTabsClick(e) {
    this.setData({
      isRegister: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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