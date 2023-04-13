Page({
  data: {
    momentList: [{
      momentId: "1",
      username: "林嘉宁",
      avatar: "https://s1.ax1x.com/2023/04/13/ppvgVl8.png",
      date: "2023/4/9 23:55",
      hasComment: true,
      content: "这是一段内容这是一段内容这是一段内容这是一段内容",
      commentUser: "方俊豪",
      commentContent: "我觉得不错我觉得不错我觉得不错我觉得不错我觉得不错"
    }]
  },

  loadMore() {

  },
  onShow() {
    this.getTabBar().init();
  },
  onLoad() {

  }
})