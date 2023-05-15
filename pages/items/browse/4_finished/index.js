// pages/items/details/index.js
import Toast from 'tdesign-miniprogram/toast/index';
// TODO: 组内成员jump2Student()函数
Page({
  // 1. 全部数据
  data: {
    sId: '1',
    iId: "1",
    i_tLiked: false,
    iTitle: "计算机视觉图像去雾元学习MAMLReptileSGD自然语言处理",
    tName: "default",
    tPosition: "default",
    tAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    iNum: null,
    iCapacity: null,
    iPlace: "default",
    iDuration: 'n个月',
    tInfo: 'default',
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
    ],
    stars: 10,
    comment: "该学生积极参与项目，有合作意识，有钻研精神，总体超出预期。该学生积极参与项目，有合作意识，有钻研精神，总体超出预期。该学生积极参与项目，有合作意识，有钻研精神，总体超出预期。"
  },

  // 2. 生命周期函数---onLoad
  onLoad(options) {
    // 2-1. 获取项目id
    console.log("in onLoad() function");
    this.data.iId = options.iId;
    this.data.sId = options.sId;
    console.log("iId=", this.data.iId);
    console.log("sId=", this.data.sId);
    // 查询项目信息
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
      }
    });
    // 查询学生列表
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemStudents',
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
    // 查询导师评价
    wx.request({
      url: getApp().globalData.baseUrl + '/getReviewStudent',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId,
        sId: this.data.sId
      },
      success: (res) => {
        if (typeof res.data.stars === 'undefined') {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "评论加载失败",
            duration: 1000,
            theme: 'error',
            direction: 'column',
          });
        } else {
          this.setData({
            comment: res.data.comment,
            stars: res.data.stars
          });
          console.log(this.data.comment);
          console.log(this.data.stars);
        }
      }
    });
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
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      success: (res) => {
        tId = res.data.tId;
      }
    })
    wx.navigateTo({
      /* 导师详情页url */
      url: '/pages/tinfo/index' + '?tId=' + tId
    })
  },

  // 5. 学生详情函数
  jump2Student(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    console.log(this.data.students[index].sId);
    wx.navigateTo({
      /* 学生详情页url */
      url: '/pages/info/index' + '?sId=' + this.data.students[index].sId
    })
  },

});