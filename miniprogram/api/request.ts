/** 配置参数 */
interface Params {
  /** 不需要userToken */
  notAuth?: boolean
  /** 请求链接 */
  url: string
  /** headers 配置 */
  headers?: Record<string, unknown>
  /** 发送的数据 */
  data?: Record<string, any> | string | null
  /** 请求方式 */
  method: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
  /** 【弃用】 域名类型 */
  domainType?: "APU_APP"
  /** Api版本号 */
  apiVersion?: "1.0" | "2.0"
}

/** 发起请求 */
interface RequestParams<T> {
  params: Params
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: unknown) => void
}

const startRequest = function <T>(data: RequestParams<T>) {
  const params = data.params
  const resolve = data.resolve
  const reject = data.reject

  let url = params.url
  if (params.url.indexOf("https") === -1) {
    url = "baseUrl" + params.url
  }

  wx.request({
    url: url,
    data: params.data || {},
    header: {
      Authorization: "token",
      ...params.headers
    },
    method: params.method,
    success(res: WechatMiniprogram.RequestSuccessCallbackResult) {
      const resData = res.data as T

      switch (res.statusCode) {
        case 200:
          resolve(resData)
          break
        case 401: {
          // need to login          
          break
        }
        case 403: {
          // need to login          
          break
        }
        case 404:
          wx.hideLoading()
          wx.showToast({ title: "404: Api 好像丢失了，请重新访问", icon: "none", mask: true })
          break
        default:
          wx.hideLoading()
          wx.showModal({
            title: "提示",
            content: "服务器正忙,请稍后再试。",
            showCancel: false
          })
      }
    },
    fail(error) {
      wx.hideLoading()
      // 超时异常处理
      if (/timeout/.test(error.errMsg)) {
        wx.showModal({ title: "提示", content: "网络超时，请稍后尝试...", showCancel: false })
      }
      reject(error)
    }
  })
}

export function Request<T>(params: Params): Promise<T> {
  return new Promise((resolve, reject) => {
    const requestParams = { params, resolve, reject }
    startRequest(requestParams)
  })
}
