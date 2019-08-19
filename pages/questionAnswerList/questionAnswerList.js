// pages/questionAnswer2/questionAnswer2.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight,
    show: false,
    btn: true,
    question: '',
    answer: '',
    list:[],
    upbtn: false
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
    wx.getStorage({
      key: 'problemList',
      success (res) {
        var newlist = [...res.data]
        This.setData({
          list: newlist
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
  /**
   * 显示弹框
   */
  isShowMask() {
    this.setData({ show: true,btn: false });
  },
  showMask(){
    this.setData({ show: true,btn: false });
  },
  onClose() {
    this.setData({ show: false,btn: true });
  },

  /**
   * 输入时触发
   */
  getKey(event){
    this.setData({
      question: event.detail.value
    })
    console.log('question',event.detail.value)
  },
  getValue(event){
    this.setData({
      answer: event.detail.value
    })
    console.log('answer',event.detail.value)
    
  },
  /**
   * 点击添加问题
   */
  addvalue(){
    if(this.data.question && this.data.answer){
      this.data.list.push({ question: this.data.question, answer: this.data.answer})
      this.setData({list: this.data.list})
      this.setData({question: '',answer: ''})
      this.onClose()
    }else{
      wx.showModal({
        title: '提示',
        content:'内容不能为空',
        success(res){
          if(res.confirm){
            
          }else if(res.cancel){

          }
        }
      })
    } 
  },

  editValue(e){
    let index = e.currentTarget.dataset.id
    this.showMask()
    this.setData({
      question: this.data.list[index].question,
      answer: this.data.list[index].answer,
      upbtn: true,
      upIndex: index
    })
    
  },
  upvalue(){
    var newArr = [...this.data.list]
    newArr.splice(this.data.upIndex,1)
    newArr.splice(this.data.upIndex,1,{question: this.data.question,answer: this.data.answer}),
    this.setData({list: newArr})
    this.onClose()
  },
  remValue(e){
    var newArr = [...this.data.list]
    let index = e.currentTarget.dataset.id
    newArr.splice(index,1)
    this.setData({list: newArr})
  },


  save (){
    if(this.data.list){
      console.log(this.data.list)
      wx.setStorageSync('problemList',this.data.list)
      wx.navigateBack({
        delta: 1
      })
    }
    
  }
})