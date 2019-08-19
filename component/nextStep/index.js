// component/nextStep/nextStep.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // url: {
    //   type: String,
    //   value: ''
    // },
    // pageData: {
    //   type: Object,
    //   value: null
    // },
    // routerStatus: {
    //   type: String,
    //   value: 'navigateTo'
    // }
  },

  /**
   * 组件的初始数据
   */
  /***
   *
   * wx.switchTab(Object object)
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   *
   *
   *  wx.reLaunch(Object object)
   * 关闭所有页面，打开到应用内的某个页面
   *
   *
   * wx.redirectTo(Object object)
   *  关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
   *
   *
   *
   *  wx.navigateTo(Object object)
   *  保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十    层。
   *
   *
   * wx.navigateBack(Object object)
   * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
   *
   */
  data: {
    strData:''

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {

    },
    moved() { },
    detached() { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // hrefPage() {
    //   if (this.data.routerStatus != '') {
    //     if (this.data.routerStatus == 'switchTab') {
    //       wx.switchTab({
    //         url: this.data.url
    //       })
    //     }
    //     if (this.data.routerStatus == 'reLaunch') {
    //       wx.reLaunch({
    //         url: this.data.url
    //       })
    //     }
    //     if (this.data.routerStatus == 'redirectTo') {
    //       wx.redirectTo({
    //         url: this.data.url
    //       })
    //     }
    //     if (this.data.routerStatus == 'navigateTo') {
    //       wx.navigateTo({
    //         url: this.data.url
    //       })
    //     }
    //     if (this.data.routerStatus == 'navigateBack') {
    //       wx.navigateBack({
    //         url: this.data.url
    //       })
    //     }
    //   } else {
    //     wx.showModal({
    //       title: '提示',
    //       content: '请填写路由状态',
    //       success(res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定')
    //         } else if (res.cancel) {
    //           console.log('用户点击取消')
    //         }
    //       }
    //     })
    //   }
    // },
    /**
     * 初始化参数
     */
    initObj(obj) {
      return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
    }
  }
})
