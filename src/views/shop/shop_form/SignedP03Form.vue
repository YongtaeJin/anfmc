<template>
    <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
        {{editJob}}
        <v-data-table :headers="headers"  :items="items" single-select  item-key="i_ser"
            :items-per-page="-1" hide-default-footer  :expanded.sync="expanded" :single-expand="singleExpand"  
            class="elevation-1 text-no-wrap">
            <template v-slot:item="{ item, expand, isExpanded }">
                <tr :class="{ 'row_select': item === selected }" class="center-align" @click="selectItem(item)">
                    <td align=center :class="{red2: item.f_yn==1, green2: item.f_yn == 0}">{{f_ynchk(item.f_yn)}} </td>
                    <td align=left :class="{red2: item.f_yn==1, green2: item.f_yn == 0}">{{ item.n_nm}} </td>
                    <td align=center>
                        <v-btn v-if="item.t_sample" x-small fab  @dblclick="downLoad(item)"> <v-icon>mdi-note</v-icon> </v-btn>
                    </td>
                    <td align=left> {{ item.n_filename }} <v-icon v-if="item.t_remark" @click="expand(!isExpanded)">mdi-help-circle-outline</v-icon></td>            
                    <td align=center :class="{red2: item.f_noact=='N', green2: item.f_noact == 'Y'}"> {{ f_noact(item.f_noact) }} </td>
                    <td align=left> {{ item.n_file2 }} </td>
                    <td align=center>
                        <v-file-input v-if="editJob" v-model="item.n_file" :multiple="false"
                            @change="getFilename($event, item)" dense hide-input
                            color="primary accent-4" hide-details prepend-icon="mdi-file-upload" />
                    </td> 
                    <td align=center>
                        <v-btn v-if="item.n_file2 && editJob" fab x-small  @click="deleteClick(item)">
                            <v-icon dark>mdi-delete-circle-outline</v-icon>
                        </v-btn>                
                    </td> 
                    <td align=center>
                        <v-btn v-if=item.n_file2 fab x-small  @click="downClick(item)">
                            <v-icon dark>mdi-file-download</v-icon>
                        </v-btn>                
                    </td>
                </tr>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="3"> </td>
                <td :colspan="headers.length - 3" class="green2_2">{{ item.t_remark }} </td>
            </template>
        </v-data-table>
        <!-- <br /><br />
        <v-btn  color="primary" type="submit" block>저 장 </v-btn> -->
    </v-form>
</template>

<script>
import { deepCopy } from "../../../../util/lib";
import { save } from 'save-file';
export default {
    name: "SignedP03Form",
    props: {
        items: {            
            type: Object ,
            default: null,
        },      
        editJob: {type: Boolean, default: false}
    },
    data() {
        return {
            valid: true,
            expanded: [],
            singleExpand: true,
            form: {
                i_shop: null,
                i_ser: null,        
                f_yn: null,
                n_filename: null,
                i_no: null,
                n_file2: null,
                n_file: null,
                t_att: null,
                f_noact: null,
                t_sample: null,
                t_samplefile: null,
                f_del: null,
                t_remark: null,
            },
            headers: [                
                { text: '필수', value: 'f_yn', sortable: false, width: "60px", fixed: true, align:'center'},
                { text: '명칭', value: 'n_nm', sortable: false, align:'center', width: "100px" },
                { text: '양식', value: 'f_sample', sortable: false, width: "60px", fixed: true, align:'center'},                
                { text: '첨부서류', value: 'n_filename', sortable: false, align:'center', width: "200px" },                
                { text: '확인', value: 'f_noact', sortable: false, align:'center', width: "55px"},
                { text: '파일명', value: 'n_file2', sortable: false, align:'center', },
                { text: 'UP', value: 'n_file', sortable: false, align:'center', width: "50px" },
                { text: '삭제', value: 'f_del', sortable: false, align:'center', width: "50px" },
                { text: 'DOWN', value: 't_att', sortable: false, align:'center',  width: "50px" },
            ],
            selected:[],
        }
        
    },

    methods: {
        f_ynchk(data) {
            return data == 1  ? '필수' : '선택';
        },
        f_noact(data) {
            return data == 'I' ? '○' : (data == 'Y') ? '●' : (data == 'N') ? '●' : (data == 'R') ? '○'  : '';
        },
        async getFilename(files, data) {
            if (files) { data.t_att = files.name } else { return };
            if(data.n_file2) {
                if ( ! await this.$ezNotify.confirm("이전 서류를 변경 하시겠습니까 ?", "서류 수정") ) {
                    data.n_file = null;
                    return
                }
            }
            if(!data.i_id) data.i_id = this.$store.state.user.member?.i_id;

            const formData = new FormData();   
            for (const key of Object.keys(data)) {
                formData.append(key, data[key]);             
            }
            this.$emit("save", formData, data);            
        },
        async save() {
            // this.$emit("save", this.form);
        },
        selectItem(item, index) {
            this.selected = item;
            // console.log(index, item)
            
        },
        async downLoad(item) {
            const fileName = `https://anfmc.kro.kr${item.t_sample}`;
            const downFile = item.t_samplefile;
            const fileBuffer = await this.$axios.get(`/api/shopinfo/getFileDown?path=${ item.t_sample }`); 
            if (fileBuffer ) {
                save (fileBuffer, downFile);
                alert('File Donw load Click !!!!!'); 
            } else {
                await this.$ezNotify.alert("다운로드 실패 !!", "오류" );
            }
        },
        async deleteClick(item) {
            const res = await this.$ezNotify.confirm("삭제 하시겠습니까 ?", item.n_filename);
            if (res) {
                const data = await this.$axios.delete(`/api/shopinfo/attfiles/delete/${item.i_shop}/${item.i_id}/${item.i_ser}`);
                if (data) {
                    item.n_file = null;
                    item.n_file2 = null;
                    item.t_att = null;
                    item.f_noact = null;
                }
            }
        },
        async downClick(item) {
            const fileName = `https://anfmc.kro.kr${item.t_att}`;
            const downFile = item.n_file2;
            const fileBuffer = await this.$axios.get(`/api/shopinfo/getFileDown?path=${ item.t_att }`); 
            if (fileBuffer ) {
                save (fileBuffer, downFile);
                alert('File Donw load Click !!!!!'); 
            } else {
                await this.$ezNotify.alert("다운로드 실패 !!", "오류" );
            }
        },
    }
}
</script>

<style>

</style>