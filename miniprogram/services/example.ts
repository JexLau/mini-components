import { Request } from "./request";


export function ChatInit(data: any) {
    return Request<any>({
        url: `/api/init`,
        method: 'GET',
        data,
        notAuth: true,
    })
}

export function ChatStart(data: any) {
    return Request<any>({
        url: `/api/chat`,
        method: 'POST',
        data,
        notAuth: true,
    })
}

export function ChatGetStart(data: any) {
    return Request<any>({
        url: `/api/chat`,
        method: 'GET',
        data,
        notAuth: true,
    })
}

export function WxGetOpenId(data: any) {
    return Request<any>({
        url: `/api/wxopenid`,
        method: 'GET',
        data,
        notAuth: true,
    })
}