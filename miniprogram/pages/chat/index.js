"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_1 = require("../../services/example");
Page({
    data: {
        canUse: false,
        chating: false,
        cId: "",
        pId: "",
        answer: "",
        inputText: "",
        // -----------
        phoneNumber: "",
        lowValue: 10,
        heighValue: 800,
        throttleNumber: 0,
        imageUrl: ""
    },
    onLoad() {
        this.init();
    },
    /** 监听输入框输入 */
    handleInput(ev) {
        this.setData({
            inputText: ev.detail.value
        }, () => {
            console.log(this.data.inputText);
        });
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
    scrollviewLink() {
        wx.navigateTo({
            url: "/pages/scroll-view/index",
        });
    },
    async submit() {
        console.log("submit", this.data);
        if (this.data.chating)
            return;
        if (!this.data.inputText) {
            wx.showModal({ title: "提示", content: "请写下您的问题" });
            return;
        }
        this.setData({
            chating: true,
        });
        const res = await (0, example_1.ChatStart)({ qu: this.data.inputText, c: this.data.cId, p: this.data.pId });
        // const res = await ChatGetStart({ q: this.data.inputText, cId: this.data.cId, pId: this.data.pId })
        if (res.code === 200) {
            console.log(res);
            this.setData({
                chating: false,
                cId: res.data.cId,
                pId: res.data.pId,
                answer: res.data.answer,
            });
            wx.setStorageSync("answer", res.data.answer);
        }
        else {
            this.setData({
                chating: true,
                cId: res.data.cId,
                pId: res.data.pId,
            });
        }
    },
    async init() {
        console.log("init");
        if (this.data.canUse)
            return;
        if ((wx.getStorageSync("c") && wx.getStorageSync("p"))) {
            this.setData({
                canUse: true,
                cId: wx.getStorageSync("c"),
                pId: wx.getStorageSync("p")
            });
            return;
        }
        const res = await (0, example_1.ChatInit)({});
        if (res.code === 200) {
            console.log("init success");
            this.setData({
                canUse: true,
                cId: res.data.cId,
                pId: res.data.pId,
            });
            wx.setStorageSync("c", res.data.cId);
            wx.setStorageSync("p", res.data.pId);
        }
        else {
            wx.showModal({
                title: "提示", content: "会话超时，正在重新链接...", success: async (e) => {
                    if (e.confirm) {
                        wx.setStorageSync("c", "");
                        wx.setStorageSync("p", "");
                        this.setData({
                            canUse: false,
                            cId: "",
                            pId: ""
                        });
                        await this.init();
                    }
                }
            });
        }
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
    copy: function () {
        wx.setClipboardData({
            data: this.data.answer,
            success: function () {
                wx.showModal({
                    title: '提示',
                    content: '复制成功',
                });
            }
        });
    },
    more() {
        console.log("more");
        wx.navigateTo({
            url: "/pages/more/index"
        });
    },
    fillInput(e) {
        const { c } = e.currentTarget.dataset;
        this.setData({
            inputText: c
        }, () => {
            console.log(this.data.inputText);
        });
    }
});
