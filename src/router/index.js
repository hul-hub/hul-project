import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',  //去掉url中的#
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/noticeManage',
                    component: () => import(/* webpackChunkName: "noticeManage" */ '../components/page/noticeManage.vue'),
                    meta: { title: '公告管理' }
                },
                {
                    path: '/userManage',
                    component: () => import(/* webpackChunkName: "userManage" */ '../components/page/system/userManage.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/sceneManage',
                    component: () => import(/* webpackChunkName: "userManage" */ '../components/page/system/sceneManage.vue'),
                    meta: { title: '场景管理' }
                },
                {
                    path: '/roleManage',
                    component: () => import(/* webpackChunkName: "roleManage" */ '../components/page/system/roleManage.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/dataSetting',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/system/dataSetting.vue'),
                    meta: { title: '数据配置' }
                },
                {
                    path: '/serviceMerchantManage',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/serviceMerchant/serviceMerchantManage.vue'),
                    meta: { title: '服务商信息管理' }
                },
                {
                    path: '/serviceMerchantAdd',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/serviceMerchant/serviceMerchantAdd.vue'),
                    meta: { title: '新增服务商' }
                },
                {
                    path: '/serviceMerchantCheckVerify',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/serviceMerchant/serviceMerchantCheckVerify.vue'),
                    meta: { title: '服务商信息审核' }
                },
                {
                    path: '/serviceMerchantCheckDetail',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/serviceMerchant/serviceMerchantCheckDetail.vue'),
                    meta: { title: '服务商详情' }
                },
                {
                    path: '/serviceMerchantCheck',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/serviceMerchant/serviceMerchantCheck.vue'),
                    meta: { title: '服务商管理' }
                },
                {
                    path: '/merchantNetwork',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/merchantNetwork.vue'),
                    meta: { title: '商户入网' }
                },
                {
                    path: '/merchantAdd',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/merchantAdd.vue'),
                    meta: { title: '新增商户' }
                },
                {
                    path: '/merchantCheck',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/merchantCheck.vue'),
                    meta: { title: '商户审核' }
                },
                {
                    path: '/merchantCode',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/merchantCode.vue'),
                    meta: { title: '商户信息配置' }
                },
                {
                    path: '/refundManage',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/refundManage.vue'),
                    meta: { title: '发起退款' }
                },
                {
                    path: '/merchantCodeDetail',
                    component: () => import(/* webpackChunkName: "merchantCodeDetail" */ '../components/page/merchant/merchantCodeDetail.vue'),
                    meta: { title: '商户详情' }
                },
                {
                    path: '/merchantCheckVerify',
                    component: () => import(/* webpackChunkName: "merchantCheckVerify" */ '../components/page/merchant/merchantCheckVerify.vue'),
                    meta: { title: '商户审核' }
                },
                {
                    path: '/merchantCheckDetail',
                    component: () => import(/* webpackChunkName: "merchantCheckDetail" */ '../components/page/merchant/merchantCheckDetail.vue'),
                    meta: { title: '商户通道详情' }
                },
                {
                    path: '/refundMoney',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/refundMoney.vue'),
                    meta: { title: '退款' }
                },
                {
                    path: '/cashQrcode',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/cashQrcode.vue'),
                    meta: { title: '收银二维码' }
                },
                {
                    path: '/mgDeviceManage',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/mgDeviceManage.vue'),
                    meta: { title: '设备管理' }
                },
                {
                    path: '/childMerchant',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/childMerchant.vue'),
                    meta: { title: '子商户管理' }
                },
                {
                    path: '/childMerchantAdd',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/merchant/childMerchantAdd.vue'),
                    meta: { title: '子商户新增' }
                },
                {
                    path: '/serviceMerchantRoute',
                    component: () => import(/* webpackChunkName: "serviceMerchantRoute" */ '../components/page/route/serviceMerchantRoute.vue'),
                    meta: { title: '服务商通道' }
                },
                {
                    path: '/merchantRoute',
                    component: () => import(/* webpackChunkName: "serviceMerchantRoute" */ '../components/page/route/merchantRoute.vue'),
                    meta: { title: '商户通道' }
                },
                {
                    path: '/merchantIncomingPart',
                    component: () => import(/* webpackChunkName: "serviceMerchantRoute" */ '../components/page/route/merchantIncomingPart.vue'),
                    meta: { title: '商户进件' }
                },
                {
                    path: '/defaultRoute',
                    component: () => import(/* webpackChunkName: "serviceMerchantRoute" */ '../components/page/route/defaultRoute.vue'),
                    meta: { title: '默认通道' }
                },
                {
                    path: '/childMerchantIncomingPart',
                    component: () => import(/* webpackChunkName: "serviceMerchantRoute" */ '../components/page/route/childMerchantIncomingPart.vue'),
                    meta: { title: '子商户进件' }
                },
                {
                    path: '/orderManage',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/order/orderManage.vue'),
                    meta: { title: '交易订单查询' }
                },
                {
                    path: '/orderCollect',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/order/orderCollect.vue'),
                    meta: { title: '交易订单汇总' }
                },
                {
                    path: '/orderExport',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/order/orderExport.vue'),
                    meta: { title: '订单数据导出' }
                },
                {
                    path: '/settleOrder',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/settle/settleOrder.vue'),
                    meta: { title: '订单结算' }
                },
                {
                    path: '/settleManage',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/settle/settleManage.vue'),
                    meta: { title: '结算管理' }
                },
                {
                    path: '/settleBillManage',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/settle/settleBillManage.vue'),
                    meta: { title: '账单管理' }
                },
                {
                    path: '/ledgerAccountSetting',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/ledgerAccount/ledgerAccountSetting.vue'),
                    meta: { title: '接收方配置' }
                },
                {
                    path: '/ledgerAccountManage',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/ledgerAccount/ledgerAccountManage.vue'),
                    meta: { title: '分账' }
                },
                {
                    path: '/ledgerAccountList',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/ledgerAccount/ledgerAccountList.vue'),
                    meta: { title: '分账查询' }
                },
                {
                    path: '/ledgerAccountDetail',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/ledgerAccount/ledgerAccountDetail.vue'),
                    meta: { title: '订单分账详情' }
                },
                {
                    path: '/redPackageGrant',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/redPackage/redPackageGrant.vue'),
                    meta: { title: '红包发放' }
                },
                {
                    path: '/redPackageQuery',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/redPackage/redPackageQuery.vue'),
                    meta: { title: '红包详情' }
                },
                {
                    path: '/wallet',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/money/wallet.vue'),
                    meta: { title: '钱包' }
                },
                {
                    path: '/interfaceExplain',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/interface/interfaceExplain.vue'),
                    meta: { title: '接口说明' }
                },
                {
                    path: '/realNameAuth',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/interface/realNameAuth.vue'),
                    meta: { title: '实名认证' }
                },
                {
                    path: '/interfaceRecord',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/interface/interfaceRecord.vue'),
                    meta: { title: '接口调用记录' }
                },
                {
                    path: '/payTest',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/payTest/payTest.vue'),
                    meta: { title: '支付测试' }
                },
                {
                    path: '/sweptTest',
                    component: () => import(/* webpackChunkName: "dataSetting" */ '../components/page/payTest/sweptTest.vue'),
                    meta: { title: '被扫测试' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
