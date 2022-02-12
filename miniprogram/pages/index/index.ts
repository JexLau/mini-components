// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    curActive: "",
    filterOptions: [
      { text: "区域", isActive: false, key: "area" },
      { text: "价格", isActive: false, key: "price" },
      { text: "户型", isActive: false, key: "houseType" },
      { text: "面积", isActive: false, key: "size" },
      { text: "更多", isActive: false, key: "more" }
    ],
  },
  
  handleClick(ev: Mini.Wx.CustomEventDom<string>) {
    console.log("点击的key: ", ev.detail)
    this.setData({
      curActive: ev.detail
    })
  },
  
  /** 响应省市区发生变化 */
  areaPickerChange(ev: Mini.Wx.CustomEventDom<WechatCustomComponent.AreaPickerParams> ) {
    console.log("点击省市区: ", ev.detail)
  },
})
