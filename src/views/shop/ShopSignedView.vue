<template>
    <v-container fluid>
        <v-toolbar height="40px" background-color="primary" dark>
            <v-toolbar-title>스마트공방 신청</v-toolbar-title>
            <v-spacer/>
        </v-toolbar>       
        <v-tabs v-model="tabs" background-color="primary" dark height="35px">
            <v-tab value="tbapage_1" style="flex: 1">개인정보 동의</v-tab>
            <v-tab value="tbapage_2" style="flex: 1">회사 정보</v-tab>
            <v-tab value="tbapage_3" style="flex: 1">스마트공방 신청</v-tab>
            <v-tab value="tbapage_4" style="flex: 1">회사 추가 정보</v-tab>
            <v-tab value="tbapage_5" style="flex: 1">협약서 서류</v-tab>
        </v-tabs>
        <v-card-text>
            <v-tabs-items v-model="tabs">
                <v-tab-item><signed-p-01-form @save="save1" :i_shop=shopchk.i_shop :item=shopinfo :f_chk=shopinfo[0]?.f_persioninfo></signed-p-01-form></v-tab-item>
                <v-tab-item><signed-p-02-form @save="save2" :item=shopinfo></signed-p-02-form></v-tab-item>
                <v-tab-item><signed-p-03-form @save="save3" :items=shioinfofiles :editJob=!FILECHK></signed-p-03-form> </v-tab-item>
                <v-tab-item><signed-p-03-form @save="save4" :items=shioinfofilesadd :editJob=!FILECHK></signed-p-03-form> </v-tab-item>
                <v-tab-item><signed-p-03-form @save="save5" :items=shopargeefiles :editJob=!ARGEE></signed-p-03-form> </v-tab-item>
            </v-tabs-items>
        </v-card-text>
    </v-container>

</template>

<script>
import qs from "qs";
import SignedP01Form from './shop_form/SignedP01Form.vue';
import SignedP02Form from './shop_form/SignedP02Form.vue';
import SignedP03Form from './shop_form/SignedP03Form.vue';
export default {
  components: { SignedP01Form, SignedP02Form, SignedP03Form },
    name :"ShopSigned",
	data() {
        return {
            tabs: 0,
            isLoading: false,
            iframeHeight: 500, // 초기 높이 설정 (원하는 높이로 초기화)
            items: [
                {id:'Sucess', name:'개인정보 동의', enable:'Y'},
                {id:'Cominfo', name:'회사 정보', enable:'Y'},
                {id:'Input', name:'스마트공방 신청', enable:'Y'},
                {id:'Addinfo', name:'회사 추가 정보', enable:'Y'},
                {id:'Argee', name:'협약서 서류', enable:'Y'},
            ],
            shopchk: [],
            shopinfo: [],
            shioinfofiles: [],
            shopinfofilesadd: [],
            shopargeefiles: [],
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
        
        this.fetchData();        
    },
    beforeDestroy() {
        // 컴포넌트가 파기될 때 리스너 제거
        window.removeEventListener('resize', this.adjustIframeHeight);
    },
    watch: {
    },
    computed: {
        FMCREG() { 
            return this.$store.state.user.member?.c_com == "FMCREG";
        },
        SHOPCHK() {
            return this.shopchk?.i_shop;
        },
        FILECHK() {
            return this.shopinfo[0]?.f_dochk == 'Y';
        },       
        ARGEE() {
            return this.shopinfo[0]?.f_argeechk == 'Y' ;
        },
    },
    methods: {
        adjustIframeHeight() {
        // 브라우저 창의 높이를 iframe의 높이로 설정
            const windowHeight = window.innerHeight;
            this.iframeHeight = windowHeight - 200;           
        },
        async fetchData() {
            if (!this.FMCREG) return;
            this.shopchk = await this.$axios.get("/api/shopinfo/checkShopinfo");
            if (!this.shopchk) {
                this.$toast.warning(`스마트공방 신청(등록)기간이 아닙니다.`);
                return this.$router.push("/");
            }

            const query = qs.stringify({i_shop: this.shopchk.i_shop, i_id: this.$store.state.user.member?.i_id});
            this.shopinfo = await this.$axios.get(`/api/shopinfo/ShopinfoDetail?${query}`);            
            if (this.shopinfo) {
                // 개인정보 동의 후 회사정보  tab으로 이동 처리
                this.f_chk = this.shopinfo[0]?.f_persioninfo;
                if (this.SHOPCHK) {
                    this.shioinfofiles = await this.$axios.get(`/api/shopinfo/ShopAttFiles?${query}`);
                    this.shioinfofilesadd = await this.$axios.get(`/api/shopinfo/ShopAttFilesAdd?${query}`);
                    this.shopargeefiles = await this.$axios.get(`/api/shopinfo/ShopAttFilesArgee?${query}`);
                }
            }                
        },

        async save1(form) {
            const data = await this.$axios.post(`/api/shopinfo/ShopinfoUpdate`, form)
            if (data.affectedRows > 0) {                
                const query = qs.stringify({i_shop: this.shopchk.i_shop, i_id: this.$store.state.user.member?.i_id});
                this.shopinfo = await this.$axios.get(`/api/shopinfo/ShopinfoDetail?${query}`);
                if (this.shopinfo) this.f_chk = this.shopinfo[0].f_persioninfo;
            }
        },
        async save2(form) {
            const data = await this.$axios.post(`/api/shopinfo/ShopComUpdate`, form)
            if (data) {
                this.$toast.info(`회사정보 내용을 저장 하였습니다.`);
            }
        },
        async save3(item, data) {
            const rv = await this.$axios.patch(`/api/shopinfo/attfiles/upload`, item);
            if ( rv ) {
                data.n_file2 = data.t_att;
                data.f_noact = data.f_noact == 'N' ? 'R' : data.f_noact ? data.f_noact : 'I';
            }
        },
        async save4(item, data) {
            const rv = await this.$axios.patch(`/api/shopinfo/attfiles/upload`, item);
            if ( rv ) {
                data.n_file2 = data.t_att;
                data.f_noact = data.f_noact == 'N' ? 'R' : data.f_noact ? data.f_noact : 'I';
            }
        },
        async save5(item, data) {
            const rv = await this.$axios.patch(`/api/shopinfo/attfiles/upload`, item);
            if ( rv ) {
                data.n_file2 = data.t_att;
                data.f_noact = data.f_noact == 'N' ? 'R' : data.f_noact ? data.f_noact : 'I';
            }
        },
    }
}
</script>

<style>

</style>