import Mock from 'mockjs'
import { SUCCESS_CODE } from '../../../src/constants'

const timeout = 50
const count = 200

const generateList = () => {
  return Mock.mock({
    [`list|${count}`]: [
      {
        id: '@id',
        documentDate: '@date("yyyy-MM-dd")',
        documentNumber: /DB[0-9]{8}/,
        auditStatus: '@pick(["未审核", "已审核"])',
        businessType: '@pick(["普通调拨", "跨部门调拨", "库位调拨"])',
        outgoingDepartment: '@pick(["采购部", "物流部", "生产部", "销售部", "仓储部"])',
        incomingDepartment: '@pick(["采购部", "物流部", "生产部", "销售部", "仓储部"])',
        incomingWarehouse: '@pick(["主仓库", "备用仓库", "临时仓库", "原料仓", "成品仓"])',
        incomingLocation: '@pick(["A区", "B区", "C区", "D区"])-@natural(1,100)',
        handler: '@cname',
        entryLineNumber: '@natural(1,100)',
        outgoingWarehouse: '@pick(["主仓库", "备用仓库", "临时仓库", "原料仓", "成品仓"])',
        outgoingLocation: '@pick(["A区", "B区", "C区", "D区"])-@natural(1,100)',
        productImage: '@image("100x100")',
        productCode: /SP[0-9]{6}/,
        productName: '@cword(4,8)',
        barcode: /[0-9]{13}/,
        specificationModel: '@word(5,10)',
        productCategory: '@cword(2,4)类',
        brand: '@cword(2,4)',
        quantity: '@natural(1,1000)',
        unit: '@pick(["个", "箱", "件", "kg", "包"])',
        basicUnit: '@pick(["个", "kg", "件"])',
        basicQuantity: '@natural(1,1000)',
        incomingUnitPrice: '@float(10, 1000, 2, 2)',
        incomingAmount: '@float(1000, 10000, 2, 2)',
        creator: '@cname',
        creationTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        auditor: '@cname',
        auditTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        lastModifier: '@cname',
        lastModificationTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        documentRemark: '@csentence'
      }
    ]
  }).list
}

const List = generateList()

export default [
  {
    url: '/mock/transferInventory/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const {
        currentPage = 1,
        pageSize = 10,
        documentNumber,
        documentDate,
        auditStatus,
        businessType,
        outgoingDepartment,
        incomingDepartment,
        productCode,
        productName,
        handler,
        creator,
        creationTime
      } = query
      const pageIndex = parseInt(currentPage)
      const size = parseInt(pageSize)

      let mockList = List.filter(() => true)

      // 添加查询参数过滤
      if (documentNumber) mockList = mockList.filter(item => item.documentNumber.includes(documentNumber))
      if (documentDate) mockList = mockList.filter(item => item.documentDate.includes(documentDate))
      if (auditStatus) mockList = mockList.filter(item => item.auditStatus === auditStatus)
      if (businessType) mockList = mockList.filter(item => item.businessType === businessType)
      if (outgoingDepartment) mockList = mockList.filter(item => item.outgoingDepartment === outgoingDepartment)
      if (incomingDepartment) mockList = mockList.filter(item => item.incomingDepartment === incomingDepartment)
      if (productCode) mockList = mockList.filter(item => item.productCode.includes(productCode))
      if (productName) mockList = mockList.filter(item => item.productName.includes(productName))
      if (handler) mockList = mockList.filter(item => item.handler.includes(handler))
      if (creator) mockList = mockList.filter(item => item.creator.includes(creator))
      if (creationTime) mockList = mockList.filter(item => item.creationTime.includes(creationTime))

      const pageList = mockList.filter((_, index) => index < size * pageIndex && index >= size * (pageIndex - 1))

      return {
        code: SUCCESS_CODE,
        data: {
          total: mockList.length,
          list: pageList,
          currentPage: pageIndex,
          pageSize: size,
          totalPages: Math.ceil(mockList.length / size)
        },
        message: '获取调拨单列表成功'
      }
    }
  }
]
