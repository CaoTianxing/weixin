// pages/appointment/appointment.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
Page({

  /**
   * 页面的初始数据12下午时段3晚上时段 
   */
  data: {
    startDate: '请选择',
    endDate: '请选择',
    timeSlot: {
      name: '请选择',
      id: 0
    },
    timeSlotArr: [
      {
        name: '上午时段',
        id: 1
      },
      {
        name: '下午时段',
        id: 2
      },
      {
        name: '晚上时段',
        id: 3
      },
      {
        name: '全天',
        id: 4
      }
    ],
    navigationBarHeight
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
    var This = this
    wx.getStorage({
      key: 'startDate',
      success(res) {
        console.log(res.data)
        This.setData({
          startDate: res.data
        })
      }
    })
    wx.getStorage({
      key: 'endDate',
      success(res) {
        console.log(res.data)
        This.setData({
          endDate: res.data
        })
      }
    })
    wx.getStorage({
      key: 'timeSlot',
      success(res) {
        console.log(res.data)
        This.setData({
          timeSlot: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.startDate != '请选择') {
      wx.setStorage({
        key: "startDate",
        data: this.data.startDate
      })
    } else if (this.data.endDate != '请选择') {
      wx.setStorage({
        key: "endDate",
        data: this.data.endDate
      })
    } else if (this.data.timeSlot.name != '请选择') {
      wx.setStorage({
        key: "timeSlot",
        data: this.data.timeSlot
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
  bindDateChangeStart: function (e) {
    // 获取开始时间
    this.setData({
      startDate: e.detail.value
    })
    wx.setStorage({
      key: "startDate",
      data: this.data.startDate
    })

  },
  bindDateChangeEnd: function (e) {
    var intDate = this.better_time(this.data.startDate, e.detail.value)
    console.log(intDate)
    if (intDate > 8) {
        wx.showModal({
          title: '提示',
          content:'不能选择大于7天的时间',
          success(res){
            if(res.confirm){
              
            }else if(res.cancel){

            }
          }
        })
    } else {
      // 获取结束时间
      this.setData({
        endDate: e.detail.value
      })
      wx.setStorage({
        key: "endDate",
        data: this.data.endDate
      })
    }

  },
  timeSlotFun(e) {
    console.log('服务时间段', this.data.timeSlotArr[e.detail.value].id)

    this.setData({
      timeSlot: {
        name: this.data.timeSlotArr[e.detail.value].name,
        id: this.data.timeSlotArr[e.detail.value].id
      }
    })
    wx.setStorage({
      key: "timeSlot",
      data: this.data.timeSlot
    })

  },
  // 用户点击保存
  save() {
    if (this.data.startDate != '请选择') {
      wx.setStorage({
        key: "startDate",
        data: this.data.startDate
      })
    } else if (this.data.endDate != '请选择') {
      wx.setStorage({
        key: "endDate",
        data: this.data.endDate
      })
    } else if (this.data.timeSlot.name != '请选择') {

    }

    wx.navigateBack({
      delta: 1
    })
  },
  better_time(strDateStart, strDateEnd) {
    var strSeparator = "-"; //日期分隔符
    var strDateArrayStart;
    var strDateArrayEnd;
    var intDay;
    strDateArrayStart = strDateStart.split(strSeparator);
    strDateArrayEnd = strDateEnd.split(strSeparator);
    var strDateS = new Date(strDateArrayStart[0] + "/" + strDateArrayStart[1] + "/" + strDateArrayStart[2]);
    var strDateE = new Date(strDateArrayEnd[0] + "/" + strDateArrayEnd[1] + "/" + strDateArrayEnd[2]);
    intDay = (strDateE - strDateS) / (1000 * 3600 * 24);
    return intDay;
  }

})