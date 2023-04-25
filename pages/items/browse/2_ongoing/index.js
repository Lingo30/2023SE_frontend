// pages/items/details/index.js
import Toast from 'tdesign-miniprogram/toast/index';
// TODO: 组内成员jump2Student()函数
Page({
  // 1. 全部数据
  data: {
    iId: "1",
    i_tLiked: false,
    iTitle: "计算机视觉图像去雾元学习MAMLReptileSGD自然语言处理",
    tName: "default",
    tPosition: "default",
    iNum: null,
    iCapacity: null,
    iPlace: "default",
    iDuration: 'n个月',
    tInfo: 'default',
    tAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    iTime: 'YYYY年M月D日',
    iType: '线上',
    iInfo: 'default',
    imgSrc: '',
    students: [{
        sId: "1",
        sName: "string1",
        sAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        sSchool: "北京航空航天大学"
      },
      {
        sId: "2",
        sName: "string2",
        sAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        sSchool: "string2"
      }, {
        sId: "3",
        sName: "string1",
        sAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        sSchool: "北京航空航天大学"
      }, {
        sId: "4",
        sName: "string1",
        sAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        sSchool: "北京航空航天大学"
      },
    ]
  },

  // 2. 生命周期函数---onLoad
  onLoad(options) {
    // 2-1. 获取项目id
    console.log("in onLoad() function");
    this.data.iId = options.iId;
    console.log("iId=", this.data.iId);
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemInfo',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        console.log("success!!!");
        console.log(res);
        this.setData({
          iTitle: res.data.iTitle,
          iNum: res.data.iNum,
          iCapacity: res.data.iCapacity,
          iDuration: res.data.iDuration,
          iPlace: res.data.iPlace,
          tAvatarUrl: res.data.tAvatarUrl,
          tName: res.data.tName,
          tPosition: res.data.tPosition,
          tInfo: res.data.tInfo,
          iTime: res.data.iTime,
          iType: res.data.iType,
          iInfo: res.data.iInfo,
          i_tLiked: res.data.i_tLiked,
          internlist: res.data.otherItems
        });
        console.log(this.data.internlist);
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "信息加载失败",
          duration: 2500,
          theme: 'error',
          direction: 'column',
        });
        wx.navigateBack();
      }
    });
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemStudents',
      method: 'post',
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
      }
    });
  },

  // 3. 收藏函数
  star() {
    console.log(this.data.iId);
    wx.request({
      url: getApp().globalData.baseUrl + '/likeOrUnlike',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (res.data.success) {
          this.setData({
            i_tLiked: !this.data.i_tLiked
          });
          Toast({
            context: this,
            selector: '#t-toast',
            message: this.data.i_tLiked ? '收藏操作成功' : '取消收藏成功',
            icon: this.data.i_tLiked ? 'star-filled' : 'star',
            direction: 'column',
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "收藏操作失败！",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
    })
  },

  // 4. 导师详情函数
  jump2Mentor() {
    let tId = '1';
    wx.request({
      url: getApp().globalData.baseUrl + '/getTId',
      method: "post",
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        tId = res.data.tId;
      }
    })
    wx.navigateTo({
      /* 导师详情页url */
      url: '/pages/tinfo/index' + '?tId=' + this.data.tId
    })
  },

  // 5. 学生详情函数
  jump2Student(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      /* 学生详情页url */
      url: '/pages/info/index' + '?sId=' + this.data.students[index].sId
    })
  },

  // 6. 沟通跳转
  jump2chat() {
    wx.request({
      url: getApp().globalData.baseUrl + '/getTId',
      method: 'post',
      data: {
        iId: this.data.iId
      },
      success: (res) => {
        if (res.data.success) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '即将跳转至沟通页面！',
            duration: 1500,
            icon: 'loading',
            direction: 'column',
          });
          // 5-2. 跳转
          wx.navigateTo({
            // TODO: 沟通页面url
            url: 'TODO-url' + '?tId' + res.data.tId
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "跳转失败，请稍后重试",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: "跳转失败，请稍后重试",
          duration: 2500,
          theme: 'error',
          direction: 'column',
        });
      }
    });
  }

});