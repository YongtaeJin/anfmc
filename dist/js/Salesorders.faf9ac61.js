(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Salesorders"],{"121b":function(t,e,i){"use strict";var s=function(){var t=this,e=t._self._c;return e("v-text-field",t._b({staticClass:"my-text-field inputNumber text-xs-right no-padding",attrs:{value:t.value,type:"number",maxlength:"3","hide-details":"",dense:"","single-line":"",oninput:"javascript: this.value = this.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '' );"},on:{input:t.onInput}},"v-text-field",t.$attrs,!1))},a=[],n={props:{value:0,maxlength:{type:Number,default:15}},methods:{onInput(t){String(t).length>this.maxlength&&(t=t.slice(0,this.maxlength)),this.$emit("input",t)}}},l=n,r=i("2877"),o=Object(r["a"])(l,s,a,!1,null,null,null);e["a"]=o.exports},"12e3":function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"d",(function(){return n})),i.d(e,"b",(function(){return l}));const s=[{label:"작성",value:"I"},{label:"제출",value:"S"},{label:"확정",value:"A"}],a=[{label:"작성",value:"I"},{label:"등록",value:"S"},{label:"계획",value:"P"},{label:"작업",value:"W"},{label:"출하",value:"D"},{label:"결재",value:"A"}],n=[{label:"수주",value:"1"},{label:"지시",value:"2"},{label:"작업",value:"3"},{label:"완료",value:"4"},{label:"출고",value:"5"},{label:"요청",value:"6"},{label:"입금",value:"7"}],l=[{label:"작성",value:"0"},{label:"확정",value:"1"},{label:"입금",value:"2"},{label:"완료",value:"9"}]},"1c76":function(t,e,i){"use strict";var s=function(){var t=this,e=t._self._c;return e("v-text-field",t._b({staticClass:"my-text-field inputPrice text-xs-right no-padding",attrs:{value:t.value,type:"number",maxlength:"3","hide-details":"",dense:"","single-line":"",oninput:"javascript: this.value = this.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '' );"},on:{input:t.onInput}},"v-text-field",t.$attrs,!1))},a=[],n={props:{value:0,maxlength:{type:Number,default:15}},methods:{onInput(t){String(t).length>this.maxlength&&(t=t.slice(0,this.maxlength)),this.$emit("input",t)}}},l=n,r=i("2877"),o=Object(r["a"])(l,s,a,!1,null,null,null);e["a"]=o.exports},"3bcf":function(t,e,i){"use strict";var s=function(){var t=this,e=t._self._c;return e("v-data-table",{staticClass:"text-no-wrap",attrs:{headers:t.headers,items:t.items,height:"270px","max-height":"350px","item-key":"c_item","single-select":""},on:{"click:row":t.rowSelect,"dblclick:row":t.itemSelect}})},a=[],n=i("414b"),l={components:{TooltipBtn:n["a"]},name:"ItemPop",props:{},data(){return{headers:[{text:"품번",value:"c_item",sortable:!1,align:"center"},{text:"품명",value:"n_item",sortable:!1},{text:"사양",value:"t_size",sortable:!1},{text:"단위",value:"n_unit",sortable:!1,align:"center"},{text:"제품타입",value:"n_type",sortable:!1}],items:[]}},created(){this.init()},watch:{},computed:{},methods:{async init(){this.items=await this.$axios.get("/api/basejob/getItemList")},rowSelect:function(t,e){e.select(!0)},async itemSelect(t,{item:e}){this.$emit("onSelect",e)}}},r=l,o=i("2877"),d=Object(o["a"])(r,s,a,!1,null,null,null);e["a"]=d.exports},"414b":function(t,e,i){"use strict";var s=function(){var t=this,e=t._self._c;return e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:s}){return[e("v-btn",t._g(t._b({class:t.childClass,on:{click:function(e){return t.$emit("click")}}},"v-btn",{...s,...t.$attrs},!1),i),[t._t("default")],2)]}}],null,!0)},[e("span",[t._v(t._s(t.label))])])},a=[],n={name:"TooltipBtn",props:{label:{type:String,required:!0},childClass:[String,Object]}},l=n,r=i("2877"),o=Object(r["a"])(l,s,a,!1,null,null,null);e["a"]=o.exports},"6b39":function(t,e,i){"use strict";var s=function(){var t=this,e=t._self._c;return e("v-dialog",{attrs:{persistent:"","max-width":"290"},scopedSlots:t._u([{key:"activator",fn:function({attrs:i}){return[e("v-text-field",t._b({staticClass:"my-text-field my-text-field",attrs:{dense:"","hide-details":"",value:t.value,readonly:t.readonly},on:{input:t.onInput},scopedSlots:t._u([t.readonly?null:{key:"append",fn:function(){return[e("v-btn",{attrs:{icon:"",small:"",tabindex:"-1"},on:{click:t.open}},[e("v-icon",[t._v("mdi-calendar-today")])],1)]},proxy:!0}],null,!0)},"v-text-field",{...t.$attrs,...i},!1))]}}]),model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.$attrs.label))]),e("v-spacer"),e("v-btn",{attrs:{icon:"",plain:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-date-picker",{attrs:{"no-title":"","day-format":t.dayFormat},on:{input:t.picker},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1)},a=[],n={name:"InputDate2",model:{prop:"value",event:"input"},props:{value:String,readonly:Boolean},data(){return{modal:!1,date:""}},methods:{onInput(t){this.$emit("input",t)},open(){const t=/^\d{4}-\d{2}-\d{2}$/;this.date=t.test(this.value)?this.value:this.date,this.modal=!0},close(){this.modal=!1,this.modal2=!1},picker(){this.onInput(this.date),this.close()},dayFormat(t){if(!this.modal)return;const e=t.split("-");return Number(e[e.length-1])}}},l=n,r=i("2877"),o=Object(r["a"])(l,s,a,!1,null,null,null);e["a"]=o.exports},"7f85":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t._self._c;return e("v-container",{attrs:{fluid:""}},[e("v-toolbar",{attrs:{height:"40px","background-color":"primary",dark:""}},[e("v-toolbar-title",[t._v("수주 관리")]),e("v-spacer"),e("tooltip-btn",{attrs:{label:"수주 조회"},on:{click:t.viewOrd}},[e("v-icon",[t._v("mdi-magnify")])],1),e("tooltip-btn",{attrs:{label:"수주 작성"},on:{click:t.addOrd}},[e("v-icon",[t._v("mdi-plus")])],1),e("tooltip-btn",{attrs:{label:"수주 삭제"},on:{click:t.delOrd}},[e("v-icon",[t._v("mdi-minus")])],1),e("tooltip-btn",{attrs:{label:"수주 저장"},on:{click:t.saveOrd}},[e("v-icon",[t._v("mdi-content-save-outline")])],1)],1),e("v-card",{staticClass:"my-card"},[e("v-row",{staticClass:"my-text-field",attrs:{"no-gutters":""}},[e("v-col",{attrs:{col:"12",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-blue no-padding",attrs:{value:"수주기간",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"12",sm:"2",md:"2"}},[e("input-date-3",{model:{value:t.form.sDate1,callback:function(e){t.$set(t.form,"sDate1",e)},expression:"form.sDate1"}})],1),e("v-col",{attrs:{col:"12",sm:"2",md:"2"}},[e("input-date-3",{model:{value:t.form.sDate2,callback:function(e){t.$set(t.form,"sDate2",e)},expression:"form.sDate2"}})],1),e("v-col",{attrs:{col:"12",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-blue no-padding",attrs:{value:"고객사",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"12",sm:"3",md:"3"}},[e("v-text-field",{staticClass:"text-input-blue no-padding",attrs:{dense:"","hide-details":""},model:{value:t.form.sVend,callback:function(e){t.$set(t.form,"sVend",e)},expression:"form.sVend"}})],1),e("v-col",{attrs:{col:"12",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-blue no-padding",attrs:{value:"수주번호",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"12",sm:"2",md:"2"}},[e("v-text-field",{staticClass:"text-input-blue no-padding",attrs:{dense:"","hide-details":""},model:{value:t.form.sOrder,callback:function(e){t.$set(t.form,"sOrder",e)},expression:"form.sOrder"}})],1)],1),e("v-row")],1),e("v-row",[e("v-col",{attrs:{col:"12",sm:"4",md:"4"}},[e("v-data-table",{ref:"table",staticClass:"elevation-1 text-no-wrap",attrs:{headers:t.masterHead,items:t.masters,"item-key":"i_order","single-select":"","items-per-page":-1,"hide-default-footer":"","footer-props":{"items-per-page-options":[10,20,30,40,50,100,-1]},height:t.iframeHeight},on:{"click:row":t.rowSelectMaster},scopedSlots:t._u([{key:"item.a_orderamt",fn:function({item:i}){return[e("div",{staticClass:"right2-align"},[t._v(t._s(t.comma(i.a_orderamt)))])]}}],null,!0),model:{value:t.selectedM,callback:function(e){t.selectedM=e},expression:"selectedM"}})],1),e("v-col",{attrs:{col:"12",sm:"8",md:"8"}},[e("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.save.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e("v-card",{attrs:{color:"grey lighten-4"}},[e("v-row",{staticClass:"my-text-field",attrs:{"no-gutters":""}},[e("v-col",{attrs:{col:"8",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-redbrg no-padding",attrs:{value:"수주번호",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"8",sm:"3",md:"3"}},[e("v-text-field",{staticClass:"no-padding",attrs:{readonly:!t.edit,dense:"","hide-details":""},on:{input:t.onChangeOrdno},model:{value:t.masterinfo.i_orderno,callback:function(e){t.$set(t.masterinfo,"i_orderno",e)},expression:"masterinfo.i_orderno"}})],1),e("v-col",{attrs:{col:"8",sm:"2",md:"2"}}),e("v-col",{attrs:{col:"8",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-bluebrg",attrs:{value:"수주상태",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"8",sm:"2",md:"2"}},[e("v-text-field",{staticClass:"text-input-redbrg inputPrice",attrs:{value:t.getOrderStatus(t.masterinfo.f_status),readonly:"",dense:"","hide-details":""}})],1)],1),e("v-row",{staticClass:"my-text-field",attrs:{"no-gutters":""}},[e("v-col",{attrs:{col:"8",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-bluebrg no-padding",attrs:{value:"수 주 명",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"8",sm:"5",md:"5"}},[e("v-text-field",{staticClass:"no-padding",attrs:{readonly:!t.edit,dense:"","hide-details":""},on:{input:t.onChangeMaster},model:{value:t.masterinfo.n_order,callback:function(e){t.$set(t.masterinfo,"n_order",e)},expression:"masterinfo.n_order"}})],1)],1),e("v-row",{staticClass:"my-text-field",attrs:{"no-gutters":""}},[e("v-col",{attrs:{col:"8",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-bluebrg no-padding",attrs:{value:"고객사",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"8",sm:"5",md:"5"}},[t.edit?e("v-text-field",{staticClass:"no-padding",attrs:{readonly:"",dense:"","hide-details":""},scopedSlots:t._u([{key:"append",fn:function(){return[e("v-btn",{attrs:{icon:"","x-small":"",tabindex:"-1"},on:{click:t.clickVend}},[e("v-icon",[t._v(" mdi-dialpad ")])],1)]},proxy:!0}],null,!1,3037295663),model:{value:t.masterinfo.n_vend,callback:function(e){t.$set(t.masterinfo,"n_vend",e)},expression:"masterinfo.n_vend"}}):e("v-text-field",{staticClass:"no-padding",attrs:{readonly:"",dense:"","hide-details":""},on:{input:t.onChangeMaster},model:{value:t.masterinfo.n_vend,callback:function(e){t.$set(t.masterinfo,"n_vend",e)},expression:"masterinfo.n_vend"}})],1),e("v-col",{attrs:{col:"8",sm:"1",md:"1"}})],1),e("v-row",{staticClass:"my-text-field",attrs:{"no-gutters":""}},[e("v-col",{attrs:{col:"8",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-bluebrg no-padding",attrs:{value:"수주일",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"8",sm:"2",md:"2"}},[e("input-date-3",{attrs:{readonly:!t.edit,rules:t.rules.date({required:!1})},on:{input:t.onChangeMaster},model:{value:t.masterinfo.s_date,callback:function(e){t.$set(t.masterinfo,"s_date",e)},expression:"masterinfo.s_date"}})],1),e("v-col",{attrs:{col:"8",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-bluebrg no-padding",attrs:{value:"납기일",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"8",sm:"2",md:"2"}},[e("input-date-3",{attrs:{rules:t.rules.date({required:!1})},on:{input:t.onChangeMasterDate},model:{value:t.masterinfo.s_date2,callback:function(e){t.$set(t.masterinfo,"s_date2",e)},expression:"masterinfo.s_date2"}})],1),e("v-col",{attrs:{col:"8",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-redbrg no-padding",attrs:{value:"수주금액",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"8",sm:"2",md:"2"}},[e("v-text-field",{staticClass:"text-input-redbrg inputPrice no-padding",attrs:{value:t.comma(t.masterinfo.a_orderamt)+"원",readonly:"",dense:"","hide-details":""}})],1)],1),e("v-row",{staticClass:"my-text-field",attrs:{"no-gutters":""}},[e("v-col",{attrs:{col:"8",sm:"1",md:"1"}},[e("v-text-field",{staticClass:"text-input-bluebrg no-padding",attrs:{value:"메모",readonly:"",dense:"","hide-details":""}})],1),e("v-col",{attrs:{col:"12",sm:"8",md:"8"}},[e("v-text-field",{staticClass:"no-padding",attrs:{readonly:!t.edit,dense:"","hide-details":""},on:{input:t.onChangeMaster},model:{value:t.masterinfo.t_remark,callback:function(e){t.$set(t.masterinfo,"t_remark",e)},expression:"masterinfo.t_remark"}})],1)],1),e("v-row",{staticClass:"my-text-fieldend",attrs:{"no-gutters":""}})],1)],1),e("v-toolbar",{attrs:{height:"35px",color:"accent"}},[e("v-toolbar-title",[t._v("수주 품목 List")]),e("v-spacer"),e("tooltip-btn",{attrs:{label:"추가",fab:"","x-small":""},on:{click:t.addItem}},[e("v-icon",[t._v("mdi-plus")])],1),e("tooltip-btn",{attrs:{label:"삭제",fab:"","x-small":""},on:{click:t.delItem}},[e("v-icon",[t._v("mdi-minus")])],1)],1),e("v-data-table",{staticClass:"elevation-1 text-no-wrap no-padding",attrs:{headers:t.itemHead,items:t.itemListFilter,"item-key":"i_orderser","single-select":"","items-per-page":-1,"hide-default-footer":"","footer-props":{"items-per-page-options":[10,20,30,40,50,100,-1]},"item-class":t.row_classes,height:t.iframeHeight-180},on:{"click:row":t.rowSelectDetail},scopedSlots:t._u([{key:"item.s_sort",fn:function({item:i}){return[t.edit&&i.i_orderser===t.itemInfo.i_orderser?e("input-number",{attrs:{maxlength:2},on:{input:t.onChangeDetail},model:{value:i.s_sort,callback:function(e){t.$set(i,"s_sort",e)},expression:"item.s_sort"}}):e("span",[t._v(t._s(i.s_sort))])]}},{key:"item.n_item",fn:function({item:i}){return[t.edit&&i.i_orderser===t.itemInfo.i_orderser?e("v-text-field",{staticClass:"my-text-field",attrs:{"hide-details":"",dense:"","single-line":"",readonly:""},scopedSlots:t._u([{key:"append",fn:function(){return[e("v-btn",{attrs:{icon:"","x-small":"",tabindex:"-1"},on:{click:t.clickItem}},[e("v-icon",[t._v(" mdi-dialpad ")])],1)]},proxy:!0}],null,!0),model:{value:i.n_item,callback:function(e){t.$set(i,"n_item",e)},expression:"item.n_item"}}):e("span",[t._v(t._s(i.n_item))])]}},{key:"item.m_cnt",fn:function({item:i}){return[t.edit&&i.i_orderser===t.itemInfo.i_orderser?e("input-amt",{on:{input:t.onChangeAmt},model:{value:i.m_cnt,callback:function(e){t.$set(i,"m_cnt",e)},expression:"item.m_cnt"}}):e("span",[t._v(t._s(t.comma(i.m_cnt)))])]}},{key:"item.a_unit",fn:function({item:i}){return[t.edit&&i.i_orderser===t.itemInfo.i_orderser?e("input-amt",{on:{input:t.onChangeAmt},model:{value:i.a_unit,callback:function(e){t.$set(i,"a_unit",e)},expression:"item.a_unit"}}):e("span",[e("div",{staticClass:"right2-align"},[t._v(t._s(t.comma(i.a_unit)))])])]}},{key:"item.a_amt",fn:function({item:i}){return[t.edit&&i.i_orderser===t.itemInfo.i_orderser?e("input-amt",{on:{input:t.onChangeAmt2},model:{value:i.a_amt,callback:function(e){t.$set(i,"a_amt",e)},expression:"item.a_amt"}}):e("span",[e("div",{staticClass:"right2-align"},[t._v(t._s(t.comma(i.a_amt)))])])]}},{key:"item.s_duedate",fn:function({item:i}){return[t.edit&&i.i_orderser===t.itemInfo.i_orderser?e("input-date-2",{attrs:{rules:t.rules.date({required:!1})},on:{input:t.onChangeDetail},model:{value:i.s_duedate,callback:function(e){t.$set(i,"s_duedate",e)},expression:"item.s_duedate"}}):e("span",[t._v(t._s(i.s_duedate))])]}},{key:"item.t_remark",fn:function({item:i}){return[t.edit&&i.i_orderser===t.itemInfo.i_orderser?e("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:t.onChangeDetail},model:{value:i.t_remark,callback:function(e){t.$set(i,"t_remark",e)},expression:"item.t_remark"}}):e("span",[e("div",{staticClass:"left-align"},[t._v(t._s(i.t_remark))])])]}}],null,!0),model:{value:t.selectedD,callback:function(e){t.selectedD=e},expression:"selectedD"}})],1)],1),e("ez-dialog",{ref:"dialog_Vend",attrs:{label:"거래처",persistent:"",width:"460px"},on:{onClose:t.close_item}},[e("vend-pop",{on:{onSelect:t.selectVend}})],1),e("ez-dialog",{ref:"dialog_Item",attrs:{label:"항목/품목",persistent:"",width:"460px"},on:{onClose:t.close_item}},[e("item-pop",{on:{onSelect:t.selectItem}})],1),e("ez-dialog",{ref:"dialog_Insert",attrs:{label:"견적서 추가",obtn:"미견적작성",persistent:"",width:"500px"},on:{onClose:t.close_item,btnClick:t.newAdd2}},[e("sales-notestimate",{attrs:{data:t.est},on:{onEnter:t.newAdd1}})],1)],1)},a=[],n=(i("14d9"),i("4328"),i("2f62")),l=i("a2e4"),r=i("414b"),o=i("f3db"),d=i("6b39"),c=i("1c76"),m=i("121b"),u=i("64f2"),_=i("12e3"),h=i("248f"),f=i.n(h),p=i("3bcf"),v=i("c477"),b=function(){var t=this,e=t._self._c;return e("div",[e("v-data-table",{staticClass:"elevation-1 text-no-wrap",attrs:{headers:t.Head,items:t.data,"item-key":"i_ser","single-select":"",height:"200px","max-height":"200px"},on:{"click:row":t.rowSelect,"dblclick:row":t.enterSelect}})],1)},x=[],g={name:"SalesNotestimate",props:{data:{type:Array,default:null}},data(){return{Head:[{text:"견적번호",value:"i_estno",sortable:!1,align:"center",width:"70px"},{text:"고객사",value:"n_vend",sortable:!1,align:"left",width:"100px"},{text:"견적명",value:"n_estnm",sortable:!1,align:"left",width:"250px"},{text:"견적금액",value:"a_estamt",sortable:!1,align:"right",width:"65px"},{text:"납기예정일",value:"s_date3",sortable:!1,align:"center",width:"65px"}],selectest:[]}},methods:{rowSelect:function(t,e){e.select(!0),this.selectest=t},async enterSelect(t,{item:e}){this.selectest=e,this.$emit("onEnter",this.selectest)}}},y=g,k=i("2877"),w=Object(k["a"])(y,b,x,!1,null,null,null),C=w.exports,I={components:{TooltipBtn:r["a"],EzDialog:l["a"],InputDate2:o["a"],InputDate3:d["a"],InputAmt:c["a"],InputNumber:m["a"],ItemPop:p["a"],VendPop:v["a"],SalesNotestimate:C},name:"Salesorders",mounted(){window.addEventListener("resize",this.adjustIframeHeight),this.adjustIframeHeight(),this.init()},beforeDestroy(){window.removeEventListener("resize",this.adjustIframeHeight)},data(){return{valid:!0,ORDER001:_["c"],iframeHeight:500,masterHead:[{text:"수주일",value:"s_date",sortable:!1,align:"center",width:"65px"},{text:"수주번호",value:"i_orderno",sortable:!1,align:"center",width:"70px"},{text:"고객사",value:"n_vend",sortable:!1,align:"center",width:"100px"},{text:"수주금액",value:"a_orderamt",sortable:!1,align:"center",width:"65px"}],masters:[],masterinfo:[],selectedM:[],itemHead:[{text:"No",value:"s_sort",sortable:!1,align:"center",width:"35px"},{text:"항목(품목)",value:"n_item",sortable:!1,align:"center",width:"130px"},{text:"규격(사양)",value:"t_size",sortable:!1,align:"center",width:"100px"},{text:"단위",value:"i_unit",sortable:!1,align:"center",width:"90px"},{text:"수량",value:"m_cnt",sortable:!1,align:"center",width:"60px"},{text:"단가",value:"a_unit",sortable:!1,align:"center",width:"90px"},{text:"금액",value:"a_amt",sortable:!1,align:"center",width:"90px"},{text:"납기일",value:"s_duedate",sortable:!1,align:"center",width:"90px"},{text:"비고",value:"t_remark",sortable:!1,align:"center",width:"90px"}],itemLists:[],itemInfo:[],itemListFilter:[],selectedD:[],form:{sDate1:"",sDate2:"",sOrder:"",sVend:""},estlist:[],est:[]}},watch:{},computed:{rules:()=>f.a,getMaxNo(){const t=Math.max(...this.itemListFilter.map(t=>t.s_sort));return isFinite(t)?t:0},edit(){return"I"==this.masterinfo.f_status||"S"==this.masterinfo.f_status},editDetail(){return!!this.edit&&void 0!=this.itemInfo.i_orderser},editJob(){return"1"==this.masterinfo.f_edit||(this.itemLists.forEach(t=>{if("1"==t.f_edit||"2"==t.f_edit)return!0}),!1)}},methods:{...Object(n["b"])("sales",["iuSaleOrder"]),comma(t){return null!==t&&void 0!==t?String(Math.trunc(t)).replace(/\B(?=(\d{3})+(?!\d))/g,","):String(0).replace(/\B(?=(\d{3})+(?!\d))/g,",")},adjustIframeHeight(){const t=window.innerHeight;this.iframeHeight=t-200},row_classes(t){if("2"==t.f_edit)return"orange"},getOrderStatus(t){const e=this.ORDER001.find(e=>e.value===t);return e?e.label:""},async init(){this.form.sDate1=Object(u["getDate"])(-100,1),this.viewOrd()},async viewOrd(){this.selectedM=[],this.selectedD=[],this.masterinfo=[],this.itemInfo=[],this.itemListFilter=[],this.itemInfo&&this.itemInfo.splice(0),this.masters&&this.masters.splice(0),this.masters=await this.$axios.post("/api/sales/getSaleOrder",this.form),this.masters.length>0&&(this.itemLists=await this.$axios.post("/api/sales/getSaleOrderLi",this.form))},async addOrd(){this.editJob||(this.estlist=await this.$axios.post("/api/sales/getSaleNotInsertOrder"),this.est=Array.from(new Set(this.estlist.map(t=>JSON.stringify({i_ser:t.i_ser,i_estno:t.i_estno,n_vend:t.n_vend,n_estnm:t.n_estnm,a_estamt:t.a_estamt,s_date:t.s_date,s_date3:t.s_date3}))),JSON.parse),this.$refs.dialog_Insert.open())},async newAdd1(t){if(this.$refs.dialog_Insert.close(),!t)return void this.newAdd2();const e=this.estlist.filter(e=>e.i_ser===t.i_ser),i=Date.now();let s=0;e.forEach((t,e)=>{const a={};if(a.i_order=i,a.i_orderser=t.i_serno,a.c_com=t.c_com,a.s_sort=e+1,a.i_orderno="",a.c_item=t.c_item,a.n_item=t.n_item,a.t_size=t.t_size,a.i_unit=t.i_unit,a.i_type=t.i_type,a.m_cnt=t.m_cnt,a.a_unit=t.a_unit,a.a_amt=t.a_amt,a.s_duedate=t.s_duedate,a.i_estno=t.i_ser,a.i_sernoser=t.i_serno,a.f_work="1",a.f_edit="1",a.f_editold="1",this.itemLists.push(a),0==e){const e={};e.i_order=i,e.c_com=t.c_com,e.i_orderno="",e.s_date=Object(u["getDate"])(),e.f_use="Y",e.f_order="O",e.f_status="I",e.c_vend=t.c_vend,e.n_order=t.n_estnm,e.a_orderamt=t.a_estamt,e.i_estno=t.i_ser,e.n_magname="",e.s_date2="",e.t_remark="",e.n_vend=t.n_vend,e.n_compnay=t.n_compnay,e.n_ceo=t.n_ceo,e.i_company=t.i_company,e.t_job1=t.t_job1,e.t_job2=t.t_job2,e.t_tel=t.t_tel,e.t_fax=t.t_fax,e.e_mail=t.e_mail,e.t_addr=t.t_addr,e.f_edit="1",e.f_editold="1",s=this.masters.push(e)}});const a=this.$refs.table;if(a){const t=this.masters[s-1];a.$emit("click:row",t)}},async newAdd2(){const t=Date.now();let e=0;const i={};i.i_order=t,i.c_com=this.$store.state.user.member.c_com,i.i_orderno="",i.s_date=Object(u["getDate"])(),i.f_use="Y",i.f_order="O",i.f_status="I",i.f_edit="1",i.f_editold="1",e=this.masters.push(i);const s=this.$refs.table;if(s&&e){const t=this.masters[e-1];s.$emit("click:row",t)}},async delOrd(){if(!this.edit)return void await this.$ezNotify.alert("작성, 등록 상태만 삭제 가능 합니다.","삭제불가",{icon:"mdi-message-bulleted-off",width:250});if("1"!=this.masterinfo.f_editold){const t=await this.$ezNotify.confirm("삭제 하시겠습니까 ?","삭제",{icon:"mdi-message-bulleted-off",width:350});if(!t)return;await this.$axios.delete(`/api/sales/delSaleOrder/${this.masterinfo.c_com}/${this.masterinfo.i_order}`)}this.itemInfo=[];const t=this.masters.indexOf(this.masterinfo);t>=0&&this.masters.splice(t,1),this.masterinfo=[],this.itemListFilter=[],this.$toast.info("삭제 하였습니다.")},async saveOrd(){if(null==this.masterinfo.i_orderno||this.masterinfo.i_orderno.length<1)return void this.$toast.error("수주번호 입력 필수 입니다.");const t=Object.assign({},this.masterinfo,this.itemListFilter),e=await this.iuSaleOrder(t);for(let i=this.itemListFilter.length-1;i>=0;i--)"2"==this.itemListFilter[i].f_edit&&this.itemListFilter.splice(i,1);if(0==e)this.itemListFilter.forEach(t=>{t.f_edit="0",t.f_editold="0"}),this.masterinfo.f_edit="0",this.masterinfo.f_editold="0","I"==this.masterinfo.f_status&&(this.masterinfo.f_status="S"),this.$toast.info("저장 하였습니다.");else{e>0&&(this.masterinfo.f_edit="0",this.masterinfo.f_editold="0");for(let t=0;t<e-1;t++)this.itemListFilter[t].f_edit="0",this.itemListFilter[t].f_editold="0";await this.$ezNotify.alert("저장 중 오류가 발생 하였습니다...","오류",{icon:"mdi-message-bulleted"})}},rowSelectMaster:function(t,e){this.editJob||(this.masterinfo=t,this.rowFilter(t),e?e.select(!0):this.selectedM=[t])},rowFilter(t){this.itemLists.length>0?this.itemListFilter=this.itemLists.filter(e=>e.i_order==t.i_order&&e.c_com==t.c_com):this.itemListFilter=[]},clickVend(){this.$refs.dialog_Vend.open()},close_item(){},selectVend(t){const e=this.masters.indexOf(this.masterinfo);e>=0&&(this.masters[e].c_vend=t.c_vend,this.masters[e].n_vend=t.n_vend,this.masters[e].n_compnay=t.n_compnay,this.masters[e].n_ceo=t.n_ceo,this.masters[e].i_company=t.i_company,this.masters[e].t_job1=t.t_job1,this.masters[e].t_job2=t.t_job2,this.masters[e].t_tel=t.t_tel,this.masters[e].t_fax=t.t_fax,this.masters[e].e_mail=t.e_mail,this.masters[e].t_addr=t.t_addr,this.onChangeMaster()),this.$refs.dialog_Vend.close()},onChangeMaster(){const t=this.masters.indexOf(this.masterinfo);t>-1&&(this.masters[t].f_edit="1")},onChangeMasterDate(){const t=this.masters.indexOf(this.masterinfo);t>-1&&(this.masters[t].f_edit="1"),this.itemListFilter.forEach(t=>{(t.s_duedate<this.masterinfo.s_date2||null==t.s_duedate)&&(t.s_duedate=this.masterinfo.s_date2,t.f_edit="1")})},onChangeOrdno(){const t=this.masters.indexOf(this.masterinfo);t>-1&&(this.masters[t].f_edit="1"),this.itemListFilter.forEach(t=>{t.i_orderno=this.masterinfo.i_orderno,t.f_edit="1"})},rowSelectDetail:function(t,e){e.select(!0),this.itemInfo=t},async addItem(){this.edit&&(this.selectedD=[],this.itemInfo=[],this.$refs.dialog_Item.open())},async delItem(){if(!this.editDetail)return;const t=this.itemLists.indexOf(this.itemInfo);if(t>-1)if("0"==this.itemLists[t].f_editold)this.itemLists[t].f_edit="2"===this.itemInfo.f_edit?"0":"2";else{this.itemLists.splice(t,1);const e=this.itemListFilter.indexOf(this.itemInfo);e>-1&&this.itemListFilter.splice(e,1)}this.onChangeAmt2()},clickItem(){this.$refs.dialog_Item.open()},selectItem(t){this.itemLists.indexOf(this.itemInfo);const e=this.itemListFilter.indexOf(this.itemInfo);if(e>=0)this.itemListFilter[e].c_item=t.c_item,this.itemListFilter[e].n_item=t.n_item,this.itemListFilter[e].t_size=t.t_size,this.itemListFilter[e].i_unit=t.i_unit,this.itemListFilter[e].a_unit=t.a_sell,this.itemListFilter[e].a_amt=this.itemListFilter[e].m_cnt*t.a_sell;else{const e={};e.c_com=this.masterinfo.c_com,e.i_order=this.masterinfo.i_order,e.i_orderser=Date.now(),e.s_sort=this.getMaxNo+1,e.i_orderno=this.masterinfo.i_orderno,e.c_item=t.c_item,e.n_item=t.n_item,e.t_size=t.t_size,e.i_unit=t.i_unit,e.i_type=t.i_type,e.m_cnt=1,e.a_unit=t.a_sell,e.a_amt=t.a_sell,e.s_duedate=this.masterinfo.s_date3,e.f_work="1",e.f_edit="1",e.f_editold="1",this.itemListFilter.push(e),this.itemLists.push(e),this.selectedD.push(e)}this.onChangeAmt(),this.$refs.dialog_Item.close()},onChangeDetail(){const t=this.itemLists.indexOf(this.itemInfo);t>-1&&"0"==this.itemInfo.f_edit&&(this.itemLists[t].f_edit="1")},onChangeAmt(){this.onChangeDetail();const t=this.itemLists.indexOf(this.itemInfo);t>-1&&(this.itemLists[t].a_amt=this.itemLists[t].a_unit*this.itemLists[t].m_cnt);let e=0;this.itemListFilter.forEach(t=>{"2"!==t.f_edit&&(e+=1*t.a_amt)}),this.masterinfo.a_orderamt=e,this.masterinfo.f_edit="1"},onChangeAmt2(){this.onChangeDetail();let t=0;this.itemListFilter.forEach(e=>{"2"!==e.f_edit&&(t+=1*e.a_amt)}),this.masterinfo.a_orderamt=t,this.masterinfo.f_edit="1"}}},$=I,S=Object(k["a"])($,s,a,!1,null,null,null);e["default"]=S.exports},a2e4:function(t,e,i){"use strict";var s=function(){var t=this,e=t._self._c;return e("v-dialog",t._b({model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},"v-dialog",t.$attrs,!1),[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.label))]),e("v-spacer"),t.obtn?e("v-btn",{attrs:{color:"primary",small:""},on:{click:t.btnClick}},[t._v(" "+t._s(t.obtn)+" ")]):t._e(),e("v-btn",{attrs:{icon:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-card-text",[t._t("default")],2)],1)],1)},a=[],n={name:"ezDialog",props:{label:{type:String,required:!0},obtn:{type:String}},data(){return{dialog:!1}},methods:{close(){this.dialog=!1,this.$emit("onClose")},open(){this.$emit("onOpen"),this.dialog=!0},btnClick(){this.dialog=!1,this.$emit("btnClick")}}},l=n,r=i("2877"),o=Object(r["a"])(l,s,a,!1,null,null,null);e["a"]=o.exports},c477:function(t,e,i){"use strict";var s=function(){var t=this,e=t._self._c;return e("v-data-table",{staticClass:"text-no-wrap",attrs:{headers:t.headers,items:t.items,height:"270px","max-height":"350px","item-key":"c_vend","single-select":""},on:{"click:row":t.rowSelect,"dblclick:row":t.itemSelect}})},a=[],n=i("414b"),l={components:{TooltipBtn:n["a"]},name:"VendPop",props:{},data(){return{headers:[{text:"약칭",value:"n_vend",sortable:!1,align:"center",width:"70px"},{text:"명칭",value:"n_compnay",sortable:!1},{text:"비고",value:"t_remark",sortable:!1}],items:[]}},created(){this.init()},watch:{},computed:{},methods:{async init(){this.items=await this.$axios.get("/api/basejob/getVendList")},rowSelect:function(t,e){e.select(!0)},async itemSelect(t,{item:e}){this.$emit("onSelect",e)}}},r=l,o=i("2877"),d=Object(o["a"])(r,s,a,!1,null,null,null);e["a"]=d.exports},f3db:function(t,e,i){"use strict";var s=function(){var t=this,e=t._self._c;return e("v-dialog",{attrs:{persistent:"","max-width":"290"},scopedSlots:t._u([{key:"activator",fn:function({attrs:i}){return[e("v-text-field",t._b({staticClass:"my-text-table my-text-field",attrs:{dense:"","hide-details":"",value:t.value,readonly:t.readonly},on:{input:t.onInput},scopedSlots:t._u([t.readonly?null:{key:"append",fn:function(){return[e("v-btn",{attrs:{icon:"",small:"",tabindex:"-1"},on:{click:t.open}},[e("v-icon",[t._v("mdi-calendar-today")])],1)]},proxy:!0}],null,!0)},"v-text-field",{...t.$attrs,...i},!1))]}}]),model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.$attrs.label))]),e("v-spacer"),e("v-btn",{attrs:{icon:"",plain:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-date-picker",{attrs:{"no-title":"","day-format":t.dayFormat},on:{input:t.picker},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1)},a=[],n={name:"InputDate2",model:{prop:"value",event:"input"},props:{value:String,readonly:Boolean},data(){return{modal:!1,date:""}},methods:{onInput(t){this.$emit("input",t)},open(){const t=/^\d{4}-\d{2}-\d{2}$/;this.date=t.test(this.value)?this.value:this.date,this.modal=!0},close(){this.modal=!1,this.modal2=!1},picker(){this.onInput(this.date),this.close()},dayFormat(t){if(!this.modal)return;const e=t.split("-");return Number(e[e.length-1])}}},l=n,r=i("2877"),o=Object(r["a"])(l,s,a,!1,null,null,null);e["a"]=o.exports}}]);
//# sourceMappingURL=Salesorders.faf9ac61.js.map