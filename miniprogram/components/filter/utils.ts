import { IEstateScreenList, IRadioLists, IScopeLists, ISubwayLists } from "./typings.d";

export const MAX = 9999999
/** 将服务端原始数据（单项的数据），进行处理 */
export function disposeSingle(rawData: IRadioLists): IRadioLists {
  let type = "number"
  if (rawData[0]) {
    type = typeof rawData[0].code
  }
  const temp: IRadioLists = [
    {
      isActive: true,
      text: "不限",
      code: type === "number" ? -1 : ""
    }
  ]

  for (let i = 0; i < rawData.length; i++) {
    temp.push({
      isActive: false,
      text: rawData[i].text,
      code: rawData[i].code
    })
  }
  return temp
}

/** 将服务端原始数据（范围数据），进行处理 */
export function disposeScope(rawData: Array<{
  /** 名称 */
  text: string
  /** 最大值，不限制为null */
  maxValue: number
  /** 最小值，不限制为null */
  minValue: number
  /** 编号 */
  code: number
}>): IScopeLists {
  const temp: IScopeLists = [
    {
      text: "不限",
      code: 0,
      minValue: 0,
      maxValue: MAX,
      isActive: true
    }
  ]

  for (let i = 0; i < rawData.length; i++) {
    temp.push({
      isActive: false,
      code: 0,
      minValue: rawData[i].minValue || 0,
      maxValue: rawData[i].maxValue || MAX,
      text: rawData[i].text
    })
  }
  return temp
}

/** 将服务端原始数据（地铁数据），进行处理 */
export function disposeSubway(rawData: ISubwayLists): ISubwayLists {
  const temp: ISubwayLists = []

  if (rawData.length === 0) {
    temp.push({
      text: "不限",
      code: "",
      subOptions: []
    })
    return temp
  }

  rawData.forEach((item, i) => {
    if (i === 0) {
      temp.push({
        text: "不限",
        code: "",
        subOptions: []
      })
    }

    temp.push({
      text: item.text,
      code: item.code,
      subOptions: [
        { text: "不限", code: "", isActive: false },
        ...item.subOptions.map(subwayItem => {
          return { text: subwayItem.text, code: subwayItem.code, isActive: false }
        })
      ]
    })
  })
  return temp
}

/** 将更多栏目数据，进行处理 */
export function disposeMore(rawData: Array<{
  /** 筛选项名称 */
  name?: string
  /** key */
  parameter?: string
  /** 筛选项数据 */
  screenData?: Array<{
    /** 名称 */
    text?: string
    /** 编号 */
    code: number
    /** 最大值 */
    maxValue?: number
    /** 最小值 */
    minValue?: number
  }>
}>): IEstateScreenList[] {
  const temp: IEstateScreenList[] = []

  for (let i = 0; i < rawData.length; i++) {
    const screenData = rawData[i].screenData || []
    if (rawData[i].screenData) {
      temp.push({
        name: rawData[i].name,
        parameter: rawData[i].parameter || "",
        screenData: [
          { text: "不限", code: -1, isActive: true },
          ...screenData.map(screenItem => {
            return { ...screenItem, isActive: false }
          })
        ],
        selectCode: []
      })
    }
  }
  return temp
}
