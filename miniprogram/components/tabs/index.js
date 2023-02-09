"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Component({
    /** 在组件定义时的选项中启用多slot支持 */
    options: {
        multipleSlots: true
    },
    /** 组件的props */
    properties: {
        config: {
            type: Object,
            value: {}
        }
    },
    observers: {
        config() {
            if (this.data.config.tabs && this.data.config.tabs.length < 5) {
                this.setData({
                    itemWidth: 750 / this.data.config.tabs.length
                });
            }
        }
    },
    /** 组件的初始数据 */
    data: {
        config: {
            tabs: [],
            isScroll: true,
            defaultActive: "",
            paddingTop: "0rpx",
            isFull: false
        },
        itemWidth: 128
    },
    externalClasses: ["custom-wrapper", "custom-tab-item_active", "custom-border"],
    methods: {
        /** 切换tab栏 */
        changeTab(ev) {
            const key = ev.currentTarget.dataset.key;
            const tabs = this.data.config.tabs;
            let index = 0;
            tabs.forEach((item, i) => {
                if (item.key === key) {
                    this.setData({
                        config: {
                            ...this.data.config,
                            defaultActive: key
                        }
                    });
                    index = i;
                }
            });
            const data = {
                value: key,
                index
            };
            this.triggerEvent("change", data);
        }
    }
});
