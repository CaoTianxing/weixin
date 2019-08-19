//index.js

import { getIndexDataList, getCitys, saveServiceInvitee } from '../../utils/api'

const md5 = require('../../utils/md5.min.js')
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
Page({
    data: {
        mask: false,
        url: '/pages/logs/logs',
        routerStatus: 'navigateTo',
        releaseDemandData: {},
        // 默认位置信息
        positionInfo: '',
        // 导航高度
        navigationBarHeight,
        // 导航标题
        navigationBarTitle: '首页',
        pageData: {
            name: '小明'
        },
        imgUrls: [
            'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ],
        active: 0,
        tabBarLiat: [{
                title: '首页',
                active: 'http://116.62.168.126/jnzq/index-31.png',
                normal: 'http://116.62.168.126/jnzq/index-31.png'
            },
            {
                title: '我的需求',
                active: 'http://116.62.168.126/jnzq/index-23.png',
                normal: 'http://116.62.168.126/jnzq/index-23.png'
            },
            {
                title: '发布',
                active: 'http://116.62.168.126/jnzq/index-25.png',
                normal: 'http://116.62.168.126/jnzq/index-25.png'
            },
            {
                title: '技能订单',
                active: 'http://116.62.168.126/jnzq/index-24.png',
                normal: 'http://116.62.168.126/jnzq/index-24.png'
            },
            {
                title: '我的',
                active: 'http://116.62.168.126/jnzq/index-27.png',
                normal: 'http://116.62.168.126/jnzq/index-27.png'
            },
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 1000,
        duration: 500,
        selected: 0,
        filterList: [{
                name: '智能排序',
                icon: false,
                index: '0'
            }, {
                name: '人气最高',
                icon: false,
                index: '1'
            }, {
                name: '距离最近',
                icon: false,
                index: '2'
            },
            {
                name: '高级筛选',
                icon: true,
                index: '3'
            }
        ],
        intelligentActive: true,
        popularityActive: false,
        distanceActive: false,
        advancedActive: false,
        params: {},
        gender: [
            { index: '0', name: '男女不限', id: 3, active: true },
            { index: '1', name: '男', id: 1, active: false },
            { index: '2', name: '女', id: 2, active: false }
        ],
        age: [
            { index: '0', name: '年龄不限', id: 4, active: true },
            { index: '1', name: '25以下', id: 1, active: false },
            { index: '2', name: '25-35', id: 2, active: false },
            { index: '3', name: '35以上', id: 3, active: false }
        ],
        serveManner: [
            { index: '0', name: '服务方式不限', id: 4, active: true },
            { index: '1', name: '线上服务', id: 1, active: false },
            { index: '2', name: '线下服务', id: 2, active: false },
            { index: '3', name: '电话咨询', id: 3, active: false },
        ],
        realName: [
            { index: '0', name: '实名不限', id: 3, active: true },
            { index: '1', name: '是', id: 1, active: false },
            { index: '2', name: '否', id: 2, active: false },
        ],
        // 距离
        distance: [
            { index: '0', name: '距离不限', id: 3, active: true },
            { index: '1', name: '五公里内', id: 1, active: false },
            { index: '2', name: '五公里外', id: 2, active: false },
        ]
    },

    onLoad: function() {

        var user = wx.getStorageSync('token')
        if (user) {
            // 登录了
            // 获取经纬度
            this.getPosition()
                // 判断本地存储里面有没有
            this.ifLocal()
                // 获取首页数据
            this.getIndexData('1')
        } else {
            wx.reLaunch({
                url: '/pages/login/login'
            })

        }

    },
    onReady: function() {
        this.animation = wx.createAnimation({
            duration: '400',
            timingFunction: 'ease-out'
        })


    },
    /**
     * 动画部分start
     */

    startAnima: function() {
        this.showMask()
        this.animation.translateX(-300).step()
        this.setData({ animation: this.animation.export() })

    },
    endAnima: function() {
        this.hideMask()
        this.animation.translateX(300).step()
        this.setData({ animation: this.animation.export() })
    },
    /**
     * 动画部分end
     */
    // 排序
    selected(e) {
        // console.log(e)
        let that = this
        let index = e.currentTarget.dataset.index
            // console.log(index)
        if (index == 0) {
            this.getIndexData('1')
            that.setData({
                selected: 0
            })
        } else if (index == 1) {
            this.getIndexData('2')
            that.setData({
                selected: 1
            })
        } else if (index == 2) {
            this.getIndexData('3')
            that.setData({
                selected: 2
            })
        } else {
            this.startAnima()
            that.setData({
                selected: 3
            })
        }
    },
    /**
     * tab索引
     */
    onChange(event) {
        // console.log(event.detail);
        if (event.detail == 0) {}

        if (event.detail == 1) {
            wx.navigateTo({
                url: '/pages/demandManagement/demandManagement'
            })
        }
        if (event.detail == 2) {
            wx.navigateTo({
                url: '/pages/release/release'
            })
        }

        if (event.detail == 3) {}
        if (event.detail == 4) {

        }
    },

    // 获取地理位置
    async getPosition() {
        var This = this
            // 获取用户位置
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude
                This.setData({
                    latitude: latitude,
                    longitude: longitude
                })
                wx.request({
                    url: 'https://apis.map.qq.com' + '/ws/geocoder/v1?key=X5HBZ-D37HD-LVM4W-HNQLF-ACKAT-EFFB5&location=' + latitude + ',' + longitude + '&sig=' + md5('/ws/geocoder/v1?key=X5HBZ-D37HD-LVM4W-HNQLF-ACKAT-EFFB5&location=' + latitude + ',' + longitude + 'sv9Gp5duH84QrHOBWBZTrVNMJQZKLBkX'),
                    data: {},
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.statusCode != 200) {
                            This.setData({
                                positionInfo: '未知'
                            })
                        } else {

                            This.setData({
                                positionInfo: res.data.result.address_component.city
                            })
                            wx.setStorageSync('positionInfo',res.data.result.address_component.city)
                            getCitys().then(res => {
                                for (const key in res.data.citys) {
                                    for (var i = 0; i < res.data.citys[key].length; i++) {
                                        if (res.data.citys[key][i].name == This.data.positionInfo) {
                                            wx.setStorage({
                                                key: "positionId",
                                                data: res.data.citys[key][i].id
                                            })
                                            break
                                        }
                                    }
                                }

                            })
                        }


                    },
                    fail: function() {

                    },

                })
            },
            fail: function() {
                // console.log('获取位置失败了')
            }
        })
    },
    /**
     * 遍历一个一个数组中的对象返回id
     */
    forCopyId(list) {
        var arr = []
        for (var i = 0; i < list.length; i++) {
            arr.push(list[i].id)
        }
        return arr
    },
    // 判断用户用户是否是第一次进入小程序和是否选择了相关技能和服务
    ifLocal() {
        if (wx.getStorageSync('theFirstTime')) {
            // 不是第一次进小程序
            // console.log('已经不是第一次玩小程序了')
            /**
             * 如果用户不是第一次进技能赚钱小程序
             * 判断之前有没有保存过相关的数据
             * 如果有数据 就根据用户选择的内容推荐相关数据
             */
            var GoodAtSkills = wx.getStorageSync('GoodAtSkills') // 技能
            var NeedSkills = wx.getStorageSync('NeedSkills') // 需求

            if (GoodAtSkills != '' && GoodAtSkills != undefined && GoodAtSkills != null) {
                // console.log('用户选择了技能', GoodAtSkills)
                // 把id 存到一个数组里面
                let GoodAtSkillsList = this.forCopyId(GoodAtSkills)
                    // console.log('根据技能id 推荐相关数据', GoodAtSkillsList)
                this.setData({
                    GoodAtSkillsList: GoodAtSkillsList
                })

            } else {
                // console.log('用户未选择技能')
            }

            if (NeedSkills != '' && NeedSkills != undefined && NeedSkills != null) {
                // console.log('用户选择了需求', NeedSkills)
                // 把id 存到一个数组里面
                let NeedSkillsList = this.forCopyId(NeedSkills)

                // console.log('根据需求id 推荐相关数据', NeedSkillsList)
                this.setData({
                    NeedSkillsList: NeedSkillsList
                })
            } else {
                // console.log('用户未选择需求')
            }

        } else {
            // 第一次进小程序
            wx.setStorage({
                key: "theFirstTime",
                data: '0'
            })
            wx.reLaunch({
                url: '/pages/skillManagementOne/skillManagementOne'
            })
        }
    },
    // 获取首页数据
    getIndexData(status) {
        var This = this
        var latitude = this.data.latitude == undefined ? '22.5262734461' : this.data.latitude
        var longitude = this.data.longitude == undefined ? '113.3820497990' : this.data.longitude
        if (status == '1') {
            // 智能排序
            let params = {
                latitude: latitude,
                longitude: longitude,
                screening: status
            }
            getIndexDataList(params).then(res => {
                console.log('智能排序', res.data.list)
                This.setData({
                    indexDataList: res.data.list
                })
            })
        } else if (status == '2') {
            // 人气排序
            let params = {
                latitude: latitude,
                longitude: longitude,
                screening: status
            }
            getIndexDataList(params).then(res => {
                console.log('人气排序', res.data.list)
                This.setData({
                    PopularityList: res.data.list
                })
            })
        } else if (status == '3') {
            // 距离排序
            let params = {
                latitude: latitude,
                longitude: longitude,
                screening: status
            }
            getIndexDataList(params).then(res => {
                console.log('距离排序', res.data.list)
                for (let i = 0; i < res.data.list.length; i++) {
                    console.log(res.data.list[i].images)
                }
                This.setData({
                    distanceList: res.data.list
                })
            })
        } else if (status.constructor == Object) {

            let params = {
                "latitude": '22.5262734461',
                "longitude": '113.3820497990',
                "screening": 4,
                "sex": status.gender.id,
                "age": status.age.id,
                "distance": status.distance.id,
                "serviceMode": status.serveManner.id,
                "certification": status.realName.id,
                "cityId": wx.getStorageSync('positionId'),
                "cityName": this.data.positionInfo


            }

            getIndexDataList(params).then(res => {
                console.log('高级筛选', res.data.list)
                This.setData({
                    advancedfilter: res.data.list
                })
                This.endAnima()

            })
        }


    },
    // 进入首页的时候创建一个用于请求的对象
    onHide: function() {
        this.data.releaseDemandData = {
            latitude: this.data.latitude,
            longitude: this.data.longitude
        }
        wx.setStorage({
            key: "reqParams",
            data: this.data.releaseDemandData
        })
    },
    // 异步筛选
    indexFilter(params) {
        console.log(params)
    },
    /**
     * 显示mask
     */
    showMask() {
        this.setData({
            mask: true
        })
    },
    hideMask() {
        this.setData({
            mask: false
        })
    },
    /**
     * 高级筛选高亮样式
     */
    addClass(e) {
        var name = e.currentTarget.dataset.name
        var index = e.currentTarget.dataset.index
        if (name == 'gender') {
            var genderList = this.initFul(this.data.gender)
            genderList[index].active = true
            this.setData({
                gender: genderList
            })
        } else if (name == 'age') {
            var ageList = this.initFul(this.data.age)
            ageList[index].active = true
            this.setData({
                age: ageList
            })
        } else if (name == 'realName') {
            var realNameList = this.initFul(this.data.realName)
            realNameList[index].active = true
            this.setData({
                realName: realNameList
            })
        } else if (name == 'serveManner') {
            var serveMannerList = this.initFul(this.data.serveManner)
            serveMannerList[index].active = true
            this.setData({
                serveManner: serveMannerList
            })
        } else if (name == 'distance') {
            var distanceList = this.initFul(this.data.distance)
            distanceList[index].active = true
            this.setData({
                distance: distanceList
            })
        }
    },
    /**
     * 初始化赛选样式
     */
    initFul(a) {
        for (let i = 0; i < a.length; i++) {
            a[i].active = false
        }
        return a

    },

    /**
     * 点击确认筛选
     */
    startFilter() {
        this.getIndexData({
            gender: this.findTrue(this.data.gender),
            age: this.findTrue(this.data.age),
            realName: this.findTrue(this.data.realName),
            serveManner: this.findTrue(this.data.serveManner),
            distance: this.findTrue(this.data.distance)
        })

        // this.endAnima()
    },
    /**
     * 找出数组里面active 为true 的元素  
     */
    findTrue(a) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].active) {
                return a[i]
            }
        }

    }
})