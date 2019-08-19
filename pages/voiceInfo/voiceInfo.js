// pages/voiceInfo/voiceInfo.js
const qiniuUploader = require('../../utils/qiniuUploader')
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { getUploadToken } from '../../utils/api'
import util from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0,
    // 最后一次单击事件点击发生时间
    lastTapTime: 0,
    // 单击事件点击后要触发的函数
    lastTapTimeoutFunc: null,
    voiceTime: "00",
    isVoiceTime: false,
    time: null,
    isPoint: false,
    antiShake: true,
    isStart: false,
    navigationBarHeight,
    src:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      wx.showToast({
        title: '录音失败！',
        icon: 'success',
        duration: 2000
      })

    });
    this.recorderManager.onStop(function (res) {
      that.setData({
        src: res.tempFilePath
      })
      console.log(res.tempFilePath)
      wx.showToast({
        title: '录音完成',
        icon: 'success',
        duration: 2000
      })
    });

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      wx.showToast({
        title: '播放录音失败！',
        icon: 'success',
        duration: 2000
      })
    })

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
    let This = this
    if(this.data.src != ''){
      getUploadToken().then(res => {
        wx.setStorageSync('upToken', res.data.token);
  
          qiniuUploader.upload(This.data.src, (res) => {
            This.setData({
              src: res.fileUrl
            })
            wx.setStorageSync('audioUrl', res.fileUrl)
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
  /// 按钮触摸开始触发的事件
  touchStart: function (e) {

  },

  // 触摸结束触发的事件
  touchEnd: function (e) {
    clearInterval(this.data.time)
    console.log('结束')
    this.recorderManager.stop()
    console.log(e)
    this.setData({
      isStart: false
    })
  },
  /// 单击触发事件
  tap: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '长按此按钮可录制语音',
      showCancel: false
    })
  },

  playVoice() {
    console.log(this.data.antiShake)
    if (this.data.antiShake != false) {
      var that = this;
      var src = this.data.src;
      if (src == '' || src == undefined) {
        console.log("请先录音！")
        return;
      } else {
        var timeNum = this.data.voiceTime * 2
        var time = setInterval(() => {
          /**
           * 如果语音事件被-到0的时候清除定时器
           */
          if (timeNum[0] != 0 && timeNum <= 0) {
            clearInterval(time)
            that.setData({
              isPoint: false
            })
            this.data.antiShake = true
            console.log(this.data.antiShake)
          } else {
            this.data.antiShake = false
            if (timeNum[0] == 0) {
              timeNum[0]
              timeNum = timeNum[1]
              console.log(timeNum)
              timeNum--
              if (timeNum % 2 == 0) {

                that.setData({
                  isPoint: true
                })
              } else {
                that.setData({
                  isPoint: false
                })
              }
            } else {
              timeNum--
              if (timeNum % 2 == 0) {
                that.setData({
                  isPoint: true
                })
              } else {
                that.setData({
                  isPoint: false
                })
              }
            }
          }


        }, 500)
        console.log(src, '播放了')
        this.innerAudioContext.src = this.data.src;
        this.innerAudioContext.play()
      }
    } else {
      return
    }


  },
  /**
   * 长按事件
   */
  longTap: function (e) {
    this.recorderManager.start({
      duration: '60000',
      format: 'mp3',
      audioSource: 'auto'
    });
    this.setData({
      isVoiceTime: true,
      isStart: true
    })
    var This = this
    var setTime = 1;
    console.log('开始录音')
    console.log(e)
    this.data.time = setInterval(() => {
      if (setTime >= 21) {
        console.log("清除定时器")
        clearInterval(This.data.time)
        return
      } else {
        if (setTime < 10) {
          This.setData({
            voiceTime: '0' + setTime++
          })
        } else {
          This.setData({
            voiceTime: setTime++
          })
        }

      }

    }, 1000)
  },
  /**
   * 跳转页面
   */
  save() {
    let This = this
    if(this.data.src != ''){
      getUploadToken().then(res => {
        wx.setStorageSync('upToken', res.data.token);
  
          qiniuUploader.upload(This.data.src, (res) => {
            This.setData({
              src: res.fileUrl
            })
            wx.setStorageSync('audioUrl', res.fileUrl)
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
      wx.navigateBack({
        delta: 1
      })
    }
    

    
  }

})