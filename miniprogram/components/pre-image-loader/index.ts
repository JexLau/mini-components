
/**
 * 图片预加载组件
 */
 Component({
  properties: {
    //原始图片
    originalImage: String,
    width: String,
    height: String,
    //图片剪裁mode，同Image组件的mode
    mode: String
  },
  data: {
    finishLoadFlag: false
  },
  methods: {
    finishLoad: function () {
      this.setData({
        finishLoadFlag:true
      })
    }
  }
})
