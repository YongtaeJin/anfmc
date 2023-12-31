<template>
    <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation @@submit.prevent="edit">
        <v-data-table :headers="headers"  :items="form" single-select  item-key="i_ser"
            :items-per-page="-1" hide-default-footer             
            class="elevation-1 text-no-wrap">
            <template v-slot:item="{ item }">
                <tr :class="{ 'row_select': item === selected}" class="center-align" @click="selectItem(item)" @dblclick="showRowInfo()">                     
                    <td :class="{red2: item.f_yn==1, green2: item.f_yn == 2, blue2: item.f_yn == 3}"> {{ item.f_gubun == '1' ? '신청서' : item.f_gubun == '2' ? '추가정보' : '협약서' }} </td>                     
                    <td :class="{red2: item.f_yn==1, green2: item.f_yn == 2, blue2: item.f_yn == 3}"> {{ item.i_sort }} </td>
                    <td :class="{red2: item.f_yn==1, green2: item.f_yn == 2, blue2: item.f_yn == 3}"> {{ item.f_yn == '1' ? '필수' : '선택' }} </td>
                    <td :class="{red2: item.f_yn==1, green2: item.f_yn == 2, blue2: item.f_yn == 3}"> {{ item.n_nm }} </td>
                    <td class="left-align" :class="{red2: item.f_yn==1, green2: item.f_yn == 2, blue2: item.f_yn == 3}">  {{ item.n_file }} </td>                    
                    <td class="left-align"> {{ item.t_remark }} </td>
                </tr>
            </template>
        
        </v-data-table>
    </v-form>
</template>

<script>
import { deepCopy } from "../../../../util/lib";
export default {
    name: "ShopmagFileForm",
    props: {
        addLists: {
            type: Array,
            default: null,
        },        
    },
    data() {
        return {
            valid: true, 
            headers: [                
                { text: '구분', value: 'f_gubun', sortable: false, width: "60px", fixed: true, align:'center', },
                { text: '순번', value: 'i_sort', sortable: false, width: "35px", fixed: true,  align:'center'},                
                { text: '필수', value: 'f_yn', sortable: false, width: "50px", fixed: true, align:'center'}, 
                { text: '명칭', value: 'n_nm', sortable: false, width: "75px", fixed: true,  align:'center'},
                { text: '첨부서류', value: 'n_file', sortable: false, width: "30%", fixed: true, align:'center'},
                { text: '파일명', value: 't_filenm', sortable: false, width: "20%x", fixed: true, align:'center', align:' d-none'},                
                { text: '비고', value: 't_remark', sortable: false, width:"40%", align:'center',},                
            ],
            form: {
                i_shop: "",
                i_ser: "",
                f_gubun: "",
                f_yn: "",
                n_nm: "",
                n_file: "",
                t_filenm: "",
                t_remark: "",
                t_sample: "",
                i_sort: "",
                f_del: "",                
            },
            item: null,
            selected:[],
        }
    },
    watch: {
        addLists() {
            this.init();
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            if (this.addLists) {this.form = deepCopy(this.addLists);}
        },
        async selectItem(item) {
            if (this.selected == item) return;
            this.selected = item;
            
        },
        async showRowInfo() {
            if (this.selected) this.$emit("edit", this.selected );    
            
        },
      
    },
}
</script>

<style>

</style>