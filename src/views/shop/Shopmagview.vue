<template>
    <v-container fluid>
        <v-toolbar height="40px" background-color="primary" dark>
            <v-toolbar-title>사업관리</v-toolbar-title>
            <v-spacer/>           
            <tooltip-btn v-if="this.tabs==0 &&  this.$store.state.user.member.i_level > 9" fab small label="사업추가" @click="addShop">
                <v-icon>mdi-plus</v-icon>
            </tooltip-btn>
            <tooltip-btn v-if="this.tabs>=1" fab small label="첨부 서류 추가" @click="addFile">
                <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
            </tooltip-btn>
        </v-toolbar>

        <v-tabs v-model="tabs" background-color="primary" dark height="35px">
            <v-tab value="tbapage_1" style="flex: 1" >사업 내역</v-tab>
            <v-tab value="tbapage_2"  >신청 서류</v-tab>            
            <v-tab value="tbapage_3"  >추가 서류</v-tab>
            <v-tab value="tbapage_4"  >협약서 서류</v-tab>
        </v-tabs>
        <v-card-text>
            <v-tabs-items v-model="tabs"> 
                <v-tab-item>
                    <v-data-table ref="shop-table" :headers="itemShopHead" :items="itemShops"                     
                        item-key="i_shop" single-select @click:row="rowSelectitemShop" @dblclick:row="rowShopitemSet"
                        :items-per-page="-1"  hide-default-footer class="elevation-1 text-no-wrap"  :height=iframeHeight >
                        <template v-slot:[`item.t_remark`]="{ item }"> <div class="left-align"> {{ item.t_remark }}</div></template>
                    </v-data-table>
                </v-tab-item>
                
                <v-tab-item v-if="this.itemShopRow>=0"><shopmag-file-form :addLists="this.fileAddsA" @edit="addFile"></shopmag-file-form></v-tab-item>
                <v-tab-item v-if="this.itemShopRow>=0"><shopmag-file-form :addLists="this.fileAddsB" @edit="addFile"></shopmag-file-form></v-tab-item>
                <v-tab-item v-if="this.itemShopRow>=0"><shopmag-file-form :addLists="this.fileAddsC" @edit="addFile"></shopmag-file-form></v-tab-item>
                
                
            </v-tabs-items>
        </v-card-text>  
        
        <ez-dialog label="사업 추가 / 수정" ref="dialog_shop" max-width="400" dark color="primary" persistent>
            <shopmag-update-form :isNew="isNew" :shopinfo="itemShop" :cbShopId="cbShopIdChk" @save="save1"> 

            </shopmag-update-form>
        </ez-dialog>
        <ez-dialog :label="AddFileTitle()" ref="dialog_file" max-width="400" dark color="primary" persistent>
            <shopmag-file-add-form :addFileInfo="fileAdd" :isNew="isAddNew" :isLoading="isLoading" :i_sort_max="i_sort_max" :fgubun="this.tabs"
                @save="save2" @onDelete="onDelete">
            </shopmag-file-add-form>
        </ez-dialog>
    </v-container>
</template>

<script>
import TooltipBtn from '@/components/etc/TooltipBtn.vue';
import EzDialog from '@/components/etc/EzDialog.vue';
import ShopmagUpdateForm from './shop_form/ShopmagUpdateForm.vue';
import ShopmagFileForm from './shop_form/ShopmagFileForm.vue';
import { deepCopy } from "../../../util/lib";
import ShopmagFileAddForm from './shop_form/ShopmagFileAddForm.vue';

export default {
  components: { TooltipBtn, EzDialog, ShopmagUpdateForm, ShopmagFileForm, ShopmagFileAddForm },
    name: "ShopMag",
    data() {
        return {
            tabs: 0,
            iframeHeight: 500, // 초기 높이 설정 (원하는 높이로 초기화)
            isLoading: false,
            isNew: false,
            itemShops: [], itemShop:[], itemShopRow: -1,
            itemShopHead: [
                { text: '신청번호',  value: 'i_shop', sortable: false, width: "100px", fixed: true, align:'center'},
                { text: '사업명',   value: 'n_shop', sortable: false,  width:"35%", align:'center'},
                { text: '사업시작', value: 'd_date1', sortable: false, width: "150px", fixed: true, align:'center'}, 
                { text: '사업종료', value: 'd_date2', sortable: false, width: "150px", fixed: true, align:'center'},
                { text: '비고', value: 't_remark', sortable: false, width:"35%",  align:'center'}  
            ],
            idx: -1,
            isAddNew: true,
            fileAdd: null, fileAddsA: [], fileAddsB: [], fileAddsC: [],
            i_sort_max: 0,
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
        async tabs() {
            // const data = await this.$axios.post("/api/shopinfo/shopInfoSave", form);
            if (this.tabs < 1) return;
            const payload = {
                i_shop: this.itemShop.i_shop,
                f_gubun: this.tabs.toString(),    
                sortBy: "i_sort, i_ser desc",
            };
            if ( this.tabs === 1) {
                this.fileAddsA = await this.$axios.post(`/api/shopinfo/getShopMagFile`, payload);
            }
            if ( this.tabs === 2) {
                this.fileAddsB = await this.$axios.post(`/api/shopinfo/getShopMagFile`, payload);
            }
            if ( this.tabs === 3) {
                this.fileAddsC = await this.$axios.post(`/api/shopinfo/getShopMagFile`, payload);
            } 
        }        
    },
    computed: {
        
    },
    methods: {
        AddFileTitle() {
            return this.tabs == 1 ? '신청 서류' : this.tabs == 2 ? ' 추가 서류' : '협약서 서류' 
        },
        adjustIframeHeight() {
        // 브라우저 창의 높이를 iframe의 높이로 설정
            const windowHeight = window.innerHeight;
            this.iframeHeight = windowHeight - 200;           
        },
        async fetchData() {
            this.itemShops = await this.$axios.get("/api/shopinfo/getShopMag");
        },
        async addShop() {
            this.isNew = true;
            this.itemShop = null;
            this.$refs.dialog_shop.open();
        },
        
        rowSelectitemShop :function (item, row) {
            this.selected = item;
            row.select(true)
            if (this.itemShop == item) return;            
            this.itemShop = item;
            this.itemShopRow = row.index;           

        },
        rowShopitemSet(row) {
            if(!this.itemShop) return;
            
            this.isNew = false;
            this.$refs.dialog_shop.open();
        },
        async cbShopIdChk(value) {
            const payload = {
                field: "i_shop",
                value,
            };
            return await this.$axios.post("/api/shopinfo/duplicateCheckShop", payload);
        },
        async save1(form) {
            const data = await this.$axios.post("/api/shopinfo/shopInfoSave", form);
            if (data.affectedRows == 1 || data.affectedRows == 2) {
                this.$toast.info(`${form.i_shop} ` +  `${this.isNew ? '추가' : '수정'} ` +  ` 하였습니다.`); 
                const idx = this.itemShops.indexOf(this.itemShop);
                if (idx >= 0) {
                    this.itemShops.splice(idx, 1, form);
                } else {
                    const idx = this.itemShops.push(form);
                }                
            }
            this.$refs.dialog_shop.close();
        },

        async addFile(item) {
            if (!item) {
                this.getSortMax(this.tabs);  
                this.isAddNew = true; 
                this.fileAdd = null;
            } else {                
                this.fileAdd = deepCopy(item); 
                this.isAddNew = false;
            }
            this.$refs.dialog_file.open();
        },
        getSortMax(gubun) {
            this.i_sort_max = 0;
            if ( gubun == 1 ) {
                if (this.fileAddsA) {
                    for(let ob in this.fileAddsA) {
                        if (this.fileAddsA[ob].i_sort > this.i_sort_max) this.i_sort_max = this.fileAddsA[ob].i_sort;
                    }
                }
            } else if( gubun == 2 ) {
                if (this.fileAddsB) {
                    for(let ob in this.fileAddsB) {
                        if (this.fileAddsB[ob].i_sort > this.i_sort_max) this.i_sort_max = this.fileAddsB[ob].i_sort;
                    }
                }                
            } else if( gubun == 3 ) { 
                if (this.fileAddsC) {
                    for(let ob in this.fileAddsC) {
                        if (this.fileAddsC[ob].i_sort > this.i_sort_max) this.i_sort_max = this.fileAddsC[ob].i_sort;
                    }
                }
            } else (this.i_sort_max = 0)
        },
        async save2(form) {            
            form.append("isNew", this.isAddNew);
            form.append("i_shop_select", this.itemShop.i_shop);            
            
            const i_ser = await this.$axios.post(`/api/shopinfo/shopAddFile`, form); 

            if (i_ser > 0) {
                this.$toast.info(`${ this.isAddNew ? '추가' : '수정'} 하여습니다.`);
                await this.reloadFile();
            }
            this.$refs.dialog_file.close();
        },
        async onDelete(form) {                     
            const data = await $axios.post(`/api/shopinfo/shopAddFileDelete`, form);
            if (data) {
                this.$toast.info(`삭제 하여습니다.`);
                await this.reloadFile();
            }            
            this.$refs.dialog_file.close();
        },
        async reloadFile() {
            const payload = {
                i_shop: this.itemShop.i_shop,
                f_gubun: this.tabs.toString(),    
                sortBy: "i_sort, i_ser desc",
            }; 
            if ( this.tabs === 1) {
                this.fileAddsA = await this.$axios.post(`/api/shopinfo/getShopMagFile`, payload);
            }
            if ( this.tabs === 2) {
                this.fileAddsB = await this.$axios.post(`/api/shopinfo/getShopMagFile`, payload);
            }
            if ( this.tabs === 3) {
                this.fileAddsC = await this.$axios.post(`/api/shopinfo/getShopMagFile`, payload);
            } 
        }
    }
}
</script>

<style>

</style>