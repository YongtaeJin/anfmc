(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ProdPlanning"],{"12e3":function(t,e,a){"use strict";a.d(e,"a",(function(){return l})),a.d(e,"c",(function(){return n})),a.d(e,"d",(function(){return s})),a.d(e,"b",(function(){return i}));const l=[{label:"작성",value:"I"},{label:"제출",value:"S"},{label:"확정",value:"A"}],n=[{label:"작성",value:"I"},{label:"등록",value:"S"},{label:"계획",value:"P"},{label:"작업",value:"W"},{label:"출하",value:"D"},{label:"결재",value:"A"}],s=[{label:"수주",value:"1"},{label:"지시",value:"2"},{label:"작업",value:"3"},{label:"완료",value:"4"},{label:"출고",value:"5"},{label:"요청",value:"6"},{label:"입금",value:"7"}],i=[{label:"작성",value:"0"},{label:"확정",value:"1"},{label:"입금",value:"2"},{label:"완료",value:"9"}]},"414b":function(t,e,a){"use strict";var l=function(){var t=this,e=t._self._c;return e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:l}){return[e("v-btn",t._g(t._b({class:t.childClass,on:{click:function(e){return t.$emit("click")}}},"v-btn",{...l,...t.$attrs},!1),a),[t._t("default")],2)]}}],null,!0)},[e("span",[t._v(t._s(t.label))])])},n=[],s={name:"TooltipBtn",props:{label:{type:String,required:!0},childClass:[String,Object]}},i=s,o=a("2877"),r=Object(o["a"])(i,l,n,!1,null,null,null);e["a"]=r.exports},"6b39":function(t,e,a){"use strict";var l=function(){var t=this,e=t._self._c;return e("v-dialog",{attrs:{persistent:"","max-width":"290"},scopedSlots:t._u([{key:"activator",fn:function({attrs:a}){return[e("v-text-field",t._b({staticClass:"my-text-field my-text-field",attrs:{dense:"","hide-details":"",value:t.value,readonly:t.readonly},on:{input:t.onInput},scopedSlots:t._u([t.readonly?null:{key:"append",fn:function(){return[e("v-btn",{attrs:{icon:"",small:"",tabindex:"-1"},on:{click:t.open}},[e("v-icon",[t._v("mdi-calendar-today")])],1)]},proxy:!0}],null,!0)},"v-text-field",{...t.$attrs,...a},!1))]}}]),model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.$attrs.label))]),e("v-spacer"),e("v-btn",{attrs:{icon:"",plain:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-date-picker",{attrs:{"no-title":"","day-format":t.dayFormat},on:{input:t.picker},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1)},n=[],s={name:"InputDate2",model:{prop:"value",event:"input"},props:{value:String,readonly:Boolean},data(){return{modal:!1,date:""}},methods:{onInput(t){this.$emit("input",t)},open(){const t=/^\d{4}-\d{2}-\d{2}$/;this.date=t.test(this.value)?this.value:this.date,this.modal=!0},close(){this.modal=!1,this.modal2=!1},picker(){this.onInput(this.date),this.close()},dayFormat(t){if(!this.modal)return;const e=t.split("-");return Number(e[e.length-1])}}},i=s,o=a("2877"),r=Object(o["a"])(i,l,n,!1,null,null,null);e["a"]=r.exports},a2e4:function(t,e,a){"use strict";var l=function(){var t=this,e=t._self._c;return e("v-dialog",t._b({model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},"v-dialog",t.$attrs,!1),[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.label))]),e("v-spacer"),t.obtn?e("v-btn",{attrs:{color:"primary",small:""},on:{click:t.btnClick}},[t._v(" "+t._s(t.obtn)+" ")]):t._e(),e("v-btn",{attrs:{icon:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-card-text",[t._t("default")],2)],1)],1)},n=[],s={name:"ezDialog",props:{label:{type:String,required:!0},obtn:{type:String}},data(){return{dialog:!1}},methods:{close(){this.dialog=!1,this.$emit("onClose")},open(){this.$emit("onOpen"),this.dialog=!0},btnClick(){this.dialog=!1,this.$emit("btnClick")}}},i=s,o=a("2877"),r=Object(o["a"])(i,l,n,!1,null,null,null);e["a"]=r.exports},b11f:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t._self._c;return e("v-container",{attrs:{fluid:""}},[e("v-toolbar",{attrs:{height:"40px","background-color":"primary",dark:""}},[e("v-toolbar-title",[t._v("생산 계획")]),e("v-spacer"),e("tooltip-btn",{attrs:{label:"조회"},on:{click:t.view}},[e("v-icon",[t._v("mdi-magnify")])],1),e("tooltip-btn",{attrs:{label:"저장"},on:{click:t.save}},[e("v-icon",[t._v("mdi-content-save-outline")])],1)],1),e("v-card",{staticClass:"my-card text-input-blue my-text-fontsize",staticStyle:{display:"flex",height:"34px"}},[e("div",{staticStyle:{display:"flex"}},[e("div",{staticStyle:{width:"70px"}},[e("v-text-field",{staticClass:"no-padding",attrs:{value:"  납품예정일 : ",readonly:"",dense:"","hide-details":""}})],1),e("input-dateft",{attrs:{value2:t.form.sDate2},on:{"update:value2":function(e){return t.$set(t.form,"sDate2",e)}},model:{value:t.form.sDate1,callback:function(e){t.$set(t.form,"sDate1",e)},expression:"form.sDate1"}}),e("div",{staticStyle:{width:"56px"}},[e("v-text-field",{staticClass:"no-padding",attrs:{value:"    발주처 : ",readonly:"",dense:"","hide-details":""}})],1),e("div",{staticStyle:{width:"100px"}},[e("v-text-field",{staticClass:"text-input-blue no-padding",attrs:{dense:"","hide-detail":""},model:{value:t.form.sVend,callback:function(e){t.$set(t.form,"sVend",e)},expression:"form.sVend"}})],1)],1)]),e("v-data-table",{ref:"data-table",staticClass:"elevation-1 text-no-wrap",attrs:{headers:t.itemHead,items:t.itemList,"item-key":"i_orderser","single-select":"","item-class":t.row_classes,"items-per-page":-1,"hide-default-footer":"","footer-props":{"items-per-page-options":[10,20,30,40,50,100,-1]},height:t.iframeHeight},scopedSlots:t._u([{key:"header",fn:function(){return[e("thead",{attrs:{align:"center"}},[e("tr",[e("th",{staticClass:"text-center",attrs:{colspan:"4"}},[t._v("수주정보")]),e("th",{staticClass:"text-center",attrs:{colspan:"5"}},[t._v("제품정보")]),e("th",{staticClass:"text-center",attrs:{colspan:"4"}},[t._v("생산계획")])])])]},proxy:!0},{key:"item",fn:function({item:a,index:l}){return[t.shouldMergeRow(a)?e("tr",{staticClass:"center-align",class:{row_select:a===t.selected},on:{click:function(e){return t.selectItem(a)}}},[e("td",[t._v(" "+t._s(l+1))]),e("td",{attrs:{rowspan:t.getRowspan(a)}},[t._v(t._s(a.i_orderno))]),e("td",{attrs:{rowspan:t.getRowspan(a)}},[t._v(t._s(a.s_date))]),e("td",{attrs:{rowspan:t.getRowspan(a)}},[t._v(t._s(a.n_vend))]),e("td",{staticClass:"left-align"},[t._v(" "+t._s(a.n_item))]),e("td",{staticClass:"left-align"},[t._v(" "+t._s(a.t_size))]),e("td",[t._v(" "+t._s(a.i_unit))]),e("td",[t._v(" "+t._s(a.m_cnt))]),e("td",[t._v(" "+t._s(a.s_duedate))]),"x"==a.f_work||"2"==a.f_work?e("td",{on:{dblclick:function(e){return t.setWork(a)}}},[e("v-chip",{attrs:{"x-small":"",color:t.getColor(a.f_work),dark:""}},[t._v(t._s(t.getStatus(a.f_work)))])],1):e("td",{attrs:{align:"center"}},[e("v-chip",{attrs:{"x-small":"",color:t.getColor(a.f_work),dark:""}},[t._v(t._s(t.getStatus(a.f_work)))])],1),"1"==a.f_work?e("td",{on:{dblclick:function(e){return t.handleCellClick(a.d_plan1)}}},[e("v-text-field",{staticClass:"my-text-field",attrs:{readonly:"",dense:"","hide-details":""},model:{value:a.d_plan1,callback:function(e){t.$set(a,"d_plan1",e)},expression:"item.d_plan1"}})],1):e("td",{attrs:{align:"center"}},[t._v(t._s(a.d_plan1))]),"1"==a.f_work?e("td",{on:{dblclick:function(e){return t.handleCellClick(a.d_plan2)}}},[e("v-text-field",{staticClass:"my-text-field",attrs:{readonly:"",dense:"","hide-details":""},model:{value:a.d_plan2,callback:function(e){t.$set(a,"d_plan2",e)},expression:"item.d_plan2"}})],1):e("td",{attrs:{align:"center"}},[t._v(t._s(a.d_plan2))]),e("td",{attrs:{align:"left"}},["1"==a.f_work?e("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:t.setedit},model:{value:a.t_remark,callback:function(e){t.$set(a,"t_remark",e)},expression:"item.t_remark"}}):e("span",[t._v(t._s(a.t_remark))])],1)]):e("tr",{staticClass:"center-align",class:{row_select:a===t.selected},on:{click:function(e){return t.selectItem(a)}}},[e("td",[t._v(" "+t._s(l+1))]),e("td",{staticClass:"left-align"},[t._v(" "+t._s(a.n_item))]),e("td",{staticClass:"left-align"},[t._v(" "+t._s(a.t_size))]),e("td",[t._v(" "+t._s(a.i_unit))]),e("td",[t._v(" "+t._s(a.m_cnt))]),e("td",[t._v(" "+t._s(a.s_duedate))]),"x"==a.f_work||"2"==a.f_work?e("td",{on:{dblclick:function(e){return t.setWork(a)}}},[e("v-chip",{attrs:{"x-small":"",color:t.getColor(a.f_work),dark:""}},[t._v(t._s(t.getStatus(a.f_work)))])],1):e("td",{attrs:{align:"center"}},[e("v-chip",{attrs:{"x-small":"",color:t.getColor(a.f_work),dark:""}},[t._v(t._s(t.getStatus(a.f_work)))])],1),"1"==a.f_work?e("td",{on:{dblclick:function(e){return t.handleCellClick(a.d_plan1)}}},[e("v-text-field",{staticClass:"my-text-field",attrs:{readonly:"",dense:"","hide-details":""},model:{value:a.d_plan1,callback:function(e){t.$set(a,"d_plan1",e)},expression:"item.d_plan1"}})],1):e("td",{attrs:{align:"center"}},[t._v(t._s(a.d_plan1))]),"1"==a.f_work?e("td",{on:{dblclick:function(e){return t.handleCellClick(a.d_plan2)}}},[e("v-text-field",{staticClass:"my-text-field",attrs:{readonly:"",dense:"","hide-details":""},model:{value:a.d_plan2,callback:function(e){t.$set(a,"d_plan2",e)},expression:"item.d_plan2"}})],1):e("td",{attrs:{align:"center"}},[t._v(t._s(a.d_plan2))]),e("td",{attrs:{align:"left"}},["1"==a.f_work?e("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:t.setedit},model:{value:a.t_remark,callback:function(e){t.$set(a,"t_remark",e)},expression:"item.t_remark"}}):e("span",[t._v(t._s(a.t_remark))])],1)])]}}])}),e("ez-dialog",{ref:"dialog_plan",attrs:{label:"생산계획일",persistent:"",width:"350px"},on:{onClose:t.close_plan}},[e("dates-dialog",{attrs:{sDate:t.selected.d_plan1,eDate:t.selected.d_plan2},on:{onEnter:t.setplandate}})],1)],1)},n=[],s=a("2f62"),i=a("d1b1"),o=a("a2e4"),r=a("414b"),d=a("f3db"),c=a("6b39"),u=a("12e3"),p=a("64f2"),v=a("e1ee"),_={components:{InputDateft:i["a"],TooltipBtn:r["a"],EzDialog:o["a"],InputDate2:d["a"],InputDate3:c["a"],DatesDialog:v["a"]},data(){return{PROD001:u["d"],valid:!0,iframeHeight:500,form:{sDate1:"",sDate2:"",sVend:"",work:"plan"},itemHead:[{text:"No",sortable:!1,align:"center",width:"25"},{text:"수주번호",value:"i_orderno",sortable:!1,align:"center",width:"75"},{text:"수주일",value:"s_date",sortable:!1,align:"center",width:"60px"},{text:"발주처",value:"n_vend",sortable:!1,align:"center",width:"120px"},{text:"항목(품목)",value:"n_item",sortable:!1,align:"center",width:"130px"},{text:"규격(사양)",value:"t_size",sortable:!1,align:"center",width:"100px"},{text:"단위",value:"i_unit",sortable:!1,align:"center",width:"50px"},{text:"수량",value:"m_cnt",sortable:!1,align:"center",width:"30px"},{text:"납기일",value:"s_duedate",sortable:!1,align:"center",width:"60px"},{text:"상태",value:"f_work",sortable:!1,align:"center",width:"30px"},{text:"시작일",value:"d_plan1",sortable:!1,align:"center",width:"60px"},{text:"종료일",value:"d_plan2",sortable:!1,align:"center",width:"60px"},{text:"비고",value:"t_remark",sortable:!1,align:"center",width:"300px"}],itemList:[],itemInfo:[],selected:[]}},mounted(){window.addEventListener("resize",this.adjustIframeHeight),this.adjustIframeHeight(),this.init()},beforeDestroy(){window.removeEventListener("resize",this.adjustIframeHeight)},watch:{},computed:{},methods:{...Object(s["b"])("prod",["iuProdPlanlist"]),adjustIframeHeight(){const t=window.innerHeight;this.iframeHeight=t-200},shouldMergeRow(t){const e=this.itemList.findIndex(e=>e.i_orderno===t.i_orderno);return e===this.itemList.indexOf(t)},getRowspan(t){const e=this.itemList.filter(e=>e.i_orderno===t.i_orderno).length;return e},async init(){this.form.sDate1=Object(p["getDate"])(-100,1),this.view()},async view(){this.itemList=await this.$axios.post("/api/prod/getProdPlanlist",this.form)},async add(){},async del(){},async save(){const t=this.itemList.filter(t=>"1"===t.f_edit).map(t=>({...t}));if(t.length){const e=await this.iuProdPlanlist(t);e.forEach((t,e)=>{const a=this.itemList.findIndex(e=>e.i_orderser==t);a>=0&&(this.itemList[a].f_edit="0",this.itemList[a].f_editold="0")}),e.length>0&&this.$toast.info("저장 하였습니다.")}},row_classes(t){if("2"==t.f_edit)return"orange"},rowSelect:function(t,e){this.itemInfo=t,e?e.select(!0):this.selected=[t]},selectItem(t){this.selected=t,this.itemInfo=t},getStatus(t){var e=this.PROD001.find(e=>e.value===t);return void 0!==e?e.label:""},setWork(t){"1"==t.f_work&&(null==t.d_plan1||t.d_plan1.length<1||null==t.d_plan2||t.d_plan2.length<1)?this.$toast.error("생산계획일 미입력"):(t.f_work="1"==t.f_work?"2":"1",t.f_edit="1")},handleCellClick(){this.$refs.dialog_plan.open()},close_plan(){},setedit(){this.itemInfo&&(this.itemInfo.f_edit="1")},setplandate(t){this.itemInfo&&(this.itemInfo.f_edit="1"),this.$refs.dialog_plan.close(),t[1]?(this.itemInfo.d_plan1=t[0]>t[1]?t[1]:t[0],this.itemInfo.d_plan2=t[0]>t[1]?t[0]:t[1]):(this.itemInfo.d_plan1=t[0],this.itemInfo.d_plan2=t[0]),t.f_edit="1"},getColor(t){return"1"==t?"red":"2"==t?"blue":"green"}}},f=_,m=a("2877"),h=Object(m["a"])(f,l,n,!1,null,null,null);e["default"]=h.exports},d1b1:function(t,e,a){"use strict";var l=function(){var t=this,e=t._self._c;return e("div",{staticStyle:{width:"190px",display:"flex"}},[e("v-dialog",{attrs:{persistent:"","max-width":"290"},scopedSlots:t._u([{key:"activator",fn:function({attrs:a}){return[e("v-text-field",t._b({staticClass:"my-text-field",attrs:{dense:"","hide-details":"",value:t.value,readonly:t.readonly},on:{input:t.onInput},scopedSlots:t._u([t.readonly?null:{key:"append",fn:function(){return[e("v-btn",{attrs:{icon:"",small:"",tabindex:"-1"},on:{click:t.open}},[e("v-icon",[t._v("mdi-calendar-today")])],1)]},proxy:!0}],null,!0)},"v-text-field",{...t.$attrs,...a},!1))]}}]),model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.$attrs.label))]),e("v-spacer"),e("v-btn",{attrs:{icon:"",plain:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-date-picker",{attrs:{"no-title":"","day-format":t.dayFormat},on:{input:t.picker},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1),e("v-text-field",{staticClass:"no-padding",staticStyle:{width:"20px","border-bottom":"none"},attrs:{dense:"","hide-details":"",value:"∽",readonly:t.readonly},on:{input:t.onInput}}),e("v-dialog",{attrs:{persistent:"","max-width":"290"},scopedSlots:t._u([{key:"activator",fn:function({attrs:a}){return[e("v-text-field",t._b({staticClass:"my-text-field",attrs:{dense:"","hide-details":"",value:t.value2,readonly:t.readonly},on:{input:t.onInput2},scopedSlots:t._u([t.readonly?null:{key:"append",fn:function(){return[e("v-btn",{attrs:{icon:"",small:"",tabindex:"-1"},on:{click:t.open2}},[e("v-icon",[t._v("mdi-calendar-today")])],1)]},proxy:!0}],null,!0)},"v-text-field",{...t.$attrs,...a},!1))]}}]),model:{value:t.modal2,callback:function(e){t.modal2=e},expression:"modal2"}},[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.$attrs.label))]),e("v-spacer"),e("v-btn",{attrs:{icon:"",plain:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-date-picker",{attrs:{"no-title":"","day-format":t.dayFormat},on:{input:t.picker2},model:{value:t.date2,callback:function(e){t.date2=e},expression:"date2"}})],1)],1)],1)},n=[],s=(a("64f2"),{name:"InputDateft",model:{prop:"value",event:"input"},model2:{prop:"value2",event:"input2"},props:{value:String,value2:String,readonly:Boolean},data(){return{modal:!1,date:"",modal2:!1,date2:""}},watch:{date2(t){this.$emit("update:value2",t)}},methods:{onInput(t){this.$emit("input",t)},picker(){this.onInput(this.date),this.close()},open(){const t=/^\d{4}-\d{2}-\d{2}$/;this.date=t.test(this.value)?this.value:this.date,this.modal=!0},close(){this.modal=!1,this.modal2=!1},onInput2(t){this.$emit("input2",t)},picker2(){this.onInput2(this.date2),this.close()},open2(){const t=/^\d{4}-\d{2}-\d{2}$/;this.date2=t.test(this.value2)?this.value2:this.date2,this.modal2=!0},dayFormat(t){if(!this.modal&&!this.modal2)return;const e=t.split("-");return Number(e[e.length-1])}}}),i=s,o=a("2877"),r=Object(o["a"])(i,l,n,!1,null,null,null);e["a"]=r.exports},e1ee:function(t,e,a){"use strict";var l=function(){var t=this,e=t._self._c;return e("div",[e("p"),e("v-date-picker",{attrs:{"no-title":"",range:"","day-format":t.dayFormat},on:{input:t.handleDateChange},model:{value:t.selectedDates,callback:function(e){t.selectedDates=e},expression:"selectedDates"}}),t.selectedDates[1]>t.selectedDates[0]?e("v-btn",{attrs:{color:"primary",block:""},on:{click:t.onclick}},[t._v(" 기간 : "+t._s(t.selectedRange[0])+" ∽ "+t._s(t.selectedRange[1])+" ")]):e("v-btn",{attrs:{color:"primary",block:""},on:{click:t.onclick}},[t._v(" 기간 : "+t._s(t.selectedRange[1])+" ∽ "+t._s(t.selectedRange[0])+" ")])],1)},n=[],s={props:{sDate:{type:String,default:""},eDate:{type:String,default:""}},watch:{sDate(){this.selectedDates[0]=this.sDate,this.selectedRange=[...this.selectedDates]},eDate(){this.selectedDates[1]=this.eDate,this.selectedRange=[...this.selectedDates]}},created(){},data(){return{selectedRange:[],selectedDates:[]}},methods:{handleDateChange(t){this.selectedRange=t},onclick(){this.$emit("onEnter",this.selectedRange)},dayFormat(t){const e=t.split("-");return Number(e[e.length-1])}}},i=s,o=a("2877"),r=Object(o["a"])(i,l,n,!1,null,null,null);e["a"]=r.exports},f3db:function(t,e,a){"use strict";var l=function(){var t=this,e=t._self._c;return e("v-dialog",{attrs:{persistent:"","max-width":"290"},scopedSlots:t._u([{key:"activator",fn:function({attrs:a}){return[e("v-text-field",t._b({staticClass:"my-text-table my-text-field",attrs:{dense:"","hide-details":"",value:t.value,readonly:t.readonly},on:{input:t.onInput},scopedSlots:t._u([t.readonly?null:{key:"append",fn:function(){return[e("v-btn",{attrs:{icon:"",small:"",tabindex:"-1"},on:{click:t.open}},[e("v-icon",[t._v("mdi-calendar-today")])],1)]},proxy:!0}],null,!0)},"v-text-field",{...t.$attrs,...a},!1))]}}]),model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.$attrs.label))]),e("v-spacer"),e("v-btn",{attrs:{icon:"",plain:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-date-picker",{attrs:{"no-title":"","day-format":t.dayFormat},on:{input:t.picker},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1)},n=[],s={name:"InputDate2",model:{prop:"value",event:"input"},props:{value:String,readonly:Boolean},data(){return{modal:!1,date:""}},methods:{onInput(t){this.$emit("input",t)},open(){const t=/^\d{4}-\d{2}-\d{2}$/;this.date=t.test(this.value)?this.value:this.date,this.modal=!0},close(){this.modal=!1,this.modal2=!1},picker(){this.onInput(this.date),this.close()},dayFormat(t){if(!this.modal)return;const e=t.split("-");return Number(e[e.length-1])}}},i=s,o=a("2877"),r=Object(o["a"])(i,l,n,!1,null,null,null);e["a"]=r.exports}}]);
//# sourceMappingURL=ProdPlanning.13601dd9.js.map