/** 条件filter组件 */
import { FilterOptionType } from "./index.d";

Component({
  properties: {
    filterOptions: {
      type: Array,
      default: [] as Array<FilterOptionType>
    },
  },
  data: {
    /** 当前选择的tab */
    tabActive: "",
    /** 是否显示筛选栏 */
    isShowFilters: false,
    /** 筛选列表 */
    options: [] as Array<FilterOptionType>
  },
  observers: {
    /** 监听父组件传递下来的filterOptions列表 */
    filterOptions(data) {
      this.setData({
        options: data
      })
    },
  },
  methods: {
    handleClick(ev: Mini.Wx.TapEventDom<{ key: string, index: string; }>) {
      const key = ev.currentTarget.dataset.key;
      if (key === this.data.tabActive) {
        this.close(true)
      } else {
        this.data.options.forEach(item => {
          if (item.key === key) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
        this.setData({
          isShowFilters: true,
          tabActive: key,
          options: this.data.options
        })
      }

      this.triggerEvent("handleClick", key)
    },

    /** 关闭筛选框 */
    close(ev: Mini.Wx.TapEventDom | boolean) {
      console.log("close:", ev)
      if (ev) {
        this.cancel()
      }
      this.data.options.forEach(item => {
        item.isActive = false
      })
      this.setData({
        isShowFilters: false,
        tabActive: ""
      })
    },

    /** 取消操作的回调 */
    cancel() {
      /** TODO：重置操作 */
      this.triggerEvent("handleCancel", this.data.tabActive)
    },
  },



})