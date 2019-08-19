// pages/demandManagement/demandManagement.js
const navigationBarHeight = (getApp().statusBarHeight + 44) + 'px'
import { getDemandManagementList } from '../../utils/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarHeight,
        allDemandList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getDemandManagementList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    hrefPage() {
        console.log(1)
        wx.navigateTo({
            url: '/pages/demandDetails/demandDetails'
        })
    },

    /**
     * 获取所有需求列表
     * @param {*} params 
     */
    getDemandManagementList(s) {
        let params = {
            demandType: s
        }

        if (s == undefined) {
            // 获取所有
            getDemandManagementList().then(res => {
                console.log('获取所有-------', res)
                this.setData({
                    allDemandList: res.data.list
                })
            })
        } else if (params.demandType == '1') {
            // 待应邀
            getDemandManagementList(params).then(res => {
                console.log('获取所有待应邀-------', res)
            })
        } else if (params.demandType == '2') {
            // 进行中
            getDemandManagementList(params).then(res => {
                console.log('获取所有进行中-------', res)
            })
        } else if (params.demandType == '3') {
            // 已成交
            getDemandManagementList(params).then(res => {
                console.log('获取所有已成交-------', res)
            })
        } else if (params.demandType == '4') {
            // 未完成
            getDemandManagementList(params).then(res => {
                console.log('获取所有未完成-------', res)
            })
        }

    },
    onChange(e) {
        console.log(e.detail.index)
        if (e.detail.index == 0) {
            this.getDemandManagementList()
        } else if (e.detail.index == 1) {
            this.getDemandManagementList(1)
        } else if (e.detail.index == 2) {
            this.getDemandManagementList(2)
        } else if (e.detail.index == 3) {
            this.getDemandManagementList(3)
        } else if (e.detail.index == 4) {
            this.getDemandManagementList(4)
        }
    }
})