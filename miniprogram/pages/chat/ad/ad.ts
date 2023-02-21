// 激励广告组件
import { MiniProgramConfig } from "../../../config/index";
import { adsId } from "./config";
let rewardedVideoAd: any = null
// 最大广告次数
const MAX = 5;
Component({
  properties: {
    waiting: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    /** 监听父组件传递下来的 chating  */
    waiting(data) {
      this.setData({
        isWaiting: data
      })
    },
  },
  data: {
    // 看广告次数
    adCount: MAX,
    // 最大看广告次数
    max: MAX,
    isWaiting: false,
  },
  lifetimes: {
    ready() {
      if (MiniProgramConfig.ad && wx.createRewardedVideoAd) {
        rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: adsId.reward })
        rewardedVideoAd.onLoad(() => {
          console.log('onLoad event emit')
        })
        rewardedVideoAd.onError((err: any) => {
          console.log('onError event emit', err)
        })
        rewardedVideoAd.onClose((res: any) => {
          // 用户点击了【关闭广告】按钮
          if (res && res.isEnded) {
            // 正常播放结束，可以下发游戏奖励
            this.setData({ adCount: MAX })
            this.setHistoryAdCount(MAX)
          } else {
            // 播放中途退出，不下发游戏奖励
            this.setData({ adCount: 0 })
            this.setHistoryAdCount(0)
          }
        })

      }
      const adCount = this.getHistoryAdCount();
      this.setData({ adCount })
      console.log("sss", this.data.adCount)
    }
  },
  methods: {
    async showAd() {
      rewardedVideoAd.show().catch(() => {
        // 失败重试
        rewardedVideoAd.load().then(() => rewardedVideoAd.show())
          .catch((err: any) => {
            wx.showModal({ title: "提示", content: "激励视频广告显示失败", })
            console.log("err", err)
          })
      })
    },
    getHistoryAdCount() {
      return wx.getStorageSync("adCount") === "" ? MAX : wx.getStorageSync("adCount");
    },

    setHistoryAdCount(adCount: number) {
      return wx.setStorageSync("adCount", adCount);
    },

    submit() {
      this.triggerEvent("submitEvent")
    }
  }
})
