// pages/skillManagement1/skillManagement1.js
import { getSkillList, getHostSkillList } from '../../utils/api'
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelActive: false,
    hotIsExpand: false,
    navigationBarHeight,
    isExpand: false,
    labelList: [],
    hotLabelList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()

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
  /** 
   * 点击添加类样式
   */
  addActive(e) {
    var box = e.currentTarget.dataset.box
    if (box == 'hot') {
      var index = e.currentTarget.dataset.index
      if (this.data.hotLabelList[index].active == true) {
        this.data.hotLabelList[index].active = false
        this.setData({
          hotLabelList: this.data.hotLabelList
        })
      } else if (this.data.hotLabelList[index].active == false) {
        this.data.hotLabelList[index].active = true
        this.setData({
          hotLabelList: this.data.hotLabelList
        })
      }
    } else if (box == 'noHot') {
      var index = e.currentTarget.dataset.index
      if (this.data.labelList[index].active == true) {
        this.data.labelList[index].active = false
        this.setData({
          labelList: this.data.labelList
        })
      } else {
        this.data.labelList[index].active = true
        this.setData({
          labelList: this.data.labelList
        })
      }
    }


  },
  /**
   * 点击确认获取数据存到本地
   */
  getData() {

    let list = []
    for (let i = 0; i < this.data.labelList.length; i++) {
      if (this.data.labelList[i].active == true) {
        list.push(this.data.labelList[i])
      }
    }
    for (let i = 0; i < this.data.hotLabelList.length; i++) {
      if (this.data.hotLabelList[i].active == true) {
        list.push(this.data.hotLabelList[i])
      }
    }
    // 存入擅长技能
    if (list.length > 4 && list.length < 6) {
      wx.setStorage({
        key: "GoodAtSkills",
        data: list
      })
      wx.setStorage({
        key: "theFirstTime",
        data: '1'
      })
      wx.navigateTo({
        url: '/pages/skillManagement2/skillManagement2'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请至少选择5个擅长技能，或跳过此步骤',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  /**
   * 是否展开
   */
  isExpandFun() {
    if (this.data.isExpand) {
      this.setData({
        isExpand: false
      })
    } else {
      this.setData({
        isExpand: true
      })
    }
  },
  /**
   * 是否展开热门
   */
  hotIsExpandFun() {
    if (this.data.hotIsExpand) {
      this.setData({
        hotIsExpand: false
      })
    } else {
      this.setData({
        hotIsExpand: true
      })
    }
  },
  // 初始化页面数据
  initData() {

    

    const This = this
    // 获取热门
    getHostSkillList().then(
      res => {
        for (var i = 0; i < res.data.skillList.length; i++) {
          res.data.skillList[i].active = false
        }
        This.setData({
          hotLabelList: res.data.skillList
        })
      }
    )
    // 获取擅长技能
    getSkillList().then(
      res => {
        var list = []
        for (let i = 0; i < res.data.skillList.length; i++) {
          res.data.skillList[i].active = false
        }
        for (let k = 0; k < res.data.skillList.length; k++) {
          for (let s = 0; s < res.data.skillList[k].contentList.length; s++) {
            list.push(res.data.skillList[k].contentList[s])
          }
        }
        This.setData({
          labelList: list
        })
        
      }
    )
   
    
  },
  // 点击跳过
  next() {
    wx.navigateTo({
      url: '/pages/skillManagement2/skillManagement2'
    })
  }

})
