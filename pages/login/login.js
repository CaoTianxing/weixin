// pages/login/login.js
import { Login } from '../../utils/api'
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    navigationBarHeight,
    alert: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this

    wx.login({
      success(res) {
        This.setData({
          code: res.code
        })

      }
    })
    // this.getPhoneNumber()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取用户手机号登录

  getPhoneNumber(e) {

    this.setData({
      alert: true,
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData
    })

  },
  getUser(e) {
    var params = {}
    
    console.log(e)
    params.rawData = e.detail.rawData
    params.signature = e.detail.signature
    params.iv = this.data.iv
    params.encryptedData = this.data.encryptedData
    params.code = this.data.code
    console.log(params)
    Login(params).then(
      res => {
        console.log('获取用户信息',res)
        wx.setStorageSync("token", res.data.accessToken)
        wx.reLaunch({
          url: '/pages/index/index'
        })
      },
      err => {

      }
    )

    this.setData({
      alert: false
    })


  }
})
