export interface AreaPickerParams {
  /** 省份 */
  province: { label: string; value: string }
  /** 城市 */
  city: { label: string; value: string }
  /** 镇区 */
  town: { label: string; value: string }
}

export interface AreaPickerChange<T = void> {
  (params: AreaPickerParams): T
}

/** 城市层级 */
export interface Division {
  /** GB2260标准行政区划码 */
  code: string
  /** 名称 */
  text: string
  /** 下级 */
  subOptions?: Division[]
}
