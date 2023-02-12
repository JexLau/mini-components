import { WxGetOpenId } from "./services/example"

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        WxGetOpenId({code: res.code}).then((result: any) => {
          wx.setStorageSync('openid', result.data.openid)
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
  /** 兜底分享配置 */
  shareConfig() {
    return {
      path: "/pages/index",
      imageUrl: "https://apkj-static.apyfc.com/share-home.png"
    }
  },
})