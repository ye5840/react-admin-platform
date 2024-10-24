import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// component module page
const CompoRoute: RouteObject = {
  path: '/inventory',
  name: 'Inventory',
  element: <LayoutGuard />,
  meta: {
    title: '库存管理',
    icon: 'compo',
    orderNo: 999
  },
  children: [
    {
      path: 'warehouse-documents',
      name: 'WarehouseDocuments',
      meta: {
        title: '仓库单据'
      },
      children: [
        {
          path: 'transfer-outbound',
          name: 'TransferOutbound',
          element: LazyLoad(lazy(() => import('@/views/inventory/warehouse-documents/transfer-outbound/index'))),
          meta: {
            title: '调拨出库',
            key: 'transferOutbound'
          }
        },
        {
          path: 'transfer-inventory',
          name: 'TransferInventory',
          element: LazyLoad(lazy(() => import('@/views/inventory/warehouse-documents/transfer-inventory/index'))),
          meta: {
            title: '调拨入库',
            key: 'transferInventory'
          }
        }
      ]
    }
  ]
}

export default CompoRoute
