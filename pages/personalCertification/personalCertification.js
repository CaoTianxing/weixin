const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { getVerifyCode, bindingMobile } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight,
    show: false,
    timeNum: 10,
    isTimeNum: false,
    phone: '',
    phoneCode: ''
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


  closeFun() {
    // this.setData({ close: false });

  },

  confirmFun() {
    let This = this
    if (this.data.phone == '') {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            This.setData({show: true})
          } else if (res.cancel) {
            This.setData({show: false})
            console.log('用户点击取消')
          }
        }
      })
    } else {
      let params = {
        mobile: this.data.phone,
        verifyCode: this.data.phoneCode,
        platform: 1
      }

      bindingMobile(params).then(res => {
        console.log('绑定手机号成功', res)
      })
    }


  },
  changePhone(e) {
    this.setData({ phone: e.detail.value })
  },
  changePhoneCode(e) {
    this.setData({ phoneCode: e.detail.value })
  },
  /*
   * 获取短信验证码
   */
  getVift() {
    let This = this
    let params = new Object;
    let check = true
    This.setData({ isTimeNum: true })
    if (check) {
      params.type = 3
      params.mobile = this.data.phone
      // console.log(this.data.phone, this.data.phoneCode)
      getVerifyCode(params).then(res => {
        console.log('验证码发送成功', res)
      })

      let time = setInterval(() => {
        check = false
        This.data.timeNum--
        This.setData({
          timeNum: This.data.timeNum
        })
        if (This.data.timeNum <= 0) {

          console.log('时间到了')
          this.setData({ isTimeNum: false })
          clearInterval(time)
          check = true
        }
      }, 1000)
    } else {
      return false
    }


  },
  /**
   * 手机认证
   */
  phoneRen() {
    this.setData({show: true})
  },
  save(){
    wx.navigateTo({
      url: '/pages/postSkill/postSkill'
    })
    
  }
})