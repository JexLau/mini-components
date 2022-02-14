import { formatTime } from '../../utils/util'
import { DateTimeValue, ITimeControlExoprt } from './time-control.d'

/** 时间列表项 */
interface IDateKey {
  /** 唯一的key */
  key: number
  /** 格式化后: 对应的时间 */
  value: string
  /** 原始值 */
  rawValue: number
}

Component({
  properties: {
    /** 开始时间范围 */
    startDate: {
      type: Number,
      value: -1
    },
    /** 结束时间范围 */
    endDate: {
      type: Number,
      value: -1
    },
    /** 初始的值 */
    value: {
      type: Number,
      value: -1
    }
  },
  data: {
    /** 开始时间范围 */
    _startDate: 0,
    /** 结束时间范围 */
    _endDate: 0,
    /** 指定时间 */
    _assignDate: 0,
    /** picker 绑定值 */
    values: [0, 0, 0, 0, 0],
    /** 年 */
    yearLists: [] as IDateKey[],
    /** 月 */
    monthLists: [] as IDateKey[],
    /** 日 */
    dayLists: [] as IDateKey[],
    /** 时 */
    hourLists: [] as IDateKey[],
    /** 分 */
    minuteLists: [] as IDateKey[],
    /** 索引: 年 */
    _yearIndex: 0,
    /** 索引: 月 */
    _monthIndex: 0,
    /** 索引: 日 */
    _dayIndex: 0,
    /** 索引: 时 */
    _hourIndex: 0,
    /** 索引: 分 */
    _minuteIndex: 0,
    /** 初始化指定时间成功 */
    _isInitAssignDateSuccess: false,
    /** 定时器 */
    _timer: 0
  },
  lifetimes: {
    attached() {
      // 界定时间范围
      if (this.data.startDate === -1) {
        const currentDate = new Date()
        this.data._startDate = currentDate.setFullYear(currentDate.getFullYear() - 2)
      } else {
        this.data._startDate = this.data.startDate
      }

      if (this.data.endDate === -1) {
        const currentDate = new Date()
        this.data._endDate = currentDate.setFullYear(currentDate.getFullYear() + 2)
      } else {
        this.data._endDate = this.data.endDate
      }

      // 界定指定时间
      if (this.data.value === -1) {
        this.data._assignDate = this.data._startDate === -1 ? Date.now() : this.data._startDate
      } else {
        this.data._assignDate = new Date(this.data.value).getTime()
      }

      this.initYear()
      // 结束指定时间初始化
      this.data._isInitAssignDateSuccess = true
    }
  },
  methods: {
    /** 初始化: 年 */
    initYear() {
      const startDate = new Date(this.data._startDate)
      const endDate = new Date(this.data._endDate)
      const startDateFullYear = startDate.getFullYear()
      const endDateFullYear = endDate.getFullYear()

      const yearLists: IDateKey[] = this.forDisposeData({
        startI: startDateFullYear,
        endI: endDateFullYear,
        unit: '年'
      })

      this.setData({ yearLists })
      this.initAssignDate('year')
      this.initMonth(this.data.yearLists[this.data._yearIndex].rawValue)
    },
    /** 初始化: 月 */
    initMonth(year: number) {
      const startDate = new Date(this.data._startDate)
      const endDate = new Date(this.data._endDate)
      const startDateFullYear = startDate.getFullYear()
      const endDateFullYear = endDate.getFullYear()
      let startI = 0
      let endI = 11

      /* 同一年的情况 */
      if (year === startDateFullYear) {
        startI = startDate.getMonth()
      }
      if (year === endDateFullYear) {
        endI = endDate.getMonth()
      }

      const monthLists: IDateKey[] = this.forDisposeData({
        startI,
        endI,
        unit: '月',
        isPulsOne: true
      })

      if (this.checkData(this.data.monthLists, monthLists)) {
        const len = monthLists.length - 1

        if (this.data._monthIndex > len) { // 对超出索引边界的值，进行处理。
          this.data.values[1] = len
          this.data._monthIndex = len
          this.setData({ monthLists, values: this.data.values })
        } else {
          this.setData({ monthLists })
        }
      }

      this.initAssignDate('month')
      this.initDay(year, this.data.monthLists[this.data._monthIndex].rawValue)
    },
    /** 初始化: 日 */
    initDay(year: number, month: number) {
      let startI = 1
      let endI = new Date(year, month + 1, 0).getDate()

      const startDate = new Date(this.data._startDate)
      const endDate = new Date(this.data._endDate)
      const startDateFullYear = startDate.getFullYear()
      const startDateMonth = startDate.getMonth()
      const endDateFullYear = endDate.getFullYear()
      const endDateMonth = endDate.getMonth()

      if (year === startDateFullYear && month === startDateMonth) {
        startI = startDate.getDate()
      }

      if (year === endDateFullYear && month === endDateMonth) {
        endI = endDate.getDate()
      }

      const dayLists: IDateKey[] = this.forDisposeData({
        startI,
        endI,
        unit: '日'
      })

      if (this.checkData(this.data.dayLists, dayLists)) {
        const len = dayLists.length - 1

        if (this.data._dayIndex > len) { // 对超出索引边界的值，进行处理。
          this.data.values[2] = len
          this.data._dayIndex = len
          this.setData({ dayLists, values: this.data.values })
        } else {
          this.setData({ dayLists })
        }
      }

      this.initAssignDate('day')
      this.initHour(year, month, this.data.dayLists[this.data._dayIndex].rawValue)
    },
    /** 初始化: 小时 */
    initHour(year: number, month: number, day: number) {
      let startI = 0
      let endI = 23

      const startDate = new Date(this.data._startDate)
      const endDate = new Date(this.data._endDate)
      const startDateFullYear = startDate.getFullYear()
      const startDateMonth = startDate.getMonth()
      const startDateDay = startDate.getDate()

      const endDateFullYear = endDate.getFullYear()
      const endDateMonth = endDate.getMonth()
      const endDateDay = endDate.getDate()

      if (year === startDateFullYear && month === startDateMonth && day === startDateDay) {
        startI = startDate.getHours()
      }

      if (year === endDateFullYear && month === endDateMonth && day === endDateDay) {
        endI = endDate.getHours()
      }

      const hourLists: IDateKey[] = this.forDisposeData({
        startI,
        endI,
        unit: '时'
      })

      if (this.checkData(this.data.hourLists, hourLists)) {
        const len = hourLists.length - 1

        if (this.data._hourIndex > len) { // 对超出索引边界的值，进行处理。
          this.data.values[3] = len
          this.data._hourIndex = len
          this.setData({ hourLists, values: this.data.values })
        } else {
          this.setData({ hourLists })
        }
      }

      this.initAssignDate('hour')
      this.initMinute(year, month, day, this.data.hourLists[this.data._hourIndex].rawValue)
    },
    /** 初始化: 分钟 */
    initMinute(year: number, month: number, day: number, hour: number) {
      let startI = 0
      let endI = 59

      const startDate = new Date(this.data._startDate)
      const endDate = new Date(this.data._endDate)
      const startDateFullYear = startDate.getFullYear()
      const startDateMonth = startDate.getMonth()
      const startDateDay = startDate.getDate()
      const startDateHour = startDate.getHours()

      const endDateFullYear = endDate.getFullYear()
      const endDateMonth = endDate.getMonth()
      const endDateDay = endDate.getDate()
      const endDateHour = endDate.getHours()

      if (year === startDateFullYear && month === startDateMonth && day === startDateDay && hour === startDateHour) {
        startI = startDate.getMinutes()
      }

      if (year === endDateFullYear && month === endDateMonth && day === endDateDay && hour === endDateHour) {
        endI = endDate.getMinutes()
      }

      const minuteLists: IDateKey[] = this.forDisposeData({
        startI,
        endI,
        unit: '分'
      })

      if (this.checkData(this.data.minuteLists, minuteLists)) {
        const len = minuteLists.length - 1

        if (this.data._minuteIndex > len) { // 对超出索引边界的值，进行处理。
          this.data.values[3] = len
          this.data._minuteIndex = len
          this.setData({ minuteLists, values: this.data.values })
        } else {
          this.setData({ minuteLists })
        }
      }

      this.initAssignDate('minute')
    },
    /** 遍历生成值 */
    forDisposeData(options: { startI: number, endI: number, unit: string, isPulsOne?: boolean }): IDateKey[] {
      const lists: IDateKey[] = []

      const rawKey = this.getRandomKey()
      for (let i = options.startI; i <= options.endI; i++) {
        lists.push({
          key: rawKey + i,
          value: this.frontZero(options.isPulsOne ? i + 1 : i) + options.unit,
          rawValue: i
        })
      }
      return lists
    },
    /** 比较数据，判断是否需要 setData */
    checkData(rawData: IDateKey[], newData: IDateKey[]): boolean {
      if (rawData.length !== newData.length) {
        return true
      }

      for (let i = 0; i < rawData.length; i++) {
        if (rawData[i].rawValue !== newData[i].rawValue) {
          return true
        }
      }

      return false
    },
    /** 获取随机的key */
    getRandomKey() {
      return Math.ceil(Math.random() * 100000)
    },
    /** 增加前导0 */
    frontZero(num: number) {
      if (num.toString().length === 1) {
        return '0' + num.toString()
      }
      return num.toString()
    },
    /** 响应数据变化 */
    handlePickerChange(ev: Mini.Wx.CustomEventDom<{ value: number[] }>) {
      const value = ev.detail.value

      const rawData = this.data
      this.data.values = value
      // 判断值变化，执行数据变更
      if (value[0] !== rawData._yearIndex) { // 年
        rawData._yearIndex = value[0]
        this.initMonth(rawData.yearLists[rawData._yearIndex].rawValue)
      } else if (value[1] !== rawData._monthIndex) { // 月
        rawData._monthIndex = value[1]
        this.initDay(
          rawData.yearLists[rawData._yearIndex].rawValue,
          rawData.monthLists[rawData._monthIndex].rawValue
        )
      } else if (value[2] !== rawData._dayIndex) { // 日
        rawData._dayIndex = value[2]
        this.initHour(
          rawData.yearLists[rawData._yearIndex].rawValue,
          rawData.monthLists[rawData._monthIndex].rawValue,
          rawData.dayLists[rawData._dayIndex].rawValue
        )
      } else if (value[3] !== rawData._hourIndex) { // 时
        rawData._hourIndex = value[3]
        this.initMinute(
          rawData.yearLists[rawData._yearIndex].rawValue,
          rawData.monthLists[rawData._monthIndex].rawValue,
          rawData.dayLists[rawData._dayIndex].rawValue,
          rawData.hourLists[rawData._hourIndex].rawValue
        )
      } else if (value[4] !== rawData._minuteIndex) {
        rawData._minuteIndex = value[4]
      }
    },
    /** 初始化指定的时间 */
    initAssignDate(key: 'year' | 'month' | 'day' | 'hour' | 'minute') {
      if (this.data._isInitAssignDateSuccess) return

      const filterDateData = (dateLists: IDateKey[], date: number): number => {
        for (let i = 0; i < dateLists.length; i++) {
          if (dateLists[i].rawValue === date) {
            return i
          }
        }
        return 0
      }

      clearInterval(this.data._timer)
      const assignDate = new Date(this.data._assignDate)
      let index = 0
      switch (key) {
        case 'year':
          index = filterDateData(this.data.yearLists, assignDate.getFullYear())
          this.data._yearIndex = index
          this.data.values[0] = index
          break
        case 'month':
          index = filterDateData(this.data.monthLists, assignDate.getMonth())
          this.data._monthIndex = index
          this.data.values[1] = index
          break
        case 'day':
          index = filterDateData(this.data.dayLists, assignDate.getDate())
          this.data._dayIndex = index
          this.data.values[2] = index
          break
        case 'hour':
          index = filterDateData(this.data.hourLists, assignDate.getHours())
          this.data._hourIndex = index
          this.data.values[3] = index
          break
        case 'minute':
          index = filterDateData(this.data.minuteLists, assignDate.getMinutes())
          this.data._minuteIndex = index
          this.data.values[4] = index
          break
      }
      this.data._timer = setTimeout(() => {
        this.setData({ values: this.data.values })
      }, 100)
    },
    /** 获取时间 */
    getDate(): DateTimeValue {
      const {
        _yearIndex, _monthIndex, _dayIndex, _hourIndex, _minuteIndex,
        yearLists, monthLists, dayLists, hourLists, minuteLists
      } = this.data
      const timeStr = `${yearLists[_yearIndex].rawValue}/${monthLists[_monthIndex].rawValue + 1}/${dayLists[_dayIndex].rawValue} ${hourLists[_hourIndex].rawValue}:${minuteLists[_minuteIndex].rawValue}:00`
      const date = new Date(timeStr)

      return {
        value: formatTime(date, 'yyyy-MM-dd hh:mm', false),
        rawDateTime: date.getTime()
      }
    },
    /** 导出组件的方法 */
    export(): ITimeControlExoprt {
      return {
        getDate: this.getDate.bind(this)
      }
    }
  }
})
