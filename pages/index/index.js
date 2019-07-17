//index.js
//获取应用实例
const app = getApp()
let time;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[
      "麻辣烫",
      "曹林米线",
      "海鲜面",
      "望江面馆",
      "兰州拉面",
      "北麦王",
      "牛肉面",
      "嵊州小吃",
      "虾小哥",
      "快餐"
    ],
    checkIndex : 0,
    isxh : false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // this.xunhuan();
  },

  xunhuan:function(){
    let that = this;
    time = setInterval(function(){
      if (that.data.list.length-1 === that.data.checkIndex){
        that.setData({
          checkIndex : 0
        })
      }else{
        that.setData({
          checkIndex: that.data.checkIndex + 1
        })
      }
    },100)
  },

  tingzhi:function(){
    clearInterval(time)
  },

  onchange(){
    if(this.data.isxh){
      this.tingzhi();
      this.setData({
        isxh : false
      })
    }else{
      this.xunhuan();
      this.setData({
        isxh: true
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onHide(){
    this.tingzhi();
  },
  onUnload(){
    this.tingzhi();
  }
})
