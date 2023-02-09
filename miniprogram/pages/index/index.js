"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selectList = [];
for (let i = 30; i >= 1; i--) {
    selectList.push({
        value: 12 * i,
        text: `${i}年(${12 * i}期)`
    });
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
        },
        lowValue: 10,
        heighValue: 800,
        throttleNumber: 0,
        imageUrl: ""
    },
    onLoad() {
    },
    /** 监听Filter-item点击事件 */
    handleFilterItemClick(ev) {
        console.log("点击的key: ", ev.detail);
        this.setData({
            curActive: ev.detail
        });
    },
    /** 监听输入框输入 */
    handleInput(ev) {
        console.log(ev.detail.value);
    },
    /** picker change */
    pickerChange(ev) {
        console.log(ev.detail.value);
    },
    /** radio change */
    radioChange(ev) {
        console.log(ev.detail.value);
    },
    /** 获取用户手机号 */
    getPhone(ev) {
        console.log(ev.detail.phoneNumber);
        this.setData({
            phoneNumber: ev.detail.phoneNumber
        });
        wx.showToast({ title: "登录成功", icon: "none", mask: true });
    },
    /** tab change */
    handleTabsChange(ev) {
        const tab = ev.detail.value;
        this.setData({
            tabsConfig: {
                ...this.data.tabsConfig,
                defaultActive: tab
            },
        });
    },
    scrollviewLink() {
        wx.navigateTo({
            url: "/pages/scroll-view/index",
        });
    },
    /** 设置最小值 */
    lowValueChange(ev) {
        this.setData({
            lowValue: ev.detail.lowValue
        });
    },
    /** 设置最大值 */
    heighValueChange(ev) {
        this.setData({
            heighValue: ev.detail.heighValue
        });
    },
    throttleNumberChange() {
        this.setData({
            throttleNumber: this.data.throttleNumber + 1
        });
    },
    /** 分享事件 */
    onShareAppMessage() {
        return {
            title: "快来和ChatGPT聊天吧, 你说什么, ChatGPT就会回复什么",
            path: "/pages/chat/index",
        };
    },
    onShareTimeline() {
        return {
            title: "快来和ChatGPT聊天吧, 你说什么, ChatGPT就会回复什么",
            path: "/pages/chat/index",
            imageUrl: "https://api.ichains.site/static/index.png",
        };
    },
    preview(event) {
        console.log(event.currentTarget);
        const currentUrl = event.currentTarget.dataset.src;
        wx.previewImage({
            current: currentUrl,
            urls: [currentUrl] // 需要预览的图片http链接列表
        });
    }
});
