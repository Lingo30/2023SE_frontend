// pages/items/components/TeacherInfo/TeacherInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatarUrl: {
      type: String,
      value: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    },
    name: {
      type: String,
      value: '刘偲',
    },
    title: {
      type: String,
      value: '教授',
    },
    intro: {
      type: String,
      value:
        '刘偲，北航教授，博导。曾主持国家优秀青年科学基金。博士毕业于中科院自动化所，曾于新加坡国立大学任研究助理和博后，曾任微软亚洲研究院(MSRA)铸星计划研究员。研究方向是跨模态多媒体智能分析（跨模态包含自然语言，计算机视觉以及语音等）以及经典计算机视觉任务（目标检测、跟踪和分割）。个人主页：http://colalab.org/ 。',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    avatarUrl: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
