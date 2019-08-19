// pages/honorAptitude/honorAptitude.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { getUploadToken, saveExperience, getExperience } from '../../utils/api'
const qiniuUploader = require('../../utils/qiniuUploader')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle:'荣誉添加',
    endDate: '',
    honorName: '',
    mechanismName: '',
    honorInfo: '',
    imglist: [],
    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0,
    // 最后一次单击事件点击发生时间
    lastTapTime: 0,
    // 单击事件点击后要触发的函数
    lastTapTimeoutFunc: null,
    navigationBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   
    
    if(options.id){
      var This = this
      getExperience().then(res => {
        res.data.experienceInfo.honor.some((item,index,arr) => {
          if(item.id == options.id){
            This.data.imglist.push(item.honorImage)
            this.setData({
              pageTitle:'荣誉编辑',
              endDate: item.acquisitionTime,
              honorName:item.honorName,
              mechanismName:item.issuingAuthority,
              imglist:This.data.imglist,
              honorInfo: item.honorDetail
            })
          }
        })
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
  getHonorName(event) { 
   
    this.setData({
      honorName: event.detail.value
    })
  },
  getMechanismName(event) { 
    this.setData({
      mechanismName: event.detail.value
    })
  },
  bindDateChangeEnd: function (e) {
    // 获取结束时间
    this.setData({
      endDate: e.detail.value
    })
  },
  bindTextAreaBlur(event){
    this.setData({
      honorInfo: event.detail.value
    })
  },
  // 按钮触摸开始触发的事件
  touchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },
  // 按钮触摸结束触发的事件
  touchEnd: function (e) {
    this.touchEndTime = e.timeStamp
  },
  /**
   * 添加图片
   */

  addImg() {
    var This = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        if (This.data.imglist != 0) {

          var oldList = [...res.tempFilePaths]
          This.setData({
            imglist: oldList
          })
        } else {
          console.log(res)
          var newlist = [...res.tempFilePaths]
          This.setData({
            imglist: newlist
          })
        }
      }
    })
  },
  /**
   * 预览
   */
  viewImg(imgurl) {
    var This = this
    wx.previewImage({
      current: imgurl, // 当前显示图片的http链接
      urls: This.data.imglist // 需要预览的图片http链接列表
    })
  },
  /**
   * 删除图片
   */
  delImg(e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
  },
  /// 单击、双击
  multipleTap(e) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      // 更新最后一次点击时间
      that.lastTapTime = currentTime

      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        console.log("double tap")
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
        console.log()
        // 当前图片
        var img = e.currentTarget.dataset.imgurl
        this.viewImg(img)
      } else {
        // 单击事件延时300毫秒执行，这和最初的浏览器的点击300ms延时有点像。
        that.lastTapTimeoutFunc = setTimeout(function () {
          wx.showModal({
            title: '提示',
            content: '您确定删除此图片吗？',
            success(res) {
              if (res.confirm) {
                var index = e.currentTarget.dataset.index
                console.log(index)
                that.data.imglist.splice(index, 1);
                that.setData({
                  imglist: that.data.imglist
                })
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
              } else if (res.cancel) {
                wx.showToast({
                  title: '您已取消删除',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
        }, 300);
      }
    }
  },
  save() {
    let This = this
    if (This.data.imglist != 0 && This.data.endDate && This.data.honorName && This.data.mechanismName && This.data.honorInfo) {
      getUploadToken().then(res => {
        wx.setStorageSync('upToken', res.data.token);

        qiniuUploader.upload(This.data.imglist[0], (res) => {
          let params = {
            experienceType: '3',
            honorName: This.data.honorName,
            issuingAuthority: This.data.mechanismName,
            acquisitionTime: This.data.endDate,
            honorDetail:This.data.honorInfo,
            honorImage:res.imageURL
          }
          console.log(params)
          saveExperience(params).then(res => {
            console.log('保存荣誉资质接口',res)
            wx.navigateBack({
            delta: 1
          })
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
            if(res.progress == 100){
              
            }
            console.log('上传进度', res.progress)
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)

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
    }else{
      wx.showModal({
        title: '提示',
        content: '内容不能为空',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})