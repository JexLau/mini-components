Component({
  properties: {
    radios: {
      type: Array,
      value: [],
    },
    defaulActive: {
      type: String,
      value: "",
    },
    label: {
      type: String,
    },
    border: {
      type: Boolean,
      value: false,
    },
  },
  data: {},
  lifetimes: {
    attached() {
      if (this.data.defaulActive) {
        this.handleRadio(this.data.defaulActive);
      }
    },
  },
  methods: {
    /** 切换tab栏 */
    radioChange(ev: Mini.Wx.ChangeEventDom) {
      this.handleRadio(ev.detail.value);
      this.triggerEvent("change", { value: ev.detail.value });
    },
    activeChange(newValue: string | number[]) {
      this.handleRadio(newValue);
    },
    handleRadio(value: string | number[]) {
      var item = this.data.radios;
      for (var i = 0; i < item.length; i++) {
        item[i].checked = item[i].value == value;
      }
      this.setData({
        radios: item,
      });
    },
  },
});

export {};
