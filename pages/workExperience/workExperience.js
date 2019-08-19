// pages/questionAnswer2/questionAnswer2.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { saveExperience, getExperience, deleteExperience } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 公司名
    companyName: '',
    // 部门
    department: '',
    // 职位
    jobTitle: '',
    // 开始时间
    beginTime: '',
    // 结束时间
    endTime: '',

    navigationBarHeight,
    educationbeginTime: '',
    educationEnd: '',
    // 经历
    educationName: {},

    show: false,
    btn: true,
    schoolName: '',
    profession: '',
    educationList: [],
    upbtn: false,
    // 展示的工作
    company: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      initData: options,
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
    getExperience().then(res => {
      console.log('获取所有工作经历', res.data.experienceInfo.company)
      This.setData({
        company: res.data.experienceInfo.company
      })
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
  /**
   * 显示弹框
   */
  isShowMask() {
    this.setData({ show: true, btn: false });
  },
  showMask() {
    this.setData({ show: true, btn: false });
  },
  onClose() {
    this.setData({ show: false, btn: true });
  },

  /**
   * 输入时触发
   */
  getcompanyName(event) {
    this.setData({
      companyName: event.detail.value
    })
  },
  getDepartment(event) {
    this.setData({
      department: event.detail.value
    })

  },
  getjobTitle(event) {
    this.setData({
      jobTitle: event.detail.value
    })

  },
  /**
   * 保存刚加的经历
   */
  addvalue() {
    var This = this

    if (this.data.companyName && this.data.department && this.data.jobTitle && this.data.beginTime && this.data.endTime) {
      let params = {
        experienceType: '1',
        companyName: this.data.companyName,//公司名称  type为1时必填
        department: this.data.department, //部门  type为1时必填
        jobTitle: this.data.jobTitle, //职位  type为1时必填
        beginTime: this.data.beginTime,// 起始日期  type不为3时必填 yyyy-MM-dd 
        endTime: this.data.endTime// 结束日期  type不为3时必填 yyyy-MM-dd 
      }
      saveExperience(params).then(res => {
        console.log('保存工作经历', res)
        getExperience().then(res => {
          console.log('获取所有工作经历', res.data.experienceInfo.company)
          This.setData({
            company: res.data.experienceInfo.company
          })
        })
      })

      this.onClose()
      this.setData({ companyName: '', department: '', jobTitle: {}, beginTime: '', endTime: '' })
    } else {
      wx.showModal({
        title: '提示',
        content: '内容不能为空',
        success(res) {
          if (res.confirm) {

          } else if (res.cancel) {

          }
        }
      })
    }
  },
  /**
   * 编辑
   * @param {*} e 
   */

  editValue(e) {
    var This = this
    let id = e.currentTarget.dataset.id
    this.showMask()
    getExperience().then(res => {
      console.log('获取所有工作经历', res.data.experienceInfo.company)
      res.data.experienceInfo.company.some((item, index, arr) => {
        if (item.id == id) {
          This.setData({
            companyName: item.companyName,
            department: item.department,
            jobTitle: item.jobTitle,
            beginTime: item.beginTime,
            endTime: item.endTime,
            upbtn: true,
            upIndex: id
          })
        }
      })
    })
  },
  /**
   * 更新
   */
  upvalue() {
    let This = this

    let params = {
      experienceType: '1',
      id:this.data.upIndex,
      companyName: this.data.companyName,//公司名称  type为1时必填
      department: this.data.department, //部门  type为1时必填
      jobTitle: this.data.jobTitle, //职位  type为1时必填
      beginTime: this.data.beginTime,// 起始日期  type不为3时必填 yyyy-MM-dd 
      endTime: this.data.endTime// 结束日期  type不为3时必填 yyyy-MM-dd 
    }
    saveExperience(params).then(res => {
      console.log('保存工作经历', res)
      getExperience().then(res => {
        console.log('获取所有工作经历', res.data.experienceInfo.company)
        This.setData({
          company: res.data.experienceInfo.company
        })
      })
    })
      this.setData({
        companyName: '', department: '', jobTitle: {}, beginTime: '', endTime: '', upbtn: false
      })
    this.onClose()
  },
  /**
   * 删除
   * @param {*} e 
   */
  remValue(e) {
    let id = e.currentTarget.dataset.id
    let This = this
    let params = {
      id:id,
    }
    deleteExperience(params).then(res => {
      console.log('删除工作经历', res)
      getExperience().then(res => {
        console.log('获取所有工作经历', res.data.experienceInfo.company)
        This.setData({
          company: res.data.experienceInfo.company
        })
      })
    })
    
  },

  /**
   * 保存
   */
  save() {
      wx.navigateBack({
        delta: 1
      })
  },

  /**
   * 工作开始时间
   * @param {*} e 
   */
  firmbeginTime(e) {
    this.setData({
      beginTime: e.detail.value
    })
  },
  /**
   * 工作结束时间
   */
  firmendTime(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

})