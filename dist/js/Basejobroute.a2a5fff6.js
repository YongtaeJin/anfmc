(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Basejobroute"],{"414b":function(t,e,s){"use strict";var o=function(){var t=this,e=t._self._c;return e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:o}){return[e("v-btn",t._g(t._b({class:t.childClass,on:{click:function(e){return t.$emit("click")}}},"v-btn",{...o,...t.$attrs},!1),s),[t._t("default")],2)]}}],null,!0)},[e("span",[t._v(t._s(t.label))])])},i=[],r={name:"TooltipBtn",props:{label:{type:String,required:!0},childClass:[String,Object]}},a=r,l=s("2877"),c=Object(l["a"])(a,o,i,!1,null,null,null);e["a"]=c.exports},a2e4:function(t,e,s){"use strict";var o=function(){var t=this,e=t._self._c;return e("v-dialog",t._b({model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},"v-dialog",t.$attrs,!1),[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.label))]),e("v-spacer"),t.obtn?e("v-btn",{attrs:{color:"primary",small:""},on:{click:t.btnClick}},[t._v(" "+t._s(t.obtn)+" ")]):t._e(),e("v-btn",{attrs:{icon:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-card-text",[t._t("default")],2)],1)],1)},i=[],r={name:"ezDialog",props:{label:{type:String,required:!0},obtn:{type:String}},data(){return{dialog:!1}},methods:{close(){this.dialog=!1,this.$emit("onClose")},open(){this.$emit("onOpen"),this.dialog=!0},btnClick(){this.dialog=!1,this.$emit("btnClick")}}},a=r,l=s("2877"),c=Object(l["a"])(a,o,i,!1,null,null,null);e["a"]=c.exports},c2ab:function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t._self._c;return e("v-container",{attrs:{fluid:""}},[e("v-toolbar",{attrs:{height:"40px","background-color":"primary",dark:""}},[e("v-toolbar-title",[t._v("라우팅 관리")]),e("v-spacer"),e("v-text-field",{attrs:{ense:"","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),e("tooltip-btn",{attrs:{label:"라우딩 조회"},on:{click:t.fetch}},[e("v-icon",[t._v("mdi-magnify")])],1),e("tooltip-btn",{attrs:{label:"라우딩 등록"},on:{click:t.addRouter}},[e("v-icon",[t._v("mdi-plus")])],1),e("tooltip-btn",{attrs:{label:"라우딩 삭제"},on:{click:t.delRouter}},[e("v-icon",[t._v("mdi-minus")])],1)],1),e("v-row",[e("v-col",{attrs:{col:"12",sm:"4",md:"4"}},[e("v-data-table",{staticClass:"elevation-1 text-no-wrap",attrs:{headers:t.headers,items:t.routes,"item-key":"c_item","single-select":"","items-per-page":-1,"hide-default-footer":"","footer-props":{"items-per-page-options":[10,20,30,40,50,100,-1]},height:t.iframeHeight},on:{"click:row":t.rowSelect,"dblclick:row":t.showRowInfo},scopedSlots:t._u([{key:"item.f_use",fn:function({item:s}){return[e("v-chip",{attrs:{"x-small":"",color:t.getColor(s.f_use),dark:""}},[t._v(" "+t._s("Y"==s.f_use?"사용":"중지")+" ")])]}}],null,!0),model:{value:t.selected1,callback:function(e){t.selected1=e},expression:"selected1"}})],1),e("v-col",{attrs:{col:"12",sm:"8",md:"8"}},[e("v-card",[e("table",{staticClass:"type07"},[e("thead",[e("tr",[e("th",{attrs:{scope:"row"}},[t._v("품명")]),t.route?e("td",[t._v("["+t._s(t.route.c_item)+"] "+t._s(t.route.n_item))]):t._e()])]),e("thead",[e("tr",[e("th",{attrs:{scope:"row"}},[t._v("공정유형")]),t.route?e("td",[t._v("["+t._s(t.route.c_ptype)+"] "+t._s(t.route.n_ptype))]):t._e()])]),e("thead",[e("tr",[e("th",{attrs:{scope:"row"}},[t._v("비고")]),t.route?e("td",[t._v(t._s(t.route.t_remark))]):t._e()])])])]),e("v-card",[e("v-toolbar",{attrs:{height:"40px","background-color":"primary"}},[e("v-spacer"),e("tooltip-btn",{attrs:{label:"공정추가",fab:"","x-small":""},on:{click:t.addDetail}},[e("v-icon",[t._v("mdi-plus")])],1),e("tooltip-btn",{attrs:{label:"공정삭제",fab:"","x-small":""},on:{click:t.delDetail}},[e("v-icon",[t._v("mdi-minus")])],1)],1),e("v-data-table",{staticClass:"elevation-1 text-no-wrap",attrs:{headers:t.headersDetail,items:t.routesProc,"item-key":"i_ser","single-select":"","items-per-page":-1,"hide-default-footer":"","footer-props":{"items-per-page-options":[10,20,30,40,50,100,-1]},height:t.iframeHeight-110},on:{"click:row":t.rowSelectDetial},scopedSlots:t._u([{key:"item.s_sort",fn:function({item:s}){return[e("div",{on:{dblclick:function(e){return t.showRowInfoDetail()}}},[t._v(" "+t._s(s.s_sort)+" ")])]}},{key:"item.c_process",fn:function({item:s}){return[e("div",{on:{dblclick:function(e){return t.showRowInfoDetail()}}},[t._v(" "+t._s(s.c_process)+" ")])]}},{key:"item.n_process",fn:function({item:s}){return[e("div",{on:{dblclick:function(e){return t.showRowInfoDetail()}}},[t._v(" "+t._s(s.n_process)+" ")])]}},{key:"item.m_whour",fn:function({item:s}){return[e("div",{on:{dblclick:function(e){return t.showRowInfoDetail()}}},[t._v(" "+t._s(s.m_whour)+" ")])]}},{key:"item.f_jobs",fn:function({item:s}){return[e("div",{on:{dblclick:function(e){return t.handleDoubleClick(s,"f_jobs")}}},["Y"==s.f_jobs?e("v-icon",{attrs:{small:"",color:"#008000"}},[t._v(" mdi-check ")]):e("v-icon",{attrs:{"x-small":""}},[t._v("mdi-minus")])],1)]}},{key:"item.f_jobf",fn:function({item:s}){return[e("div",{on:{dblclick:function(e){return t.handleDoubleClick(s,"f_jobf")}}},["Y"==s.f_jobf?e("v-icon",{attrs:{small:"",color:"#008000"}},[t._v(" mdi-check ")]):e("v-icon",{attrs:{"x-small":""}},[t._v("mdi-minus")])],1)]}},{key:"item.f_jobo",fn:function({item:s}){return[e("div",{on:{dblclick:function(e){return t.handleDoubleClick(s,"f_jobo")}}},["Y"==s.f_jobo?e("v-icon",{attrs:{small:"",color:"#008000"}},[t._v(" mdi-check ")]):e("v-icon",{attrs:{"x-small":""}},[t._v("mdi-minus")])],1)]}}],null,!0),model:{value:t.selected2,callback:function(e){t.selected2=e},expression:"selected2"}})],1)],1)],1),e("ez-dialog",{ref:"dialog",attrs:{label:"라우팅 등록(수정)",persistent:"",width:"400px"},on:{onClose:t.close}},[e("basejobroute-form",{attrs:{data:t.route,keyCheckItem:t.keyCheckRoute,isLoad:t.isLoad,s_sort:t.getMaxNo,itemList:t.itemLists,procList:t.procLists},on:{onSave:t.saveRouter}})],1),e("ez-dialog",{ref:"dialogLi",attrs:{label:"라우팅 품목 추가/삭제",persistent:"",width:"400px"},on:{onClose:t.closeLi}},[e("basejobrouteli-from",{attrs:{data:t.procDetail,isLoad:t.isLoad,s_sort:t.getMaxNo,prcoess:t.prcoess,route:t.route},on:{onSave:t.saveRouterProc}})],1)],1)},i=[],r=(s("14d9"),s("4328")),a=s.n(r),l=s("2f62"),c=s("a2e4"),n=s("414b"),u=function(){var t=this,e=t._self._c;return e("v-container",{staticClass:"grey lighten-5"},[e("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.save.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e("v-row",[e("v-col",{attrs:{col:"12",sm:"9",md:"9"}},[t.data?e("v-text-field",{attrs:{label:"품명",readonly:""},model:{value:t.getItemname,callback:function(e){t.getItemname=e},expression:"getItemname"}}):e("v-select",{attrs:{label:"품명",items:t.itemList,"item-text":"n_item","item-value":"c_item",rules:[t.rules.require({label:"품명"})]},scopedSlots:t._u([{key:"item",fn:function({item:e}){return[t._v(t._s(t.getText(e)))]}},{key:"selection",fn:function({item:e}){return[t._v(t._s(t.getText(e)))]}}],null,!1,967321052),model:{value:t.form.c_item,callback:function(e){t.$set(t.form,"c_item",e)},expression:"form.c_item"}})],1),e("v-col",{attrs:{col:"12",sm:"3",md:"3"}},[e("v-checkbox",{attrs:{label:"사용","true-value":"Y","false-value":"N","hide-details":"false"},model:{value:t.form.f_use,callback:function(e){t.$set(t.form,"f_use",e)},expression:"form.f_use"}})],1)],1),e("v-select",{attrs:{label:"공정유형",items:t.procList,"item-text":"n_ptype","item-value":"c_ptype",rules:[t.rules.require({label:"공정유형"})]},scopedSlots:t._u([{key:"item",fn:function({item:e}){return[t._v(t._s(t.getText2(e)))]}},{key:"selection",fn:function({item:e}){return[t._v(t._s(t.getText2(e)))]}}]),model:{value:t.form.c_ptype,callback:function(e){t.$set(t.form,"c_ptype",e)},expression:"form.c_ptype"}}),e("v-text-field",{attrs:{label:"비고"},model:{value:t.form.t_remark,callback:function(e){t.$set(t.form,"t_remark",e)},expression:"form.t_remark"}}),e("v-btn",{attrs:{type:"submit",color:"primary",block:""}},[t._v("저장")])],1)],1)},m=[],f=s("64f2"),h=s("248f"),d=s.n(h),p={name:"BasejobrouteForm",props:{data:{type:Object,default:null},keyCheckItem:{type:Function,default:null},isLoad:{type:Boolean,default:null},s_sort:{type:Number,default:0},itemList:{type:Array,default:null},procList:{type:Array,default:null}},created(){this.init()},watch:{data(){this.fatch()},isLoad(){this.fatch()}},computed:{rules:()=>d.a,getItemname(){return this.form.c_item+" - "+this.form.n_item}},data(){return{valid:!0,form:{c_com:"",c_item:"",c_ptype:"",s_sort:0,f_use:"Y",t_remark:""}}},methods:{async init(){this.fatch()},async fatch(){this.data?this.form=Object(f["deepCopy"])(this.data):this.form={c_com:this.$store.state.user.member.c_com,c_item:"",c_ptype:"",f_use:"Y",t_remark:""},this.$refs.form&&this.$refs.form.resetValidation()},async save(){this.$refs.form.validate(),await this.$nextTick(),this.valid&&(this.$emit("onSave",this.form),this.init())},getText(t){return t.c_item+" - "+t.n_item},getText2(t){return t.c_ptype+" - "+t.n_ptype}}},_=p,b=s("2877"),v=Object(b["a"])(_,u,m,!1,null,null,null),g=v.exports,k=function(){var t=this,e=t._self._c;return e("v-container",{staticClass:"grey lighten-5"},[e("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.save.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e("v-row",[e("v-col",{attrs:{col:"12",sm:"2",md:"2"}},[e("v-text-field",{attrs:{label:"No",rules:[t.rules.Num()],"hide-details":"false"},model:{value:t.form.s_sort,callback:function(e){t.$set(t.form,"s_sort",e)},expression:"form.s_sort"}})],1),e("v-spacer"),e("v-col",{attrs:{col:"12",sm:"4",md:"4"}},[e("v-checkbox",{attrs:{label:"외주","true-value":"Y","false-value":"N","hide-details":"false"},model:{value:t.form.f_jobo,callback:function(e){t.$set(t.form,"f_jobo",e)},expression:"form.f_jobo"}})],1),e("v-col",{attrs:{col:"12",sm:"9",md:"9"}},[e("v-select",{attrs:{label:"공정코드",readonly:!!t.form.c_ptype,items:t.prcoess,"item-text":"n_process","item-value":"c_process",rules:[t.rules.require({label:"공정코드"})]},on:{change:t.changeSelect},model:{value:t.form.c_process,callback:function(e){t.$set(t.form,"c_process",e)},expression:"form.c_process"}})],1),e("v-col",{attrs:{col:"12",sm:"3",md:"3"}},[e("v-text-field",{attrs:{label:"작업일",rules:[t.rules.Num()],"hide-details":"false"},model:{value:t.form.m_whour,callback:function(e){t.$set(t.form,"m_whour",e)},expression:"form.m_whour"}})],1),e("v-col",{attrs:{col:"12",sm:"5",md:"5"}},[e("v-checkbox",{attrs:{label:"첫공정","true-value":"Y","false-value":"N","hide-details":"false"},model:{value:t.form.f_jobs,callback:function(e){t.$set(t.form,"f_jobs",e)},expression:"form.f_jobs"}})],1),e("v-spacer"),e("v-col",{attrs:{col:"12",sm:"5",md:"5"}},[e("v-checkbox",{attrs:{label:"마지막공정","true-value":"Y","false-value":"N","hide-details":"false"},model:{value:t.form.f_jobf,callback:function(e){t.$set(t.form,"f_jobf",e)},expression:"form.f_jobf"}})],1)],1),e("v-row",[e("v-col")],1),e("v-btn",{attrs:{type:"submit",color:"primary",block:""}},[t._v("저장")])],1)],1)},x=[],y={name:"BasejobrouteliForm",props:{data:{type:Object,default:null},isLoad:{type:Boolean,default:null},s_sort:{type:Number,default:0},prcoess:{type:Array,default:null},route:{type:Object,default:null}},data(){return{valid:!0,form:{c_com:"",c_item:"",s_sort:0,c_process:"",n_process:"",c_ptype:"",m_whour:"",f_jobs:"",f_jobf:"",f_jobo:""}}},created(){this.init()},watch:{data(){this.fatch()},isLoad(){this.fatch()}},computed:{rules:()=>d.a},methods:{async init(){this.fatch()},async fatch(){this.data?this.form=Object(f["deepCopy"])(this.data):this.form={c_com:this.$store.state.user.member.c_com,c_item:this.route.c_item,s_sort:1+(0|this.s_sort),c_process:"",n_process:"",c_ptype:"",m_whour:1,f_jobs:"N",f_jobf:"N",f_jobo:"N"},this.$refs.form&&this.$refs.form.resetValidation()},async save(){this.$refs.form.validate(),await this.$nextTick(),this.valid&&this.$emit("onSave",this.form)},getText(t){return t.c_process+" - "+t.n_process},changeSelect(){var t=this.prcoess.find(t=>t.c_process===this.form.c_process);this.form.n_process=t.n_process}}},w=y,j=Object(b["a"])(w,k,x,!1,null,null,null),$=j.exports,L={components:{TooltipBtn:n["a"],EzDialog:c["a"],BasejobrouteForm:g,BasejobrouteliFrom:$},name:"BasejobRoute",mounted(){window.addEventListener("resize",this.adjustIframeHeight),this.adjustIframeHeight(),this.init()},beforeDestroy(){window.removeEventListener("resize",this.adjustIframeHeight)},data(){return{iframeHeight:500,headers:[{text:"품번",value:"c_item",sortable:!1,align:"center"},{text:"품명",value:"n_item",sortable:!1},{text:"사용",value:"f_use",sortable:!1,align:"center"}],routes:[],route:[],search:"",isLoad:!1,itemLists:[],prcoess:[],procLists:[],headersDetail:[{text:"No",value:"s_sort",sortable:!1,align:"center",width:"35px"},{text:"공정코드",value:"c_process",sortable:!1,align:"center"},{text:"공정명",value:"n_process",sortable:!1,align:"center"},{text:"작업일",value:"m_whour",sortable:!1,align:"center",width:"70px"},{text:"첫공정",value:"f_jobs",sortable:!1,align:"center",width:"70px"},{text:"마지막공정",value:"f_jobf",sortable:!1,align:"center",width:"70px"},{text:"외주",value:"f_jobo",sortable:!1,align:"center",width:"70px"}],routesProcs:[],routesProc:[],procDetail:[],temp:[],selected1:[],selected2:[]}},watch:{},computed:{getMaxNo(){const t=Math.max(...this.routesProc.map(t=>t.s_sort));return isFinite(t)?t:0}},methods:{...Object(l["b"])("basejob",["duplicateRouteCheck","iuBaseRoute","iuBaseRouteProc"]),adjustIframeHeight(){const t=window.innerHeight;this.iframeHeight=t-200},getColor(t){return"N"==t?"red":"green"},getProccessName(t){var e=this.prcoess.find(e=>e.c_process===t);return e.n_process},async init(){this.fetch(),this.prcoess=await this.$axios.get("/api/basejob/getUseProcess"),this.procLists=await this.$axios.get("/api/basejob/getUseProcessList")},async fetch(){const t={search:this.search.trim()},e=a.a.stringify(t);this.routesProcs&&this.routesProcs.splice(0),this.routesProc&&this.routesProc.splice(0),this.itemLists&&this.itemLists.splice(0),this.routes&&this.routes.splice(0),this.selected1=[],this.selected2=[],this.itemLists=await this.$axios.get("/api/basejob/getNotItemList"),this.routes=await this.$axios.get("/api/basejob/getBaseRoute?"+e),this.routesProcs=await this.$axios.get("/api/basejob/getBaseRouteProc")},rowSelect:function(t,e){e.select(!0),this.route=t,this.routesProc=this.routesProcs.filter(t=>t.c_item==this.route.c_item&&t.c_com==this.route.c_com)},async delRouter(){const t=this.routes.indexOf(this.route);if(t<0)return;const e=await this.$ezNotify.confirm(`<b>라우팅 품번코드 : ${this.route.c_item}</b> 삭제 하시겠습니까 ?`,"라우팅 삭제",{icon:"mdi-delete",iconColor:"red"});if(!e)return;const s=await this.$axios.delete(`/api/basejob/delBaseRoute/${this.route.c_com}/${this.route.c_item}`);if(s){this.routes.splice(t,1),this.$toast.info(`[${this.route.c_item}] 삭제 하였습니다.`);for(var o=this.routesProcs.length-1;o>=0;o--)this.routesProcs[o].c_item==this.route.c_item&&this.routesProcs.splice(o,1);this.selected1=[],this.selected2=[],this.routesPro=null,this.procDetail=null}},async keyCheckRoute(){},async saveRouter(t){this.isLoading=!0;const e=await this.iuBaseRoute(t);if(this.isLoading=!1,e){this.$toast.info(`[${e.c_item}] 저장 하였습니다.`);var s=this.routes.indexOf(this.route);s>=0?this.routes.splice(s,1,e):this.routes.push(e),s=this.itemLists.findIndex(t=>t.c_item==e.c_item),s>=0&&this.itemLists.splice(s,1);for(var o=this.routesProcs.length-1;o>=0;o--)this.routesProcs[o].c_item==e.c_item&&this.routesProcs.splice(o,1);this.temp=await this.$axios.get(`/api/basejob/getBaseRouteProc/${e.c_com}/${e.c_item}`),this.temp.forEach(t=>{this.routesProcs.push(t)}),this.routesProc=this.routesProcs.filter(t=>t.c_item==e.c_item&&t.c_com==e.c_com)}this.$refs.dialog.close()},async addRouter(){this.isLoad=!0,this.route=null,this.$refs.dialog.open()},async showRowInfo(t,{item:e}){this.isLoad=!0,this.route=e,this.$refs.dialog.open()},async addDetail(){this.isLoad=!0,this.procDetail=null,this.$refs.dialogLi.open()},async delDetail(){const t=this.routesProcs.indexOf(this.procDetail);if(t<0)return;const e=await this.$ezNotify.confirm(`<b>라우팅 공정코드 : ${this.procDetail.c_process}</b> 삭제 하시겠습니까 ?`,"공정 삭제",{icon:"mdi-delete",iconColor:"red"});if(!e)return;const s=await this.$axios.delete(`/api/basejob/delBaseRouteProc/${this.procDetail.c_com}/${this.procDetail.c_item}/${this.procDetail.i_ser}`);if(s){this.routesProcs.splice(t,1),this.$toast.info(`[${this.route.c_item}] 삭제 하였습니다.`);const e=this.routesProc.indexOf(this.procDetail);t>=0&&this.routesProc.splice(e,1)}},async showRowInfoDetail(){this.isLoad=!0,this.$refs.dialogLi.open()},rowSelectDetial:function(t,e){e.select(!0),this.procDetail=t},close(){this.isLoad=!1},closeLi(){this.isLoad=!1},async handleDoubleClick(t,e){var s=this.routesProcs.indexOf(t);switch(e){case"f_jobs":t.f_jobs="Y"==t.f_jobs?"N":"Y";break;case"f_jobf":t.f_jobf="Y"==t.f_jobf?"N":"Y";break;case"f_jobo":t.f_jobo="Y"==t.f_jobo?"N":"Y";break}s>=0&&this.routesProcs.splice(s,1,t),await this.iuBaseRouteProc(t),this.procDetail=t},async saveRouterProc(t){this.isLoading=!0;const e=await this.iuBaseRouteProc(t);if(this.isLoading=!1,e){this.$toast.info("저장 하였습니다.");var s=this.routesProcs.indexOf(this.procDetail);s>=0&&this.routesProcs.splice(s,1,e);s=this.routesProc.indexOf(this.procDetail);s>=0?this.routesProc.splice(s,1,e):(this.routesProcs.push(e),this.routesProc.push(e))}this.$refs.dialogLi.close()}}},P=L,D=Object(b["a"])(P,o,i,!1,null,null,null);e["default"]=D.exports}}]);
//# sourceMappingURL=Basejobroute.a2a5fff6.js.map