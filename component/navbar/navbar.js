const app = getApp()

Component({

  properties: {
    text: {
      type: String,
      value: 'Wechat'
    },
    back: {
      type: Boolean,
      value: false
    },
    home: {
      type: Boolean,
      value: false
    }
  },

  data: {
    statusBarHeight: app.statusBarHeight + 'px',
    navigationBarHeight: (app.statusBarHeight + 44) + 'px'
  },
  attached: function () {
    let pages = getCurrentPages();
    let currPage = null;
    if (pages.length) {
      currPage = pages[pages.length - 1];
    }
    // console.log(currPage.route)
  },
  methods: {
    backHome: function () {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
