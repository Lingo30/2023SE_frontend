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
    skillsList: [
      [{
        id: "1",
        name: "医学"

      }, {
        id: "2",
        name: "心理学"

      }, {
        id: "3",
        name: "NLP"

      }, {
        id: "4",
        name: "CV"

      }, {
        id: "5",
        name: "机器学习"

      }, {
        id: "6",
        name: "元学习"

      }, {
        id: "7",
        name: "计算机组成原理"

      }, {
        id: "8",
        name: "FPGA"

      }],
      [{
        id: "9",
        name: "c"

      }, {
        id: "10",
        name: "c++"

      }, {
        id: "11",
        name: "c#"

      }, {
        id: "12",
        name: "java"

      }, {
        id: "13",
        name: "python"

      }, {
        id: "14",
        name: "pyTorch"

      }, {
        id: "15",
        name: "Verilog"

      }],
      [{
        id: "116",
        name: "Docker"

      }, {
        id: "17",
        name: "Github"

      }, {
        id: "18",
        name: "Vue"

      }, {
        id: "19",
        name: "DJango"

      }, {
        id: "20",
        name: "网页前端开发"

      }],
      [{
        id: "21",
        name: "大数据"

      }, {
        id: "22",
        name: "ChatGPT"
      }, {
        id: "23",
        name: "医学"
      }, {
        id: "24",
        name: "心理学"

      }, {
        id: "25",
        name: "NLP"

      }, {
        id: "26",
        name: "CV"

      }, {
        id: "27",
        name: "机器学习"

      }, {
        id: "28",
        name: "元学习"

      }, {
        id: "29",
        name: "计算机组成原理"

      }, {
        id: "30",
        name: "FPGA"

      }]
    ],
    id2selected: {
      "1": true,
      "2": false,
      "3": true,
      "4": false,
      "5": true,
      "6": true,
      "7": false,
      "8": true
    },
    alreadyNames: ["医学", "NLP", "机器学习", "元学习", "FPGA"],

    // 缓存读写
    alreadyIds: ["1", "3", "5", "6", "8"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 1. wx.request获取需求列表 (1)[skillsList]，可以先跳过
    wx.request({
      url: getApp().globalData.baseUrl + "/getSkillSet",
      method: "POST",
      header: {
        Authorization: wx.getStorageSync('token'),
      },
      success: (res) => {
        console.log(res.data);
      }
    })
    // 2. 缓存中读 skillsToPass.alreadyIds ==> (2)[alreadyIds]
    //            skillsToPass.alreadyNames ==> (3)[alreadyNames]
    //            skillsToPass.id2selected ==> (4)[id2selected]
    let s2p = getApp().globalData.skillsToPass;
    console.log("s2p = ", s2p);
    // 注意：要浅拷贝
    this.setData({
      alreadyIds: s2p.skillIds.slice(),
      alreadyNames: s2p.skillNames.slice(),
      id2selected: Object.assign({}, s2p.id2selected)
    });
  },

  select(e) {
    let skill = e.currentTarget.dataset.skill;
    let currSelected = this.data.id2selected[skill.id];
    if (currSelected) {
      // 当前项被选中，转为未选中
      let deleteIndex = this.data.alreadyIds.indexOf(skill.id);
      this.data.alreadyIds.splice(deleteIndex, 1);
      this.data.alreadyNames.splice(deleteIndex, 1);
      this.data.id2selected[skill.id] = false;
    } else {
      this.data.alreadyIds.push(skill.id);
      this.data.alreadyNames.push(skill.name);
      this.data.id2selected[skill.id] = true;
    }
    // 触发页面更新
    this.setData({
      id2selected: this.data.id2selected,
      alreadyIds: this.data.alreadyIds,
      alreadyNames: this.data.alreadyNames
    });
  },

  submit() {
    console.log("submit!!!");
    // 1. 写入缓存
    getApp().globalData.skillsToPass = {
      skillIds: this.data.alreadyIds,
      skillNames: this.data.alreadyNames,
      id2selected: this.data.id2selected
    };
    // 2. 转回前一页面
    wx.navigateBack();
  }

})