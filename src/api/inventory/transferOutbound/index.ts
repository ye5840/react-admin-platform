import { service } from '@/utils/axios'

// User login api
export function getTransferOutboundList(params: objAny): Promise<any> {
  return service({
    url: '/mock/transferOutbound/list',
    method: 'get',
    params
  })
}
