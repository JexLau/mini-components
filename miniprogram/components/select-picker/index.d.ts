
/** 响应的参数 */
export interface IPickerParams {
  value: number | string,
  text: string,
}

/** 响应的方法 */
export interface IAreaPickerChange<T = void> {
  (params: IPickerParams): T
}
