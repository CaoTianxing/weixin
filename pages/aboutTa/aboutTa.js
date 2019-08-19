// pages/aboutTa/aboutTa.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picList:[
      { active: false, pic: '35元'},
      { active: false, pic: '50元'},
      { active: false, pic: '100元'},
      { active: false, pic: '200元'},
      { active: false, pic: '400元'},
      { active: false, pic: '500元'},
      { active: false, pic: '1000元'},
      { active: false, pic: '1500元'}
    ]
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
    var index = e.currentTarget.dataset.index
    for (var i = 0; i < this.data.picList.length;i++){
      this.data.picList[i].active = false
    }
    this.data.picList[index].active = true
      this.setData({
        picList: this.data.picList
      })

  },
  /**
   * 跳转到下一个页面
   */
  hrefPage () {
    wx.navigateTo({
      url: '/pages/givingADeposit2/givingADeposit2'
    })
  }
})