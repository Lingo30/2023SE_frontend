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
    // TODO: component中测试
    console.log("in onLoad() function");
    this.data.iId = options.iId;
    console.log("iId=", this.data.iId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
});