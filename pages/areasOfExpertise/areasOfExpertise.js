// pages/areasOfExpertise/areasOfExpertise.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue:'',
    navigationBarHeight

  },

  /**
   * 生命周
.pageBox{
  position: absolute;
  width:100%;
  padding-bottom: 100rpx;

}期函数--监听页面加载
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
  /***
   * 在输入的时候赋值给textareaValue
   */
  textareaValue(e) {
    /**
     * 不得低于20个字
     */
    this.setData({
      textareaValue: e.detail.value
    })
  },
  /***
   * 获取页面数据
   */
  getData() {
    console.log(this.data.textareaValue)
  }
})