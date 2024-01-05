<template>
    <v-container fluid>
        <v-toolbar height="40px" background-color="primary" dark>
            <v-toolbar-title>사업협약서관리 :</v-toolbar-title>
            <v-col sm=3 md=3>
                <v-select @input="fetchData" v-model="selectShop" 
                    :items="shopList" item-text="n_shop" item-value="i_shop" 
                    class="my-text-field no-padding" dense style="font-size: 0.8rem;"  >
                </v-select>
            </v-col>
            <v-spacer/>            
            <tooltip-btn label="조회" @click="fetchData"><v-icon>mdi-magnify</v-icon></tooltip-btn>
        </v-toolbar>
        <v-data-table :headers="headers"  :items="itemArgee" single-select  item-key="i_ser"
            :items-per-page="-1" hide-default-footer  
            class="elevation-1 text-no-wrap" :height=iframeHeight>            
            <template v-slot:item="{ item }">
                <tr :class="{ 'row_select': item === selected }" class="center-align" @click="selectItem(item)">
                    <td align=left @dblclick="showRowInfo(item)"><u>{{ item.n_company }}</u></td>
                    <td v-if="item.rnum>=1"  :class="{green2: item.t1}"> {{datachk(item.t1)}}</td>
                    <td v-if="item.rnum>=2"  :class="{green2: item.t2}"> {{datachk(item.t2)}}</td>
                    <td v-if="item.rnum>=3"  :class="{green2: item.t3}"> {{datachk(item.t3)}}</td>
                    <td v-if="item.rnum>=4"  :class="{green2: item.t4}"> {{datachk(item.t4)}}</td>
                    <td v-if="item.rnum>=5"  :class="{green2: item.t5}"> {{datachk(item.t5)}}</td>
                    <td v-if="item.rnum>=6"  :class="{green2: item.t6}"> {{datachk(item.t6)}}</td>
                    <td v-if="item.rnum>=7"  :class="{green2: item.t7}"> {{datachk(item.t7)}}</td>
                    <td v-if="item.rnum>=8"  :class="{green2: item.t8}"> {{datachk(item.t8)}}</td>
                    <td v-if="item.rnum>=9"  :class="{green2: item.t9}"> {{datachk(item.t9)}}</td>
                    <td v-if="item.rnum>=10" :class="{green2: item.t10}"> {{datachk(item.t10)}}</td>
                    <td v-if="item.rnum>=11" :class="{green2: item.t11}"> {{datachk(item.t11)}}</td>
                    <td v-if="item.rnum>=12"  :class="{green2: item.t12}"> {{datachk(item.t12)}}</td>
                    <td v-if="item.rnum>=13"  :class="{green2: item.t13}"> {{datachk(item.t13)}}</td>
                    <td v-if="item.rnum>=14"  :class="{green2: item.t14}"> {{datachk(item.t14)}}</td>
                    <td v-if="item.rnum>=15"  :class="{green2: item.t15}"> {{datachk(item.t15)}}</td>
                    <td v-if="item.rnum>=16"  :class="{green2: item.t16}"> {{datachk(item.t16)}}</td>
                    <td v-if="item.rnum>=17"  :class="{green2: item.t17}"> {{datachk(item.t17)}}</td>
                    <td v-if="item.rnum>=18"  :class="{green2: item.t18}"> {{datachk(item.t18)}}</td>
                    <td v-if="item.rnum>=19"  :class="{green2: item.t19}"> {{datachk(item.t19)}}</td>
                    <td v-if="item.rnum>=20"  :class="{green2: item.t20}"> {{datachk(item.t20)}}</td>
                    <td @dblclick="f_argeechk(item)"  :class="{greencol: item.f_argeechk}"> <u>{{ argeechk(item.f_argeechk) }}</u></td>
                </tr>
            </template>
        </v-data-table>
        <ez-dialog label='협약서 서류 확인' ref="dialog_arg" max-width="800"  color="primary" persistent>            
            <shop-input-mag-file-form @process="saveDocProcess"  @mailSend="mailSend" :fileLists=fileAddsC :companyName=selected?.n_company></shop-input-mag-file-form>
        </ez-dialog>
        <tiptab-mail label="메일발송" 
            :body_content= "this.mailinfo.body" 
            :mail_title = "this.mailinfo.title"
            :itemInput = "this.itemInput"
            ref="dialog" max-width="900" max-height="1300"  persistent @onSend="sendMail" >
        </tiptab-mail>
        <ez-dialog-2 label="처리중" ref="ez_wait" max-width="200" persistent color="primary" ></ez-dialog-2>
    </v-container>
</template>

<script>
import { deepCopy, extractNumber } from "../../../util/lib";
import TooltipBtn from '@/components/etc/TooltipBtn.vue';
import EzDialog from '@/components/etc/EzDialog.vue';
import EzDialog2 from '@/components/etc/EzDialog2.vue';
import ShopInputMagFileForm from './shop_form/ShopInputMagFileForm.vue';
import TiptabMail from '@/components/tiptab/TiptabMail.vue';

export default {
    components: { TooltipBtn, EzDialog, EzDialog2, ShopInputMagFileForm, TiptabMail },
    name: "ShopArgeeMag",

    data() {
        return {
            iframeHeight: 500, // 초기 높이 설정 (원하는 높이로 초기화)
            selectShop: null, shopList: [],
            selected: [],
            headers:[], itemArgee:[],

            fileAddsC:[], itemInput: null,
            mailinfo: {title: "", to_email: "", cc_email: "", body: "",},
        }
    },
    beforeCreate() {        
        if (!this.$store.state.user.member?.c_com) {            
            this.$router.push("/").catch( () => {this.$toast.error('잘못된 접급 입니다.')}); 
            return
        }
    },
    mounted() {
        // 창 크기가 변경될 때마다 iframe의 높이를 조정
        window.addEventListener('resize', this.adjustIframeHeight);
        this.adjustIframeHeight(); // 초기 조정 
        this.init();
        this.fetchData();
    },
    beforeDestroy() {
        // 컴포넌트가 파기될 때 리스너 제거
        window.removeEventListener('resize', this.adjustIframeHeight);
    },
    methods: {
        adjustIframeHeight() {
        // 브라우저 창의 높이를 iframe의 높이로 설정
            const windowHeight = window.innerHeight;
            this.iframeHeight = windowHeight - 200;           
        },
        async init() {
            this.shopList = await this.$axios.get("/api/shopinfo/getShopList");
            if (this.shopList.length)  {
                this.selectShop = this.shopList[0].i_shop;
                await this.fetchData()
            }
        },
        async fetchData() {
            this.rnum = 1;
            if (!this.selectShop) {
                this.shopList = [];
                return;
            }
            const payload = {
                i_shop: this.selectShop,                
            };
            // this.itemShops = await this.$axios.get("/api/shopinfo/getShopMag");
            const head = {};
            this.headers.splice(0);
            head.text = "업체명";
            head.value = `n_company`;                            
            head.sortable = false;
            head.align = 'center';            
            this.headers.push( { ...head });

            this.itemArgee = await this.$axios.post(`/api/shopinfo/getShopArgeeMag`, payload);
            if ( this.itemArgee.length ) {
                this.rnum = this.itemArgee[0].rnum;              
                for(let i=0; i<Object.keys(this.itemArgee[0]).length; i++){
                    let name = Object.keys(this.itemArgee[0])[i];
                    let value = this.itemArgee[0][name];                    
                    
                    if(name[0] =='h') {
                        if (this.rnum >= extractNumber(name)) {
                            head.text = value;                            
                            head.value = 't' + extractNumber(name);
                            head.sortable = false;
                            head.align = 'center';
                            head.width = '60px';
                            this.headers.push( { ...head });
                        }
                    }
                }
                head.text = "확인";                            
                head.value = 'f_argeechk';
                head.sortable = false;
                head.align = 'center';
                this.headers.push( { ...head });
            }
        },
        selectItem(item) {
            this.selected = item;                
        },
        datachk(data) {
            let val = "";
            if (data) { 
                val = "완료"
            } else {
                val = "미완료"
            }
            return  val;
        },
        argeechk(data) {
            return data=="Y" ? "확인" : "미확인";
        },
        async f_argeechk(item) {
            const res = await this.$ezNotify.confirm("처리 하시겠습니까  ?", "협약서");
            if (res ) {
                if (item.f_argeechk == "Y") {
                    item.f_argeechk  = 'N' ;
                } else {
                    item.f_argeechk  = 'Y' ;
                    const data = await this.$axios.post(`/api/shopinfo/ShopInputMagArgeeChk`, item);                    
                }           
            }
        },
        async showRowInfo(item) {
            this.n_company = item.n_company;
            const item2 = item;
            item2.f_gubun = "3"
            this.itemInput = await this.$axios.post(`/api/shopinfo/getShopInputMag1`, item);
            this.fileAddsC = await this.$axios.post(`/api/shopinfo/getShopInputMag2`, item2);            
            this.$refs.dialog_arg.open();
        },
        async saveDocProcess(item) {
            for (let ob in item) {
                if(item[ob].f_edit == '1') {
                    // console.log(item[ob])
                    const data = this.$axios.post(`/api/shopinfo/ShopInputMag2Save`, item[ob]);
                }
            }
        },
        async mailSend() { 
            // 메일 팝업차 뛰우기 --> sendMail 호출
            let body = "<p>상기 제목 관련 하여 아래와 같이 첨부 서류 확인 결과 전달 드립니다.</p><p>";
            
            this.mailinfo.title = "스마트공방 협약서 서류 확인 안내";
            body = body + "스마트공방 협약서 서류 확인 안내</p></p>";
            this.fileAddsC.forEach((data) => {
                let n_status = data.f_noact=='Y' ? "접수" : data.f_noact=='N' ? "반려" : data.f_noact=='I' ? '검토' : data.f_noact=='R' ? '검토' : '미등록';
                body = body + `<p>${data.f_noact=='Y'?'':'<span style="color:red"'}>${data.n_filename} : 서류${n_status}${data.f_noact=='Y'?'':'</span>'}</p>`;		        
            });
            body = body + `<p>반려된 첨부서류에 대해서 재 등록 부탁 드립니다.</p>`;
            body = body + `<p></p>감사 합니다.`;
            
            this.mailinfo.body = body;
            this.$refs.dialog.open();
        },

        async sendMail(title, tomail, ccmail, html) {
            // 메일 작성 내용 저장 및 메일 발송
            this.$refs.ez_wait.open();
            this.mailinfo.title = title;
            this.mailinfo.to_email = tomail;
            this.mailinfo.cc_email = ccmail;
            this.mailinfo.body = html;
            
            const data = await this.$axios.post(`/api/shopinfo/postMailSend`, this.mailinfo);
            this.$refs.ez_wait.close();
            if (data == "ok") {
                this.$ezNotify.alert("정상적으로 메일 발송 하였습니다..... ", "성공");
                this.$refs.dialog.close();
            }            
        },        
    },

}
</script>

<style>

</style>