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
        // 新增字段
        auxiliaryAttributes: '@cword(4,8)',
        skuCode: /SKU[0-9]{6}/,
        packaging: '@natural(1,100)',
        size: '@pick(["S", "M", "L", "XL"])',
        grade: '@pick(["A", "B", "C"])',
        color: '@pick(["红色", "蓝色", "绿色", "黄色"])',
        number: /NO[0-9]{6}/,
        weightUnit: '@pick(["kg", "g"])',
        netWeight: '@float(1, 100, 2, 2)',
        totalNetWeight: '@float(100, 1000, 2, 2)',
        grossWeight: '@float(1, 100, 2, 2)',
        totalGrossWeight: '@float(100, 1000, 2, 2)',
        volumeUnit: '@pick(["m³", "cm³"])',
        volume: '@float(1, 100, 2, 2)',
        totalVolume: '@float(100, 1000, 2, 2)',
        batch: /BT[0-9]{6}/,
        productionDate: '@date("yyyy-MM-dd")',
        shelfLifeUnit: '@pick(["天", "月", "年"])',
        shelfLife: '@natural(1,36)',
        expirationDate: '@date("yyyy-MM-dd")',
        registrationNumber: /RN[0-9]{8}/,
        productionLicense: /PL[0-9]{8}/,
        origin: '@city',
        availableStock: '@natural(100,1000)',
        instantStock: '@natural(100,1000)',
        estimatedAvailableStock: '@natural(100,1000)',
        quantity: '@natural(1,1000)',
        unit: '@pick(["个", "箱", "件", "kg", "包"])',
        conversionRate: '@float(1, 10, 2, 2)',
        auxiliaryUnit: '@pick(["箱", "包"])',
        auxiliaryQuantity: '@natural(1,100)',
        basicUnit: '@pick(["个", "kg", "件"])',
        basicQuantity: '@natural(1,1000)',
        incomingUnitPrice: '@float(10, 1000, 2, 2)',
        incomingAmount: '@float(1000, 10000, 2, 2)',
        discount: '@float(1, 10, 1, 1)',
        retailPrice: '@float(10, 1000, 2, 2)',
        retailAmount: '@float(1000, 10000, 2, 2)',
        basicUnitCost: '@float(10, 1000, 2, 2)',
        unitCost: '@float(10, 1000, 2, 2)',
        cost: '@float(1000, 10000, 2, 2)',
        costSharingRatio: '@float(1, 100, 2, 2)',
        incomingCostSharing: '@float(100, 1000, 2, 2)',
        referenceUnitCost: '@float(10, 1000, 2, 2)',
        relatedTransferCost: '@float(100, 1000, 2, 2)',
        productDescription: '@csentence',
        productLineRemark: '@csentence',
        transferCost: '@float(100, 1000, 2, 2)',
        transferCostDetails: '@csentence',
        recipientContact: '@cname',
        recipientPhone: /1[3-9][0-9]{9}/,
        recipientCountry: '中国',
        recipientProvince: '@province',
        recipientCity: '@city',
        recipientDistrict: '@county',
        recipientAddress: '@csentence',
        voucherNumber: /VN[0-9]{8}/,
        documentSource: '@pick(["WEB录入", "APP", "小程序"])',
        sourceDocumentType: '@pick(["采购订单", "销售订单", "生产订单"])',
        sourceDocumentNumber: /SD[0-9]{8}/,
        sourceDocumentLineNumber: '@natural(1,100)',
        creator: '@cname',
        creationTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        auditor: '@cname',
        auditTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        lastModifier: '@cname',
        lastModificationTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        printCount: '@natural(0,10)',
        deliveryMethod: '@pick(["快递", "自提", "物流"])',
        logisticsCompany: '@pick(["顺丰", "圆通", "中通", "韵达"])',
        logisticsNumber: /LG[0-9]{10}/,
        shippingTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        logisticsRemark: '@csentence',
        logisticsEntryLineNumber: '@natural(1,100)',
        documentRemark: '@csentence',
        documentLabel: '@pick(["重要", "加急", "普通"])',
        attachmentCount: '@natural(0,5)'
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
