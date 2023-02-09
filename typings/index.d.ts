/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  },
  /** 兜底分享配置 */
  shareConfig(): {
    /** 分享路径 */
    path: string
    /** 图片路径 */
    imageUrl: string
  },
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}