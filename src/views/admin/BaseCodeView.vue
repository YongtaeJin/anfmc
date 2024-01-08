<template>
    <v-container fluid>
        <v-toolbar height="40px" background-color="primary" dark>
            <v-toolbar-title>시스템코드 관리</v-toolbar-title>
            <v-spacer/>           
            <tooltip-btn label="조회" @click="init"><v-icon>mdi-magnify</v-icon></tooltip-btn>            
        </v-toolbar>
        <v-layout>
            <v-flex xs5>
                <grpcode-form @onSelect="grpSelect" @onDelete="grpDelete" :data="grpCodelist" :job="true" :iframeHeight="iframeHeight"></grpcode-form>
            </v-flex>
            <v-flex xs7>            
                <comcode-form @onSave="comSave" @onDelete="comDelete" :data="comGrpCode" c_com='BASECODE' :c_gcode="c_gcode" :title="comTitle" :iframeHeight="iframeHeight"></comcode-form>
            </v-flex>
        </v-layout>
       
    </v-container>
</template>

<script>
import TooltipBtn from '@/components/etc/TooltipBtn.vue'
import GrpcodeForm from '../system/SystemComponent/GrpcodeForm.vue'
import ComcodeForm from '../system/SystemComponent/ComcodeForm.vue'
export default {
    components: { TooltipBtn, GrpcodeForm, ComcodeForm, }, 
    name: "BaseCode",
    
    data() {
        return {
            iframeHeight: 500, // 초기 높이 설정 (원하는 높이로 초기화)
            grpCodelist: [], comCodeList: [], comGrpCode: [],
            c_gcode: "", c_code: "",
            comTitle: "Code",
        }
    },
    
    beforeDestroy() {
        // 컴포넌트가 파기될 때 리스너 제거
        window.removeEventListener('resize', this.adjustIframeHeight);
    },
    created() {
        this.init();
    },    
    mounted() {
        // 창 크기가 변경될 때마다 iframe의 높이를 조정
        window.addEventListener('resize', this.adjustIframeHeight);
        this.adjustIframeHeight(); // 초기 조정       
    },
    methods: {
        adjustIframeHeight() {
        // 브라우저 창의 높이를 iframe의 높이로 설정
            const windowHeight = window.innerHeight;
            this.iframeHeight = windowHeight - 200;           
        },
        async init() {
            this.comGrpCode.splice(0);
            this.grpCodelist = await this.$axios.get(`/api/system/grpcode?c_com=BASECODE`);
            this.comCodeList = await this.$axios.get(`/api/system/comcode?c_com=BASECODE`);
        },
        grpSelect(grpcode) {            
            this.c_gcode = grpcode.c_gcode;
            this.comTitle = 'Code : '  + grpcode.c_gcode + ' / ' + grpcode.n_gcode;
            this.comGrpCode = this.comCodeList.filter((item) => {
                return item.c_gcode == grpcode.c_gcode && item.c_com == grpcode.c_com;
            });
        },
        grpDelete() {
            this.comGrpCode.splice(0);
        },
        comDelete(item) {
            const idx = this.comCodeList.indexOf(item);
            if (idx) this.comCodeList.splice(idx, 1);
        },
        comSave(item) {            
            const idx = this.comCodeList.findIndex(e => e.c_code == item.c_code);            
            idx >= 0 ? this.comCodeList.splice(idx, 1, item) : this.comCodeList.push(item);
        }
        
    }
}
</script>

<style>

</style>