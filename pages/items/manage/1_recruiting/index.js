import Toast from 'tdesign-miniprogram/toast/index';

// pages/items/manage/1_recruiting/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iId: '1',
    iTitle: "这是一个特别长的标题元学习算法研究",
    iNum: 6,
    iCapacity: 4,
    iTime: "2023-12-31",
    iDuration: "7个月",
    iType: "线上",
    students: [],
    checkList: [],
    // 复用zlb
    mode: '',
    dateVisible: false,
    date: new Date('2021-12-23').getTime(), // 支持时间戳传入
    dateText: '',
    capacity: 4,
    start: '2023-01-01 00:00:00',
    end: '2030-09-09 12:12:12',
    starttime: "2023-12-31",
    duration: '7个月',
    tName: 'default',
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
    confirmBtn: {
      content: '确定',
      variant: 'base'
    },
    dialogKey: '',
    showConfirm: false,
    showWarnConfirm: false,
    showTooLongBtnContent: false,
    showMultiBtn: false,
    multiBtnList: [{
        content: '次要按钮',
        theme: 'light'
      },
      {
        content: '次要按钮',
        theme: 'light'
      },
      {
        content: '主要按钮',
        theme: 'primary'
      },
      
    ],
  },

  showPicker(e) {
    const {
      mode
    } = e.currentTarget.dataset;
    console.log("mode=", mode);
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

  onLoad(options) {
    console.log("in onLoad() function");
    this.data.iId = options.iId;
    console.log(options);
    console.log("iId=", this.data.iId);
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemShortInfo',
      method: 'post',
      data: {
        iId: this.data.iId
      },
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      success: (res) => {
        if (res.data.success) {
          console.log("success!!!");
          console.log(res);
          this.setData({
            iTitle: res.data.iTitle,
            iNum: res.data.iNum,
            iCapacity: res.data.iCapacity,
            iDuration: res.data.iDuration,
            iTime: res.data.iTime,
            iType: res.data.iType,
            capacity: res.data.iCapacity,
            starttime: res.data.iTime,
            duration: String(res.data.iDuration)
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "信息加载失败",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "信息加载失败",
          duration: 1500,
          theme: 'error',
          direction: 'column',
        });
        wx.navigateBack();
      }
    });
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemApplicants',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (res.data.success) {
          console.log("success!!!");
          console.log(res);
          this.setData({
            students: res.data.students
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "信息加载失败",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "信息加载失败",
          duration: 1500,
          theme: 'error',
          direction: 'column',
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
    // 获取导师姓名
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
          this.data.tName = res.data.username;
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

  submitItemMod() {
    if (this.data.capacity == this.data.iCapacity && this.data.duration == this.data.iDuration && this.data.starttime == this.data.iTime) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "未对项目信息进行修改",
        duration: 1500,
        theme: 'error',
        direction: 'column',
      });
    } else {
      wx.request({
        url: getApp().globalData.baseUrl + '/modifyItem',
        method: 'post',
        data: {
          iId: this.data.iId,
          time: this.data.starttime,
          capacity: this.data.capacity,
          duration: this.data.duration
        },
        header: {
          Authorization: wx.getStorageSync('token')
        },
        success: (res) => {
          if (res.data.success) {
            console.log("success!!!");
            Toast({
              context: this,
              selector: '#t-toast',
              message: "修改成功",
              duration: 1500,
              theme: 'success',
              direction: 'column',
            });
          } else {
            Toast({
              context: this,
              selector: '#t-toast',
              message: "修改失败，请稍后重试",
              duration: 1500,
              theme: 'error',
              direction: 'column',
            });
          }
        },
        fail: () => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "修改失败，请稍后重试",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
        }
      });
    }
  },

  check(e) {
    this.data.checkList = e.detail.value;
    console.log(e.detail.value);
  },

  reject() {
    // request + 刷新当前页
    const sIds = this.data.checkList.map(i => this.data.students[i].sId);
    // 调用 '/reject' 接口
    console.log(this.data.tName);
    wx.request({
      url: getApp().globalData.baseUrl + '/reject',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId,
        sIds: sIds,
        time: new Date(),
        text: "很遗憾地通知您，您没有通过【" + this.data.tName + "】老师【" + this.data.iTitle + "】项目的审核，请尝试报名其他项目，不要灰心，再接再厉！"
      },
      success: (res) => {
        // TODO
        if (res.data.success) {
          console.log("success!!!");
          Toast({
            context: this,
            selector: '#t-toast',
            message: "成功拒绝申请！",
            duration: 1500,
            theme: 'success',
            direction: 'column',
          });
          const pages = getCurrentPages();
          const currentPage = pages[pages.length - 1];
          wx.navigateBack({
            delta: pages.length - 1,
            success: function () {
              currentPage.setData({
                iId: this.data.iId
              });
            }
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "拒绝申请失败",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
        }
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "拒绝申请失败",
          duration: 1500,
          theme: 'error',
          direction: 'column',
        });
      }
    });
  },

  accept() {
    // request + 跳回上一页
    this.closeDialog();
    const sIds = this.data.checkList.map(i => this.data.students[i].sId);
    let tName = "default";
    
    // 调用 '/startTheMFIntern' 接口
    wx.request({
      url: getApp().globalData.baseUrl + '/startTheMFIntern',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId,
        sIds: sIds,
        time: new Date(),
        text: "恭喜您！您已经通过【" + this.data.tName + "】老师【" + this.data.iTitle + "】项目的审核，项目已经正式立项，请联系导师开始研究吧！"
      },
      success: (res) => {
        if (res.data.success) {
          console.log("success!!!");
          Toast({
            context: this,
            selector: '#t-toast',
            message: "已成功立项！",
            duration: 1000,
            theme: 'success',
            direction: 'column',
          });
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/thome/thome'
            });
          }, 1000);
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "立项失败",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
          wx.navigateBack();
        }
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "立项失败",
          duration: 1500,
          theme: 'error',
          direction: 'column',
        });
      }
    });
  },

  showDialog(e) {
    const curr_num = this.data.checkList.length;
    if (curr_num > this.data.iCapacity) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "挑选人数超过预计容量",
        duration: 1500,
        theme: 'error',
        direction: 'column',
      });
    } else if (curr_num < this.data.iCapacity) {
      const {
        key
      } = e.currentTarget.dataset;
      console.log(key);
      this.setData({
        [key]: true,
        dialogKey: key
      });
    } else {
      const sIds = this.data.checkList.map(i => this.data.students[i].sId);
      wx.request({
        url: getApp().globalData.baseUrl + '/startTheMFIntern',
        method: 'post',
        header: {
          Authorization: wx.getStorageSync('token'),
        },
        data: {
          iId: this.data.iId,
          sIds: sIds
        },
        success: (res) => {
          if (res.data.success) {
            console.log("success!!!");
            Toast({
              context: this,
              selector: '#t-toast',
              message: "已成功立项！",
              duration: 1000,
              theme: 'success',
              direction: 'column',
            });
            setTimeout(() => {
              // TODO: 这里应该跳转至带选中页面
              wx.navigateTo({
                url: '/pages/thome/thome'
              });
            }, 1000);
          } else {
            Toast({
              context: this,
              selector: '#t-toast',
              message: "立项失败",
              duration: 1500,
              theme: 'error',
              direction: 'column',
            });
            wx.navigateBack();
          }
        },
        fail: () => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "立项失败",
            duration: 1500,
            theme: 'error',
            direction: 'column',
          });
        }
      });
    }
  },

  closeDialog() {
    const {
      dialogKey
    } = this.data;
    console.log(this.data);
    this.setData({
      [dialogKey]: false
    });
  },

  jump2Student(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      /* 学生详情页url */
      url: '/pages/info/index' + '?sId=' + this.data.students[index].sId
    })
  },

});