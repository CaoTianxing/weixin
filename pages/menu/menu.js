// pages/menu/menu.js
import { getSkillList } from '../../utils/api'
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: '',
    rList: [],
    docTitle: '',
    lIndex: 0,
    hrefPath: true,
    navigationBarHeight,
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this
    // 页面一进来的时候判断是发布需求还是发布技能
    console.log(options)
    if (options.post == 'server') {

      this.setData({
        docTitle: '发布需求'
      })
      this.setData({
        url: '/pages/postDemand/postDemand'
      })
    } else if (options.post == 'demand') {
      this.setData({
        docTitle: '发布技能'
      })
      this.setData({
        url: '/pages/postSkill/postSkill'
      })
    }

    this.getData()


    // setTimeout(() => {
    //   wx.createSelectorQuery().selectAll('.r-li').boundingClientRect(function (rects) {
    //   rects.forEach(function (rect) {
    //     console.log('44',rect)
    //     This.data.rList.push(rect)
    //   })
    // }).exec()
    // },5000)

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
    this.initTitleList()
    var index = e.currentTarget.dataset.index
    if (this.data.titleList[index].active == 0) {
      this.data.titleList[index].active = 1
      this.setData({
        titleList: this.data.titleList
      })
    }

    var id = e.currentTarget.dataset.id
    this.setData({
      toView: id
    })

  },
  /**
   * 滚动右侧出发监听事件
   */
  onGoodsScroll: function (e) {
    this.initTitleList()
      for (var i = 0; i < this.data.rList.length; i++) {
        // - this.data.rList[i].height
        if (e.detail.scrollTop >= this.data.rList[i].top) {
        this.setData({
            lIndex: i
          })
          continue
        }
      }

    if (this.data.titleList[this.data.lIndex].active == 0){
      this.data.titleList[this.data.lIndex].active = 1
      this.setData({
        titleList: this.data.titleList
      })
    }

  },
  // 初始化
  initTitleList() {
    for (var i = 0; i < this.data.titleList.length; i++) {
      if (this.data.titleList[i].active == 1) {
        this.data.titleList[i].active = 0
        this.setData({
          titleList: this.data.titleList
        })
      }

    }
  },
  /**
   * 获取页面数据
   */
  getData() {
    var This = this
    getSkillList().then(
      res => {
        var list = res.data.skillList
        list[0].active = 1
        This.setData({
          titleList: list
        })
      }
    )
  }
})

