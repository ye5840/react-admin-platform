import { service } from '@/utils/axios'

// User login api
export function getTransferInventoryList(params: objAny): Promise<any> {
  return service({
    url: '/mock/transferInventory/list',
    method: 'get',
    params
  })
}
