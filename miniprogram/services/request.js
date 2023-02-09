"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const startRequest = function (data) {
    const params = data.params;
    const resolve = data.resolve;
    const reject = data.reject;
    let url = params.url;
    if (params.url.indexOf("https") === -1) {
        url = "https://api.ichains.site" + params.url;
    }
    wx.request({
        url: url,
        data: params.data || {},
        header: {
            Authorization: "token",
            ...params.headers
        },
        method: params.method,
        success(res) {
            const resData = res.data;
            switch (res.statusCode) {
                case 200:
                    resolve(resData);
                    break;
                case 401: {
                    // need to login          
                    break;
                }
                case 403: {
                    // need to login          
                    break;
                }
                case 404:
                    wx.hideLoading();
                    wx.showToast({ title: "404: Api 好像丢失了，请重新访问", icon: "none", mask: true });
                    break;
                default:
                    wx.hideLoading();
                    wx.showModal({
                        title: "提示",
                        content: "服务器正忙,请稍后再试。",
                        showCancel: false
                    });
            }
        },
        fail(error) {
            wx.hideLoading();
            // 超时异常处理
            if (/timeout/.test(error.errMsg)) {
                wx.showModal({ title: "提示", content: "网络超时，请稍后尝试...", showCancel: false });
            }
            reject(error);
        }
    });
};
function Request(params) {
    return new Promise((resolve, reject) => {
        const requestParams = { params, resolve, reject };
        startRequest(requestParams);
    });
}
exports.Request = Request;
