// const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
const qiniuUploader = require('./qiniuUploader')
import { getUploadToken } from './api'
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const getNowFormatDate = getNowFormatDate => {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/**
 * 校验参数
 * @param {} p 
 */
const checkData = p => {
    // var list = []

    var flag = new Boolean();
    flag = true;
    for (var key in p) {
        if (p[key]) { } else {
            flag = false;
        }
    }

    if (!flag) {
        wx.showModal({
            title: '提示',
            content: '参数错误',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
        return false;
    } else {

        return true;
    }
}
const imgIsTtueFalse = s => {
    var ImgObj = new Image();
    for (let i = 0; i < s.length; i++) {
        ImgObj.src = s
        if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
            console.log('有效');
        } else {
            console.log('无效');
        }
    }
}



/**
 * https://up-z2.qiniup.com
 * @param {*} File 
 */
 const upLoad = async (filePath,that) => {
    var list = []
    getUploadToken().then(res => {
        qiniuUploader.upload(filePath,  (res) => {
            that.setData({
                videoSrc: res.imageURL
            })
            console.log(that.data.videoSrc)

        },
            (error) => {
                console.log('error: ' + error);
            }, {
                region: 'SCN',
                domain: 'http://static.duodianwangluo.com',
                uptoken: wx.getStorageSync('upToken'),
                key:'filePath',
                shouldUseQiniuFileName: true
            },
            (res) => {
                console.log('上传进度', res.progress)
                console.log('已经上传的数据长度', res.totalBytesSent)
                console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
                
            },
            () => {
                // 取消上传
            },
            () => {
                // `before` 上传前执行的操作
            },
            (err) => {
                // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
                
            });
    })
    
    
}



module.exports = {
    formatTime,
    getNowFormatDate,
    checkData,
    upLoad,
}