import type { TransferOutboundMockData } from '@/types/transferOutboundMock'
import { service } from '@/utils/axios'

// User login api
export function getTransferOutboundList(params: objAny): Promise<{
  code: string
  data: {
    total: number
    list: TransferOutboundMockData[]
    currentPage: number
    pageSize: number
    totalPages: number
  }
  message: string
}> {
  return service({
    url: '/mock/transferOutbound/list',
    method: 'get',
    params
  })
}
