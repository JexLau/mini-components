"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../config/index");
const example_1 = require("../../services/example");
let rewardedVideoAd = null;
const max = 5;
Page({
    data: {
        canUse: false,
        chating: false,
        cId: "",
        pId: "",
        answer: "",
        inputText: "",
        // 看广告次数
        adCount: max,
        // -----------
        phoneNumber: "",
        lowValue: 10,
        heighValue: 800,
        throttleNumber: 0,
        imageUrl: "",
        MiniProgramConfig: index_1.MiniProgramConfig,
    },
    onLoad() {
        if (index_1.MiniProgramConfig.ad && wx.createRewardedVideoAd) {
            rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'adunit-4c2747a524d53ef0' });
            rewardedVideoAd.onLoad(() => {
                console.log('onLoad event emit');
            });
            rewardedVideoAd.onError((err) => {
                console.log('onError event emit', err);
            });
            rewardedVideoAd.onClose((res) => {
                // 用户点击了【关闭广告】按钮
                if (res && res.isEnded) {
                    // 正常播放结束，可以下发游戏奖励
                    wx.setStorageSync("adCount", max);
                    this.setData({
                        adCount: max
                    });
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    wx.setStorageSync("adCount", 0);
                    this.setData({
                        adCount: 0
                    });
                }
            });
        }
        const _i = wx.getStorageSync("adCount") || this.data.adCount;
        this.setData({ adCount: _i, });
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
        const openid = wx.getStorageSync("openid");
        // const res = await ChatGetStart({ q: this.data.inputText, cId: this.data.cId, pId: this.data.pId, openid, })
        const res = await (0, example_1.ChatGetStart)({ qu: this.data.inputText, c: this.data.cId, p: this.data.pId, openid });
        if (res.code === 200) {
            // console.log(res)
            const _i = this.data.adCount;
            this.setData({
                chating: false,
                cId: res.data.cId,
                pId: res.data.pId,
                answer: res.data.answer,
                adCount: _i - 1
            });
            wx.setStorageSync("answer", res.data.answer);
            wx.setStorageSync("adCount", _i - 1);
        }
        else {
            this.setData({
                chating: false,
                cId: "",
                pId: "",
            });
        }
    },
    async showAd() {
        rewardedVideoAd.show().catch(() => {
            // 失败重试
            rewardedVideoAd.load().then(() => rewardedVideoAd.show())
                .catch((err) => {
                wx.showModal({ title: "提示", content: "激励视频广告显示失败", });
            });
        });
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
