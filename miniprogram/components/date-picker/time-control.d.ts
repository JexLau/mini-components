/** 时间格式 */
export interface DateTimeValue {
  /** 格式化后的时间字符串 */
  value: string
  /** 原始时间戳 */
  rawDateTime: number
}

/** 导出：时间控件的暴露内容 */
export interface ITimeControlExoprt {
  /** 获取时间 */
  getDate: () => DateTimeValue
}

