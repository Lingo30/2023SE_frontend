// components/intern-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
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
      console.log(id)
      wx.navigateTo({
        url: '/pages/items/browse/0_details/index?iId=' + JSON.stringify(id)
      })
    }
  }
})