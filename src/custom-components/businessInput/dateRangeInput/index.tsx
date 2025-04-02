import { useState, useRef, useEffect } from 'react'
import { Input, DatePicker } from 'antd'
import styles from './index.module.less'
import { CloseOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'

interface DateRangeInputProps {
  inputConfig?: objAny
  options?: any[]
  optionsfiled?: {
    label: string
    value: string
  }
  rangePickerConfig?: objAny
}

const defaultOptions = [
  {
    label: '自定义',
    value: 'custom'
  }
]

const { RangePicker } = DatePicker

const DateRangeInput = (props: DateRangeInputProps) => {
  const { inputConfig, options, optionsfiled, rangePickerConfig } = props
  const dateRangeInputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<InputRef>(null)

  const [dateRangeInputInfo, setDateRangeInputInfo] = useState({
    selectContentShow: false, // 是否展示下拉选择
    inputLabel: '', // 选择的label的值
    inputValue: '', // 选择的value的值
    customIsClick: false, // 自定义是否被点击的标识
    rangePickerValue: null, // 日期框的值
    suffixShow: false // input后缀图标是否展示
  })

  const handleFocus = () => {
    setDateRangeInputInfo({
      ...dateRangeInputInfo,
      selectContentShow: true
    })
  }

  let contentOptions = []
  const resultOptions = options && options.length > 0 ? [...options, ...defaultOptions] : [...defaultOptions]
  if (optionsfiled?.label && optionsfiled?.value) {
    contentOptions = [...resultOptions].map(item => {
      if (item.label === '自定义') {
        return { ...item }
      }
      return {
        ...item,
        label: item[optionsfiled?.label],
        value: item[optionsfiled?.value]
      }
    })
  } else {
    contentOptions = [...resultOptions]
  }

  const handleSelectClick = (item: { label: string; value: string }) => {
    if (item.label !== '自定义') {
      setDateRangeInputInfo({
        ...dateRangeInputInfo,
        inputLabel: item.label,
        inputValue: item.value,
        selectContentShow: false,
        customIsClick: false,
        rangePickerValue: null
      })
    }
    if (item.label === '自定义') {
      setDateRangeInputInfo({
        ...dateRangeInputInfo,
        inputValue: item.value,
        customIsClick: true
      })
    }
  }

  const handleRangPickerChange = (date: any, dateString: string[]) => {
    setDateRangeInputInfo({
      ...dateRangeInputInfo,
      inputLabel: dateString[0] + '~' + dateString[1],
      inputValue: dateString[0] + '~' + dateString[1],
      selectContentShow: false,
      rangePickerValue: date
    })
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

  const handleMouseEnter = () => {
    if (dateRangeInputInfo.inputLabel) {
      setDateRangeInputInfo({
        ...dateRangeInputInfo,
        suffixShow: true
      })
    }
  }

  const handleMouseLeave = () => {
    setDateRangeInputInfo({
      ...dateRangeInputInfo,
      suffixShow: false
    })
  }

  const handleIconClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()
    setDateRangeInputInfo({
      selectContentShow: false, // 是否展示下拉选择
      inputLabel: '', // 选择的label的值
      inputValue: '', // 选择的value的值
      customIsClick: false, // 自定义是否被点击的标识
      rangePickerValue: null, // 日期框的值
      suffixShow: false // input后缀图标是否展示
    })
  }

  return (
    <div className={styles['dateRangeInput-wrapper']} ref={dateRangeInputRef}>
      <Input
        {...inputConfig}
        ref={inputRef}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        suffix={
          dateRangeInputInfo.suffixShow && <CloseOutlined onClick={handleIconClick} style={{ cursor: 'pointer' }} />
        }
        value={dateRangeInputInfo.inputLabel}
      />
      <Input value={dateRangeInputInfo.inputValue} style={{ display: 'none' }} />
      {dateRangeInputInfo.selectContentShow && (
        <div className={styles['chooseContent']}>
          {contentOptions.map(item => {
            return (
              <div
                className={`${styles['chooseContent-item']} ${isActive(item.value) ? styles['active'] : ''}`}
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
