// pages/editDemand/editDemand.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight,
    pageTitle:'需求详情'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log()
  if(options.key != undefined){
    this.setData({
      pageTitle: '擅长领域'
    })
  }

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
    wx.getStorage({
      key: 'demandInfo',
      success (res) {
        console.log(res.data)
        This.setData({
          demandInfo: res.data
        })
      }
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
  /***
   * 在输入的时候赋值给textareaValue
   */
  textareaValue(e) {
    
    this.setData({
      textareaValue: e.detail.value
    })
  },
  /***
   * 获取页面数据
   */
  getData() {
      if(this.data.textareaValue && this.data.textareaValue.length > 300){
        wx.showModal({
          title: '提示',
          content: '内容不可以超过300个字',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return false
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        
      }else{
        wx.setStorage({
          key:"demandInfo",
          data: this.data.textareaValue
        })
        wx.navigateBack({
          delta: 1
        })
      }
    
  }
})