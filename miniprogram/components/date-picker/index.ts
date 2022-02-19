import { DateTimeValue, ITimeControlExoprt } from "./time-control.d"
import { StatusParams } from "./index.d"

Component({
  properties: {
    /** 开始时间范围 */
    startDate: {
      type: Number,
      value: -1
    },
    /** 结束时间范围 */
    endDate: {
      type: Number,
      value: -1
    },
    /** 初始的值 */
    value: {
      type: Number,
      value: -1
    }
  },
  data: {
    /** 是否隐藏时间控件 */
    isShow: true,
    /** 时间核心控件 */
    _mpTimeControl: {} as ITimeControlExoprt
  },
  lifetimes: {
    ready() {
      this.data._mpTimeControl = this.selectComponent('#mpTimeControl').export()
    }
  },
  methods: {
    /** 切换时间控件显示和隐藏 */
    hideOrShow() {
      this.setData({ isShow: !this.data.isShow })
      const data: StatusParams = { isShow: this.data.isShow }
      this.triggerEvent('status', data)

      if (!this.data.isShow) {
        // 防止picker被键盘遮盖: https://developers.weixin.qq.com/community/develop/doc/0008ac99824e004baf5ade81f59400?_at=vyxqpllafi
        // 设置两次，保证百分百触发
        setTimeout(() => {
          wx.hideKeyboard()
        }, 500)
        setTimeout(() => {
          wx.hideKeyboard()
        }, 1000)
      }
    },
    /** 确认时间 */
    confirm() {
      this.hideOrShow()
      const data: DateTimeValue = this.data._mpTimeControl.getDate()
      this.triggerEvent('change', data)
    },
    /** 空函数 */
    catchEmptyTap() {
      return
    }
  }
})
