import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules";
import qs from 'qs';
Vue.use(Vuex)


function menuAccess(ref, arr) {
	arr.forEach(el=> {
		ref[el.to] = el.grant;
		if(el.subItems && el.subItems.length) {
			menuAccess(ref, el.subItems);
		}
	})
}

const store = new Vuex.Store({
	state: {
		appReady: false,
		config: {
			menu : [
				{
					title : "Home",
					icon : "mdi-home",
					to : '/',
					grant : 1, 
					newTab : false,
					subItems : []
				},
				{
					title : "관리자",
					icon : "mdi-store",
					to : '',
					com : "FMCREG",
					grant : 5, 
					newTab : false,
					subItems : [
						{
							title : "사용자정보",
							icon : "",
							to : '/shop/userlist',							
							com : "FMCREG",
							grant : 5, 
							newTab : false,
							subItems : []
						},
						{
							title : "사업등록",
							icon : "",
							to : '/shop/shopmag',
							com : "FMCREG",
							grant : 5, 
							newTab : false,
							subItems : []
						},
						{
							title : "사업신청관리",
							icon : "",
							to : '/shop/shopinputmag',							
							com : "FMCREG",
							grant : 5, 
							newTab : false,
							subItems : []
						},
						{
							title : "사업협약서관리",
							icon : "",
							to : '/shop/shopargeemag',							
							com : "FMCREG",
							grant : 5, 
							newTab : false,
							subItems : []
						},		
					]
				},
				{
					title : "스마트공방 사업신청",
					icon : "mdi-store",
					to : '/shop/ShopSigned',
					com : "FMCREG",
					grant : 2, 
					newTab : false,
					subItems : []
				},
				{
					title : "스마트공방 협약신청",
					icon : "mdi-store-plus",
					to : '/shop/agree',
					com : "FMCREG",
					grant : 2, 
					newTab : false,
					subItems : []
				},

				// {
				// 	title : "Home",
				// 	icon : "mdi-home",
				// 	to : '/',					
				// 	grant : 2, 
				// 	newTab : false,
				// 	subItems : []
				// },
				{
					title : "시스템관리",
					icon : "mdi-database-settings",
					to : '',
					com : "FMC",
					grant : 8, 
					newTab : false,
					subItems : [
						{
							title : "공통코드관리",
							icon : "",
							to : '/adm/systemcode',
							com : "FMC",
							grant : 9, 
							newTab : false,
							subItems : []
						},
						{
							title : "사용자관리",
							icon : "",
							to : '/adm/systemusers',
							com : "FMC",
							grant : 9, 
							newTab : false,
							subItems : []
						},
						{
							title : "공지관리",
							icon : "",
							to : '/adm/notice',
							com : "FMC",
							grant : 8, 
							newTab : false,
							subItems : []
						},
					]
				},
				{
					title : "기준정보",
					icon : "mdi-ab-testing",
					to : '',
					com : "FMC",
					grant : 8, 
					newTab : false,
					subItems : [
						{
							title : "사원관리",
							icon : "",
							to : '/base/hrbase',
							com : "FMC",
							grant : 8, 
							newTab : false,
							subItems : []
						},
						{
							title : "거래처관리",
							icon : "",
							to : '/base/vend',
							com : "FMC",
							grant : 8, 
							newTab : false,
							subItems : []
						},
						{
							title : "품목관리",
							icon : "",
							to : '/base/item',
							com : "FMC",
							grant : 8, 
							newTab : false,
							subItems : []
						},
						{
							title : "공정관리",
							icon : "",
							to : '/base/process',
							com : "FMC",
							grant : 8, 
							newTab : false,
							subItems : []
						},
						{
							title : "공정유형관리",
							icon : "",
							to : '/base/prtype',
							com : "FMC",
							grant : 8, 
							newTab : false,
							subItems : []
						},
						{
							title : "라우팅관리",
							icon : "",
							to : '/base/route',
							com : "FMC",
							grant : 8, 
							newTab : false,
							subItems : []
						},
					]
				},
				{
					title : "영업관리",
					icon : "mdi-handshake",
					to : '',
					com : "FMC",
					grant : 7, 
					newTab : false,
					subItems : [
						{
							title : "견적등록",
							icon : "",
							to : '/sales/estimate',
							com : "FMC",
							grant : 7, 
							newTab : false,
							subItems : []
						},
						{
							title : "견적제출현황",
							icon : "",
							to : '/sales/estimatelist',
							com : "FMC",
							grant : 7, 
							newTab : false,
							subItems : []
						},
						{
							title : "수주등록",
							icon : "",
							to : '/sales/orders',
							com : "FMC",
							grant : 7, 
							newTab : false,
							subItems : []
						},
						{
							title : "수주(출하)현황",
							icon : "",
							to : '/sales/orderslist',
							com : "FMC",
							grant : 7, 
							newTab : false,
							subItems : []
						},
					]
				},
				{
					title : "생산계획",
					icon : "mdi-wrench",
					to : '',
					com : "FMC",
					grant : 6, 
					newTab : false,
					subItems : [
						{
							title : "생산계획",
							icon : "",
							to : '/prod/plan',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
						{
							title : "작업지시",
							icon : "",
							to : '/prod/workorder',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},						
					]
				},
				{
					title : "생산관리",
					icon : "mdi-basket-fill",
					to : '',
					com : "FMC",
					grant : 6, 
					newTab : false,
					subItems : [
						{
							title : "생산실적",
							icon : "",
							to : '/prod/work',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
						{
							title : "생산실적조회",
							icon : "",
							to : '/prod/workview',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
						{
							title : "공정진행현황",
							icon : "",
							to : '/prod/workorderview',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
					]
				},
				{
					title : "출하관리",
					icon : "mdi-car-multiple",
					to : '',
					com : "FMC",
					grant : 6, 
					newTab : false,
					subItems : [
						{
							title : "출하등록",
							icon : "",
							to : '/shipment/derliver',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
						{
							title : "출하현황",
							icon : "",
							to : '/shipment/derliverlist',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
						{
							title : "세금계산서등록(거래명세서)",
							icon : "",
							to : '/shipment/invoice',
							com : "FMC",
							grant : 7, 
							newTab : false,
							subItems : []
						},
						{
							title : "대금수금등록",
							icon : "",
							to : '/shipment/account',
							com : "FMC",
							grant : 7, 
							newTab : false,
							subItems : []
						},
						{
							title : "수금현황",
							icon : "",
							to : '/shipment/invoicelist',
							com : "FMC",
							grant : 7, 
							newTab : false,
							subItems : []
						},
					]
				},
				{
					title : "실적분석",
					icon : "mdi-chart-bar-stacked",
					to : '',
					com : "FMC",
					grant : 6, 
					newTab : false,
					subItems : [
						{
							title : "납기내역",
							icon : "",
							to : '/metrics/derliver',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
						{
							title : "불량율 분석",
							icon : "",
							to : '/metrics/defectrate',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
						{
							title : "고객별 매출 분석",
							icon : "",
							to : '/metrics/clientsales',
							com : "FMC",
							grant : 7, 
							newTab : false,
							subItems : []
						},
						{
							title : "기간별 매출 분석",
							icon : "",
							to : '/metrics/periodsales',
							com : "FMC",
							grant : 7, 
							newTab : false,
							subItems : []
						},
					]
				},
				{
					title : "설비모니터링",
					icon : "mdi-monitor",
					to : '/monitor/monitor1',
					com : "FMC",
					grant : 2, 
					newTab : false,
					subItems : []
				},
				{
					title : "KPI",
					icon : "mdi-lan-connect",
					to : '',
					com : "FMC",
					grant : 11, 
					newTab : false,
					subItems : [
						{
							title : "Level 1",
							icon : "",
							to : '/kpi/level1',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
						{
							title : "Level 2",
							icon : "",
							to : '/kpi/level2',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
						{
							title : "Level 3",
							icon : "",
							to : '/kpi/level3',
							com : "FMC",
							grant : 6, 
							newTab : false,
							subItems : []
						},
					]
				}
				
			]
		},
	},
	mutations: {
		SET_APP_READY(state) {
			state.appReady = true;
		},
		SET_CONFIG(state, { key, value }) {
			// console.log(typeof value, key, value);
			try {
				value = JSON.parse(value);
			} catch(e){}
			
			if(state.config[key]){
				state.config[key] = value;
			} else {
				Vue.set(state.config, key, value);
			}
		},
		PUSH_FETCH(state, tag) {
			state.initFetchs.push(tag);
		},
		SET_INITDATA(state, data) {
			if(data == null) {
				this.initFetchs = null;
				this.initData = null;
			} else {
				const keys = Object.keys(data);
				if(state.initData == null) {
					state.initData = {};
				}
				for(const key of keys) {
					state.initData[key] = data[key];
				}
			}
		},
	},
	getters : {
		access(state) {
			const obj = {};
			if(state.config.menu) {
				menuAccess(obj, state.config.menu);
			}
			return obj;
		}
	},
	actions: {
		async appInit({ dispatch, commit }, ctx) {
			if (ctx) {
				const keys = Object.keys(ctx.config);
				for (const key of keys) {					
					commit('SET_CONFIG', { key, value: ctx.config[key] });
				}
				commit('user/SET_MEMBER', ctx.member);
				commit('user/SET_TOKEN', ctx.token);
			} else {
				await dispatch('configLoad');
				await dispatch('user/initUser');
			}
			commit('SET_APP_READY');
		},
		async configDuplicate(ctx, payload) {
			const { $axios } = Vue.prototype;
			const query = qs.stringify(payload);
			const data = await $axios.get(`/api/config/duplicateCheck?${query}`);
			return data;
		},
		async configSave({ commit }, form) {
			const { $axios } = Vue.prototype;
			const data = await $axios.post(`/api/config`, form);
			return data;
		},
		async configLoad({ commit }) {
			const data = await $axios.get('/api/config');
			if (data) {
				const keys = Object.keys(data);
				for (const key of keys) {
					commit('SET_CONFIG', { key, value: data[key] });
				}
			}

		}

	},
	modules,
});

export function createStore() {
	return store;
}

export default store;

