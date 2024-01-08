<template>
    <div>
        <v-toolbar height="40px" background-color="primary" >
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer/>                       
            <tooltip-btn label="추가" @click="add" fab x-small><v-icon>mdi-plus</v-icon></tooltip-btn>            
            <tooltip-btn label="삭제" @click="del" fab x-small><v-icon>mdi-minus</v-icon></tooltip-btn>
        </v-toolbar>
        <v-data-table :headers="headers" :items="data" @click:row="rowSelect" @dblclick:row="showRowInfo" class="elevation-1 text-no-wrap" 
            item-key=generateItemKey single-select
            :items-per-page="-1" hide-default-footer :height=iframeHeight>
            <template v-slot:item="{ item }">
                <tr :class="{ 'row_select': item === selected }" class="center-align" @click="rowSelect(item)" @dblclick="showRowInfo(item)">                    
                    <td :class="{redcol: item.f_base=='B'}"> {{ item.s_sort }}</td>
                    <td :class="{redcol: item.f_base=='B'}"> {{ item.c_code }}</td>
                    <td :class="{redcol: item.f_base=='B'}"> {{ item.n_code }}</td>
                    <td align="left"> {{ item.s_buf1 }} </td>
                    <td align="left"> {{ item.s_buf2 }} </td>
                    <td align="right"> {{ item.m_buf1 }} </td>
                    <td align="right"> {{ item.m_buf2 }} </td>
                    <td align="left"> {{ item.t_remark }} </td>
                </tr>
            </template> 
        </v-data-table>
        <ez-dialog ref="dialog" label="Code Info" persistent @onClose="closeComcode" width="350px">            
            <comcode-detail-form @onSave="comSave" :data="selected" :c_com="c_com" :c_gcode="c_gcode" :keyCheckId="keyCheckComcode" :isLoad="isLoad" :s_sort=getMaxNo>
            </comcode-detail-form>
        </ez-dialog>
    </div>    
</template>

<script>
import { mapActions } from "vuex";
import TooltipBtn from '../../../components/etc/TooltipBtn.vue'
import EzDialog from '@/components/etc/EzDialog.vue';
import ComcodeDetailForm from './ComcodeDetailForm.vue';
export default {
  components: { TooltipBtn, EzDialog, ComcodeDetailForm },
    name: "ComcodeForm",  
      props: {
        data: {
            type: Array,
            default: null,
        }, 
        title: { type: String, default: null, },
        c_com: {type: String, default: null},
        c_gcode: {type: String, default: null},
        iframeHeight: { Type: Number, default: 470, },        
    },
    watch: {
        
    },
    computed: {
        getMaxNo() {            
            const max = Math.max(...this.data.map((item) => item.s_sort));
            return isFinite(max) ? max : 0;
        },
    },
    data() {
        return {
            headers: [
                {text: 'No',  value: 's_sort', sortable: false, align:'center', width:"30px" },
                {text: 'Code',  value: 'c_code', align:'center', sortable: false,  },
                {text: '명칭',  value: 'n_code', align:'center', sortable: false,  },
                {text: '문자1',  value: 's_buf1', align:'center', sortable: false,  },
                {text: '문자2',  value: 's_buf2', align:'center', sortable: false,  },
                {text: '숫자1',  value: 'm_buf1', align:'center', sortable: false,  },
                {text: '숫자2',  value: 'm_buf2', align:'center', sortable: false,  },
                {text: '비고',  value: 't_remark', align:'center', sortable: false, }, 
                ],
            selected: [], isLoad: false, isLoading: false,
        }
    },
    methods: {
        ...mapActions("system", ["iuComCode", "duplicateComcodeCheck"]),
        generateItemKey(item) {
            return `${item.c_com}-${item.c_gcode}-${item.c_code}`;
        }, 
        async fetchData() {

        },
        async add() {            
            if (!this.c_com) return;
            if (!this.selected)  {                
                this.selected = this.data[0];                
            }
            this.selected = null;
            this.isLoad = true;
            this.showRowInfo();
        },
        async del() {            
            const idx = this.data.indexOf(this.selected);
            if (idx < 0) return;

            if (this.selected.f_base == 'B' && this.selected.c_com !== 'BASECODE') {
                this.$toast.warning(`[${this.selected.c_code}] 필수 항목 입니다.`);
                return;
            }
            const result = await this.$ezNotify.confirm(
			 	`<b>Code : ${this.selected.c_code}</b> 삭제 하시겠습니까 ?`,
			 	`Code`,
			 	{icon : 'mdi-delete', iconColor: 'red'}
			);
            if(!result) return;
            const data = await this.$axios.delete(`/api/system/delComCode/${this.selected.c_com}/${this.selected.c_gcode}/${this.selected.c_code}`);
            if(true) {
                this.data.splice(idx, 1);
                this.$emit('onDelete', this.selected)
                this.$toast.info(`[${this.selected.c_code}] 삭제 하였습니다.`);
            } 
        },
        async rowSelect(item) {
            if (this.selected == item) return;
            this.selected = item;            
        },
        async showRowInfo( item ) {
            this.isLoad = true;
            this.$refs.dialog.open();
        },
        async keyCheckComcode(value1, value2, value3){                  
            const payload = {
                com: "c_com",
                value1, 
                grp: "c_gcode",
                value2,
                cod: "c_code",
                value3,
            };            
            return await this.duplicateComcodeCheck(payload); 
        },
        closeComcode() {
            this.isLoad = false;
        },
        async comSave(form) {
            this.isLoading = true;
            form.isnew = !this.selected;
            const data = await this.iuComCode(form);
            delete form.isnew;
            this.isLoading = false;
            if (data) {                
                this.$toast.info(`[${data.c_code}] 저장 하였습니다.`);                
                const idx = this.data.findIndex(e => e.c_code == data.c_code);
                idx >= 0 ? this.data.splice(idx, 1, data) : this.data.push(data);
                this.$emit('onSave', data)
            }
            this.$refs.dialog.close();
        },
    }
}
</script>

<style>
    
</style>