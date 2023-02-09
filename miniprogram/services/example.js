"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGetStart = exports.ChatStart = exports.ChatInit = void 0;
const request_1 = require("./request");
function ChatInit(data) {
    return (0, request_1.Request)({
        url: `/api/init`,
        method: 'GET',
        data,
        notAuth: true,
    });
}
exports.ChatInit = ChatInit;
function ChatStart(data) {
    return (0, request_1.Request)({
        url: `/api/chat`,
        method: 'POST',
        data,
        notAuth: true,
    });
}
exports.ChatStart = ChatStart;
function ChatGetStart(data) {
    return (0, request_1.Request)({
        url: `/api/chat`,
        method: 'GET',
        data,
        notAuth: true,
    });
}
exports.ChatGetStart = ChatGetStart;
