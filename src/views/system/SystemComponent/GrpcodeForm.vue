<template>
    <div>
        <v-toolbar height="40px" background-color="primary" >
            <v-toolbar-title>Group Code</v-toolbar-title>
            <v-spacer/>           
            <tooltip-btn v-if="job" label="추가" @click="add" fab x-small><v-icon>mdi-plus</v-icon></tooltip-btn>            
            <tooltip-btn v-if="job" label="삭제" @click="del" fab x-small><v-icon>mdi-minus</v-icon></tooltip-btn>
        </v-toolbar>
        <v-data-table :headers="headers" :items="data" @click:row="rowSelect" @dblclick:row="showRowInfo" class="elevation-1 text-no-wrap" 
            item-key=generateItemKey single-select
            :items-per-page="-1" hide-default-footer 
            :height=iframeHeight >

            <template v-slot:item="{ item }">
                <tr :class="{ 'row_select': item === selected }" class="center-align" @click="rowSelect(item)" @dblclick="showRowInfo(item)">
                    <td> {{ item.s_sort }}</td>
                    <td> {{ item.c_gcode }}</td>
                    <td> {{ item.n_gcode }}</td>
                    <td align=left> {{ item.t_remark }}</td>
                </tr>
            </template>
        </v-data-table>
        
        <ez-dialog ref="dialog" label="Grop Code" persistent width="350px">
            <grpcode-detail-form @onSave="grpSave" :data="selected" :job="job" c_com='BASECODE' :keyCheckId="keyCheckGrp" :s_sort=getMaxNo>
            </grpcode-detail-form>            
        </ez-dialog>
    </div>    
    
</template>

<script>
import { mapActions } from "vuex";
import EzDialog from '@/components/etc/EzDialog.vue';
import TooltipBtn from '../../../components/etc/TooltipBtn.vue';
import GrpcodeDetailForm from './GrpcodeDetailForm.vue';
export default {
  components: { TooltipBtn, EzDialog, GrpcodeDetailForm },
    name: "GrpcodeForm",
    props: {
        data: {
            type: Array,
            default: null,
        },
        job: { type: Boolean, default: false, },        
        iframeHeight: { Type: Number, default: 470, }
    },
    data() {
        return {
            headers: [
                {text: 'No',  value: 's_sort', sortable: false, align:'center', width:"40px" },
                {text: 'Code',  value: 'c_gcode', sortable: false, align:'center', },
                {text: '명칭',  value: 'n_gcode', sortable: false, align:'center', },
                {text: '비고',  value: 't_remark', sortable: false, align:'center', }, 
                ],
            selected: [],
            item: null,
        }        
    },
    watch: {
        data() {            
            this.item = null;
        }
    },
    computed: {
        getMaxNo() {            
            const max = Math.max(...this.data.map((item) => item.s_sort));
            return isFinite(max) ? max : 0;
        },
    },
    methods: {
        ...mapActions("system", ["duplicateGrpcodeCheck"]),
        async fetchData() {
            
            
        },
        generateItemKey(item) {
            return `${item.c_gcode}-${item.c_com}`;
        }, 
        async add() {
            this.selected = null;
            this.showRowInfo();
        },
        async del() {
            const idx = this.data.indexOf(this.selected);            
            if (idx < 0) return;
            const result = await this.$ezNotify.confirm(
			 	`<b>Code : ${this.selected.c_gcode}</b> 삭제 하시겠습니까 ?`,
			 	`Group Code`,
			 	{icon : 'mdi-delete', iconColor: 'red'}
			);
            if(!result) return;
            const data = await this.$axios.delete(`/api/system/delGprCode/${this.selected.c_com}/${this.selected.c_gcode}`);
            if(data) {                 
                this.$toast.info(`[${this.selected.c_gcode}] 삭제 하였습니다.`);
                this.$emit('onDelete');
                this.data.splice(idx, 1);
            }
        },       
        async rowSelect(item) {
            if (this.selected == item) return;
            this.selected = item;
            this.$emit('onSelect', item);
        },
        async showRowInfo( item ) {
            this.$refs.dialog.open();
        },
        async keyCheckGrp(value1, value2){           
            const payload = {
                com: "c_com",
                value1, 
                grp: "c_gcode",
                value2,
            };            
            return await this.duplicateGrpcodeCheck(payload); 
        },
        async grpSave(form) {            
            form.isnew = !this.selected;
            const data = await this.$axios.post(`/api/system/iuGprCode`, form);
            delete form.isnew;
            if (!!data) {
                this.$refs.dialog.close();
                const idx = this.data.findIndex(e => e.c_gcode == data.c_gcode);
                if (idx >= 0) {
                    this.data.splice(idx, 1, data)
                } else {
                    this.data.push(data)
                } 
            }

        },
    }
}
</script>

<style>
    
</style>