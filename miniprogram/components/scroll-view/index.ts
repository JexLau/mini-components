import { ScrollViewOperateParams, ScrollViewStopParams } from "./index.d";

Component({
  options: {
    /** 启用多个插槽 */
    multipleSlots: true
  },
  properties: {
    /** 页数 */
    pageSize: Number,
    /** 没有数据的提示文字 */
    notDataText: String,
    /** 禁用下拉刷新 */
    disableRefresh: Boolean,
    /** 禁用上拉加载 */
    disableLoad: Boolean,
    /** 是否显示底部文字 */
    isShowTip: {
      type: Boolean,
      value: true
    },
    /** 双重列表时加载第二个 */
    isLoadOtherList: {
      type: Boolean,
      value: false
    }
  },
  data: {
    loading: false, // 上拉加载中
    refreshLoading: false, // 下拉刷新中
    isMoreData: true, // 是否有更多数据
    pageIndex: 1, // 分页
    pageNumber: 10, // 页码
    total: -1, // 总条数
    /** 延时时间戳 */
    now: 0,
    /** 滚动的id */
    scrollIntoViewId: ""
  },
  lifetimes: {
    attached() {
      if (this.data.pageSize) {
        this.setData({
          pageNumber: Number(this.data.pageSize) || this.data.pageNumber
        })
      }
    }
  },
  observers: {
    isLoadOtherList(data) {
      if (data) {
        this.data.pageIndex = 1
        this.setData({
          pageIndex: 1,
          isMoreData: true,
          now: Date.now()
        })
      }
    }
  },
  methods: {
    /** 刷新数据 */
    refresh() {
      console.log("refresh down")
      if (this.data.disableRefresh) return
      if (this.data.loading || this.data.refreshLoading) return

      this.setData({
        refreshLoading: true,
        pageIndex: 1,
        isMoreData: true,
        now: Date.now()
      })
      const params: ScrollViewOperateParams = { isRefresh: true, pageIndex: this.data.pageIndex }
      this.triggerEvent("down", params)
    },
    /** 加载新数据 */
    load() {
      console.log("load up")
      if (this.data.disableLoad) return

      const data = this.data
      if (data.loading || data.refreshLoading || !data.isMoreData) return

      this.setData({
        loading: true
      })
      const params: ScrollViewOperateParams = { isRefresh: false, pageIndex: data.pageIndex }
      this.triggerEvent("up", params)
    },
    /** 结束loading */
    stop(data: ScrollViewStopParams) {
      console.log("stop")
      if (this.data.now !== 0) {
        const now = Date.now() - (this.data.now + 1000)
        if (now < 0) {
          setTimeout(() => {
            this.stop(data)
          }, -now)
          return
        }
      }

      let isMoreData = true
      if (data.total <= this.data.pageIndex * this.data.pageNumber) {
        isMoreData = false
      } else {
        isMoreData = true
      }
      this.setData({
        loading: false,
        refreshLoading: false,
        isMoreData,
        pageIndex: isMoreData ? this.data.pageIndex + 1 : this.data.pageIndex,
        total: data.total,
        now: 0
      })
    },
    /** 导出方法 */
    export() {
      return this
    }
  }
})

export {}
