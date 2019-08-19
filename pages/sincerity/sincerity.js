// pages/givingADeposit2/givingADeposit2.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { createPrepayOrder } from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight,
    balance: false,
    weixin: false,
    picList: [
      { id: 1, active: false, pic: '35元' },
      { id: 2, active: false, pic: '50元' },
      { id: 3, active: false, pic: '100元' },
      { id: 4, active: false, pic: '200元' },
      { id: 5, active: false, pic: '400元' },
      { id: 6, active: false, pic: '500元' },
      { id: 7, active: false, pic: '1000元' },
      { id: 8, active: false, pic: '1500元' }
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
    for (var i = 0; i < this.data.picList.length; i++) {
      this.data.picList[i].active = false
    }
    this.data.picList[index].active = true
    this.setData({
      picList: this.data.picList
    })

  },
  play() {
    var params = {
      type: 3,
      mode: 1,
      payPlatform: 2,

    }
    for (var i = 0; i < this.data.picList.length; i++) {
      if (this.data.picList[i].active) {
        params.sincerityMoneyType = this.data.picList[i].id
        continue

      }
    }

    if (params.sincerityMoneyType == undefined) {
      wx.showModal({
        title: '提示',
        content: '请选择诚意金',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      createPrepayOrder(params).then(res => {
        console.log('诚意金', res)
        wx.setStorageSync('orderNumber', res.data.wechatorder.tradeNo)
        wx.requestPayment({
          timeStamp: res.data.wechatorder.timeStamp,
          nonceStr: res.data.wechatorder.nonceStr,
          package: res.data.wechatorder.package,
          signType: 'MD5',
          paySign: res.data.wechatorder.sign,
          success(res) {
            // wx.removeStorageSync('startDate')
            // wx.removeStorageSync('endDate')
            // wx.removeStorageSync('timeSlot')
            // wx.removeStorageSync('serviceGender')
            // wx.removeStorageSync('serviceMethod')
            // wx.removeStorageSync('demandInfo')
            // wx.removeStorageSync('orderNumber')
            wx.navigateBack({
              delta: 1
            })
            

          },
          fail(res) {
            console.log(res, '')
            wx.showModal({
              title: '提示',
              content: '支付失败,请稍后重试',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        })
      })
    }


  }

})
