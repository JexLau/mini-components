/**
 ** 房源筛选，change 事件的返回参数
 ** /component/house_filter
 */
export interface HouseFilterChange {
  /** 镇区code */
  areaCode: Array<string>
  /** 地铁线路站点ID */
  subwayCode: Array<string>
  /** 片区（支持多选） */
  belongAreaCode: Array<string>
  /** 价格段 */
  averagePrice: Array<{
    /** 最小值 */
    min: number
    /** 最大值 */
    max: number
  }>
  /** 户型 */
  houseType: Array<number>
  /** 面积段 */
  areaSize: Array<{
    /** 最小值 */
    min: number
    /** 最大值 */
    max: number
  }>
}

/** 单选的列表接口 */
export type IRadioLists = Array<{
  /** 名称 */
  text: string
  /** 编号 */
  code: number | string
  /** 是否选中 */
  isActive?: boolean
}>

/** 范围选择列表接口 */
export type IScopeLists = Array<{
  /** 名称 */
  text: string
  /** 最大值，不限制为null */
  maxValue: number
  /** 最小值，不限制为null */
  minValue: number
  /** 是否选中 */
  isActive: boolean
  /** 编号 */
  code: number
}>

/** 单选的接口 （number） */
export interface IApplyDataItemNumber {
  /** 原始列表数据 */
  lists: IRadioLists
  /** 已选中的code */
  selectCode: Array<number>
  /** 是否选中 */
  isActive?: boolean
}

/** 单选的接口 string */
export interface IApplyDataItemString {
  /** 原始列表数据 */
  lists: IRadioLists
  /** 已选中的code */
  selectCode: Array<string>
  /** 是否选中 */
  isActive?: boolean
}

/** 更多的数据接口 */
export type IScreenData = Array<
  {
    /** 名称 */
    text?: string
    /** 编号 */
    code: number
    /** 最大值 */
    maxValue?: number
    /** 最小值 */
    minValue?: number
    isActive: boolean
  }
>

export interface IEstateScreenList {
  /** 筛选项名称 */
  name?: string
  /** key */
  parameter: string
  /** 筛选项数据 */
  screenData: IScreenData
  /** 已选中的code */
  selectCode: Array<number>
}

/** 范围选择的接口 */
export interface IScopeApplyDataItem {
  /** 原始列表数据 */
  lists: IScopeLists
  /** 已选中的范围 */
  selectCode: Array<{
    /** 最小值 */
    min: number
    /** 最大值 */
    max: number
  }>
  /** 是否选中 */
  isActive?: boolean
}

/** 地铁下级数据 */
export type ISubOptions = Array<{
  /** 编码 */
  code: string
  /** 名称 */
  text: string
  /** 是否选中 */
  isActive?: boolean
}>

/** 地铁数据列表接口 */
export type ISubwayLists = Array<{
  /** 编码 */
  code: string
  /** 名称 */
  text: string
  subOptions: ISubOptions
  /** 是否选中 */
  isActive?: boolean
}>

/** 地铁选择接口 */
export interface ISubwayDataItem {
  /** 原始列表数据 */
  lists: ISubwayLists
  /** 已选中的code */
  selectCode: Array<string>
  /** 是否选中 */
  isActive?: boolean
}

export interface IApplyData {
  /** 地铁 */
  subway: ISubwayDataItem
  /** 片区 */
  area: IApplyDataItemString
  /** 镇/区 */
  town: IApplyDataItemString
  /** 价格段 */
  price: IScopeApplyDataItem
  /** 面积段 */
  areaSize: IScopeApplyDataItem
  /** 户型 */
  houseType: IApplyDataItemNumber
}

export type ApplyEnum = keyof IApplyData;

/** 单选的key */
export type SinglePropKey = "area" | "town" | "houseType"
// | "productType"
// | "renovationType"
// | "environment"
// | "propertyMgt"
// | "lifestyle"
// | "support"
// | "tag"

export type ScopePropKey = "price" | "areaSize"


/** 房源筛选项 */
interface EstateScreenVo {
  /** 筛选项名称 */
  name?: string
  /** key */
  parameter?: string
  /** 筛选项数据 */
  screenData?: Array<TypesVo>
}

/**  */
interface TypesVo {
  /** 名称 */
  text?: string
  /** 编号 */
  code: number
  /** 最大值 */
  maxValue?: number
  /** 最小值 */
  minValue?: number
}