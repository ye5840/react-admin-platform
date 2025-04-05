import { useState, useRef, useEffect } from 'react'
import { Input, DatePicker } from 'antd'
import type { InputRef } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import './index.less'

interface DateRangeInputProps {
  inputConfig?: objAny
  options?: any[]
  optionsfiled?: {
    label: string
    value: string
  }
  rangePickerConfig?: objAny
  value?: any
  setValue?: Function
}

interface stateType {
  selectContentShow: boolean
  inputLabel: string
  inputValue: string
  customIsClick: boolean
  rangePickerValue: null | string
  suffixShow: boolean
  contentOptions: any[]
}

const defaultOptions = [
  {
    label: '自定义',
    value: 'custom'
  }
]

const { RangePicker } = DatePicker

const getInitialState = () => ({
  selectContentShow: false, // 是否展示下拉选择
  inputLabel: '', // 选择的label的值
  inputValue: '', // 选择的value的值
  customIsClick: false, // 自定义是否被点击的标识
  rangePickerValue: null, // 日期框的值
  suffixShow: false, // input后缀图标是否展示
  contentOptions: [] // 下拉选项
})

const DateRangeInput = (props: DateRangeInputProps) => {
  const { inputConfig, options, optionsfiled, rangePickerConfig, value, setValue } = props
  const dateRangeInputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<InputRef>(null)

  const [dateRangeInputInfo, setDateRangeInputInfo] = useState<stateType>(getInitialState())

  const handleFocus = () => {
    setDateRangeInputInfo(perv => ({
      ...perv,
      selectContentShow: true
    }))
  }

  useEffect(() => {
    const resultOptions = options && options.length > 0 ? [...options, ...defaultOptions] : [...defaultOptions]
    const mapResultOptions = [...resultOptions].map(item => {
      if (item.label === '自定义') {
        return { ...item }
      }
      return {
        ...item,
        label: optionsfiled?.label ? item[optionsfiled.label] : undefined,
        value: optionsfiled?.value ? item[optionsfiled.value] : undefined
      }
    })
    const contentOptions = optionsfiled?.label && optionsfiled?.value ? mapResultOptions : [...resultOptions]
    const label = value ? contentOptions.find(item => item.value === value).label : ''
    setDateRangeInputInfo(perv => ({
      ...perv,
      contentOptions,
      inputValue: value ? value : '',
      inputLabel: label ? label : ''
    }))
  }, [])

  const handleSelectClick = (item: { label: string; value: string }) => {
    if (item.label !== '自定义') {
      setDateRangeInputInfo(perv => ({
        ...perv,
        inputLabel: item.label,
        inputValue: item.value,
        selectContentShow: false,
        customIsClick: false,
        rangePickerValue: null
      }))

      if (setValue) {
        setValue(item.value)
      }
    }
    if (item.label === '自定义') {
      setDateRangeInputInfo(perv => ({
        ...perv,
        inputValue: item.value,
        customIsClick: true
      }))
    }
  }

  const handleRangPickerChange = (date: any, dateString: string[]) => {
    setDateRangeInputInfo(perv => ({
      ...perv,
      inputLabel: dateString[0] + '~' + dateString[1],
      inputValue: dateString[0] + '~' + dateString[1],
      selectContentShow: false,
      rangePickerValue: date
    }))
    if (setValue) {
      setValue(dateString[0] + '~' + dateString[1])
    }
  }

  // 是否为 active 状态
  const isActive = (itemValue: string) => {
    return (
      itemValue === dateRangeInputInfo.inputValue ||
      (itemValue === 'custom' && (dateRangeInputInfo.inputValue === 'custom' || dateRangeInputInfo.customIsClick))
    )
  }

  // 添加 useEffect 监听点击事件
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      const isCalendar = target.closest('.ant-picker-cell')
      if (!isCalendar && dateRangeInputRef.current && !dateRangeInputRef.current.contains(event.target as Node)) {
        setDateRangeInputInfo(prev => ({ ...prev, selectContentShow: false }))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dateRangeInputInfo.customIsClick])

  const handleIconClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()
    setDateRangeInputInfo(perv => ({
      ...getInitialState(),
      contentOptions: perv.contentOptions
    }))
    setValue?.(value ?? undefined)
  }

  return (
    <div className={'dateRangeInput-wrapper'} ref={dateRangeInputRef}>
      <Input
        {...inputConfig}
        ref={inputRef}
        className='date-range-input'
        value={dateRangeInputInfo.inputLabel}
        onFocus={handleFocus}
        suffix={<CloseCircleOutlined onClick={handleIconClick} />}
      />
      <Input value={dateRangeInputInfo.inputValue} style={{ display: 'none' }} />
      {dateRangeInputInfo.selectContentShow && (
        <div className={'chooseContent'}>
          {dateRangeInputInfo.contentOptions.map(item => {
            return (
              <div
                className={`${'chooseContent-item'} ${isActive(item.value) ? 'active' : ''}`}
                key={item.value}
                onClick={() => handleSelectClick(item)}
              >
                {item.label}
              </div>
            )
          })}
          {dateRangeInputInfo.customIsClick && (
            <RangePicker
              value={dateRangeInputInfo.rangePickerValue}
              style={{ width: '100%' }}
              placeholder={['开始日期', '结束日期']}
              {...rangePickerConfig}
              separator={<div style={{ opacity: 0.3 }}>~</div>}
              onChange={handleRangPickerChange}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default DateRangeInput
