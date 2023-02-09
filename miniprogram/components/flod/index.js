"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 文本折叠和展开
 * TODO: 不完善，目前是写死的，也有显示的问题，勉强可使用.
 */
Component({
    properties: {
        content: {
            type: String
        }
    },
    data: {
        content: '',
        isOverflow: false,
        isExpand: false,
    },
    observers: {
        content() {
            this.getText();
        }
    },
    methods: {
        collapse() {
            this.setData({
                isExpand: !this.data.isExpand,
            });
        },
        getText() {
            let query = this.createSelectorQuery();
            query.select('.text-content').boundingClientRect(rect => {
                let height = rect.height;
                if (height > (26 / 2) * 1.5 * 3) {
                    this.setData({
                        isOverflow: true
                    });
                }
            }).exec();
        }
    }
});
