export default {


  //公用的

  'queryPayTypeAndWay': 'route/queryPayTypeAndWay',  //  支付方式和类型
  'infoOSS': 'api/hoopay/oss/info',  //  
  'queryBasedatamgIndustryList': 'dataconfig/queryBasedatamgIndustryList',  //  

  //用户登陆
  'login': '/login/loginsubmit', //登陆
  'verifyCode': 'login/verifyCode', //登陆
  'verifyCodePost': 'login/verifyCodePost', //登陆

  // 公告管理
  'addNotice': 'notice/addNotice', //发布公告
  'deleteNotice': 'notice/deleteNotice', //删除公告
  'queryNoticeList': 'notice/queryNoticeList', //发布公告
  'updateNotice': 'notice/updateNotice', //更新公告
  'uploadNotice': 'notice/upload', //上传图片

  //系统配置
  // 角色管理
  'addRole': 'role/addRole',
  'queryRoleList': 'role/queryRoleList',  // get 角色列表
  'updRole': 'role/updRole', // 更新角色
  'updRoleStatus': 'role/updRoleStatus', // 更新角色状态
  'initPermissionByRoleId': 'role/initPermissionByRoleId', // 权限设置 
  'saveRolePermission': 'role/saveRolePermission', // 权限设置 

  // 用户管理
  'queryUserList': 'user/queryUserList',  // 
  'addUser': 'user/addUser',  // 
  'closeUser': 'user/closeUser',  // 
  'resetPwd': 'user/resetPwd',  // 
  'updUser': 'user/updUser',  // 
  'updateStatus': 'user/updateStatus',  // 
  'addOrdermgVestinMain': 'user/addOrdermgVestinMain',  // 添加桌
  'delOrdermgVestinMain': 'user/delOrdermgVestinMain',  // 删除桌
  'getOrdermgVestinMainPage': 'user/getOrdermgVestinMainPage',  // 获取桌
  'updOrdermgVestinMain': 'user/updOrdermgVestinMain',  // 修改桌


  // 数据配置
  'addAreaData': 'dataconfig/addAreaData',  // 地区配置
  'addBanksData': 'dataconfig/addBanksData',  // 银行配置
  'addPayType': 'dataconfig/addPayType',  // 支付方式配置
  'addPayWay': 'dataconfig/addPayWay',  // 支付类型配置
  'addRoute': 'dataconfig/addRoute',  // 添加支付通道配置
  'addRouteTemplate': 'dataconfig/addRouteTemplate',  // 通道模板配置
  'addStreetData': 'dataconfig/addStreetData',  // 街道配置
  'getPayTypeList': 'dataconfig/getPayTypeList',  // 支付方式查询
  'getPayWayList': 'dataconfig/getPayWayList',  // 支付类型查询  //error 接口没有返回
  'getRouteList': 'dataconfig/getRouteList',  // 支付通道查询
  'getTemplateList': 'dataconfig/getTemplateList',  // 通道模板查询
  'insertUnionpayData': 'dataconfig/insertUnionpayData',  // 银联地区配置编码添加
  'queryBasedatamgAreaByCode': 'dataconfig/queryBasedatamgAreaByCode',  // 加载地区
  'queryBasedatamgAreaByCtCode': 'dataconfig/queryBasedatamgAreaByCtCode',  // 根据城市id加载地区列表
  'queryBasedatamgBanksById': 'dataconfig/queryBasedatamgBanksById',  // 根据银行code获取银行
  'queryBasedatamgBanksList': 'dataconfig/queryBasedatamgBanksList',  // 根据银行code和城市code获取银行类列表
  'queryBasedatamgCityByCode': 'dataconfig/queryBasedatamgCityByCode',  // 根据城市id加载城市
  'queryBasedatamgCityByPrCode': 'dataconfig/queryBasedatamgCityByPrCode',  // 根据省份id加载城市列表
  'queryBasedatamgIndustryByIds': 'dataconfig/queryBasedatamgIndustryByIds',  // 获取单个行业
  'queryBasedatamgIndustryList': 'dataconfig/queryBasedatamgIndustryList',  // 获取行业联动
  'queryBasedatamgProvince': 'dataconfig/queryBasedatamgProvince',  // 加载省份
  'queryBasedatamgStreetByArCode': 'dataconfig/queryBasedatamgStreetByArCode',  // 根据地区id加载街道列表
  'queryBasedatamqBanktypeList': 'dataconfig/queryBasedatamqBanktypeList',  // 获取全部银行类列表
  'queryPayTemplateList': 'dataconfig/queryPayTemplateList',  // 获取通道代码的所有数据(不带分页)
  'queryPayTypeList': 'dataconfig/queryPayTypeList',  // 获取支付方式的所有数据(不带分页)
  'queryPayWayList': 'dataconfig/queryPayWayList',  // 获取支付类型的所有数据(不带分页)
  'queryUnionpayData': 'dataconfig/queryUnionpayData',  // 银联地区配置编码查询

  // 接口服务
  'queryBalance':'toolApi/queryBalance',// 余额查询
  'queryRechargeRecord':'toolApi/queryRechargeRecord',// 充值记录查询
  'queryUsedRecord':'toolApi/queryUsedRecord',// 查询接口调用记录
  'recharge':'toolApi/recharge',// 充值
  'bankAuthentication': 'api/showapi/bankAuthentication', //银行卡四要素
  'idAuthentication': 'api/showapi/idAuthentication', //身份证验证

  // 服务商管理
  "addSerProTlemps": "serpro/addSerProTlemps", //添加商户
  "updSerproTelmps": "serpro/updSerproTelmps", //编辑商户
  "addSerpro": "serpro/addSerpro", //添加商户
  "querySerProByCode": "serpro/querySerProByCode", //通过商户code获取商户
  "querySerProByIsSubAccountList": "serpro/querySerProByIsSubAccountList", //获取拥有子商户的商户列表
  "querySerProList": "serpro/querySerProList", //获取商户列表
  "querySerProListByCode": "serpro/querySerProListByCode", //获取属于当前登录用户的商户列表
  "querySerProListSelect": "serpro/querySerProListSelect", //获取商户列表
  "serproTemplate": "serpro/serproTemplate", //获取商户及秘钥列表
  "addSubSerpro": "serpro/sub/add", //添加子商户
  "listSubSerpro": "serpro/sub/list", //获取子商户列表
  "subUpdateSubSerpro": "serpro/sub/subUpdate", //更新子商户信息
  "subrelationUpdate": "serpro/sub/subrelationUpdate", //更新子商户通道信息
  "updSerpro": "serpro/sub/updSerpro", //更新商户信息
  "updStatusByCode": "serpro/updStatusByCode", //更新商户状态
  "updateSubAccountStatusBuId": "serpro/updateSubAccountStatusBuId", //更新子商户状态
  "uploadSerpro": "serpro/upload", //上传/ serpro / upload / { title } / { userCode }
  "addSerpromgDeviceByCode": "serpro/addSerpromgDeviceByCode", //添加用户绑定设备信息（云喇叭）
  "delSerpromgDeviceByCode": "serpro/delSerpromgDeviceByCode", // 删除
  "getSerpromgDevicePage": "serpro/getSerpromgDevicePage", // 设备列表
  "updateSerpromgDeviceByCode": "serpro/updateSerpromgDeviceByCode", // 修改状态

  "querySerproWechatMainByCode": "serpro/querySerproWechatMainByCode", //wx进件
  "wxInitSerpro": "serpro/wxInitSerpro", //wx进件

  // 通道
  "generateMerchantKey": "route/generateMerchantKey", // 生成密钥
  "templatelistMess": "route/templatelist", // 第三方支付通道列表
  "queryRouteListByCode": "route/queryRouteListByCode", // 通道列表
  "addRoute": "route/addRoute", //新增通道
  "closeRouteByCode": "route/closeRouteByCode", //关闭通道
  "delRouteByCode": "route/delRouteByCode", //删除通道
  "doVerifyCodeSign": "route/doVerifyCodeSign", //签订电子协议
  "getElectronicAgreement": "route/getElectronicAgreement", //下载协议
  "getVerifyCode": "route/getVerifyCode", //获取电子协议挑战吗
  "pushForUmPay": "route/pushForUmPay", //联动进件
  "pushImgForUmPay": "route/pushImgForUmPay", //资质上传
  "quertRouteAuditStatus": "route/quertRouteAuditStatus", //查询进件结果
  "quertSubRouteAuditStatus": "route/quertSubRouteAuditStatus", //子商户状态查询
  "queryAllBasePayWay": "route/queryAllBasePayWay", //查询BasePayWay
  "queryAllBaseTemplate": "route/queryAllBaseTemplate", //查询BaseTemplate
  "queryBaseFee": "route/queryBaseFee", //查询成本费率
  "queryBasePayType": "route/queryBasePayType", //获取支付类型列表
  "queryMorePaywayByCode": "route/queryMorePaywayByCode", //获取多费率列表
  "queryMoreRouteBaseFee": "route/queryMoreRouteBaseFee", //获取多费率成本费率
  "queryPayTypeAndWay": "route/queryPayTypeAndWay", //查询支付类型和方式
  "queryPayWayByCode": "route/queryPayWayByCode", //获取通道模板
  "queryPayWayByCurrentSerPro": "route/queryPayWayByCurrentSerPro", //获取通道列表（分页）
  "queryPayWayBySubSerPro": "route/queryPayWayBySubSerPro", //获取子商户通道详情
  "queryRouteInfoByCode": "route/queryRouteInfoByCode", //获取通道列表
  "queryRouteList": "route/queryRouteList", //查询服务商默认通道
  "queryRouteListByCode": "route/queryRouteListByCode", //获取通道列表
  "queryRouteListBySerProCode": "route/queryRouteListBySerProCode", //获取父级通道列表
  "sendRouteAudit": "route/sendRouteAudit", //进件

  "setDefaultRoute": "route/setDefaultRoute", //设置默认通道
  "push": "route/sub/push", //子商户进件
  "queryPush": "route/sub/queryPush", //子商户进件结果查询
  // "templatelist": "route/sub/templatelist", //获取商户支付方式列表
  "updateRouteListBySerProCode": "route/updateRouteListBySerProCode", //变更费率（单费率）
  "updateRouteMoreBySerProCode": "route/updateRouteMoreBySerProCode", //变更费率(多费率)
  "updateRouteStatus": "route/updateRouteStatus", //更新审核状态
  "updexamineStatus": "route/updexamineStatus", //更新进件状态


  "getRouteTemplateList": "key/getRouteTemplateList", // 
  "saveRouteTemplate": "key/saveRouteTemplate", // 
  "insertRouteKey": "key/insertRouteKey", // 
  "insertSubRouteKey": "key/insertSubRouteKey", // 

  // 订单管理
  'makeQRCode': 'order/makeQRCode',  // 订单查询
  'orderQueryOrderList': 'order/queryOrderList',  // 订单查询
  'queryOrderCollect': 'order/queryOrderCollect',  //  订单汇总
  'queryOrderOne': 'order/queryOrderOne',  //查询单个订单  
  'queryOrderToOther': 'order/queryOrderToOther',  //订单查询  
  'hoopayQueryOrder': 'api/hoopay/hoopayQueryOrder',  //订单查询  
  'refund': 'order/refund',  //旧退款
  'hoopayRefundOrder': 'api/hoopay/hoopayRefundOrder',  //退款
  'exportOrderExcel': 'order/Excel',  //导出


  // 分账配置
  'addReceive': 'order/Receive/add',  //添加分账接收方
  'listReceive': 'order/Receive/list',  //分账接收方
  'removeReceive': 'order/Receive/remove',  //删除分账接收方

  // 分账
  'listBySerProCode': 'order/Receive/listBySerProCode',  //获取分账接收方列表
  'profitSharing': 'api/order/profitSharing',  //确认分账
  'listFzOrder': 'order/listFzOrder',  //确认分账

  // 分账查询
  'getOrderFzListByPage': 'order/Receive/getOrderFzListByPage',  //获取分账订单列表
  'getSubAccountOrderDetails': 'order/Receive/getSubAccountOrderDetails',  //获取分账订单详情
  'profitReturnSubOrderQuery': 'order/Receive/profitReturnSubOrderQuery',  //查询分账回退
  'querySubOrder': 'order/Receive/querySubOrder',  //查询分账结果
  'spoNsorOrderFzRefund': 'order/Receive/spoNsorOrderFzRefund',  //发起分账回退

  // 红包

  'queryRedpacketList': 'order/Redpacket/queryRedpacketList', // 红包列表
  'queryOrderHbDetailList': 'order/Redpacket/queryOrderHbDetailList', // 红包详情
  'sendBatchRedPacket': 'order/Redpacket/sendBatchRedPacket', // 发放多个红包
  'sendRedPacket': 'order/Redpacket/sendRedPacket', // 发放当个红包


  // 结算
  'closeSpaccByCode': "settle/closeSpaccByCode",//关闭账单
  'closehoopayOrderid': "settle/closehoopayOrderid",//关闭结算单
  'createSettle': "settle/createSettle",//创建结算单
  'createSpacc': "settle/createSpacc",//创建账单
  'queryOrderList': "settle/queryOrderList",//获取订单列表（分页）
  'querySettleList': "settle/querySettleList",//获取结算列表（分页）
  'querySpaccList': "settle/querySpaccList",//获取账单列表（分页）
  'remitSettle': "settle/remitSettle",//确认打款
  'updateEndframount': "settle/updateEndframount",//更新分润金额及备注
  'uploadSettle': "settle/upload",//文件上传settle/upload/{title}/{userCode}
  'uploadBillFile': "settle/uploadBillFile",// 上传发票

  //支付测试
  'pushOrderToOther': 'api/hoopay/pushOrder',  //  支付测试
  'micropayPushOrder': 'api/hoopay/micropayPushOrder',  //  被扫测试


  //角色管理
  'getOrgRoleListV3': 'v3/role/getOrgRoleList', //  获取机构角色列表（可根据关键字查询（角色名））

}
