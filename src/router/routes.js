import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NoAuthLogin from '../views/member/LoginForm.vue'
import Join from '../views/member/Join.vue'
import NoAuthModifyPassword from '../views/member/ModifyPassword.vue'
import AdmConfig from '../views/admin/Config.vue'
import AdmWorksite from '../views/admin/Worksite.vue'
import BaseCode from '../views/admin/BaseCodeView.vue'
import Systemcode from '../views/system/Systemcode.vue'
import Systemusers from '../views/system/Systemusers.vue'
import Notice from '../views/system/Notice.vue'
import BasejobHr from '../views/basejob/BasejobHrView.vue'
import BasejobVend from '../views/basejob/BasejobVend.vue'
import BasejobItem from '../views/basejob/BasejobItem.vue'
import BasejobProcess from '../views/basejob/BasejobProcess.vue'
import BasejobPrType from '../views/basejob/BasejobPrType.vue'
import BasejobRoute from '../views/basejob/BasejobRoute.vue'
import Salesestimate from '../views/sales/SalesEstimate.vue'
import EstimateList from '../views/sales/SalesEstimatelist.vue'
import Salesorders from '../views/sales/SalesOrders.vue'
import SalesOrderslist from '../views/sales/SalesOrderslist.vue'
import ProdPlanning from '../views/prod/ProdPlanning.vue'

import ProdWorkorder from '../views/prod/ProdWorkorder.vue'
import ProdWork from '../views/prod/ProdWork.vue'
import ProdWorkView from '../views/prod/ProdWorkView.vue'
import ProdWorkorderview from '../views/prod/ProdWorkorderview.vue'
import DerliverView from '../views/shipment/DerliverView.vue'
import DerliverViewlist from '../views/shipment/DerliverViewlist.vue'
import InvoiceView from '../views/shipment/InvoiceView.vue'
import AccountView from '../views/shipment/AccountView.vue'
import InvoiceList from '../views/shipment/InvoiceListView.vue'
import Derliverrate from '../views/metrics/DerliverrateView.vue'
import DefectrateRate from '../views/metrics/DefectraterateView.vue'
import Clientsalerate from '../views/metrics/ClientsalerateView.vue'
import Monitorview from '../views/monitor/MonitorView.vue'
import Periodsalerate from '../views/metrics/Periodsalerate.vue'
import kPIManager from '../views/kpi/KpiManager.vue'
import kPIDataInput from '../views/kpi/kpiDataInputView.vue'
import KPILevel1 from '../views/kpi/Level1View.vue'
import KPILevel2 from '../views/kpi/Level2View.vue'
import KPILevel3 from '../views/kpi/Level3View.vue'
import NotLogin from '../views/NotLoginView.vue'
import Error from '../views/Error.vue'
// import ShopMag from '../views/shop/Shopmagview.vue'
// import ShopSigned from '../views/shop/ShopSignedView.vue'
// import ShopUserList from '../views/shop/ShopUserListView.vue'
// import ShopInputMag from '../views/shop/ShopInputMagView.vue'
// import ShopArgeeMag from '../views/shop/ShopArgeeMagView.vue'
// import Error from '../views/Error.vue'


const routes = [
	{		path: '/',							name: 'Home',		component: Home,	},
	{		path: '/about',						name: 'About',		component: About,	},
	{		path: '/login',						name: 'NoAuthLogin',		component: NoAuthLogin,			},
	{		path: '/join',						name: 'Join',		component: Join,	},
	{		path: '/modifyPassword/:hash',		name: 'NoAuthModifyPassword',		component: NoAuthModifyPassword,	},
	{		path: '/adm/config',		name: 'AdmConfig',		component: AdmConfig,	},	
	{		path: '/adm/worksite',		name: 'AdmWorksite',		component: AdmWorksite,	},
	// 시스템관리 
	{		path: '/adm/BaseCode',		name: 'BaseCode',		component: BaseCode,	},
	{		path: '/adm/systemcode',		name: 'Systemcode',		component: Systemcode,	},
	{		path: '/adm/systemusers',		name: 'Systemusers',		component: Systemusers,	},
	{		path: '/adm/notice',		name: 'Notice',		component: Notice,	},
	// 기준정보
	{		path: '/base/hrbase',		name: 'BasejobHr',		component: BasejobHr,	},	
	{		path: '/base/vend',		name: 'Basejobvend',		component: BasejobVend,	},	
	{		path: '/base/item',		name: 'Basejobitem',		component: BasejobItem,	},
	{		path: '/base/process',		name: 'Basejobprocess',		component: BasejobProcess,	},
	{		path: '/base/prtype',		name: 'Basejobprtype',		component: BasejobPrType,	},
	{		path: '/base/route',		name: 'Basejobroute',		component: BasejobRoute,	},
	{		path: '/sales/estimate',		name: 'Salesestimate',		component: Salesestimate,	},
	{		path: '/sales/estimatelist',		name: 'EstimateList',		component: EstimateList,	},
	{		path: '/sales/orders',		name: 'Salesorders',		component: Salesorders,	},
	{		path: '/sales/orderslist',		name: 'SalesordersList',		component: SalesOrderslist,	},
	// 생산계획/관리
	{		path: '/prod/plan',		name: 'ProdPlanning',		component: ProdPlanning,	},
	{		path: '/prod/workorder',		name: 'ProdWorkorder',		component: ProdWorkorder,	},
	{		path: '/prod/work',		name: 'ProdWork',		component: ProdWork,	},
	{		path: '/prod/workview',		name: 'ProdWorkView',		component: ProdWorkView,	},
	{		path: '/prod/workorderview',		name: 'ProdWorkorderview',		component: ProdWorkorderview,	},
	
	// 출하관리
	{		path: '/shipment/derliver',		name: 'DerliverView',		component: DerliverView,	},
	{		path: '/shipment/derliverlist',		name: 'DerliverViewList',		component: DerliverViewlist,	},
	{		path: '/shipment/invoice',		name: 'InvoiceView',		component: InvoiceView, 	},
	{		path: '/shipment/account',		name: 'AccountView',		component: AccountView,  	},
	{		path: '/shipment/invoicelist',		name: 'InvoiceList',		component: InvoiceList,	},

	// 현황분석
	{		path: '/metrics/derliver',		name: 'Derliverrate',		component: Derliverrate,	},
	{		path: '/metrics/defectrate',		name: 'DefectrateRate',		component: DefectrateRate,	},
	{		path: '/metrics/clientsales',		name: 'Clientsalerate',		component: Clientsalerate,	},
	{		path: '/metrics/periodsales',		name: 'Periodsalerate',		component: Periodsalerate, 	},

	// 모니터링
	{		path: '/monitor/monitor1',		name: 'Monitorview',		component: Monitorview,	},

	// KPI 
	{		path: '/adm/kpimanager',		name: 'kPIManager',		component: kPIManager,	},	
	{		path: '/adm/kpidatainput',		name: 'kPIDataInput',		component: kPIDataInput,	},
	{		path: '/kpi/level1',		name: 'KPILevel1',		component: KPILevel1,	},
	{		path: '/kpi/level2',		name: 'KPILevel2',		component: KPILevel2,	},
	{		path: '/kpi/level3',		name: 'KPILevel3',		component: KPILevel3,	},
	{		path: '*',		name: 'Error',		component: Error,	},
	{		path: '/notlogin',		name: 'NotLogin',		component: NotLogin,	},

	

	//////////////////  스마트공방 신청 (등록) /////////////////////////////////
	{
		path: '/shop/shopmag',
		name: 'ShopMag',
		component: () => import(/* webpackChunkName: "ShopMag" */ '../views/shop/Shopmagview.vue')
	},
	{
		path: '/shop/ShopSigned',
		name: 'ShopSigned',
		component: () => import(/* webpackChunkName: "ShopSigned" */ '../views/shop/ShopSignedView.vue')
	},
	{
		path: '/shop/UserList',
		name: 'ShopUserList',
		component: () => import(/* webpackChunkName: "ShopUserList" */ '../views/shop/ShopUserListView.vue')
	},
	{
		path: '/shop/shopinputmag',
		name: 'ShopInputMag',
		component: () => import(/* webpackChunkName: "ShopInputMag" */ '../views/shop/ShopInputMagView.vue')
	},
	{
		path: '/shop/shopargeemag',
		name: 'ShopArgeeMag',
		component: () => import(/* webpackChunkName: "ShopArgeeMag" */ '../views/shop/ShopArgeeMagView.vue')
	},

	
]

export default routes;