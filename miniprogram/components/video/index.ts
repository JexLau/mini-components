import { IHouseDetailVideoConfig } from './index.d'

Component({
  properties: {
    config: {
      type: Object,
      value: {}
    }
  },
  data: {
    config: {} as IHouseDetailVideoConfig,
    /** 已经播放视频 */
    isPalyVideo: false,
    /** 开始播放视频 */
    isStartPalyVideo: false,
    /** 已经播放视频完毕 */
    isEndPalyVideo: false
  },
  lifetimes: {
    attached() {
      if(!this.data.config.size) {
        this.setData({
          ...this.data.config,
          size: 58
        })
      }
    }
  },
  methods: {
    /** 播放视频 */
    palyVideo() {
      this.setData({
        isPalyVideo: true,
        isStartPalyVideo: true,
        isEndPalyVideo: false
      })
    },
    /** 播放完毕 */
    endVideo() {
      this.setData({
        isPalyVideo: false,
        isStartPalyVideo: false,
        isEndPalyVideo: true
      })
    },
  }
})