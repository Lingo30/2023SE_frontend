// pages/items/details/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iTitle: '计算机视觉',
    tName: '刘偲',
    tPosition: '教授',
    iNum: 2,
    iCap: 3,
    iPlace: '北京航空航天大学',
    iDuration: '3个月',
    tInfo:
      '以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简以下是导师简介以下是导师简介以下是导师简介以下是导师简介以下是导师简介',
    // item_info: 365
    imgSrc: '',
    tabList: [
      {
        text: '推荐',
        key: 0,
      },
      {
        text: '学校',
        key: 1,
      },
      {
        text: '专业',
        key: 2,
      },
      {
        text: '长期',
        key: 3,
      },
      {
        text: '短期',
        key: 4,
      },
      {
        text: '线上',
        key: 5,
      },
      {
        text: '线下',
        key: 6,
      },
    ],
    internlist: [
      [
        {
          id: 1,
          title: '计算机视觉实习',
          content: '传统目标检测，无人驾驶',
          num: 3,
          alreadynum: 1,
          tags: ['3个月', '线下', 'CV', 'python'],
          tname: '刘偲教授',
          school: '北京航空航天大学',
        },
        {
          id: 2,
          title: '计算机视觉实习',
          content: '对于diffusion model infer阶段算法加速',
          num: 1,
          alreadynum: 0,
          tags: ['5个月', '线上', 'CV', 'python'],
          tname: '朱军教授',
          school: '清华大学',
        },
      ],
      [
        {
          id: 1,
          title: '计算机视觉实习',
          content: '传统目标检测，无人驾驶',
          num: 3,
          alreadynum: 1,
          tags: ['3个月', '线下', 'CV', 'python'],
          tname: '刘偲教授',
          school: '北京航空航天大学',
        },
      ],
      [
        {
          id: 1,
          title: '计算机视觉实习',
          content: '传统目标检测，无人驾驶',
          num: 3,
          alreadynum: 1,
          tags: ['3个月', '线下', 'CV', 'python'],
          tname: '刘偲教授',
          school: '北京航空航天大学',
        },
      ],
      [
        {
          id: 1,
          title: '计算机视觉实习',
          content: '传统目标检测，无人驾驶',
          num: 3,
          alreadynum: 1,
          tags: ['3个月', '线下', 'CV', 'python'],
          tname: '刘偲教授',
          school: '北京航空航天大学',
        },
      ],
      [
        {
          id: 1,
          title: '计算机视觉实习',
          content: '传统目标检测，无人驾驶',
          num: 3,
          alreadynum: 1,
          tags: ['3个月', '线下', 'CV', 'python'],
          tname: '刘偲教授',
          school: '北京航空航天大学',
        },
      ],
      [
        {
          id: 1,
          title: '计算机视觉实习',
          content: '传统目标检测，无人驾驶',
          num: 3,
          alreadynum: 1,
          tags: ['3个月', '线下', 'CV', 'python'],
          tname: '刘偲教授',
          school: '北京航空航天大学',
        },
      ],
      [
        {
          id: 1,
          title: '计算机视觉实习',
          content: '传统目标检测，无人驾驶',
          num: 3,
          alreadynum: 1,
          tags: ['3个月', '线下', 'CV', 'python'],
          tname: '刘偲教授',
          school: '北京航空航天大学',
        },
      ],
    ],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 0,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: {
      type: 'dots',
    },
    swiperImageProps: {
      mode: 'scaleToFill',
    },
    value: 'label_1',
    list: [
      {
        value: 'label_1',
        label: '首页',
        icon: 'home',
      },
      {
        value: 'label_2',
        label: '收藏',
        icon: 'star',
      },
      {
        value: 'label_3',
        label: '立即沟通',
        icon: 'chat',
      },
    ],
  },
  methods: {
    onChange(e) {
      this.setData({
        value: e.detail.value,
      });
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(/*options*/) {
    // console.log(item_info);
    // // 获取项目id
    // const item_id = options.item_id
    // // 调用请求商品详情数据的方法
    // this.getItemDetail(item_id);
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
