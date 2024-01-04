<template>
    <v-form  ref="form">
        <v-toolbar color="#c2fad8" height="30px" >
            <v-btn v-if="fileLists.length" color="primary" x-small>서류처리</v-btn>
            &nbsp;&nbsp;
            <v-btn v-if="fileLists.length" color="primary" x-small>메일발송</v-btn>
            <v-spacer/>
            <v-checkbox v-if="fileLists.length" label="서류명"  hide-details color="primary"  class="small-checkbox" ></v-checkbox>
            &nbsp;
            <v-btn v-if="fileLists.length" color="primary" x-small>일괄내려받기</v-btn>
        </v-toolbar>
        <v-data-table :headers="fileHeaders" single-select :items="fileLists"
                    :items-per-page="-1" hide-default-footer class="elevation-1 text-no-wrap"  >
            <template v-slot:item="{ item }">        
                <tr :class="{ 'row_select': item === selected }" class="center-align" @click="selectItem(item)">
                    <td align=center> {{ item.i_ser }} </td>
                    <td align=center :class="{redcol: item.f_yn==1, greencol: item.f_yn == 0}">{{f_ynchk(item.f_yn)}} </td>                    
                    <td align=center @dblclick="docProcess(item)"
                        :class="{redcol: item.f_noact=='N', greencol: item.f_noact == 'Y',  bluecol: item.f_noact == 'I' }" > 
                        <u>{{ f_noact(item.f_noact) }}</u>
                    </td>
                    <td align=left> {{ item.n_filename }} </td>
                    <td align=left> {{ item.n_file }} </td>
                    <td align=center>
                        <v-btn v-if=item.t_att  x-small  @click="downLoad(item)">
                        <v-icon class="small-checkbox">mdi-file-download</v-icon>
                        </v-btn>                
                    </td>   
                </tr>
            </template>
        </v-data-table>
    </v-form>
</template>

<script>
import { deepCopy } from "../../../../util/lib";
import { save } from 'save-file';
export default {
    name: "ShopInputMagFileForm",
    props: {
        fileLists: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            fileHeaders : [
                { text: '순번',           value: 'i_ser', sortable: false, align:'center', width: "30px"},
                { text: '필수',       value: 'f_yn', sortable: false, align:'center', width: "30px"},
                { text: '서류',           value: 'f_noact', sortable: false, align:'center', width: "40px"},
                { text: '첨부서류',       value: 'n_filename', sortable: false, align:'center', }, 
                { text: '첨부파일명',     value: 'n_file', sortable: false, align:'center', },
                { text: 'DOWN',          value: 't_att', sortable: false, align:'center', width: "55px"},
            ],
            selected:[],
        }
    },
    created() {       
        this.init();
    },
    watch: {

    },
    methods: {
        init() {
        },
        f_ynchk(data) {
            return data == 1  ? '필수' : '선택';
        },
        f_noact(data) {
            return data == "I" ? "등록" : (data == "Y") ? "확인" : (data == "N") ? "반려" : (data == "R") ? '수정': "";
        },
        docProcess(item) {            
            if (item.f_noact) {
                item.f_noact = item.f_noact == "Y" ? "N" : "Y";    
                item.f_edit = true;            
            }
        },
        selectItem (item){
            if (this.selected == item) return;
            this.selected = item;
        },
        async process(form) {
            this.$emit("process", form);
        },
        async mailSend() {
            this.$emit("mailSend")            
        },

        async downLoad(item) {
            const disableAutoBOM = true;

            const downFile = item.n_file;
            const fileBuffer = await this.$axios.get(`/api/shopinfo/getFileDown?path=${ item.t_att }`);            
            if (fileBuffer ) {
                save (fileBuffer, downFile);
                alert('File Donw load Click !!!!!'); 
            } else {
                await this.$ezNotify.alert("다운로드 실패 !!", "오류", {
                    // icon: "mdi-video-4k-box",
                });
            }
        },
        async alldownLoad() {
            const path = require('path');
            let f_filetype = '1';

            if (this.f_downchk2) { f_filetype = '2'};
           
            if (this.fileLists) {
                const fileBuffer = await this.$axios.get(`/api/shopinfo/getFileDownZip?i_shop=${ this.fileLists[0].i_shop }&i_no=${ this.fileLists[0].i_no }&f_gubun=${ this.fileLists[0].f_gubun }&f_filetype=${f_filetype}`);
                if (fileBuffer ) {
                    save (fileBuffer, `${this.companyName}.zip`);
                    alert('File Donw load Click !!!!!'); 
                } else {
                   await this.$ezNotify.alert("다운로드 실패 !!", "오류" );
                }
            }
            return ;             
        },    
    },
}
</script>

<style>

</style>