// pages/serveInfo/serveInfo.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { getServiceDetails, getServicerInfo } from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluateNum: 4,
    navigationBarHeight,
    isTab: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getServiceDetails({id: options.id})
    this.getServicerInfo({ 
      userId: options.userId, 
      latitude: wx.getStorageSync('reqParams').latitude, 
      longitude: wx.getStorageSync('reqParams').longitude 
    })
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
  herfPage() {
    wx.navigateTo({
      url: '/pages/aboutTa/aboutTa'
    })

  },

  /**
   * 获取技能详情（编辑技能数据回显）
   */
  getServiceDetails(params) {
    getServiceDetails(params).then(res => {
      console.log('获取技能详情', res.data.serviceDetails)
      this.setData({serviceDetails: res.data.serviceDetails})
    })
  },

  /**
   * 获取技能者技能信息
   */
  getServicerInfo(params) {
    console.log(params)
    getServicerInfo(params).then(res => {
      console.log('获取技能者技能信息', res.data.servicerInfo)
    })
  }
})