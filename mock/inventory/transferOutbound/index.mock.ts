import Mock from 'mockjs'
import { SUCCESS_CODE } from '../../../src/constants'
import type { TransferOutboundMockData } from '../../../src/types/transferOutboundMock'

const timeout = 50
const count = 200

const generateList = () => {
  return Mock.mock({
    [`list|${count}`]: [
      {
        id: '@id',
        documentDate: '@date("yyyy-MM-dd")',
        documentNumber: /CK[0-9]{8}/, // 修改前缀为出库单
        auditStatus: '@pick(["未审核", "已审核"])',
        businessType: '@pick(["普通调拨", "跨部门调拨", "库位调拨"])',
        transferStatus: '@pick(["未出库", "部分出库", "已出库"])', // 新增调拨状态
        discrepancyHandlingStatus: '@pick(["无差异", "待处理", "已处理"])', // 新增差异处理状态
        outgoingDepartment: '@pick(["采购部", "物流部", "生产部", "销售部", "仓储部"])',
        incomingDepartment: '@pick(["采购部", "物流部", "生产部", "销售部", "仓储部"])',
        // 新增表头仓库信息
        outgoingWarehouse: '@pick(["主仓库", "备用仓库", "临时仓库", "原料仓", "成品仓"])',
        outgoingPosition: '@pick(["A区", "B区", "C区", "D区"])-@natural(1,100)',
        incomingWarehouse: '@pick(["主仓库", "备用仓库", "临时仓库", "原料仓", "成品仓"])',
        incomingPosition: '@pick(["A区", "B区", "C区", "D区"])-@natural(1,100)',
        // 明细仓库信息
        outgoingWarehouseDetail: '@pick(["主仓库", "备用仓库", "临时仓库", "原料仓", "成品仓"])',
        outgoingPositionDetail: '@pick(["A区", "B区", "C区", "D区"])-@natural(1,100)',
        incomingWarehouseDetail: '@pick(["主仓库", "备用仓库", "临时仓库", "原料仓", "成品仓"])',
        incomingPositionDetail: '@pick(["A区", "B区", "C区", "D区"])-@natural(1,100)',
        handler: '@cname',
        entryLineNumber: '@natural(1,100)',
        productImage: '@image("100x100")',
        productCode: /SP[0-9]{6}/,
        productName: '@cword(4,8)',
        barcode: /[0-9]{13}/,
        specificationModel: '@word(5,10)',
        productCategory: '@cword(2,4)类',
        brand: '@cword(2,4)',
        auxiliaryAttribute: '@cword(4,8)',
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
        // 新增库存相关字段
        outgoingWarehouseAvailableStock: '@natural(100,1000)',
        outgoingWarehouseInstantStock: '@natural(100,1000)',
        outgoingWarehouseEstimatedAvailableStock: '@natural(100,1000)',
        incomingWarehouseAvailableStock: '@natural(100,1000)',
        incomingWarehouseInstantStock: '@natural(100,1000)',
        incomingWarehouseEstimatedAvailableStock: '@natural(100,1000)',
        quantity: '@natural(1,1000)',
        unit: '@pick(["个", "箱", "件", "kg", "包"])',
        conversionRate: '@float(1, 10, 2, 2)',
        auxiliaryUnit: '@pick(["箱", "包"])',
        auxiliaryQuantity: '@natural(1,100)',
        wholePackage: '@pick(["整件", "散包"])', // 新增整件散包
        basicUnit: '@pick(["个", "kg", "件"])',
        basicQuantity: '@natural(1,1000)',
        outgoingUnitPrice: '@float(10, 1000, 2, 2)', // 调出单价
        outgoingAmount: '@float(1000, 10000, 2, 2)', // 调出金额
        discount: '@float(1, 10, 1, 1)',
        retailPrice: '@float(10, 1000, 2, 2)',
        retailAmount: '@float(1000, 10000, 2, 2)',
        basicUnitCost: '@float(10, 1000, 2, 2)',
        unitCost: '@float(10, 1000, 2, 2)',
        cost: '@float(1000, 10000, 2, 2)',
        storageQuantity: '@natural(1,1000)', // 新增入库数量
        costSharingRatio: '@float(1, 100, 2, 2)',
        outgoingCostSharing: '@float(100, 1000, 2, 2)',
        referenceUnitCost: '@float(10, 1000, 2, 2)',
        costIncludedOutgoingUnitPrice: '@float(10, 1000, 2, 2)', // 新增含费用调出单价
        costIncludedOutgoingAmount: '@float(1000, 10000, 2, 2)', // 新增含费用调出金额
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
        documentSource: '@pick(["WEB录入", "APP", "小程序"])',
        attachmentCount: '@natural(0,5)'
      }
    ]
  }).list
}

const List: TransferOutboundMockData[] = generateList()

export default [
  {
    url: '/mock/transferOutbound/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const {
        currentPage = 1,
        pageSize = 10,
        documentNumber,
        documentDate,
        auditStatus,
        transferStatus, // 新增查询条件
        discrepancyHandlingStatus, // 新增查询条件
        businessType,
        outgoingDepartment,
        incomingDepartment,
        outgoingWarehouse, // 新增查询条件
        incomingWarehouse, // 新增查询条件
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
      if (transferStatus) mockList = mockList.filter(item => item.transferStatus === transferStatus)
      if (discrepancyHandlingStatus)
        mockList = mockList.filter(item => item.discrepancyHandlingStatus === discrepancyHandlingStatus)
      if (businessType) mockList = mockList.filter(item => item.businessType === businessType)
      if (outgoingDepartment) mockList = mockList.filter(item => item.outgoingDepartment === outgoingDepartment)
      if (incomingDepartment) mockList = mockList.filter(item => item.incomingDepartment === incomingDepartment)
      if (outgoingWarehouse) mockList = mockList.filter(item => item.outgoingWarehouse === outgoingWarehouse)
      if (incomingWarehouse) mockList = mockList.filter(item => item.incomingWarehouse === incomingWarehouse)
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
        message: '获取调拨出库单列表成功'
      }
    }
  }
]
