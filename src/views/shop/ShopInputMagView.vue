<template>
    <v-container fluid>
        <v-toolbar height="40px" background-color="primary" dark>
            <v-toolbar-title>사업신청관리 :</v-toolbar-title>
            <v-col sm=3 md=3>
                <v-select @input="fetchData" v-model="selectShop" 
                    :items="shopList" item-text="n_shop" item-value="i_shop" 
                    class="my-text-field no-padding" dense style="font-size: 0.8rem;"  >
                </v-select>
            </v-col>
            <v-spacer/>
            <tooltip-btn label="조회" @click="fetchData"><v-icon>mdi-magnify</v-icon></tooltip-btn>
            
        </v-toolbar>
        <v-row>
            <v-col col="12" sm="5" md="5">
                <v-data-table :headers="head1" :items="shopInputs" item-key="i_id" single-select
                    :items-per-page="-1" hide-default-footer class="elevation-1 text-no-wrap" :height="iframeHeight" >
                    <template v-slot:item="{ item }">
                        <tr :class="{ 'row_select': item === selected1 }" class="center-align" @click="selectItem1(item)">
                            <td @click="clickDocItem(tabs)" align=left>{{ item.n_company }} </td>
                            <td @click="clickDocItem(tabs)" :class="{greencol: item.f_persioninfo=='1', redcol: item.f_persioninfo != '1'}"> {{ datachk(item.f_persioninfo) }} </td>
                            <td @click="clickDocItem(0)" :class="{greencol: item.chk1=='Y', redcol: item.chk1 != 'Y'}"> {{ datachk(item.chk1) }} </td>
                            <td @click="clickDocItem(1)" :class="{greencol: item.chk2=='Y', redcol: item.chk2 != 'Y'}"> {{ datachk(item.chk2) }} </td>
                            <td @click="clickDocItem(2)" :class="{greencol: item.chk3=='Y', redcol: item.chk3 != 'Y'}"> {{ datachk(item.chk3) }} </td>
                            <td @dblclick="f_dochk(item)" :class="{greencol: item.f_dochk=='Y', redcol: item.f_dochk != 'Y'}"> <u>{{ datachk2(item.f_dochk) }}</u> </td>
                            <td @dblclick="f_enarachk(item)" :class="{greencol: item.f_enarachk=='Y', redcol: item.f_enarachk != 'Y'}"> <u>{{ datachk2(item.f_enarachk) }}</u> </td>
                        </tr>
                    </template>

                </v-data-table>  
            </v-col>
            <v-col col="12" sm="7" md="7">
                <v-tabs v-model="tabs" height="30px" background-color="primary" dark>
                    <v-tab style="font-size: 0.7rem;" value="tbapage_1">회사정보</v-tab>
                    <v-tab style="font-size: 0.7rem;" value="tbapage_2">신청서류</v-tab>            
                    <v-tab style="font-size: 0.7rem;" value="tbapage_3">추가서류</v-tab>
                </v-tabs>                
                <v-tabs-items v-model="tabs" > 
                    <v-tab-item>
                        <v-card-text>                            
                            <table class="type03">
                            <tr><th>업체명</th><td>{{ itemInput?.n_company }}</td></tr>                            
                            <tr><th>사업자번호</th><td>{{ itemInput?.i_regno }}</td></tr>
                            <tr><th>대표자</th><td>{{ itemInput?.n_person }}</td></tr>
                            <tr><th>대표자주민번호</th><td>{{ itemInput?.i_presno }}</td></tr>
                            <tr><th>연락처(유선)</th><td>{{ itemInput?.t_tel1 }}</td></tr>
                            <tr><th>휴대폰</th><td>{{ itemInput?.t_tel2 }}</td></tr>
                            <tr><th>이메일</th><td>{{ itemInput?.i_email }}</td></tr>
                            <tr><th>사업자구분</th><td>{{ itemInput?.f_saugup }}</td></tr>
                            <tr><th>이전중진공사업</th><td>{{ itemInput?.f_run }}</td></tr>
                            <tr><th>3년 표준 재무제표</th><td>{{ itemInput?.f_dart }}</td></tr>
                            <tr><th>이나라도움 아이디</th><td>{{ itemInput?.t_enarainfo }}</td></tr>
                            <tr><th>이나라도움 패스워드</th><td>{{ itemInput?.t_enarainfopw }}</td></tr>
                            <tr><th>우편번호</th><td>{{ itemInput?.i_post }}</td></tr>
                            <tr><th>주소</th><td>{{ itemInput?.t_addr1 }}</td></tr>
                            <tr><th>세부 주소</th><td>{{ itemInput?.t_addr2 }}</td></tr>
                            </table>
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item>
                        <shop-input-mag-file-form @process="saveDocProcess"  @mailSend="mailSend" :fileLists=fileAddsA :companyName=selected1?.n_company></shop-input-mag-file-form>
                    </v-tab-item>
                    <v-tab-item>
                        <shop-input-mag-file-form @process="saveDocProcess"  @mailSend="mailSend" :fileLists=fileAddsB :companyName=selected1?.n_company></shop-input-mag-file-form>
                    </v-tab-item>
                </v-tabs-items> 
                
            </v-col>
            
        </v-row>
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

import ShopInputMagFileForm from './shop_form/ShopInputMagFileForm.vue';
import TooltipBtn from '@/components/etc/TooltipBtn.vue';
import EzDialog2 from '@/components/etc/EzDialog2.vue';
import TiptabMail from '../../components/tiptab/TiptabMail.vue';
export default {
  components: { ShopInputMagFileForm, TooltipBtn, EzDialog2, TiptabMail },
    name: "ShopInputMag",    
    data() {
        return {
            iframeHeight: 500, // 초기 높이 설정 (원하는 높이로 초기화)
            tabs: 0,
            selectShop: null, shopList: [],
            head1: [
                { text: '업체명',  value: 'n_company', align:'center', sortable: false},
                { text: '정보동의', value: 'f_persioninfo', sortable: false, align:'center', width: "10%"},
                { text: '회사정보', value: 'chk1', sortable: false, align:'center', width: "10%"}, 
                { text: '신청서류', value: 'chk2', sortable: false, align:'center', width: "10%"},
                { text: '추가정보', value: 'chk3', sortable: false, align:'center', width: "10%"},
                { text: '공방서류', value: 'f_dochk', sortable: false, align:'center', width: "10%"},  
                { text: 'e 나라', value: 'f_enarachk', sortable: false, align:'center', width: "10%"},
            ],
            shopInputs: [], selected1: [],
            itemInput: null,
            fileAddsA: [], fileAddsB: [],
            mailinfo: {
                title: "",
                to_email: "",
                cc_email: "",
                body: "",
            },
            mailBody: "",
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
            if (!this.selectShop) {
                this.shopList = [];
                return;
            }
            const payload = {
                i_shop: this.selectShop,                
            };
            this.shopInputs = await this.$axios.post(`/api/shopinfo/getShopInputMag`, payload);
            
            
        },
        async selectItem1(item) {
            if (this.selected1 == item) return;
            const item2 = item;

            this.isLoading = true;
            this.selected1 = item; 
            this.itemInput = await this.$axios.post(`/api/shopinfo/getShopInputMag1`, item);
            
            item2.f_gubun = "1"
            this.fileAddsA = await this.$axios.post(`/api/shopinfo/getShopInputMag2`, item2);
            item2.f_gubun = "2"
            this.fileAddsB = await this.$axios.post(`/api/shopinfo/getShopInputMag2`, item2);
            this.isLoading = false;            
        },
        datachk(data) {
            return data == "-" ? '' : data == "1" || data == "Y" ? "완료" : "미등록";
        },
        datachk2(data) {
            return data == "1" || data == "Y" ? "완료" : "미완료";            
        },
        clickDocItem(col) {
            this.tabs = col;    
        },
        async mailSend() { 
            // 메일 팝업차 뛰우기 --> sendMail 호출
            let body = "<p>상기 제목 관련 하여 아래와 같이 첨부 서류 확인 결과 전달 드립니다.</p><p>";
            if (this.tabs === 1) {
                this.mailinfo.title = "스마트공방 신청 서류 확인 안내";
                body = body + "공방 신청 서류</p>" + await this.makeBody(this.fileAddsA);
            } else if (this.tabs === 2) {
                this.mailinfo.title = "스마트공방 추가 서류 확인 안내";
                body = body + "공방 추가 서류</p>" + await this.makeBody(this.fileAddsB);
            }
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
            
            const data = await this.$axios.post(`/api/shopinfo/postMailSend`,this.form);
            this.$refs.ez_wait.close();
            if (data == "ok") {
                this.$ezNotify.alert("정상적으로 메일 발송 하였습니다..... ", "성공");
                this.$refs.dialog.close();
            }            
        },
        async makeBody(items) {
            let body = ""
            items.forEach((data) => {
                let n_status = data.f_noact=='Y' ? "접수" : data.f_noact=='N' ? "반려" : data.f_noact=='I' ? '검토' : data.f_noact=='R' ? '검토' : '미등록';
			    body = body + `<p>${data.f_noact=='Y'?'':'<span style="color:red"'}>${data.n_filename} : 서류${n_status}${data.f_noact=='Y'?'':'</span>'}</p>`;		        
            });
            body = body + `<p>반려된 첨부서류에 대해서 재 등록 부탁 드립니다.</p>`;
		    body = body + `<p></p>감사 합니다.`
            return body;
        },

        async f_dochk(item) {
            const res = await this.$ezNotify.confirm("처리 하시겠습니까  ?", "공방서류");
            if (res ) {
                if (item.f_dochk == "Y") {
                    item.f_dochk  = 'N' ;
                } else {
                    item.f_dochk  = 'Y' ;
                } 
                // console.log(item)
                const data = await this.$axios.post(`/api/shopinfo/ShopInputMagDocChk`, item);               
            }             
        },
        async f_enarachk(item) {
            const res = await this.$ezNotify.confirm("처리 하시겠습니까  ?", "이나라도움 등록");
            if (res ) {
                if (item.f_enarachk == "Y") {
                    item.f_enarachk  = 'N' ;
                } else {
                    item.f_enarachk  = 'Y' ;
                    const data = await this.$axios.post(`/api/shopinfo/ShopInputMageNaraChk`, item);
                    // const data = await this.$axios.patch(`/api/shopinfo/getShopInputMag?i_shop=${item.i_shop}&i_no=${item.i_no}&f_enarachk=${item.f_enarachk}`);
                }           
            }
        },

        async saveDocProcess(item) {
            for (let ob in item) {
                if(item[ob].f_edit == '1') {
                    // console.log(item[ob])
                    const data = this.$axios.post(`/api/shopinfo/ShopInputMag2Save`, item[ob]);
                }
            }
        },
    },

}
</script>

<style>
</style>