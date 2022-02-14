// index.ts

import { AreaPickerParams } from "../../components/area-picker/index.d";
import { StatusParams } from "../../components/date-picker/index.d";
import { DateTimeValue } from "../../components/date-picker/time-control.d";
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
})
