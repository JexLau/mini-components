"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* 组件: 事件节流，减少抖动 */
Component({
    data: {
        /** 是否等待 */
        _isAwait: false
    },
    methods: {
        /** 绑定点击事件 */
        handleTap(ev) {
            if (this.data._isAwait) {
                return;
            }
            this.data._isAwait = true;
            this.triggerEvent('click', ev);
            setTimeout(() => {
                this.data._isAwait = false;
            }, 1000);
        }
    }
});
