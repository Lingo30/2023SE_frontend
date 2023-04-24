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
      console.log(e.currentTarget.dataset)
      let id = e.currentTarget.dataset.item.id
      let ctx = e.currentTarget.dataset.ctx
      console.log(id)
      let pageName = (ctx == "stu") ? "info" : "tinfo"
      console.log(pageName)
      let idname = (ctx == "stu") ? "sId" : "tId"
      wx.navigateTo({
        url: '/pages/' + pageName + '/index?' + idname + '=' + JSON.stringify(id)
      })
    }
  }
})