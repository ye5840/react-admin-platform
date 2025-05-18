import React, { lazy } from 'react'

const checkbox = lazy(() => import('./custom-checkbox/index'))
const input = lazy(() => import('./custom-input/index'))
const select = lazy(() => import('./custom-select/index'))
const treeSelect = lazy(() => import('./custom-treeSelect/index'))
const treeSelectInput = lazy(() => import('@/custom-components/businessInput/treeSelectInput'))
const dateRangeInput = lazy(() => import('@/custom-components/businessInput/dateRangeInput'))
const checkboxSelect = lazy(() => import('@/custom-components/businessSelect/checkboxSelect'))
const tableSelect = lazy(() => import('@/custom-components/businessSelect/tableSelect'))

export { checkbox, input, select, treeSelect, treeSelectInput, dateRangeInput, checkboxSelect, tableSelect }
