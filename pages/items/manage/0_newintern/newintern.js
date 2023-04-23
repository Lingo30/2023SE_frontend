// pages/newintern/newintern.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabbarValue: '/pages/items/manage/0_newintern/newintern',
    tabbarList: getApp().globalData.tabbarList2,
    mode: '',
    dateVisible: false,
    date: new Date('2021-12-23').getTime(), // 支持时间戳传入
    dateText: '',

    // 指定选择区间起始值
    start: '2023-01-01 00:00:00',
    end: '2030-09-09 12:12:12',
    title: '',
    content: '',
    brief: '',
    starttime: '',
    capacity: '',
    duration: '',
    skills: [],
    type: '',

    // 持续时间
    timeText: '',
    timeValue: [],
    timeTitle: '',
    times: [{
        label: '1个月',
        value: '1个月',
      },
      {
        label: '2个月',
        value: '2个月',
      },
      {
        label: '3个月',
        value: '3个月',
      },
      {
        label: '4个月',
        value: '4个月',
      },
      {
        label: '5个月',
        value: '5个月',
      },
      {
        label: '6个月',
        value: '6个月',
      },
      {
        label: '7个月',
        value: '7个月',
      },
      {
        label: '8个月',
        value: '8个月',
      },
      {
        label: '9个月',
        value: '9个月',
      },
      {
        label: '10个月',
        value: '10个月',
      },
      {
        label: '11个月',
        value: '11个月',
      },
      {
        label: '12个月',
        value: '12个月',
      },
    ],
  },
  showPicker(e) {
    const {
      mode
    } = e.currentTarget.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hidePicker() {
    const {
      mode
    } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  onConfirm(e) {
    const {
      value
    } = e.detail;
    const {
      mode
    } = this.data;

    // console.log('confim', value);

    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
    });
    this.starttime = value;
    console.log('starttime', this.starttime);
    this.hidePicker();
  },

  onColumnChange(e) {
    console.log('picker pick:', e);
  },

  onPickerChange(e) {
    const {
      key
    } = e.currentTarget.dataset;
    const {
      value
    } = e.detail;

    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Text`]: value.join(' '),
    });
    this.duration = value[0];
    console.log('duration:', this.duration);
  },

  onPickerCancel(e) {
    const {
      key
    } = e.currentTarget.dataset;
    console.log(e, '取消');
    console.log('picker1 cancel:');
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  onTitlePicker() {
    this.setData({
      timeVisible: true,
      timeTitle: '持续时间',
    });
  },

  getInputValue(e) {
    const {
      key
    } = e.currentTarget.dataset;
    console.log(key, e.detail.value);
    this[`${key}`] = e.detail.value;
  },

  getSkills(e) {
    const {
      key
    } = e.currentTarget.dataset;
    const tmp = e.detail.value.split(',');
    const list = [];
    for (let i = 0; i < tmp.length; i++) {
      list.push(tmp[i]);
    }
    this[`${key}`] = list;
    console.log('skills:', this.skills);
  },

  // 提交
  submit() {
    if (
      !this.title ||
      !this.content ||
      !this.duration ||
      !this.starttime ||
      !this.capacity ||
      !this.skills ||
      !this.type ||
      !this.brief
    ) {
      console.log(
        this.title,
        this.content,
        this.duration,
        this.starttime,
        this.capacity,
        this.skills,
        this.type,
        this.brief,
      );
      Toast({
        context: this,
        selector: '#t-toast',
        message: '提交前请填写完整信息！',
        duration: 2500,
        theme: 'warning',
        direction: 'column',
      });
    } else {
      const tagstmp = {};
      tagstmp.skills = this.skills;
      tagstmp.type = this.type;
      console.log('tags:', tagstmp);
      wx.request({
        url: `${getApp().globalData.baseUrl}/newItem`,
        header: {
          Authorization: wx.getStorageSync('token'),
        },
        method: 'POST',
        data: {
          title: this.title,
          content: this.content,
          duration: this.duration,
          time: this.starttime,
          capacity: this.capacity,
          tags: tagstmp,
          brief: this.brief,
        },
        success: () => {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              // 2秒后返回上一页
              // setTimeout(function () {
              //   wx.navigateBack({
              //     delta: 1
              //   })
              // }, 2000)
            },
          });
        },
      });
    }
    wx.redirectTo({
      url: '/pages/thome/thome',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad( /*options*/ ) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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
    this.checkLogin()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  onTabbarChange(e) {
    this.setData({
      tabbarValue: e.detail.value,
    });
    wx.redirectTo({
      url: e.detail.value,
    })
  },
});