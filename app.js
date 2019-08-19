//app.js
const api = require('./utils/api')
App({
  statusBarHeight: 0,
  onLaunch: function () {

    wx.getSystemInfo({
      success: res => {
        this.statusBarHeight = res.statusBarHeight
      }
    })
  },
  globalData: {
    api,
    userInfo: null,
    // dwapi:'http://192.168.101.35:8081,
    //api: 'https://wap.duodianwangluo.com',
    api: 'https://test.duodianwangluo.com',
    httpImgUrl:'http://116.62.168.126/jnzq/',
    baiduMapApi:{
      title: '',
      key: 'X5HBZ-D37HD-LVM4W-HNQLF-ACKAT-EFFB5'
    }
  }
})
