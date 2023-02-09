"use strict";
// 组件: 获取用户手机号
Component({
    data: {
        encryptedData: "",
        iv: "",
        /** 用户手机号 */
        userPhone: "",
        /** 节流标记 */
        _throttleFlag: false
    },
    methods: {
        /** 通过按钮触发，获取当前微信用户的加密信息与签名 */
        getUserPhone(e) {
            if (this.data._throttleFlag)
                return;
            this.throttle();
            const detail = e.detail;
            if (detail.errMsg === "getPhoneNumber:ok") {
                wx.showLoading({ title: "授权中...", mask: true });
                this.setData({
                    encryptedData: detail.encryptedData,
                    iv: detail.iv
                });
                this.postPhone();
            }
            else {
                this.authFail("获取权限失败，请允许授权");
            }
        },
        /** 提交加密信息至服务器进行解密, 获取手机号 */
        async postPhone() {
            // const res = await PostPhoneEncrptionData({
            //   EncryptedData: this.data.encryptedData,
            //   Iv: this.data.iv
            // })
            // wx.hideLoading()
            // if (res.success) {
            // 如果服务状态正常, 调起登录
            // loginRequest()
            // 此处没有服务端，无法获得号码，写个假的
            this.triggerEvent("authSuccess", { phoneNumber: 100861008611 });
            // } else {
            //   wx.showModal({ title: "提示", content: res.message })
            // }
        },
        /**
         * 授权失败的提示
         * @param hint 失败提示
         */
        authFail(hint) {
            wx.showToast({ title: hint, icon: "none", mask: true });
        },
        /** 授权节流 */
        throttle() {
            this.data._throttleFlag = true;
            setTimeout(() => {
                this.data._throttleFlag = false;
            }, 500);
        },
        /** 空函数 */
        catchEmptyTap() {
            return;
        }
    }
});
