export type TabItem = {
  text: string
  key: string | number
}

export interface TabsConfig {
  /** tabs内容 */
  tabs: Array<TabItem>
  /** 是否在x轴滚动 */
  isScroll?: boolean
  /** 默认active */
  defaultActive?: string | number
  /**  */
  paddingTop?: string
  /** 是否占满全屏 */
  isFull?: boolean
}

export interface OnChangeParams {
  /** key值 */
  value: string | number
  /** 下标 */
  index: number
}
