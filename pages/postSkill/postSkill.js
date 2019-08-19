
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime';
import { getNowFormatDate, checkData } from '../../utils/util'
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { releaseService, getExperience } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight,
    isSkillCircle: false,
    demandInfoNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面携带参数', options)


    let params = {
      initData: options,
      createTime: getNowFormatDate()
    }
    wx.setStorage({
      key: "postSkillPageData",
      data: params
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
    var This = this
    wx.getStorage({
      key: 'demandInfo',
      success(res) {
        console.log(res.data)
        This.setData({
          demandInfoNum: res.data.length
        })
      }
    })
    wx.getStorage({
      key: 'postSkillPageData',
      success(res) {
        console.log(res.data)
        This.setData({
          initData: res.data.initData,
          createTime: res.data.createTime
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
  onChange(event) {
    this.setData({
      isSkillCircle: event.detail
    });
    console.log(this.data.isSkillCircle)
  },
  /**
   * 发布
   */
  release() {
    let This = this
    let params = {
      // 技能Id*
      "skillId": This.data.initData.id,
      //线下服务金额
      //"offlineMoney": '11',
      //线下服务单位 1.小时 2.次 （注意:如服务金额传了则必传单位）
      //"offlineUnit": '1',
      //电话服务金额
      //"phoneMoney": '0.51',
      //电话服务单位 1.小时 2.次
      //"phoneUnit": '1',
      //线上服务金额
      "onlineMoney": '51',
      //线上服务单位 1.小时 2.次
      "onlineUnit": '1',
      // 地址*
      "location": wx.getStorageSync('positionInfo'),
      //服务开始时间*
      "beginTime": wx.getStorageSync('startDate'),
      //服务结束时间--不能大于7天*
      "endTime": wx.getStorageSync('endDate'),
      //服务时段-1上午时段2下午时段3晚上时段 *
      "servicePeriod": wx.getStorageSync('timeSlot').id,
      // 坐标位置**
      "latitude": wx.getStorageSync('reqParams').latitude,
      "longitude": wx.getStorageSync('reqParams').longitude,
      //上传的音频地址
      "audioUrl": wx.getStorageSync('audioUrl'),
      // 上传的视频地址
      "videoUrl": wx.getStorageSync('videoUrl'),
      // 上传的视频截图地址
      "videoImage": wx.getStorageSync('videoCoverImgUrl'),
      //是否同步到技能圈
      "isSynchronization": this.data.isSkillCircle,
      //图片介绍arrar*
      "Images": wx.getStorageSync('serveImg'),
      //当前城市Id*
      "cityId": wx.getStorageSync('positionId'),
      // 技能介绍
      "serviceIntroduction": wx.getStorageSync('demandInfo'),
      "ownAdvantage": wx.getStorageSync('demandInfo'),
      "questionAnswers":wx.getStorageSync('problemList')
    }
    console.log(params)
    // if (checkData(params)) {
      // 首先判断用户本地有没有完善过教育经历如果有  就直接发布   
      getExperience().then(res => {
        if (res.data.experienceInfo.company != 0 && res.data.experienceInfo.honor != 0 && res.data.experienceInfo.school != 0) {
          console.log('判断有没有发布资格', res.data.experienceInfo)
          releaseService(params).then(res => {
            console.log('直接发布', res)
            This.removeStorage()
            wx.reLaunch({
              url: '/pages/index/index'
            })
          })

        } else {
          // esle   弹出提示框提示去完善   点击仍然发布就继续仍然发布
          wx.showModal({
            title: '提示',
            content: '完善个人信息将优先审核技能，并增加接单率，提高曝光率。是否前往完善。',
            cancelText: '仍然发布',
            confirmText: '去完善',
            success(res) {
              if (res.confirm) {
                console.log('用户点击去完善')
                // 去完善
                wx.navigateTo({
                  url: '/pages/myAdvantage/myAdvantage'
                })
              } else if (res.cancel) {
                console.log('用户点击仍然发布')
                releaseService(params).then(res => {
                  console.log(res)
                  This.removeStorage()
                  wx.reLaunch({
                    url: '/pages/index/index'
                  })
                })
              }
            }
          })
        }
      })
    // }
  },
  /**
   * 清空本地
   */
  removeStorage(){
    wx.removeStorageSync('startDate')
    wx.removeStorageSync('endDate')
    wx.removeStorageSync('timeSlot')
    wx.removeStorageSync('audioUrl')
    wx.removeStorageSync('videoUrl')
    wx.removeStorageSync('videoCoverImgUrl')
    wx.removeStorageSync('serveImg')
    wx.removeStorageSync('demandInfo')
  }
})
