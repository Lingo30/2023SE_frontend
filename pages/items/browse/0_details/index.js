// pages/items/details/index.js
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  // 1. 全部数据
  data: {
    notApplied: true,
    tAvatarUrl: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    iId: "1",
    tId: '1',
    i_tLiked: false,
    iTitle: "计算机视觉图像去雾元学习MAMLReptileSGD自然语言处理",
    tName: "default",
    tPosition: "default",
    iNum: null,
    iCapacity: null,
    iPlace: "default",
    iDuration: 'n个月',
    tInfo: 'default',
    // item_info: 365
    iTime: 'YYYY年M月D日',
    iType: '线上',
    iInfo: 'default',
    imgSrc: '',
    internlist: [{
      iCapacity: 3,
      iContent: "胶囊机器人三维感知与图传系统",
      iId: "17",
      iNum: 0,
      iPlace: "ACT",
      iTitle: "胶囊机器人三维感知与图传系统",
      tName: "杨建磊",
      tPosition: "副教授  博士生导师"
    }, {
      iCapacity: 3,
      iContent: "胶囊机器人三维感知与图传系统",
      iId: "17",
      iNum: 0,
      iPlace: "ACT",
      iTitle: "胶囊机器人三维感知与图传系统",
      tName: "杨建磊",
      tPosition: "副教授  博士生导师"
    }]
  },

  // 2. 生命周期函数---onLoad/Show
  onLoad(options) {
    // 2-1. 获取项目id
    console.log("in onLoad() function");
    this.data.iId = options.iId;
    console.log("iId=", this.data.iId);
    wx.request({
      url: getApp().globalData.baseUrl + '/getTId',
      method: 'post',
      data: {
        iId: this.data.iId
      },
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      success: (res) => {
        console.log("success!!!");
        console.log(res);
        this.setData({
          tId: res.data.tId
        });
        console.log(this.data.internlist);
      }
    });
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
    // 获取学生姓名sName
    wx.request({
      url: getApp().globalData.baseUrl + '/user',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        useId: false,
        id: ''
      },
      success: (res) => {
        if (res.data.result == 1) {
          this.setData({
            sName: res.data.username
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
    });
  },

  onShow() {
    wx.request({
      url: getApp().globalData.baseUrl + '/getItemState',
      method: 'post',
      data: {
        iId: this.data.iId
      },
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      success: (res) => {
        console.log("getItemState success!!!");
        console.log(res);
        this.setData({
          notApplied: res.data.notApplied
        });
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
    wx.navigateTo({
      /* 导师详情页url */
      url: '/pages/tinfo/index' + '?tId=' + this.data.tId
    })
  },

  // 5. 申请项目页面
  apply() {
    // 5-1. request
    console.log("text = ", "【" + this.data.sName + "】同学刚刚申请了您的【" + this.data.iTitle + "】项目，请及时审核该学生的申请");
    wx.request({
      url: getApp().globalData.baseUrl + '/apply',
      method: 'post',
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      data: {
        iId: this.data.iId,
        time: new Date(),
        text: "【" + this.data.sName + "】同学刚刚申请了您的【" + this.data.iTitle + "】项目，请及时审核该学生的申请"
      },
      success: (res) => {
        if (res.data.success) {
          console.log("Succeed in applying!!!");
          Toast({
            context: this,
            selector: '#t-toast',
            message: '申请成功！',
            duration: 1000,
            icon: 'check-circle',
            direction: 'column',
          });
          setTimeout(() => {
            // TODO: 这里应该跳转至带选中页面
            wx.navigateTo({
              url: '/pages/usercenter/project/index'
            });
          }, 1000);

        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: "申请失败，请稍后重试",
            duration: 2500,
            theme: 'error',
            direction: 'column',
          });
        }
      }
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
      header: {
        Authorization: wx.getStorageSync('token'),
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
          wx.setStorage({
            key: 'teachername',
            data: res.data.tId
          })
          wx.navigateTo({
            // TODO: 沟通页面url
            url: '/TUI-openchat/pages/index' + '?tId=' + res.data.userEmail
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
  },

  // 7. 其他项目跳转
  jump2Item(e) {
    let targetIId = (this.data.internlist)[e.currentTarget.id].iId;
    wx.navigateTo({
      url: '/pages/items/browse/0_details/index?iId=' + targetIId,
    })
  }
});