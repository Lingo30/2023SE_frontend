// pages/skills/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // static
    skillCats: ["专业知识", "编程语言", "掌握工具", "其他技能"],
    skillIcons: ["root-list", "logo-codepen", "laptop", "edit-1"],
    // dynamic
    skillsList: [[{id: "1", name: "医学"}, {id: "2", name: "心理学"}, {id: "3", name: "NLP"}, {id: "4", name: "CV"}, {id: "5", name: "机器学习"}, {id: "6", name: "元学习"}, {id: "7", name: "计算机组成原理"}, {id :"8", name: "FPGA"}], [{id: "1", name: "c"}, {id: "2", name: "c++"}, {id: "3", name: "c#"}, {id: "4", name: "java"}, {id: "5", name: "python"}, {id: "6", name: "pyTorch"}, {id: "7", name: "Verilog"}], [{id: "1", name: "Docker"}, {id: "2", name: "Github"}, {id: "3", name: "Vue"}, {id: "4", name: "DJango"}, {id: "5", name: "网页前端开发"}], [{id: "1", name: "大数据"}, {id: "2", name: "ChatGPT"}, {id: "1", name: "医学"}, {id: "2", name: "心理学"}, {id: "3", name: "NLP"}, {id: "4", name: "CV"}, {id: "5", name: "机器学习"}, {id: "6", name: "元学习"}, {id: "7", name: "计算机组成原理"}, {id :"8", name: "FPGA"}]],
    alreadyNames: ["元学习", "Verilog", "C", "C++"]
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

  }
})