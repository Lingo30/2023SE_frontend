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
    content: '',
    searchOp: {
      "school": [],
      "skills": [],
      "type": "",
      "time": ""
    },
    dialog: {
      title: '确认删除当前历史记录',
      showCancelButton: true,
      message: '',
    },
    dialogShow: false,
    isSelected: {
      "北航": false,
      "清华": false,
      "北大": false,
      "人大": false,
      "上海交大": false,
      "复旦": false,
      "武大": false,
      "华科": false,
      "浙大": false,
      "中山大学": false,
      "CV": false,
      "NLP": false,
      "System": false,
      "HPC": false,
      "Medical": false,
      "Art": false,
      "AI": false,
      "EE": false,
      "CS": false,
      "长期": false,
      "短期": false,
      "线上": false,
      "线下": false
    }
  },

  addOp(e) {
    // console.log(e.currentTarget)
    const tmp = e.currentTarget.dataset.item
    const typetmp = e.currentTarget.dataset.type
    const addtmp = this.data.searchOp
    const booltmp = this.data.isSelected
    if (typetmp == "school" || typetmp == "skills") {
      booltmp[tmp] = !booltmp[tmp]
      if (!this.data.searchOp[typetmp].includes(tmp)) {
        addtmp[typetmp].push(tmp)
      } else {
        const idx = addtmp[typetmp].indexOf(tmp)
        addtmp[typetmp].splice(idx, 1)
      }
    } else {
      if (this.data.searchOp[typetmp].length == 0) {
        addtmp[typetmp] = tmp
        booltmp[tmp] = !booltmp[tmp]
      } else if (!this.data.searchOp[typetmp].includes(tmp)) {
        booltmp[this.data.searchOp[typetmp]] = !booltmp[this.data.searchOp[typetmp]]
        booltmp[tmp] = !booltmp[tmp]
        addtmp[typetmp] = tmp
      } else {
        addtmp[typetmp] = ""
        booltmp[tmp] = !booltmp[tmp]
      }
    }
    this.setData({
      searchOp: addtmp,
      isSelected: booltmp
    })
    console.log(this.data.searchOp)
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
    const content = this.data.content
    const searchtags = this.data.searchOp
    console.log("输入内容", content)
    console.log("选择内容", searchtags)
    const school = searchtags["school"].join(',')
    const skills = searchtags["skills"].join(',')
    const type = searchtags["type"]
    const time = searchtags["time"]
    wx.navigateTo({
      url: `/pages/search/searchres/index?searchcontent=${content}&time=${time}&type=${type}&school=` + school + `&skills=` + skills + ``,
    });
  },

  changeContent(e) {
    this.setData({
      content: e.detail.value
    })
    console.log("输入内容：", this.data.content)
  },
})