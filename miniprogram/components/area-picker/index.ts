/** 省市区三级联动组件 */
import { cityData } from "./city-data";
import { Division, AreaPickerParams } from "./index.d"

Component({
  properties: {
    propsSiteName: {
      type: Object,
      value: {
        province: "", // 省
        city: "", // 市
        area: "" // 区
      }
    },
    // 省市区选中的index
    propsSiteIndex: {
      type: Array,
      value: [0, 0, 0]
    },
    /** 禁止选择 */
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    /** 城市列表 */
    _rawDivisionLists: [] as Division[],
    /** 当前的下拉条 */
    currentDivisionLists: [] as Division[][],
    // 省市区的 name
    siteName: {
      province: "", // 省
      city: "", // 市
      area: "" // 区
    },
    // 省市区选中的index
    siteIndex: [0, 0, 0]
  },
  observers: {
    propsSiteName(data) {
      this.setData({
        siteName: data
      })
    },
    propsSiteIndex(data) {
      this.setData({
        siteIndex: data
      })
    }
  },
  lifetimes: {
    attached() {
      this.GetSiteLists()
    }
  },
  methods: {
    /** 获取城市列表 */
    GetSiteLists() {
      const res = cityData;

      if (res.success) {
        const rawDivisionLists = res.data.values;
        this.setData({
          _rawDivisionLists: rawDivisionLists,
          currentDivisionLists: [
            // 省
            rawDivisionLists || [],
            // 市
            rawDivisionLists[0]?.subOptions || [],
            // 区
            rawDivisionLists[0]?.subOptions[0]?.subOptions || []
          ]
        })
      }
    },
    /** 省市区列表发生变化 */
    siteColumnChange(ev: Mini.Wx.ColumnChangeEventDom) {
      let columnData = [...this.data.currentDivisionLists]
      const column = ev.detail.column
      const value = ev.detail.value

      switch (column) {
        case 0:
          columnData[1] = columnData[0][value].subOptions || []
          columnData[2] = columnData[1][0].subOptions || []
          break
        case 1:
          columnData[2] = columnData[1][value].subOptions || []
          break
      }
      this.setData({
        currentDivisionLists: columnData
      })
    },
    /** 省市区选择发生变化 */
    sitePickerChange(val: { detail: { value: number[] } }) {
      const indexs = val.detail.value
      const data = this.data.currentDivisionLists
      const one = data[0][indexs[0]]
      const two = data[1][indexs[1]]
      const three = data[2][indexs[2]]

      this.setData({
        siteName: {
          province: one.text,
          city: two.text,
          area: three.text
        },
        siteIndex: indexs
      })

      const params: AreaPickerParams = {
        province: { label: one.text, value: one.code },
        city: { label: two.text, value: two.code },
        town: { label: three.text, value: three.code }
      }

      this.triggerEvent("change", params)
    },
    /** 取消选择 */
    cancelPicker() {
      const indexs = this.data.siteIndex
      const province = this.data._rawDivisionLists
      const city = province[indexs[0]].subOptions || []
      const area = city[indexs[1]].subOptions || []
      this.setData({
        currentDivisionLists: [
          province,
          city,
          area
        ],
        siteIndex: this.data.siteIndex
      })
    },
    /** 触发点击 */
    handleClick() {
      // 防止picker被键盘遮盖: https://developers.weixin.qq.com/community/develop/doc/0008ac99824e004baf5ade81f59400?_at=vyxqpllafi
      // 设置两次，保证百分百触发
      setTimeout(() => {
        wx.hideKeyboard()
      }, 500)
      setTimeout(() => {
        wx.hideKeyboard()
      }, 1000)
    }
  }
})
