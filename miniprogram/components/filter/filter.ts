import resAreaData from "./areaData";
import configureData from "./configureData";
import resMoreData from "./moreData";
import { IApplyData, ISubOptions, HouseFilterChange, IEstateScreenList, EstateScreenVo, ApplyEnum, IScopeApplyDataItem, ScopePropKey, SinglePropKey } from "./typings";
import { disposeSubway, disposeScope, disposeSingle, disposeMore } from "./utils"
const MAX = 9999999

// pages/filter.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  lifetimes: {
    attached() {
      this.getFiltersLists();
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /** 当前选择的table */
    tabActive: -1,
    /** 加工后的数据 */
    applyData: {} as IApplyData,
    /** 筛选选项 */
    filterOptions: [
      { text: "区域", isActive: false, activeTxt: "区域" },
      { text: "价格", isActive: false, activeTxt: "价格" },
      { text: "户型", isActive: false, activeTxt: "户型" },
      { text: "面积", isActive: false, activeTxt: "面积" },
      { text: "更多", isActive: false, activeTxt: "更多" }
    ],
    /** 自定义值 */
    customData: {
      minValue: "",
      maxValue: ""
    },
    /** 区域选择索引 */
    areaIndex: 0,
    /** 地铁一级选择索引 */
    subwayIndex: 0,
    /** 当前展示的地铁数据列表 */
    currentSubwayLists: [] as ISubOptions,
    /** 是否显示筛选栏 */
    isShowFilters: false,
    /** 选中的数据 */
    tempData: {
      /** 区域code */
      areaCode: [],
      /** 地铁线路站点ID */
      subwayCode: [],
      /** 行政区划ID（支持多选） */
      belongAreaCode: [],
      /** 价格段 */
      averagePrice: [],
      /** 面积段 */
      areaSize: [],
      /** 户型 */
      houseType: []
    } as HouseFilterChange,
    /** 区域code */
    siteCode: "",
    /** userId */
    userId: -1,
    /** 更多栏目动态渲染的数据 */
    moreData: [] as IEstateScreenList[],
    /** 选择更多栏目的数量 */
    moreCount: 0,
    /** 更多栏目动态渲染的数据 */
    moreOriginData: [] as EstateScreenVo[]
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 切换 */
    handover(ev: Mini.Wx.TapEventDom<{ index: string }>) {
      const index = Number(ev.currentTarget.dataset.index)
      if (index === this.data.tabActive) {
        this.close(true)
      } else {
        this.data.filterOptions.forEach((item, i) => {
          if (i === index) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
        this.setData({
          isShowFilters: true,
          tabActive: index,
          filterOptions: this.data.filterOptions
        })
      }
    },
    /** 切换区域 */
    handoverArea(ev: Mini.Wx.TapEventDom<{ i: string }>) {
      this.setData({
        areaIndex: Number(ev.currentTarget.dataset.i)
      })
    },
    
    /** 选择单选选项
     * @param i 下标
     * @param code 点击的code
     * @param key 点击的key
     * @param type "apply"固定的数据 "more"更多栏目中的动态数据
     */
     select(ev: Mini.Wx.TapEventDom<{ i: string; code: number | string; key: SinglePropKey; type: "apply" | "more" }>) {
      const data = ev.currentTarget.dataset
      const { code, type = "apply", key } = data
      if (type === "apply") {
        const rawData = this.data.applyData[key as ApplyEnum]
        if (typeof rawData === "undefined") return
        if (code === -1 || code === "") {
          // 如果为空字符串，则是 不限 选项
          // 清空选择项
          rawData.lists.forEach(item => {
              item.isActive = false
          })
          // 将第一项设置为选中
          rawData.lists[0].isActive = true
          rawData.selectCode = []
        } else {
          for (let i = 0; i < rawData.lists.length; i++) {
            const temp = rawData.lists[i]
            if (temp.code === data.code) {
              if (temp.isActive) {
                temp.isActive = false
                // 移除选中的code
                // @ts-ignore
                const index = rawData.selectCode.indexOf(temp.code)
                rawData.selectCode.splice(index, 1)
              } else {
                temp.isActive = true
                // @ts-ignore
                rawData.selectCode.push(temp.code)
              }
            }
          }
          // 检查是否有选中选项
          if (rawData.selectCode.length === 0) {
            // 如果没有，则设置，第一项为选中状态
            rawData.lists[0].isActive = true
          } else {
            // 如果有，则设置第一项为不选中状态
            rawData.lists[0].isActive = false
          }
        }
        this.setData({
          applyData: this.data.applyData
        })
      } else if (type === "more") {
        const moreItemIndex = this.data.moreData.findIndex(item => item.parameter === key)
        const rawData = this.data.moreData[moreItemIndex] as IEstateScreenList
        if (code === -1) {
          // 如果为-1，则是 不限 选项
          rawData.screenData.forEach(item => {
            item.isActive = false
          })
          // 将第一项设置为选中
          rawData.screenData[0].isActive = true
          rawData.selectCode = []
        } else {
          for (let i = 0; i < rawData.screenData.length; i++) {
            const temp = rawData.screenData[i]
            if (temp.code === data.code) {
              if (temp.isActive) {
                temp.isActive = false
                // 移除选中的code
                const index = rawData.selectCode.indexOf(temp.code)
                rawData.selectCode.splice(index, 1)
              } else {
                temp.isActive = true
                rawData.selectCode.push(temp.code)
              }
            }
          }
          // 检查是否有选中选项
          if (rawData.selectCode.length === 0) {
            // 如果没有，则设置，第一项为选中状态
            rawData.screenData[0].isActive = true
            rawData.selectCode = []
          } else {
            // 如果有，则设置第一项为不选中状态
            rawData.screenData[0].isActive = false
          }
        }
        this.setData({
          moreData: this.data.moreData
        })
      }
    },
    /** 选择范围数据 */
    selectScope(ev: Mini.Wx.TapEventDom<{ i: number; min: number; max: number; key: ScopePropKey }>) {
      const data = ev.currentTarget.dataset
      const min = data.min
      const max = data.max

      const rawData = this.data.applyData[data.key]
      if (typeof rawData === "undefined") return

      // 判断是否是不限的情况
      if (min === 0 && max === MAX) {
        // 清空选择项
        rawData.lists.forEach(item => {
          item.isActive = false
        })

        // 将第一项设置为选中
        rawData.lists[0].isActive = true

        rawData.selectCode = []
      } else {
        for (let i = 0; i < rawData.lists.length; i++) {
          const temp = rawData.lists[i]
          if (temp.minValue === min && temp.maxValue === max) {
            if (temp.isActive) {
              temp.isActive = false
              // 移除选中的code
              rawData.selectCode = rawData.selectCode.filter(item => {
                if (item.max === max && item.min === min) {
                  return false
                }
                return true
              })
            } else {
              temp.isActive = true
              rawData.selectCode.push({ min: temp.minValue, max: temp.maxValue })
            }
          }
        }

        // 检查是否有选中选项
        if (rawData.selectCode.length === 0) {
          // 如果没有，则设置，第一项为选中状态
          rawData.lists[0].isActive = true
        } else {
          // 如果有，则设置第一项为不选中状态
          rawData.lists[0].isActive = false
        }
      }

      this.setData({
        applyData: this.data.applyData,
        customData: { minValue: "", maxValue: "" }
      })
    },
    /** 自定义价格 */
    customPrice(ev: Mini.Wx.BlurEventDom<{ type: "min" | "max" }>) {
      const value = Number(ev.detail.value)
      const type = ev.currentTarget.dataset.type
      const data = this.data.customData
      let minValue = data.minValue
      let maxValue = data.maxValue

      if (!isNaN(value) || value === 0) {
        if (type === "min") {
          minValue = value !== 0 ? value.toString() : ""
        } else {
          maxValue = value !== 0 ? value.toString() : ""
        }
      }

      // 清空已选择的项
      this.data.applyData.price.lists.forEach(item => {
        item.isActive = false
      })

      if (minValue || maxValue) {
        this.data.applyData.price.selectCode = [
          { min: minValue ? Number(minValue) : 0, max: maxValue ? Number(maxValue) : MAX }
        ]
      } else {
        this.data.applyData.price.selectCode = []
        this.data.applyData.price.lists[0].isActive = true
      }

      // 更新数据
      this.setData({
        applyData: this.data.applyData,
        customData: { maxValue, minValue }
      })
    },
    /** 地铁一级选择 */
    selectSubwayFirst(ev: Mini.Wx.TapEventDom<{ i: number }>) {
      const i = ev.currentTarget.dataset.i

      // 如果是不限，则清空数据
      if (i === 0) {
        this.data.applyData.subway.selectCode = []
        this.data.applyData.subway.lists.forEach(item => {
          item.subOptions.forEach((subwayItem, subwayIndex) => {
            if (subwayIndex === 0) {
              subwayItem.isActive = true
              return
            }
            subwayItem.isActive = false
          })
        })
      }

      // 切换一级索引
      this.setData({
        applyData: this.data.applyData,
        subwayIndex: i,
        currentSubwayLists: this.data.applyData.subway.lists[i].subOptions
      })
    },
    /** 选择地铁 */
    selectSubWay(ev: Mini.Wx.TapEventDom<{ i: number; code: string }>) {
      const data = ev.currentTarget.dataset
      const code = data.code

      const rawData = this.data.applyData.subway
      const lists = this.data.currentSubwayLists

      // 如果为空字符串，则是 不限 选项
      if (code === "") {
        // 清空选择项
        lists.forEach(item => {
          item.isActive = false
        })

        // 将第一项设置为选中
        lists[0].isActive = true
        rawData.selectCode = []
      } else {
        for (let i = 0; i < lists.length; i++) {
          const temp = lists[i]
          if (temp.code === data.code) {
            if (temp.isActive) {
              temp.isActive = false
              // 移除选中的code
              const index = rawData.selectCode.indexOf(temp.code)
              rawData.selectCode.splice(index, 1)
            } else {
              temp.isActive = true
              rawData.selectCode.push(temp.code)
            }
          }
        }

        // 检查是否有选中选项
        if (rawData.selectCode.length === 0) {
          // 如果没有，则设置，第一项为选中状态
          lists[0].isActive = true
        } else {
          // 如果有，则设置第一项为不选中状态
          lists[0].isActive = false
        }
      }

      this.setData({
        applyData: this.data.applyData,
        currentSubwayLists: this.data.currentSubwayLists
      })
    },
    /** 确认选中的数据 */
    confirm() {
      const tempData = { ...this.data.tempData }
      /* 处理选中的数据 */
      const applyData = this.data.applyData
      /** 镇区 */
      tempData.areaCode = [...applyData.town.selectCode]
      /** 片区 */
      tempData.belongAreaCode = [...applyData.area.selectCode]
      /** 地铁 */
      tempData.subwayCode = [...applyData.subway.selectCode]
      /** 户型 */
      tempData.houseType = [...applyData.houseType.selectCode]
      /** 价格 */
      tempData.averagePrice = applyData.price.selectCode.map(item => {
        return { min: item.min, max: item.max }
      })
      /** 面积段 */
      tempData.areaSize = applyData.areaSize.selectCode.map(item => {
        return { min: item.min, max: item.max }
      })

      const restParams: {[key in string]: any} = {}
      this.data.moreCount = 0
      this.data.moreData.forEach(item => {
        this.data.moreCount += item.selectCode.length
        restParams[item.parameter] = item.selectCode
      })

      const newTemp = { ...tempData, ...restParams }

      this.setData({
        tempData: newTemp
      })

      this.triggerEvent("change", newTemp)
      this.close(false)
    },
    /** 关闭筛选框 */
    close(ev: Mini.Wx.TapEventDom | boolean) {
      if (ev) {
        this.cancel()
      }
      this.setFilterTxt()
      this.setData({
        isShowFilters: false,
        tabActive: -1
      })
    },
    /** 重置 */
    reset() {
      const rawData = this.data.applyData

      // 清空数据
      for (const attr in rawData) {
        rawData[attr as ApplyEnum].selectCode = []
        rawData[attr as ApplyEnum].lists.forEach((item, index) => {
          if (index == 0) {
            item.isActive = true
            return
          }
          item.isActive = false
        })
      }
      // 清空地铁的数据选项
      rawData.subway.lists.forEach(item => {
        item.subOptions.forEach((sub, i) => {
          if (i == 0) {
            sub.isActive = true
            return
          }
          sub.isActive = false
        })
      })
      // 清空自定义数据
      this.data.customData = { minValue: "", maxValue: "" }
      // 重置更多选项中的选择
      this.data.moreData = disposeMore(this.data.moreOriginData)

      this.setData({
        applyData: rawData,
        currentSubwayLists: rawData.subway.lists[this.data.subwayIndex].subOptions,
        customData: this.data.customData,
        moreData: this.data.moreData,
        moreCount: 0
      })
    },
    /** 如果是取消操作，则将已选中的值，重置回原始数据 */
    cancel() {
      type RawDataKey = "town" | "area" | "houseType"
      type TempDataKey = "areaCode" | "belongAreaCode" | "houseType"
      /** 重置单选的值 */
      const resetRadio = (rawDataKey: RawDataKey, tempDataKey: TempDataKey) => {
        const rawDataItem = this.data.applyData[rawDataKey]
        const tempDataItem = this.data.tempData[tempDataKey]

        // 重置选中的值
        rawDataItem.selectCode = tempDataItem

        // 重置选中状态
        rawDataItem.lists.forEach(item => {
          // @ts-ignore
          if (tempDataItem.indexOf(item.code) === -1) {
            item.isActive = false
          } else {
            item.isActive = true
          }
        })

        if (rawDataItem.selectCode.length === 0) {
          rawDataItem.lists[0].isActive = true
        }
      }

      // 执行重置操作
      resetRadio("town", "belongAreaCode")
      resetRadio("area", "areaCode")
      resetRadio("houseType", "houseType")
      // resetRadio("productType", "productType")
      // resetRadio("propertyMgt", "propertyMgt")
      // resetRadio("environment", "environment")
      // resetRadio("lifestyle", "lifestyle")
      // resetRadio("support", "support")
      // resetRadio("renovationType", "renovationType")
      // resetRadio("tag", "tag")

      type ScopeRawDataKey = "price" | "areaSize"
      type ScopeTempDataKey = "averagePrice" | "areaSize"
      /** 重置范围选择 */
      const resetScope = (rawDataKey: ScopeRawDataKey, tempDataKey: ScopeTempDataKey) => {
        const rawDataItem = this.data.applyData[rawDataKey]
        const tempDataItem = this.data.tempData[tempDataKey]

        // 重置选中的值
        rawDataItem.selectCode = [...tempDataItem]

        // 重置选中状态
        let isActive = false
        rawDataItem.lists.forEach(list => {
          list.isActive = false
          for (const item of tempDataItem) {
            if (item.min === list.minValue && item.max === list.maxValue) {
              isActive = true
              list.isActive = true
              break
            }
          }
        })

        // 价格选项单独处理
        if (rawDataKey === "price" && !isActive && tempDataItem[0]) {
          this.data.customData = {
            minValue: tempDataItem[0].min.toString(),
            maxValue: tempDataItem[0].max.toString()
          }
        }

        if (rawDataItem.selectCode.length === 0) {
          rawDataItem.lists[0].isActive = true
        }
      }

      // 执行重置操作
      resetScope("price", "averagePrice")
      resetScope("areaSize", "areaSize")

      // 重置选中的地铁
      const rawSubwayData = this.data.applyData.subway
      const subwayTempData = this.data.tempData.subwayCode
      rawSubwayData.selectCode = [...subwayTempData]
      rawSubwayData.lists.forEach(item => {
        let isActive = false
        item.subOptions.forEach(sub => {
          if (subwayTempData.indexOf(sub.code) === -1) {
            sub.isActive = false
          } else {
            isActive = true
            sub.isActive = true
          }
        })

        // 如果没有一个选中的元素，则设置第一项为选中
        if (!isActive && item.subOptions[0]) {
          item.subOptions[0].isActive = true
        }
      })

      // 重置更多选项中的选择
      this.data.moreData.forEach(moreDataItem => {
        // 重置选中的值
        moreDataItem.selectCode = []
        moreDataItem.screenData[0].isActive = true
      })

      this.setData({
        applyData: this.data.applyData,
        currentSubwayLists: this.data.applyData.subway.lists[this.data.subwayIndex].subOptions,
        customData: this.data.customData,
        moreData: this.data.moreData,
        moreCount: 0
      })
    },
    /** 设置筛选标题栏的文字 */
    setFilterTxt() {
      /**
       ** 筛选栏项显示规则：
       ** 1、若选了多个，则在其选项名称后加所选的数量；如：区域（2），价格（5），更多（8）
       ** 2、更多栏，显示其所选个数，如：更多（1）
       ** 3、若选一个，则显示为已选的标签名；
       */
      const filterOptions = this.data.filterOptions
      const tempData = this.data.tempData
      const applyData = this.data.applyData

      /** 设置 情况1 和 情况2 */
      const setOneTwo = (
        filterOption: { isActive: boolean; activeTxt: string; text: string },
        tempDataLen: number,
        exception?: boolean
      ) => {
        if (tempDataLen === 0) {
          filterOption.isActive = false
          filterOption.activeTxt = filterOption.text
        } else if (tempDataLen > 1 || exception) {
          filterOption.isActive = true
          filterOption.activeTxt = filterOption.text + `(${tempDataLen})`
        } else {
          filterOption.isActive = false
          filterOption.activeTxt = filterOption.text
        }
      }
      // 执行（设置 情况1 和 情况2）
      const areaLen = tempData.areaCode.length + tempData.subwayCode.length + tempData.belongAreaCode.length
      setOneTwo(filterOptions[0], areaLen)
      setOneTwo(filterOptions[1], tempData.averagePrice.length)
      setOneTwo(filterOptions[2], tempData.houseType.length)
      setOneTwo(filterOptions[3], tempData.areaSize.length)
      setOneTwo(filterOptions[4], this.data.moreCount, true)

      // 设置情况三: 针对户型
      const houseTypeTempData = tempData.houseType
      if (houseTypeTempData.length === 1) {
        for (const item of applyData.houseType.lists) {
          if (item.code === houseTypeTempData[0]) {
            filterOptions[2].isActive = true
            filterOptions[2].activeTxt = item.text
            break
          }
        }
      }

      /* 设置情况三: 针对价格 和 面积 */
      const setThree = (
        rawData: IScopeApplyDataItem,
        threeTempData: Array<{ min: number; max: number }>,
        filterOption: { isActive: boolean; activeTxt: string; text: string },
        isPrice?: boolean
      ) => {
        if (threeTempData.length !== 1) return

        for (const item of rawData.lists) {
          if (item.minValue === threeTempData[0].min && item.maxValue === threeTempData[0].max) {
            filterOption.isActive = true
            filterOption.activeTxt = item.text
            return
          }
        }

        // 针对价格独立设置
        if (!isPrice) return
        const min = threeTempData[0].min
        const max = threeTempData[0].max
        filterOption.isActive = true
        filterOption.activeTxt = `${min}-${max === MAX ? "不限" : max}`
      }
      // 执行（设置情况三: 针对价格 和 面积）
      setThree(applyData.price, tempData.averagePrice, filterOptions[1], true)
      setThree(applyData.areaSize, tempData.areaSize, filterOptions[3])

      // 设置情况三: 针对区域(镇区、地铁、片区)
      if (areaLen === 1) {
        const firstTempData = tempData.areaCode.concat(tempData.subwayCode, tempData.belongAreaCode)[0]
        const filterOption = filterOptions[0]
        // 片区
        if (tempData.belongAreaCode.length !== 0) {
          for (const item of applyData.area.lists) {
            if (item.code === firstTempData) {
              filterOption.isActive = true
              filterOption.activeTxt = item.text
              break
            }
          }
        }
        // 镇区
        if (tempData.areaCode.length !== 0) {
          for (const item of applyData.town.lists) {
            if (item.code === firstTempData) {
              filterOption.isActive = true
              filterOption.activeTxt = item.text
              break
            }
          }
        }
        // 地铁
        if (tempData.subwayCode.length !== 0) {
          for (const subway of applyData.subway.lists) {
            for (const item of subway.subOptions) {
              if (item.code === firstTempData) {
                filterOption.isActive = true
                filterOption.activeTxt = item.text
                break
              }
            }
          }
        }
      }

      // 赋值
      this.setData({
        filterOptions: filterOptions
      })
    },
    /** 获取数据，并且初始化数据 */
    async getFiltersLists(isReset?: boolean) {
      // const areaRes = await GetFiltersArea({ type: "town", areaCode: this.data.siteCode })
      // const moreRes = await AGetEstateScreen({})
      // const res = await GetDict({ type: all" })
      const areaRes = resAreaData;
      const moreRes = resMoreData;
      const res = configureData;
      const moreData = disposeMore(moreRes.data.values || [])
      /** 填充数据 */
      const data = res.data
      this.setData(
        {
          applyData: {
            subway: {
              lists: disposeSubway(areaRes.data.subway),
              selectCode: []
            },
            town: {
              lists: disposeSingle(areaRes.data.town),
              selectCode: []
            },
            area: {
              lists: disposeSingle(areaRes.data.area),
              selectCode: []
            },
            price: {
              lists: disposeScope(data.price),
              selectCode: []
            },
            areaSize: {
              lists: disposeScope(data.areaSize),
              selectCode: []
            },
            houseType: {
              lists: disposeSingle(data.houseType),
              selectCode: []
            }
          },
          moreData: moreData,
          moreOriginData: moreRes.data.values
        },
        () => {
          if (isReset) {
            this.reset()
            this.confirm()
          }
        }
      )
    }
  }
})
