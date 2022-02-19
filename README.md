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

## 待整理

- Uploader               上传照片

## 关于系统设计的总结

- 接入第三方埋点统一管理
- 微信小程序主题色配置
- 全局登录弹窗设计思路
- 监测项目改动文件脚本思路
- 统一开发风格: .vscode + .eslintrc + .prettierrc + husky(非必要)
- 微信小程序项目 CI/CD 流程
- 后端接口生成对应的 TypeScript 接口声明(request整个模块封装思路)