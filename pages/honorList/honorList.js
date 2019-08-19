// pages/honorAptitude2/honorAptitude2.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { getExperience, deleteExperience } from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight,
    honorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var This = this
    getExperience().then(res => {
      console.log('获取荣誉列表',res)
      console.log(res.data.experienceInfo.honor)
      This.setData({
        honorList: res.data.experienceInfo.honor
      })
    })
    // wx.getStorage({
    //   key: 'honorObj',
    //   success (res) {
    //     This.setData({
    //       honorList: [...res.data]
    //     })
    //     console.log(This.data.honorList)
    //   }
    // })
  },

  upItem(e){
    let index = e.target.dataset.id
    wx.navigateTo({
      url:'/pages/editHonor/editHonor?id=' + index
    })
    
  },
  removeItem(e){
    let This = this
    let index = e.target.dataset.id
    let params = {
      id: index
    }

    deleteExperience(params).then(res => {
      console.log('删除成功',res)
      getExperience().then(res => {
        console.log('获取荣誉列表',res)
        console.log(res.data.experienceInfo.honor)
        This.setData({
          honorList: res.data.experienceInfo.honor
        })
      })
    })
    
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
  /**
   * 保存到后端
   */
  save(){
    wx.navigateBack({
      delta: 1
    })
  }
})