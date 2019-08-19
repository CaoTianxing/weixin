// pages/questionAnswer2/questionAnswer2.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { saveExperience, getExperience, deleteExperience } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight,
    educationStartDate: '',
    educationEnd: '',
    // 学历
    educationName: {},
    educationNameList: [
      { id: 1, name: '专科' },
      { id: 2, name: '本科' },
      { id: 3, name: '硕士' },
      { id: 4, name: '博士' },
      { id: 5, name: '其他' }
    ],
    show: false,
    btn: true,
    schoolName: '',
    profession: '',
    educationList: [],
    upbtn: false,
    // 展示的教育
    educationArr: []
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
    let This = this
    let newList = []
    let obj = new Object()
    getExperience().then(res => {
      console.log('教育经历', res.data.experienceInfo.school)
      This.setData({
        school: res.data.experienceInfo.school
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
  getKey(event) {
    this.setData({
      schoolName: event.detail.value
    })
  },
  getValue(event) {
    this.setData({
      profession: event.detail.value
    })

  },
  /**
   * 保存刚加的学历
   */
  addvalue() {
    let This = this

    if (this.data.schoolName && this.data.profession && this.data.educationName && this.data.educationStartDate && this.data.educationEndDate) {
      let params = {
        experienceType: '2',
        schoolName: this.data.schoolName,//学校名称 type为2时必填
        major: this.data.profession,//专业 type为2时必填
        degree: this.data.educationName.id,// 学历 1.中专2.专科 3.本科 4.硕士 5.博士 6.其他 type为2时必填
        beginTime: this.data.educationStartDate,// 起始日期  type不为3时必填 yyyy-MM-dd 
        endTime: this.data.educationEndDate//结束日期  type不为3时必填 yyyy-MM-dd 
      }
      console.log(params)
      saveExperience(params).then(res => {
        console.log('保存学历成功', res)
        getExperience().then(res => {
          console.log('教育经历', res.data.experienceInfo.school)
          This.setData({
            school: res.data.experienceInfo.school
          })
        })

      })
      this.onClose()
      this.setData({ schoolName: '', profession: '', educationName: {}, educationStartDate: '', educationEndDate: '' })
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
    let This = this
    let id = e.currentTarget.dataset.id
    this.showMask()
    getExperience().then(res => {
      console.log('教育经历', res.data.experienceInfo.school)
      res.data.experienceInfo.school.some((item, index, arr) => {
        if(item.id == id){
          This.setData({
            schoolName: item.schoolName,
            profession: item.major,
            educationName: item.degree == 1 ? {name: '专科',id: 1} : item.degree == 2 ? {name: '本科',id: 2} : item.degree == 3 ? {name: '硕士',id: 3} :item.degree == 4 ? {name: '博士',id: 4}: {name: '其他',id: 5},
            educationStartDate: item.beginTime,
            educationEndDate: item.endTime,
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

    if (this.data.schoolName && this.data.profession && this.data.educationName && this.data.educationStartDate && this.data.educationEndDate) {
      let params = {
        experienceType: '2',
        schoolName: this.data.schoolName,//学校名称 type为2时必填
        major: this.data.profession,//专业 type为2时必填
        degree: this.data.educationName.id,// 学历 1.中专2.专科 3.本科 4.硕士 5.博士 6.其他 type为2时必填
        beginTime: this.data.educationStartDate,// 起始日期  type不为3时必填 yyyy-MM-dd 
        endTime: this.data.educationEndDate,//结束日期  type不为3时必填 yyyy-MM-dd 
        id: This.data.upIndex
      }
      console.log(params)
      saveExperience(params).then(res => {
        console.log('保存学历成功', res)
        getExperience().then(res => {
          console.log('教育经历', res.data.experienceInfo.school)
          This.setData({
            school: res.data.experienceInfo.school
          })
          This.setData({
            schoolName: '', profession: '', educationName: {}, educationStartDate: '', educationEndDate: '', upbtn: false
          })
          This.onClose()
        })

      })
      This.onClose()
      This.setData({ schoolName: '', profession: '', educationName: {}, educationStartDate: '', educationEndDate: '' })
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
   * 删除
   * @param {*} e 
   */
  remValue(e) {
    let This = this
    let id = e.currentTarget.dataset.id

    let params = {
      id: id
    }
    deleteExperience(params).then(res => {
      console.log(res)
      getExperience().then(res => {
        This.setData({
          school: res.data.experienceInfo.school
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
   * 学历
   * @param {*} e 
   */
  getEducationName(e) {
    this.setData({ educationName: this.data.educationNameList[e.detail.value] })

  },
  /**
   * 教育开始时间
   * @param {*} e 
   */
  educationStart(e) {
    this.setData({
      educationStartDate: e.detail.value
    })
  },
  /**
   * 教育结束时间
   */
  educationEnd(e) {
    this.setData({
      educationEndDate: e.detail.value
    })
  },

})