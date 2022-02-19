/** 滚动组件的 stop 参数 */
export interface ScrollViewStopParams {
  /** 总条数 */
  total: number;
  /** 当前 list 的条数 */
  len?: number;
}
/** 滚动组件的 refresh / load 后的参数 */
export type ScrollViewOperateParams = {
  /** 是否刷新 */
  isRefresh: boolean;
  /** 页码 */
  pageIndex: number;
}
/** 滚动组件的所有方法 */
export interface ScrollView {
  /** 结束加载动作 */
  stop(data: ScrollViewStopParams): void
  /** 滚动组件 执行刷新 */
  refresh(): void
  /** 滚动组件 执行加载 */
  load(): void
}