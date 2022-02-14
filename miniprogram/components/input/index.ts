Component({
  behaviors: ["wx://form-field"],
  options: {
    multipleSlots: true,
  },
  properties: {
    /** label */
    label: String,
    /** password */
    password: {
      type: Boolean,
      value: false,
    },
    /** disabled */
    disabled: {
      type: Boolean,
      value: false,
    },
    /** placeholder */
    placeholder: {
      type: String,
      value: "请输入",
    },
    /** placeholderStyle */
    placeholderStyle: String,
    /** placeholderClass */
    placeholderClass: String,
    /** maxlength */
    maxlength: {
      type: Number,
      value: 140,
    },
    /** focus */
    focus: {
      type: Boolean,
      value: false,
    },
    /** confirmType */
    confirmType: {
      type: String,
      value: "done",
    },
    /** confirmHold */
    confirmHold: {
      type: Boolean,
      value: false,
    },
    /** input type */
    type: {
      type: String,
      value: "text",
    },
    /** input value */
    value: String,
    /** clearable */
    clearable: {
      type: Boolean,
      value: false,
    },
    /** required */
    required: {
      type: Boolean,
      value: false,
    },
    message: {
      type: String,
      value: "请输入完整内容",
    },
    /** border */
    border: {
      type: Boolean,
      value: false,
    },
    textRight: {
      type: Boolean,
      value: false,
    },
  },

  data: {},
  methods: {
    /** input change */
    handleInputChange(e: Mini.Wx.ChangeEventDom) {
      let detail = {
        value: e.detail.value,
      };
      this.setData({
        value: detail.value,
      });

      this.triggerEvent("input", detail);
    },
    /** input focus */
    handleInputFocus(e: Mini.Wx.InputEventDom) {
      this.triggerEvent('focus', e.detail);
    },
    /** input blur */
    handleInputBlur(e: Mini.Wx.BlurEventDom) {
      let detail = {
        value: e.detail.value,
      };
      if (this.data.required) {
        if (this.checkValueRequired()) {
          this.setData({
            value: detail.value,
          });
        }
      }

      this.triggerEvent("blur", detail);
    },
    /** input confirm */
    handleInputConfirm(e: Mini.Wx.InputEventDom) {
      let detail = {
        value: e.detail.value,
      };
      this.setData({
        value: detail.value,
      });
      this.triggerEvent("confirm", detail);
    },
    /** input clear */
    handleClearTap() {
      let detail = {
        value: "",
      };
      this.setData({
        value: "",
      });
      this.triggerEvent("clear", detail);
    },

    /** Check Value Required */
    checkValueRequired() {
      if (!!this.data.value && this.data.value !== "") {
        return true;
      } else {
        this._showToast(this.data.message);
        return false;
      }
    },

    _showToast(message: string, icon: "loading"| "none" | "success"  | undefined = 'none') {
      wx.showToast({
        title: message,
        icon: icon,
      });
    },
  },
});

export {};
