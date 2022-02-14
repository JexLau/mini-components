Component({
  options: {
    multipleSlots: true
  },
  properties: {
    /** label */
    label: String,
    selectList: {
      type: Array,
      value: [],
    },
    selectItem: {
      type: Object,
    },
    selectIndex: {
      type: Number,
      value: 0,
    },
    border: {
      type: Boolean,
      value: false
    },
    textRight: {
      type: Boolean,
      value: false
    },
  },
  data: {},
  observers: {
    /** 监听父组件传递下来的列表 */
    selectList() {
      if (this.data.selectList.length) {
        this.setData({
          selectItem: {
            text: this.data.selectList[0].text,
            value: this.data.selectList[0].value,
          },
          selectIndex: 0
        })
        this.triggerEvent('change', this.data.selectItem)
      }
    },
  },
  methods: {
    /** 选择发生变化 */
    handlePickerChange(val: { detail: { value: number } }) {
      const index = val.detail.value;

      this.setData({
        selectItem: {
          text: this.data.selectList[index].text,
          value: this.data.selectList[index].value,
        },
        selectIndex: index
      })

      this.triggerEvent('change', this.data.selectItem)
    },
    /** 取消选择 */
    cancelPicker() {
      const data = this.data.selectList
      const index = this.data.selectIndex
      this.setData({
        selectList: data,
        siteIndex: index
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

export { }
