## 概述

微信小程序组件封装，整理方便以后自用。

技术栈: 微信小程序原生 + Typescript + less


## 已整理

- AreaPicker             地址选择器
- DatePicker             时间选择器
- Filter                 条件筛选
- Flod                   文本的折叠展开
- Divider                分割线
- Video                  视频组件
- Input                  输入框
- Picker                 简单选择器
- Radio                  单选
- GetPhone               获取用户手机号
- PreImageLoader         图片预加载默认图片
- Tabs                   标签页
- ScrollView             滚动视图
- Slider                 双向滑动条(原出处: https://github.com/weixianlove/zy-slider)
- CanvasRing             绘制圆环
- Throttle               节流按钮
- Uploader               七牛云上传照片


## 关于系统设计的总结

- 接入第三方埋点

  采用手动代码埋点的方式。

  ```typescript
  export class UmaEvent {
    static trackEvent(eventName: EventName, params?: string | { [key: string]: string }) {
      // 可以在此做些环境处理
      uma.trackEvent(eventName, params)
    }

    // 事件点击
    static TagClick(tagName: TagNameType) {
      this.trackEvent("Tag-Click", { tagName: tagName })
    }
  }

  UmaEvent.TagClick("TagName")
  
  ```

- 全局登录弹窗

  根据业务实际将登录弹窗设计为根组件，支持子组件自定义登录回调，方便原有业务无侵入式接入。
  /components/login

- 微信小程序项目 CI/CD 流程


- 后端接口生成对应的 TypeScript 接口声明(request模块封装思路)

  由 Swagger2TS 服务生成接口的 typings 和 services，复制到项目目录中(/typings/api/example, /miniprogram/api/example)，即可让业务代码调用