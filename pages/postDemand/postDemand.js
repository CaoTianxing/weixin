// pages/postDemand/postDemand.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'

import util from '../../utils/util'
import { getReleaseDemandCount, releaseDemand } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight,
    // 服务介绍数字
    demandInfoNum: 0,
    initData: {},
    // 服务方式
    manner: {
      name: '请选择服务方式',
      id: '0'
    },
    // 性别
    gender: {
      name: '请选择服务者性别',
      id: '0'
    },

    genderArray: [
      {
        id: 1,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      },
      {
        id: 3,
        name: '不限'
      }
    ],
    serviceMethod: [
      {
        id: 1,
        name: '线上'
      },
      {
        id: 2,
        name: '线下'
      },
      {
        id: 3,
        name: '电话'
      },
      {
        id: 4,
        name: '不限'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Release demand
    // var releaseDemandData = {}
    console.log('页面携带参数', options)

    this.setData({
      initData: options,
      createTime: util.getNowFormatDate()
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
      key: 'serviceMethod',
      success(res) {
        console.log(res.data)
        This.setData({
          manner: res.data
        })
      }
    })
    wx.getStorage({
      key: 'serviceGender',
      success(res) {
        console.log(res.data)
        This.setData({
          gender: res.data
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.manner.name != '请选择服务方式') {
      wx.setStorage({
        key: "serviceMethod",
        data: this.data.manner
      })
    }
    if (this.data.gender.name != '请选择服务者性别') {
      wx.setStorage({
        key: "serviceGender",
        data: this.data.gender
      })
    }


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

    if (this.data.manner.name != '请选择服务方式') {
      wx.setStorage({
        key: "serviceMethod",
        data: this.data.manner
      })
    }
    if (this.data.gender.name != '请选择服务者性别') {
      wx.setStorage({
        key: "serviceGender",
        data: this.data.gender
      })
    }
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

  genderArrayFun(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log('服务方式为', this.data.genderArray[e.detail.value].id)

    this.setData({
      gender: {
        name: this.data.genderArray[e.detail.value].name,
        id: this.data.genderArray[e.detail.value].id
      }
    })


  },
  serviceMethodFun(e) {
    console.log('服务方式为', this.data.serviceMethod[e.detail.value].id)
    this.setData({
      manner: {
        name: this.data.serviceMethod[e.detail.value].name,
        id: this.data.serviceMethod[e.detail.value].id
      }
    })

  },
  post() {
    var This = this
    getReleaseDemandCount().then(res => {
      if (res.data.count === 1) {
        // 免费发布逻辑
        var params = {
          skillId: This.data.initData.id, //技能ID
          //tradeNo: U151981618135, //支付诚意金后获取的订单号
          beginTime: wx.getStorageSync('startDate'),//预约开始时间
          endTime: wx.getStorageSync('endDate'),//预约结束时间- 不能选择大于7天的时间
          servicePeriod: wx.getStorageSync('timeSlot').id,//服务时段-1上午时段2下午时段3晚上时段 
          latitude: wx.getStorageSync('reqParams').latitude, //经度纬度
          longitude: wx.getStorageSync('reqParams').longitude, //经度
          sex: wx.getStorageSync('serviceGender').id, //服务人员的性别 1.男 2.女 3.不限
          serviceMode: wx.getStorageSync('serviceMethod').id, //服务模式 1.线上 2.线下 3.电话 4.不限
          cityId: wx.getStorageSync('positionId'),  //城市ID
          //serviceId: ,//服务者Id（直接选择服务者发布需求时，必须送上）
          detail: wx.getStorageSync('demandInfo'),
          //*isNoticeAll: 1 //1是0否通知其他人，如未选择服务者发布需求，必须传1
        }
        releaseDemand(params).then(res => {
          console.log(res)
          wx.removeStorageSync('startDate')
          wx.removeStorageSync('endDate')
          wx.removeStorageSync('timeSlot')
          wx.removeStorageSync('serviceGender')
          wx.removeStorageSync('serviceMethod')
          wx.removeStorageSync('demandInfo')

        })
        
      } else {
        var params = {
          skillId: This.data.initData.id, //技能ID
          //tradeNo: wx.getStorageSync('orderNumber'), //支付诚意金后获取的订单号
          beginTime: wx.getStorageSync('startDate'),//预约开始时间
          endTime: wx.getStorageSync('endDate'),//预约结束时间- 不能选择大于7天的时间
          servicePeriod: wx.getStorageSync('timeSlot').id,//服务时段-1上午时段2下午时段3晚上时段 
          latitude: wx.getStorageSync('reqParams').latitude, //经度纬度
          longitude: wx.getStorageSync('reqParams').longitude, //经度
          sex: wx.getStorageSync('serviceGender').id, //服务人员的性别 1.男 2.女 3.不限
          serviceMode: wx.getStorageSync('serviceMethod').id, //服务模式 1.线上 2.线下 3.电话 4.不限
          cityId: wx.getStorageSync('positionId'),  //城市ID
          //serviceId: ,//服务者Id（直接选择服务者发布需求时，必须送上）
          detail: wx.getStorageSync('demandInfo'),
          isNoticeAll: 1 // 1是0否通知其他人，如未选择服务者发布需求，必须传1
        }

        if (util.checkData(params)) {
          // 判断参数是否有误
          if (wx.getStorageSync('orderNumber')) {
            params.tradeNo = wx.getStorageSync('orderNumber')
            // 判断有没有订单号
            releaseDemand(params).then(res => {
            
              console.log(res.data.result, res)
              wx.showModal({
                title: '提示',
                content: '恭喜您，需求发布成功',
                cancelText: '需求列表',
                confirmText: '返回首页',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url: '/pages/index/index'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
               
              //  wx.redirectTo({
              //    url: '/pages/index/index'
              //  })
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '您今天发的免费需求还在进行中，不能再次发免费需求，付诚意金后可无限次发需求。',
              confirmText: '付诚意金',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateTo({
                    url: '/pages/sincerity/sincerity'
                  })
                  
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
        
      }
    })
    // wx.navigateTo({
    //   url: '/pages/releaseSuces/releaseSuces'
    // })
  },
})