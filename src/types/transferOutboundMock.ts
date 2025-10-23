export interface TransferOutboundMockData {
  id: string
  documentDate: string
  documentNumber: string
  auditStatus: '未审核' | '已审核'
  businessType: '普通调拨' | '跨部门调拨' | '库位调拨'
  transferStatus: '未出库' | '部分出库' | '已出库'
  discrepancyHandlingStatus: '无差异' | '待处理' | '已处理'
  outgoingDepartment: '采购部' | '物流部' | '生产部' | '销售部' | '仓储部'
  incomingDepartment: '采购部' | '物流部' | '生产部' | '销售部' | '仓储部'
  // 表头仓库信息
  outgoingWarehouse: '主仓库' | '备用仓库' | '临时仓库' | '原料仓' | '成品仓'
  outgoingPosition: string
  incomingWarehouse: '主仓库' | '备用仓库' | '临时仓库' | '原料仓' | '成品仓'
  incomingPosition: string
  // 明细仓库信息
  outgoingWarehouseDetail: '主仓库' | '备用仓库' | '临时仓库' | '原料仓' | '成品仓'
  outgoingPositionDetail: string
  incomingWarehouseDetail: '主仓库' | '备用仓库' | '临时仓库' | '原料仓' | '成品仓'
  incomingPositionDetail: string
  handler: string
  entryLineNumber: number
  productImage: string
  productCode: string
  productName: string
  barcode: string
  specificationModel: string
  productCategory: string
  brand: string
  auxiliaryAttribute: string
  skuCode: string
  packaging: number
  size: 'S' | 'M' | 'L' | 'XL'
  grade: 'A' | 'B' | 'C'
  color: '红色' | '蓝色' | '绿色' | '黄色'
  number: string
  weightUnit: 'kg' | 'g'
  netWeight: number
  totalNetWeight: number
  grossWeight: number
  totalGrossWeight: number
  volumeUnit: 'm³' | 'cm³'
  volume: number
  totalVolume: number
  batch: string
  productionDate: string
  shelfLifeUnit: '天' | '月' | '年'
  shelfLife: number
  expirationDate: string
  registrationNumber: string
  productionLicense: string
  origin: string
  // 库存相关字段
  outgoingWarehouseAvailableStock: number
  outgoingWarehouseInstantStock: number
  outgoingWarehouseEstimatedAvailableStock: number
  incomingWarehouseAvailableStock: number
  incomingWarehouseInstantStock: number
  incomingWarehouseEstimatedAvailableStock: number
  quantity: number
  unit: '个' | '箱' | '件' | 'kg' | '包'
  conversionRate: number
  auxiliaryUnit: '箱' | '包'
  auxiliaryQuantity: number
  wholePackage: '整件' | '散包'
  basicUnit: '个' | 'kg' | '件'
  basicQuantity: number
  outgoingUnitPrice: number
  outgoingAmount: number
  discount: number
  retailPrice: number
  retailAmount: number
  basicUnitCost: number
  unitCost: number
  cost: number
  storageQuantity: number
  costSharingRatio: number
  outgoingCostSharing: number
  referenceUnitCost: number
  costIncludedOutgoingUnitPrice: number
  costIncludedOutgoingAmount: number
  productDescription: string
  productLineRemark: string
  transferCost: number
  transferCostDetails: string
  recipientContact: string
  recipientPhone: string
  recipientCountry: string
  recipientProvince: string
  recipientCity: string
  recipientDistrict: string
  recipientAddress: string
  voucherNumber: string
  sourceDocumentNumber: string
  sourceDocumentLineNumber: number
  creator: string
  creationTime: string
  auditor: string
  auditTime: string
  lastModifier: string
  lastModificationTime: string
  printCount: number
  deliveryMethod: '快递' | '自提' | '物流'
  logisticsCompany: '顺丰' | '圆通' | '中通' | '韵达'
  logisticsNumber: string
  shippingTime: string
  logisticsRemark: string
  logisticsEntryLineNumber: number
  documentRemark: string
  documentLabel: '重要' | '加急' | '普通'
  documentSource: 'WEB录入' | 'APP' | '小程序'
  attachmentCount: number
}

// 如果需要更严格的类型约束，可以使用联合类型
export type AuditStatus = '未审核' | '已审核'
export type BusinessType = '普通调拨' | '跨部门调拨' | '库位调拨'
export type TransferStatus = '未出库' | '部分出库' | '已出库'
export type DiscrepancyHandlingStatus = '无差异' | '待处理' | '已处理'
export type Department = '采购部' | '物流部' | '生产部' | '销售部' | '仓储部'
export type Warehouse = '主仓库' | '备用仓库' | '临时仓库' | '原料仓' | '成品仓'
export type Position = 'A区' | 'B区' | 'C区' | 'D区'
export type Size = 'S' | 'M' | 'L' | 'XL'
export type Grade = 'A' | 'B' | 'C'
export type Color = '红色' | '蓝色' | '绿色' | '黄色'
export type WeightUnit = 'kg' | 'g'
export type VolumeUnit = 'm³' | 'cm³'
export type ShelfLifeUnit = '天' | '月' | '年'
export type Unit = '个' | '箱' | '件' | 'kg' | '包'
export type AuxiliaryUnit = '箱' | '包'
export type WholePackage = '整件' | '散包'
export type BasicUnit = '个' | 'kg' | '件'
export type DeliveryMethod = '快递' | '自提' | '物流'
export type LogisticsCompany = '顺丰' | '圆通' | '中通' | '韵达'
export type DocumentLabel = '重要' | '加急' | '普通'
export type DocumentSource = 'WEB录入' | 'APP' | '小程序'

// 使用严格类型的接口版本
export interface TransferOutboundMockDataStrict {
  id: string
  documentDate: string
  documentNumber: string
  auditStatus: AuditStatus
  businessType: BusinessType
  transferStatus: TransferStatus
  discrepancyHandlingStatus: DiscrepancyHandlingStatus
  outgoingDepartment: Department
  incomingDepartment: Department
  outgoingWarehouse: Warehouse
  outgoingPosition: string
  incomingWarehouse: Warehouse
  incomingPosition: string
  outgoingWarehouseDetail: Warehouse
  outgoingPositionDetail: string
  incomingWarehouseDetail: Warehouse
  incomingPositionDetail: string
  handler: string
  entryLineNumber: number
  productImage: string
  productCode: string
  productName: string
  barcode: string
  specificationModel: string
  productCategory: string
  brand: string
  auxiliaryAttribute: string
  skuCode: string
  packaging: number
  size: Size
  grade: Grade
  color: Color
  number: string
  weightUnit: WeightUnit
  netWeight: number
  totalNetWeight: number
  grossWeight: number
  totalGrossWeight: number
  volumeUnit: VolumeUnit
  volume: number
  totalVolume: number
  batch: string
  productionDate: string
  shelfLifeUnit: ShelfLifeUnit
  shelfLife: number
  expirationDate: string
  registrationNumber: string
  productionLicense: string
  origin: string
  outgoingWarehouseAvailableStock: number
  outgoingWarehouseInstantStock: number
  outgoingWarehouseEstimatedAvailableStock: number
  incomingWarehouseAvailableStock: number
  incomingWarehouseInstantStock: number
  incomingWarehouseEstimatedAvailableStock: number
  quantity: number
  unit: Unit
  conversionRate: number
  auxiliaryUnit: AuxiliaryUnit
  auxiliaryQuantity: number
  wholePackage: WholePackage
  basicUnit: BasicUnit
  basicQuantity: number
  outgoingUnitPrice: number
  outgoingAmount: number
  discount: number
  retailPrice: number
  retailAmount: number
  basicUnitCost: number
  unitCost: number
  cost: number
  storageQuantity: number
  costSharingRatio: number
  outgoingCostSharing: number
  referenceUnitCost: number
  costIncludedOutgoingUnitPrice: number
  costIncludedOutgoingAmount: number
  productDescription: string
  productLineRemark: string
  transferCost: number
  transferCostDetails: string
  recipientContact: string
  recipientPhone: string
  recipientCountry: string
  recipientProvince: string
  recipientCity: string
  recipientDistrict: string
  recipientAddress: string
  voucherNumber: string
  sourceDocumentNumber: string
  sourceDocumentLineNumber: number
  creator: string
  creationTime: string
  auditor: string
  auditTime: string
  lastModifier: string
  lastModificationTime: string
  printCount: number
  deliveryMethod: DeliveryMethod
  logisticsCompany: LogisticsCompany
  logisticsNumber: string
  shippingTime: string
  logisticsRemark: string
  logisticsEntryLineNumber: number
  documentRemark: string
  documentLabel: DocumentLabel
  documentSource: DocumentSource
  attachmentCount: number
}
