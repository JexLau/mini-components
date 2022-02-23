import { CallbackFnType } from "./index.d"

Component({
  properties: {
    fullHeight: {
      type: Boolean,
      value: true
    }
  },
  data: {
    /** 回调函数 */
    _callbackFn: null as CallbackFnType,
    /** 是否展示登录弹窗 */
    isShowLogin: false,
    /** 节流标记 */
    _throttleFlag: false
  },
  methods: {
    /** 微信登录 */
    async wxLogin(ev: { detail: { encryptedData: string; errMsg: string; iv: string } }) {
      if (this.data._throttleFlag) return

      this.throttle()

      wx.showLoading({ title: "登录中...", mask: true })
      const rawData = ev.detail
      if (rawData.errMsg !== "getPhoneNumber:ok") {
        wx.showToast({ title: "获取手机号权限失败，请稍后尝试。", icon: "none", mask: true })
        wx.hideLoading()
        return
      }
      wx.hideLoading()
      wx.showModal({ title: "提示", content: "登录成功", showCancel: false })
    },
    /** 登录完成
     *  1. 登录成功关闭弹窗
     *  2. 触发成功事件
     */
    _loginSuccess() {
      this.triggerEvent("loginCallback")
      this.closeLogin();
    },
    /** 关闭弹框 */
    closeLogin() {
      this.setData({
        isShowLogin: false
      })
    },
    /** 阻止滑动穿透 */
    catchEvent() {
      return
    },
    /** 授权节流 */
    throttle() {
      this.data._throttleFlag = true
      setTimeout(() => {
        this.data._throttleFlag = false
      }, 500)
    }
  }
})

export {}
