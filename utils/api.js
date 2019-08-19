// 将请求进行 Promise 封装
const fetch = ({ url, data, method }) => {
    wx.showLoading({
        title: '加载中',
    })
    let TOKEN = ''
    TOKEN = wx.getStorageSync('token')



    // 打印接口请求的信息
    console.log(`【step 1】API 接口:${getApp().globalData.api + url}`);
    console.log('【step 2】data 传参', data);

    // 返回 Promise
    return new Promise((resolve, reject) => {
        wx.request({
            url: getApp().globalData.api + url,
            header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'Param-Access-Token': TOKEN == '' ? '' : TOKEN
            },
            data: data,
            method: method,
            success: res => {
                // console.log(res)
                // 成功时的处理
                if (res.data.code === '000000') {
                    console.log("【step 3】请求成功:");
                    // console.log(res.data);
                    wx.hideLoading()
                    return resolve(res.data);
                } else if (res.data.code === '000001') {
                    wx.redirectTo({
                        url: '/pages/login/login'
                    })
                } else {
                    wx.showModal({
                        title: '请求失败',
                        content: res.data.msg,
                        showCancel: false
                    });

                    wx.hideLoading()
                }

            },
            fail: err => {
                // 失败时的处理
                console.log(err);
                wx.showModal({
                    title: '请求失败',
                    content: err.errMsg,
                    showCancel: false
                });

                wx.hideLoading()
                return reject(err);
            }
        })
    })

}

/**
 * 登录
 * @param {*} data 
 */
export const Login = data => {
    return fetch({
        url: "/auth/v1/miniprogramLogin",
        data: data
    })
}

/**
 * 获取技能信息列表
 * @param {*} data 
 */
export const getSkillList = data => {
    return fetch({
        url: "/skillprofit/v1/getSkillList",
    })
}

/***
 * 获取热门技能信息列表
 */
export const getHostSkillList = data => {
    return fetch({
        url: "/skillprofit/v1/getHostSkillList",
    })
}

/**
 * 获取首页信息
 * @param {*} data 
 */
export const getIndexDataList = data => {
    return fetch({
        url: "/skillprofit/v1/getIndexDataList",
        data: data,
        method: 'POST'
    })
}

/**
 * 初始化需求服务信息
 * @param {*} data 
 */
export const saveMySkill = data => {
    return fetch({
        url: "/skillprofit/v1/saveMySkill",
        data: data
    })
}


/*
创建支付订单
type: 支付类型,1 - 666会员 2 - 5500会员 3.诚意金 4.定金
mode: 支付方式,1 - 微信 2 - 支付宝
payPlatform: 支付平台, 1 - APP 2 - 小程序 默认不填为APP
sincerityMoneyType: 诚意金, type为3时必填,详情请看3.84
1	35.00
2	50.00
3	100.00
4	200.00
5	400.00
6	500.00
7	1000.00
8	1500.00
orderId: type等于4时必输,用于获取订单信息
   * /

export const createPrepayOrder = data => {
    return fetch({
        url: "/payment/v1/createPrepayOrder",
        data: data
    })
}


/*
判断免费发布次数
    */
export const getReleaseDemandCount = data => {
    return fetch({
        url: "/skillprofit/v1/getReleaseDemandCount",
        data: data
    })
}

/**
 * 获取城市ID
 * @param {*} data 
 */
export const getCitys = data => {
    return fetch({
        url: "/mpf/v1/getCitys"
    })
}


/**
 * 发布需求
 * @param {*} data 
 */
export const releaseDemand = data => {
    return fetch({
        url: "/skillprofit/v1/releaseDemand",
        data: data,
        method: 'POST'
    })
}


/**
*34.5获取需求管理列表
*@param {
* demandType: 1 //选择状态类型栏 //选择栏状态分别对应 1.待应邀（0）
* 2.进行中（1、2、3）--为1时可显示【获取服务码】,为3显示【支付金额】
* 3.已成交（6）显示【评价】
* 4.未完成（4、5、7、8、9）,为7显示【支付金额】
} data
    */
export const getDemandManagementList = data => {
    return fetch({
        url: "/skillprofit/v1/getDemandManagementList",
        data: data,
    })
}

/**
 * 获取上传token
 * @param {*} data 
 */
export const getUploadToken = data => {
    return fetch({
        url: "/user/v1/getUploadToken",
    })
}


/**
 * 发布技能
 * {
    // 技能Id
    skillId: 1,
    //服务介绍
    serviceIntroduction: 89898,
    //线下服务金额
    offlineMoney: '11',
    //线下服务单位 1.小时 2.次 （注意:如服务金额传了则必传单位）
    offlineUnit: '1',
    //电话服务金额
    phoneMoney: '0.51',
    //电话服务单位 1.小时 2.次
    phoneUnit: '1',
    //线上服务金额
    onlineMoney: '51',
    //线上服务单位 1.小时 2.次
    onlineUnit: '1',
    // 地址
    location: '',
    //服务开始时间
    beginTime: '',
    //服务结束时间--不能大于7天
    endTime: '',
    //服务时段-1上午时段2下午时段3晚上时段 
    servicePeriod: '1',
    // 坐标位置
    latitude: 'XXXX',
    longitude: 'XXX',
    //上传的音频地址
    audioUrl: 'HTTP://XXXXXXXX',
    // 上传的视频地址
    videoUrl: 'HTTP://XXXXXXX',
    // 上传的视频截图地址
    videoImage: 'HTTP://XXXXXXX',
    //是否同步到技能圈
    isSynchronization: 'true/false',
    //教育经历--请用标准的json字符串对象传过来
    school: [
        {
            // 主键,编辑技能时,必须送上,如果有教育经历的话
            "id": "",
            //学校名称
            "name": "学校名称",
            //开始时间
            "beginTime": "2001.09",
            //结束时间
            "endTime": "2005.06"
        }
    ],
    // 工作经历
    company: [
        {
            //主键,编辑技能时,必须送上,如果有工作经历的话
            "id": "",
            "name": "公司名称",
            "beginTime": "2010.01",
            "endTime": "2019.01"
        }
    ],
    //荣誉资质
    honoraryCertificates: [
        {
            honorName: 装逼员,
            issuingAuthority: "世界装逼员同盟会",
            acquisitionTime: "2019-4-28 15:56"
        }
    ],
    //专业回答
    questionAnswers: [
        {
            question: "程序员头发的保养",
            answer: "用霸王"
        }
    ],
    //图片介绍
    Images: [
        "Http://XXXX.img"
    ],
    //当前城市Id
    cityId: 2,
    // 服务内容
    serviceContent: "12312312",
    // 个人优势(擅长领域)
    ownAdvantage: "13123123123"
}
 * @param {*} data 
 */
export const releaseService = data => {
    return fetch({
        url: "/skillprofit/v1/releaseService",
        data: data,
        method: 'POST'
    })
}

/**
    保存经历
{
    id:唯一id,编辑时必填,新增时不填
    experienceType: //经历类型1.工作经历 2.教育经历 3.荣誉资质
    companyName: //公司名称  type为1时必填
    department: //部门  type为1时必填
    jobTitle: //职位  type为1时必填
    detail://经历简介 type为1时必填
    
    schoolName: //学校名称 type为2时必填
    major: //专业 type为2时必填
    degree: 1// 学历 1.中专2.专科 3.本科 4.硕士 5.博士 6.其他 type为2时必填
    
    honorName: //荣誉名称 type为3时必填
    issuingAuthority://颁发机构 type为3时必填
    acquisitionTime: //获得日期 type为3时必填 yyyy-MM-dd
    honorDetail://荣誉简介 type为3时必填
    honorImage://荣誉证书图片 type为3时必填
    
    beginTime:起始日期  type不为3时必填 yyyy-MM-dd 
    endTime:结束日期  type不为3时必填 yyyy-MM-dd 
}
 * @param {*} data 
 */

export const saveExperience = data => {
    return fetch({
        url: '/skillprofit/v1/saveExperience',
        data,
        method: 'POST'
    })
}

/**
 * 获取经历
 * @param {*} data 
 */
export const getExperience = data => {
    return fetch({
        url: '/skillprofit/v1/getExperience',
        data,
        method: 'POST'
    })
}
/**
 * 删除经历
 * @param {*} data 
 */
export const deleteExperience = data => {
    return fetch({
        url:'/skillprofit/v1/deleteExperience',
        data,
        method:'POST'
    })
}


/**
 * 获取短信验证码
 */
export const getVerifyCode = data => {
    return fetch({
        url: '/auth/v1/getVerifyCode',
        data
    })
}
/**
 * 绑定手机号
 */
export const bindingMobile = data => {
    return fetch({
        url:'/auth/v1/bindingMobile',
        data,
        method:'POST'
    })
}

/**
 * 实名认证/user/v1/realnameAuth
 */
export const realnameAuth = data => {
    return fetch({
        url:'/user/v1/realnameAuth',
        data,
        method: 'POST'
    })
}

/**
 * 
 * @param {Object} data 技能id
 */
export const getServiceDetails = data => {
    return fetch({
        url: '/skillprofit/v1/getServiceDetails',
        data,
        method: 'POST'
    })
}


/**
 * 
 * @param {Object} data 经纬度以及技能id
 */
export const getServicerInfo = data => {
    return fetch({
        url: '/skillprofit/v1/getServicerInfo',
        data,
        method: 'POST'
    })
}