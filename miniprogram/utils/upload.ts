import { formatTime } from './util'
import { upload } from './qiniuUploader'

const GetQiNiuToken = async () => {
  return Promise.resolve({
    data: "qiniu upload token",
    success: true,
    code: 200,
    message: ""
  })
}

/** 上传成功的图片路径 */
export interface ISuccessImageLists extends Array<{
  /** 上传成功的路径 */
  successPath: string,
  /** 本地路径 */
  localPath: string
}> {}



/**
 * 七牛云上传
 */
class QiNiuUpload {
  /**
   * 构造函数
   * @param max 允许上传的最大数，默认为10
   */
  constructor(max?: number, initImgList: string[] = []) {
    this.max = max || 10
    this.imgLists = initImgList
  }

  /** 图片列表 */
  imgLists: Array<string> = []
  /** 上传最大数 */
  private max = 0

  /** 选择图片 */
  chooseImage(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      const count = this.max - this.imgLists.length
      if (count <= 0) {
        wx.showToast({ title: `图片最多只能选择${this.max}张`, icon: 'none', mask: true })
        resolve(this.imgLists)
        return
      }

      wx.chooseImage({
        count: count,
        sizeType: ['compressed'],
        success: async (res) => {
          this.imgLists.push(...res.tempFilePaths)
          if (this.imgLists.length > this.max) {
            wx.showToast({ title: `图片最多只能选择${this.max}张`, icon: 'none', mask: true })
            this.imgLists.splice(this.max, this.imgLists.length)
          }
          resolve(this.imgLists)
        },
        fail: () => {
          wx.showModal({ title: '提示', content: '没有选择图片' })
          reject()
        }
      })
    })
  }

  /**
   * 触发上传事件
   * @param imgLists 指定上传的图片列表，否则使用实例的 imgLists 数据。
   */
  upload(imgLists?: Array<string>): Promise<ISuccessImageLists> {
    return new Promise(async (resolve, reject) => {
      // 存续需要上传的图片
      let imageLists: Array<string> = []
      if (imgLists) {
        imageLists = imgLists
      } else {
        imageLists = this.imgLists
      }
      if (imageLists.length === 0) {
        wx.showModal({ title: '提示', content: '没有图片需要上传' })
        return
      }
      /** 提交数据记录 */
      let successImgLists: ISuccessImageLists = []

      /** 筛选: 需要提交的数据 */
      let awaitUploadImg = imageLists.filter(item => {
        const isHttp = item.indexOf('http') !== -1
        if (isHttp) {
          successImgLists.push({ successPath: item, localPath: item })
        }
        return !isHttp
      })
      // 提交的数据为空, 则直接退出
      if (awaitUploadImg.length === 0) {
        resolve(successImgLists)
        return
      }

      // 获取七牛云token
      const qiniuToken = await GetQiNiuToken()
      // 轮询上传图片
      awaitUploadImg.forEach(item => {
        this.uploadData(qiniuToken.data, item).then(res => {
          successImgLists.push({
            successPath: res,
            localPath: item
          })
          if (successImgLists.length >= imageLists.length) {
            resolve(successImgLists)
          }
        }).catch((errPath) => {
          wx.hideLoading()
          wx.showToast({ title: '上传出错，请重新操作', icon: 'none', mask: true })
          reject(errPath)
        })
      })
    })
  }

  /**
   * 上传数据
   * @param qiniuToken 七牛云token
   * @param path 访问路径
   */
  private uploadData(qiniuToken: string, path: string): Promise<string> {
    return new Promise(async(resolve, reject) => {
      const key = formatTime(Date.now(), 'yyyyMMddhhmmssSS', false) + Math.floor(Math.random() * 100000)
      //获取七牛云token
      upload({
        filePath: path,
        options: {
          key: key, // 可选 文件名
          region: 'SCN', // 可选(默认为'ECN')
          domain: '', // 域名
          uptoken: qiniuToken // token
        },
        success: (res) => {
          resolve(res.fileUrl)
        },
        fail: () => {
          wx.showModal({ title: '提示', content: '上传图片失败，请重新操作' })
          reject(path)
        }
      })
    })
  }

  /**
   ** 清除选中的图片
   ** @param url 指定的url路径（本地）
   */
  clear(url?: string) {
    if (url) {
      const index = this.imgLists.indexOf(url)
      if (index >= 0) {
        this.imgLists.splice(index, 1)
      }
    } else {
      this.imgLists = []
    }
    return this.imgLists
  }
  /**清除指定的 */
  clearIndex(index: number): Array<string>{
    this.imgLists.splice(index,1)
    return this.imgLists
  }
}

export { QiNiuUpload }
