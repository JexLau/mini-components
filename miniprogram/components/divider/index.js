"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Component({
    externalClasses: ['line-class'],
    options: {
        styleIsolation: 'apply-shared'
    },
    properties: {
        /** 分割线方向：horizontal/vertical */
        direction: {
            type: String,
            value: 'horizontal'
        },
        // 文案
        content: {
            type: String,
            value: ''
        },
        /** 文案位置 */
        // 文案位置 left/right/center/''
        contentPosition: {
            type: String,
            value: 'center'
        },
        background: {
            type: String,
            value: '#fff'
        },
        marginTop: {
            type: Number,
            value: 30
        },
        marginBottom: {
            type: Number,
            value: 30
        }
    },
    data: {}
});
