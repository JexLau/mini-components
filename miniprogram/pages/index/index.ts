import { AreaPickerParams } from "../../components/area-picker/index.d";
import { StatusParams } from "../../components/date-picker/index.d";
import { DateTimeValue } from "../../components/date-picker/time-control.d";
import { TabsConfig } from "../../components/tabs/index.d";
import { CanvasRing } from "../../utils/canvasRing";
import { formatTime } from "../../utils/util";

const selectList: Array<{ value: number; text: string }> = []
for (let i = 30; i >= 1; i--) {
  selectList.push({
    value: 12 * i,
    text: `${i}年(${12 * i}期)`
  })
}

Page({
  data: {
    /** 开始时间 */
    startDate: 1644825802862,
    dateText: "",
    curActive: "",
    filterOptions: [
      { text: "区域", isActive: false, key: "area" },
      { text: "价格", isActive: false, key: "price" },
      { text: "户型", isActive: false, key: "houseType" },
      { text: "面积", isActive: false, key: "size" },
      { text: "更多", isActive: false, key: "more" }
    ],
    videoConfig: {
      url: "https://apkj-static.apyfc.com/1610436547232155.mp4",
      videoCover: "https://apkj-static.apyfc.com/1607510123699346.jpeg"
    },
    inputText: "11",
    selectList: selectList,
    radios: [
      {
        value: "room",
        name: "按房屋总价",
        checked: true,
        marginRight: "40rpx"
      },
      {
        value: "money",
        name: "按贷款总价",
        checked: true
      }
    ],
    phoneNumber: "",
    tabsConfig: {
      /** tabs数据 */
      tabs: [
        {
          text: "商业贷款",
          key: "business"
        },
        {
          text: "公积金贷款",
          key: "provident"
        },
        {
          text: "组合贷款",
          key: "combination"
        }
      ],
      /** 当前的tab */
      defaultActive: "business"
    } as TabsConfig,
    lowValue: 10,
    heighValue: 800,
  },

  onLoad() {
    this._canvas()
  },

  /** 监听Filter-item点击事件 */
  handleFilterItemClick(ev: Mini.Wx.CustomEventDom<string>) {
    console.log("点击的key: ", ev.detail)
    this.setData({
      curActive: ev.detail
    })
  },

  /** 监听省市区发生变化 */
  areaPickerChange(ev: Mini.Wx.CustomEventDom<AreaPickerParams>) {
    console.log("点击省市区: ", ev.detail)
  },


  /** 监听时间发生变化 */
  changeDate(ev: Mini.Wx.CustomEventDom<DateTimeValue>) {
    console.log("时间:", ev.detail.rawDateTime);
    this.setData({
      dateText: formatTime(ev.detail.rawDateTime, "yyyy年MM月dd日 hh时mm分", false),
    })
  },

  /** 时间选择器状态变化 */
  pickerDateStatusChange(ev: Mini.Wx.CustomEventDom<StatusParams>) {
    console.log("是否关闭时间选择器:", ev.detail.isShow);
  },

  /** 监听输入框输入 */
  handleInput(ev: Mini.Wx.InputEventDom) {
    console.log(ev.detail.value)
  },

  /** picker change */
  pickerChange(ev: Mini.Wx.ChangeEventDom) {
    console.log(ev.detail.value);
  },

  /** radio change */
  radioChange(ev: Mini.Wx.ChangeEventDom) {
    console.log(ev.detail.value);
  },

  /** 获取用户手机号 */
  getPhone(ev: Mini.Wx.CustomEventDom<{ phoneNumber: string }>) {
    console.log(ev.detail.phoneNumber);
    this.setData({
      phoneNumber: ev.detail.phoneNumber
    })
    wx.showToast({ title: "登录成功", icon: "none", mask: true })
  },

  /** tab change */
  handleTabsChange(ev: Mini.Wx.TapEventDom<Record<string, never>, { value: string }>) {
    const tab = ev.detail.value
    this.setData({
      tabsConfig: {
        ...this.data.tabsConfig,
        defaultActive: tab
      },
    })
  },

  scrollviewLink() {
    wx.navigateTo({
      url: "/pages/scroll-view/index",
    })
  },

  /** 设置最小值 */
  lowValueChange(ev: Mini.Wx.CustomEventDom<{ lowValue: number }>) {
    this.setData({
      lowValue: ev.detail.lowValue
    })
  },

  /** 设置最大值 */
  heighValueChange(ev: Mini.Wx.CustomEventDom<{ heighValue: number }>) {
    this.setData({
      heighValue: ev.detail.heighValue
    })
  },

  /** 绘制圆环 */
  _canvas() {
    const ring = new CanvasRing("canvas-ring", [
      { id: "number1", value: 45, color: "#F9DD71" },
      { id: "number2", value: 33, color: "#33C779" },
      { id: "number3", value: 22, color: "#2D80DF" }
    ])
    ring.draw()
  },
})
