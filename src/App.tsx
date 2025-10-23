import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { setupProdMockServer } from '../mock/_createProductionServer'
import { useTableHeightSimple } from '@/hooks/useTableHeightSimple'

function App() {
  const isBuild = process.env.NODE_ENV === 'production'
  if (isBuild) {
    setupProdMockServer()
  }

  // 使用自定义hook管理表格高度计算
  useTableHeightSimple()

  return <RouterProvider router={router} />
}

export default App
