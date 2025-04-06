import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { setupProdMockServer } from '../mock/_createProductionServer'
import { useEffect } from 'react'
import { setTableHeight } from './stores/modules/app'
import { useAppDispatch } from '@/stores'

function App() {
  const isBuild = process.env.NODE_ENV === 'production'
  if (isBuild) {
    setupProdMockServer()
  }

  useEffect(() => {
    // const screenHeight = document.documentElement.clientHeight // 屏幕浏览器物理高度
    // const height1 = document.getElementsByClassName('ant-layout-header')?.[0]?.clientHeight // 面包屑高度
    // const height2 = document.getElementsByClassName('_layout_tags_mbhag_1')?.[0]?.clientHeight // 页签tag高度
    // const height3 = document.getElementsByClassName('tableForm')?.[0]?.clientHeight // tableForm组件高度
    // const height4 = 24 // 内容区域上下padding
    // const height5 = 48 // 表格内容区域上下padding
    // const height6 = document.getElementsByClassName('ant-pagination')?.[0]?.clientHeight // 分页组件高度
    // const height7 = document.getElementsByClassName('ant-table-thead')?.[0]?.clientHeight // 表头高度高度
    // console.log(document.documentElement, screenHeight, 'screenHeight------------')
    // console.log(document.getElementsByClassName('ant-layout-header'))
    // console.log(screenHeight, height1, height2, height3, height4, height5, height6, height7)
    // dispatch(setTableHeight(0))
  }, [])

  return <RouterProvider router={router} />
}

export default App
