// pages/items/manage/1_recruiting/index.js
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    iId: '1',
    iTitle: "这是一个特别长的标题元学习算法研究",
    iNum: 6,
    iCapacity: 4,
    iTime: "2023/12/31",
    iDuration: "7个月",
    iType: "线上",
    students_yet: [{
        sId: "1",
        sName: "string1",
        sAvatarUrl: "string1",
        sSchool: "北京航空航天大学"
      },
      {
        sId: "2",
        sName: "string2",
        sAvatarUrl: "string2",
        sSchool: "string2"
      }, {
        sId: "3",
        sName: "string1",
        sAvatarUrl: "string1",
        sSchool: "北京航空航天大学"
      }, {
        sId: "4",
        sName: "string1",
        sAvatarUrl: "string1",
        sSchool: "北京航空航天大学"
      }
    ],
    students_already: [{
        sId: "1",
        sName: "string1",
        sAvatarUrl: "string1",
        sSchool: "北京航空航天大学"
      },
      {
        sId: "2",
        sName: "string2",
        sAvatarUrl: "string2",
        sSchool: "string2"
      }, {
        sId: "3",
        sName: "string1",
        sAvatarUrl: "string1",
        sSchool: "北京航空航天大学"
      }, {
        sId: "4",
        sName: "string1",
        sAvatarUrl: "string1",
        sSchool: "北京航空航天大学"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 1. 加载iID
    console.log("in onLoad() function");
    this.data.iId = options.iId;
    console.log("iId=", this.data.iId);
    // TODO TODO：记得删掉下面这行！！！
    this.data.iId = '32';
    // 2. 加载项目相关信息 [iId => iInfos]
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemShortInfo',
      method: 'post',
      data: {
        iId: this.data.iId
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
            iInfo: res.data.iInfo
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
          wx.navigateBack();
        }
      }
    });
    // 3. 加载两个学生数组
    wx.request({
      url: getApp().globalData.baseUrl + '/iId2alreadyANDyet',
      data: {
        iId: this.data.iId
      },
      method: 'post',
      success: (res) => {
        if (res.data.success) {
          this.setData({
            students_yet: res.data.yet,
            students_already: res.data.already
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "加载评价学生数据失败",
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

  comment(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      url: '/pages/items/review/mentorReview/index?sId=' + this.data.students_yet[index].sId + '&iId=' + this.data.iId
    });
  }

});