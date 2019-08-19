const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
const qiniuUploader = require('../../utils/qiniuUploader')
import { getVerifyCode, bindingMobile, getUploadToken, realnameAuth } from '../../utils/api'
import { checkData } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight,
    fruit: [
      { id: 1, name: '身份证' },
      { id: 2, name: '护照' },
      { id: 3, name: '港澳通行证' }
    ],

    positiveImg: '',
    negativeImg: '',
    checkVal: '',
    userName: '',
    userNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getName(e) {
    this.setData({ userName: e.detail.value })
  },
  getNum(e) {
    this.setData({ userNum: e.detail.value })
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
  radioChange: function (e) {
    this.setData({ checkVal: e.detail.value })
  },
  /**
   * 上传正面
   */
  positive() {
    let This = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let file = res.tempFilePaths[0]
        getUploadToken().then(res => {
          wx.setStorageSync('upToken', res.data.token);

          qiniuUploader.upload(file, (res) => {
            console.log()
            This.setData({
              positiveImg: res.imageURL
            })


          },
            (error) => {
              console.log('error: ' + error);
            }, {
              region: 'SCN',
              domain: 'http://static.duodianwangluo.com',
              uptoken: wx.getStorageSync('upToken'),
              shouldUseQiniuFileName: true
            },
            (res) => {
              // console.log('上传进度', res.progress)
              // console.log('已经上传的数据长度', res.totalBytesSent)
              // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)

            },
            () => {
              // 取消上传
            },
            () => {
              // `before` 上传前执行的操作
            },
            (err) => {
              // `complete` 上传接受后执行的操作(无论成功还是失败都执行)

            });
        })
      }
    })
  },
  /**
   * 上传反面
   */
  negative() {
    let This = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let file = res.tempFilePaths[0]
        getUploadToken().then(res => {
          wx.setStorageSync('upToken', res.data.token);

          qiniuUploader.upload(file, (res) => {
            console.log()
            This.setData({
              negativeImg: res.imageURL
            })


          },
            (error) => {
              console.log('error: ' + error);
            }, {
              region: 'SCN',
              domain: 'http://static.duodianwangluo.com',
              uptoken: wx.getStorageSync('upToken'),
              shouldUseQiniuFileName: true
            },
            (res) => {
              // console.log('上传进度', res.progress)
              // console.log('已经上传的数据长度', res.totalBytesSent)
              // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)

            },
            () => {
              // 取消上传
            },
            () => {
              // `before` 上传前执行的操作
            },
            (err) => {
              // `complete` 上传接受后执行的操作(无论成功还是失败都执行)

            });
        })
      }
    })
  },
  /**
   * 提交认证
   */
  save() {
    let regName = /^[\u4e00-\u9fa5]{2,4}$/;
    let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    let params = {
      realname: this.data.userName,
      idCardType: this.data.checkVal,
      idCardNo: this.data.userNum,
      idCardFrontImage: this.data.positiveImg,
      idCardBackImage: this.data.negativeImg
    }

    if (checkData(params)) {
      console.log()
      if (!regName.test(this.data.userName)) {
        wx.showModal({
          title: '提示',
          content: '姓名格式错误',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else if (!regIdNo.test(this.data.userNum)) {
        wx.showModal({
          title: '提示',
          content: '身份证号码格式错误',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        realnameAuth(params).then(res => {
          console.log('实名认证',res)
          wx.showToast({
            title: '实名认证成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        })
      }

    }
  }
})