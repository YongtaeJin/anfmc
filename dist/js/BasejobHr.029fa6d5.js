(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["BasejobHr"],{"414b":function(e,t,s){"use strict";var i=function(){var e=this,t=e._self._c;return t("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:i}){return[t("v-btn",e._g(e._b({class:e.childClass,on:{click:function(t){return e.$emit("click")}}},"v-btn",{...i,...e.$attrs},!1),s),[e._t("default")],2)]}}],null,!0)},[t("span",[e._v(e._s(e.label))])])},a=[],n={name:"TooltipBtn",props:{label:{type:String,required:!0},childClass:[String,Object]}},r=n,l=s("2877"),o=Object(l["a"])(r,i,a,!1,null,null,null);t["a"]=o.exports},ac4f3:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e._self._c;return t("v-container",{attrs:{fluid:""}},[t("v-toolbar",{attrs:{height:"40px","background-color":"primary",dark:""}},[t("v-toolbar-title",[e._v("사원관리")]),t("v-spacer"),t("tooltip-btn",{attrs:{label:"조회"},on:{click:e.view}},[t("v-icon",[e._v("mdi-magnify")])],1),t("tooltip-btn",{attrs:{label:"등록"},on:{click:e.add}},[t("v-icon",[e._v("mdi-plus")])],1),t("tooltip-btn",{attrs:{label:"삭제"},on:{click:e.del}},[t("v-icon",[e._v("mdi-minus")])],1),t("tooltip-btn",{attrs:{label:"저장"},on:{click:e.save}},[t("v-icon",[e._v("mdi-content-save-outline")])],1)],1),t("v-data-table",{ref:"table",staticClass:"elevation-1 text-no-wrap",attrs:{headers:e.masterHead,items:e.masters,"item-key":"i_hrbaseser","single-select":"","hide-default-footer":"","items-per-page":-1,"item-class":e.row_classes,height:e.iframeHeight},on:{"click:row":e.rowSelectMaster},scopedSlots:e._u([{key:"item.s_sort",fn:function({item:s}){return[s.i_hrbaseser===e.masterinfo.i_hrbaseser?t("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:e.onChange},model:{value:s.s_sort,callback:function(t){e.$set(s,"s_sort",t)},expression:"item.s_sort"}}):t("span",[e._v(e._s(s.s_sort))])]}},{key:"item.i_empno",fn:function({item:s}){return[s.i_hrbaseser===e.masterinfo.i_hrbaseser?t("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:e.onChange},model:{value:s.i_empno,callback:function(t){e.$set(s,"i_empno",t)},expression:"item.i_empno"}}):t("span",[e._v(e._s(s.i_empno))])]}},{key:"item.n_empnm",fn:function({item:s}){return[s.i_hrbaseser===e.masterinfo.i_hrbaseser?t("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:e.onChange},model:{value:s.n_empnm,callback:function(t){e.$set(s,"n_empnm",t)},expression:"item.n_empnm"}}):t("span",[e._v(e._s(s.n_empnm))])]}},{key:"item.n_level",fn:function({item:s}){return[s.i_hrbaseser===e.masterinfo.i_hrbaseser?t("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:e.onChange},model:{value:s.n_level,callback:function(t){e.$set(s,"n_level",t)},expression:"item.n_level"}}):t("span",[e._v(e._s(s.n_level))])]}},{key:"item.n_dept",fn:function({item:s}){return[s.i_hrbaseser===e.masterinfo.i_hrbaseser?t("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:e.onChange},model:{value:s.n_dept,callback:function(t){e.$set(s,"n_dept",t)},expression:"item.n_dept"}}):t("span",[e._v(e._s(s.n_dept))])]}},{key:"item.t_tel",fn:function({item:s}){return[s.i_hrbaseser===e.masterinfo.i_hrbaseser?t("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:e.onChange},model:{value:s.t_tel,callback:function(t){e.$set(s,"t_tel",t)},expression:"item.t_tel"}}):t("span",[e._v(e._s(s.t_tel))])]}},{key:"item.t_mail",fn:function({item:s}){return[s.i_hrbaseser===e.masterinfo.i_hrbaseser?t("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:e.onChange},model:{value:s.t_mail,callback:function(t){e.$set(s,"t_mail",t)},expression:"item.t_mail"}}):t("span",[e._v(e._s(s.t_mail))])]}},{key:"item.t_remark",fn:function({item:s}){return[s.i_hrbaseser===e.masterinfo.i_hrbaseser?t("v-text-field",{staticClass:"my-text-field",attrs:{dense:"","hide-details":""},on:{input:e.onChange},model:{value:s.t_remark,callback:function(t){e.$set(s,"t_remark",t)},expression:"item.t_remark"}}):t("span",[e._v(e._s(s.t_remark))])]}}],null,!0),model:{value:e.selectedM,callback:function(t){e.selectedM=t},expression:"selectedM"}})],1)},a=[],n=(s("14d9"),s("2f62")),r=s("414b"),l={components:{TooltipBtn:r["a"]},name:"BasejobHr",mounted(){window.addEventListener("resize",this.adjustIframeHeight),this.adjustIframeHeight(),this.init()},beforeDestroy(){window.removeEventListener("resize",this.adjustIframeHeight)},data(){return{iframeHeight:500,masterHead:[{text:"No",value:"s_sort",sortable:!1,align:"center",width:"40px"},{text:"사번",value:"i_empno",sortable:!1,align:"center",width:"70px"},{text:"성명",value:"n_empnm",sortable:!1,align:"center",width:"100px"},{text:"직급",value:"n_level",sortable:!1,align:"center",width:"80px"},{text:"부서",value:"n_dept",sortable:!1,align:"center",width:"150px"},{text:"연락처",value:"t_tel",sortable:!1,align:"center",width:"120px"},{text:"Email",value:"t_mail",sortable:!1,align:"center",width:"102px"},{text:"기타",value:"t_remark",sortable:!1,align:"center",width:"150px"}],masters:[],masterinfo:[],selectedM:[]}},computed:{getMaxNo(){const e=Math.max(...this.masters.map(e=>e.s_sort));return isFinite(e)?e:0}},methods:{...Object(n["b"])("basejob",["iuHrbase"]),adjustIframeHeight(){const e=window.innerHeight;this.iframeHeight=e-200},async init(){this.view()},async view(){this.masterinfo=[],this.selectedM=[],this.masters=await this.$axios.get("/api/basejob/getHrbase")},async add(){const e={};e.c_com=this.$store.state.user.member.c_com,e.i_hrbaseser=Date.now(),e.s_sort=this.getMaxNo+1,e.i_empno="",e.n_empnm="",e.n_dept="",e.n_level="",e.t_tel="",e.t_mail="",e.t_remark="",e.f_edit="1",e.f_editold="1";this.masters.push(e)},async del(){if(!this.masterinfo||void 0==this.masterinfo.i_hrbaseser)return;const e=this.masters.indexOf(this.masterinfo);e>-1&&("0"==this.masters[e].f_editold?this.masters[e].f_edit="2"===this.masters[e].f_edit?"1":"2":this.masters.splice(e,1))},async save(){const e=await this.iuHrbase(this.masters);if(e){for(let e=this.masters.length-1;e>=0;e--)"2"==this.masters[e].f_edit&&this.masters.splice(e,1);this.masters.forEach((e,t)=>{e.f_edit="0",e.f_editold="0"}),this.$toast.info("저장 하였습니다.")}},async rowSelectMaster(e,t){this.masterinfo.i_hrbaseser!=e.i_hrbaseser&&(this.masterinfo=e,t?t.select(!0):this.selectedM=[e])},onChange(){const e=this.masters.indexOf(this.masterinfo);e>-1&&"0"==this.masters[e].f_edit&&(this.masters[e].f_edit="1")},row_classes(e){if("2"==e.f_edit)return"orange"},getColor(e){return"3"==e?"red":"4"==e?"blue":"green"}}},o=l,m=s("2877"),c=Object(m["a"])(o,i,a,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=BasejobHr.029fa6d5.js.map