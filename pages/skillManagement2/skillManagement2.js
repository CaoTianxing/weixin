// pages/skillManagement1/skillManagement1.js
import { saveMySkill } from '../../utils/api'
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import {
  getSkillList
} from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelActive: false,
    isExpand: false,
    navigationBarHeight,
    labelList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getSkillList().then(
      res => {
        this.setData({
          labelList: res.data.skillList
        })
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 点击添加类样式
   */
  addActive(e) {
    let index = e.currentTarget.dataset.index
    console.log(index);
    for (let i = 0; i < this.data.labelList.length; i++) {
      for (let j = 0; j < this.data.labelList[i].contentList.length; j++) {
        if (this.data.labelList[i].contentList[j].id === index) {
          if (this.data.labelList[i].contentList[j].active === 0) {
            this.data.labelList[i].contentList[j].active = 1
            this.setData({
              labelList: this.data.labelList
            })
          } else if (this.data.labelList[i].contentList[j].active === 1) {
            this.data.labelList[i].contentList[j].active = 0
            this.setData({
              labelList: this.data.labelList
            })
          }

          return
        }
      }
    }

  },

  /**
   * 点击一键发布
   */
  postData() {
    wx.setStorage({
      key: "theFirstTime",
      data: '1'
    })
    let list = []
    for (let i = 0; i < this.data.labelList.length; i++) {
      for (let j = 0; j < this.data.labelList[i].contentList.length; j++) {
        if (this.data.labelList[i].contentList[j].active === 1) {
          list.push(this.data.labelList[i].contentList[j])
          continue
        }
      }
    }
    if (list.length > 2 && list.length < 4) {
      wx.setStorage({
        key: 'NeedSkills',
        data: list
      })
      wx.reLaunch({
        url: "/pages/index/index"
      })
      // 初始化技能
    } else {
      wx.showModal({
        title: '提示',
        content: '请至少选择3个您需要的技能,或跳过此步骤',
        success(res) {
          if (res.confirm) {} else if (res.cancel) {}
        }
      })
    }
  },
  // 点击跳过
  nextIndex() {
    wx.setStorage({
      key: "theFirstTime",
      data: '1'
    })
    wx.redirectTo({
      url: '/pages/index/index'
    })
    
    
    // wx.reLaunch({
    //   url: '/pages/index/index'
    // })
  },
})