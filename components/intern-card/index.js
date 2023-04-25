// components/intern-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    id: {
      type: String,
      value: ""
    },
    ctx: {
      type: String,
      value: "home"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      // 组件的点击事件逻辑代码
      // console.log(e.currentTarget.dataset.item)
      let id = e.currentTarget.dataset.item.id
      let ctx = e.currentTarget.dataset.ctx
      let pageName = (ctx == "home") ? "browse/0_details" :
        (ctx == "t_招募中") ? "manage/1_recruiting" :
        (ctx == "t_待结项") ? "manage/2_ongoing" :
        (ctx == "t_待评价") ? "manage/3_toBeReviewed" :
        (ctx == "t_已完成") ? "manage/4_finished" :
        (ctx == "s_审核中") ? "browse/1_toBeSelected" :
        (ctx == "s_待结项") ? "browse/2_ongoing" :
        (ctx == "s_待评价") ? "browse/3_toBeReviewed" :
        (ctx == "s_已完成") ? "browse/4_finished" :
        (ctx == "项目") ? "browse/0_details" : "404Error";
      console.log("跳转至项目详情前：pageName=", pageName, ", iId=", JSON.stringify(id))
      wx.navigateTo({
        url: '/pages/items/' + pageName + '/index?iId=' + JSON.stringify(id)
      })
    }
  }
})