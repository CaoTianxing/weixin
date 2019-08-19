import {
  Login,
} from '../../utils/api.js'
Component({
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    hrefPage(e) {
      let index = e.currentTarget.dataset.index
      console.log(index)
      if(index == 1){
        // 首页
        // wx.navigateTo({
        //   url: '/pages/index/index'
        // })
      } else if (index == 2){
        // 我的需求
        wx.navigateTo({
          url: '/pages/demandManagement/demandManagement'
        })
      } else if (index == 3) {
        // 发布
        wx.navigateTo({
          url: '/pages/release/release'
        })
      } else if (index == 4) {
        // 技能订单
        wx.navigateTo({
          url: '/pages/skillOrder/skillOrder'
        })
      } else if (index == 5) {
        // 我的
        wx.navigateTo({
          url: '/pages/mine/mine'
        })
        
        // wx.login({
        //   success(res) {
        //     if (res.code) {
        //       console.log(res)
        //       // Login({
        //       //   "code": res.code,
        //       //   "platform": 0
        //       // }).then(
        //       //   res => {
        //       //     console.log("【step 4】返回成功处理：");
        //       //     console.log(res.data);
        //       //   },
        //       //   err => {
        //       //     console.log("【step 4】返回失败处理：");
        //       //     console.log(err);
        //       //   }
        //       // )
        //     } else {
        //       console.log('登录失败！' + res.errMsg)
        //     }
        //   }
        // })
      }
    }
  },
  
})
