import { ScrollView, ScrollViewOperateParams } from "../../components/scroll-view/index.d"
import { gethouseData, ListItem } from "./data";

Page({
  data: {
    /** 列表数据 */
    list: [] as ListItem[],
    /** 滚动视图实例 */
    _scrollviewInstance: {} as ScrollView,
    /** 每页数量 */
    pageSize: 20,
  },
  onReady() {
    this.data._scrollviewInstance = this.selectComponent("#scroll-list").export()
    this.data._scrollviewInstance.refresh()
  },

  /** 获取列表 */
  async getList(ev: Mini.Wx.CustomEventDom<ScrollViewOperateParams>) {
    const isRefresh = ev.detail.isRefresh
    const pageIndex = ev.detail.pageIndex

    let total = 0
    const res = await gethouseData({ pageIndex, pageSize: this.data.pageSize })
    if (res.success) {
      const rawData = res.data
      const list = rawData.values || []
      const temp = [...this.data.list, ...list]
      this.setData({
        list: isRefresh ? list : temp
      })
      total = rawData.total || 0
    console.log("getList", res, pageIndex, total)
    this.data._scrollviewInstance.stop({ total })
    } else {
      wx.showToast({ title: res.message, icon: "none", mask: true })
    }
  },
})
