// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoollist: ["北航", "清华", "北大", "人大", "上海交大", "复旦", "武大", "华科", "浙大", "中山大学"],
    majorlist: ["CV", "NLP", "System", "HPC", "Medical", "Art", "AI", "EE", "CS"],
    timelist: ["长期", "短期"],
    typelist: ["线上", "线下"],
    searchValue: '',
    searchOp: [],
    dialog: {
      title: '确认删除当前历史记录',
      showCancelButton: true,
      message: '',
    },
    dialogShow: false,
  },

  addOp(e) {
    console.log(e)
  },

  handlePopup(e) {
    const {
      item
    } = e.currentTarget.dataset;

    this.setData({
        cur: item,
      },
      () => {
        this.setData({
          visible: true
        });
      },
    );
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
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

  },

  handleSubmit(e) {
    const {
      value
    } = e.detail.value;
    if (value.length === 0) return;
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${value}`,
    });
  },
})