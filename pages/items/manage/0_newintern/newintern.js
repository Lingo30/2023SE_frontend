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
    numOfSkills: 0,
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
    this.data.starttime = value;
    console.log('starttime', this.data.starttime);
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
    this.data.duration = value[0];
    console.log('duration:', this.data.duration);
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
    this.data[`${key}`] = e.detail.value;
  },

  getSkills(e) {
    const {
      key
    } = e.currentTarget.dataset;
    // console.log(key)
    this.setData({
      skills: e.detail.value
    })
    console.log('skills:', this.data.skills);
  },

  // 提交
  submit() {
    console.log(this.data)
    if (
      !this.data.title ||
      !this.data.content ||
      !this.data.duration ||
      !this.data.starttime ||
      !this.data.capacity ||
      !this.data.skills ||
      !this.data.type ||
      !this.data.brief
    ) {
      console.log(
        this.data.title,
        this.data.content,
        this.data.duration,
        this.data.starttime,
        this.data.capacity,
        this.data.skills,
        this.data.type,
        this.data.brief,
      );
      Toast({
        context: this,
        selector: '#t-toast',
        message: '提交前请填写完整信息',
        duration: 1500,
        theme: 'warning',
        direction: 'column',
      });
    } else {
      const tagstmp = {};
      tagstmp.skills = this.data.skills;
      tagstmp.type = this.data.type;
      console.log('tags:', tagstmp);
      wx.request({
        url: `${getApp().globalData.baseUrl}/newItem`,
        header: {
          Authorization: wx.getStorageSync('token'),
        },
        method: 'POST',
        data: {
          title: this.data.title,
          content: this.data.content,
          duration: this.data.duration,
          time: this.data.starttime,
          capacity: this.data.capacity,
          tags: tagstmp,
          brief: this.data.brief,
        },
        success: (res) => {
          console.log(res.data.result);
          if (res.data.result == 1) {
            Toast({
              context: this,
              selector: '#t-toast',
              message: '提交成功！',
              duration: 1500,
              theme: 'success',
              direction: 'column',
            });
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/thome/thome',
              })
            }, 1500);
          } else {
            Toast({
              context: this,
              selector: '#t-toast',
              message: '提交失败，请稍后重试',
              duration: 2500,
              theme: 'warning',
              direction: 'column',
            });
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
      // TODO: 清空skillsToPass缓存
      getApp().globalData.skillsToPass = {
        skillIds: [],
        skillNames: [],
        id2selected: {}
      };
      console.log(getApp().globalData.skillsToPass);
  },

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
    this.checkLogin();
    // TODO: 从缓存中读取skillsToPass
    const getSkills = getApp().globalData.skillsToPass.skillIds;
    console.log(getSkills.length);
    this.setData({
      skills: getSkills,
      numOfSkills: getSkills.length
    });
    console.log(this.data.skills);
  },

  onTabbarChange(e) {
    this.setData({
      tabbarValue: e.detail.value,
    });
    wx.redirectTo({
      url: e.detail.value,
    })
  },

  jump2skills() {
    wx.navigateTo({
      url: '/pages/skills/index'
    });
  }
});