<template>
    <v-container fluid>
        <v-toolbar height="40px" background-color="primary" dark>
            <v-toolbar-title>사용자관리</v-toolbar-title>
            <v-spacer/>
            <v-text-field label="ID/이름/email : " v-model="f_serarch" hide-details  single-line  />
            <tooltip-btn label="조회" @click="fetchData"><v-icon>mdi-magnify</v-icon></tooltip-btn>
        </v-toolbar>
        <v-data-table ref="table" :headers="headers" :items="items"  item-key="i_id"
            single-select hide-default-footer :items-per-page="-1"                    
            class="elevation-1 text-no-wrap"  :height=iframeHeight >
            <template v-slot:item="{ item }">
                <tr :class="{ 'row_select': item === selected}" @click="selectItem(item)" class="center-align" >
                    <td> {{ item.i_id }}</td>
                    <td> {{ item.n_name }}</td>
                    <td> {{ item.e_email }}</td>
                    <td> {{ item.i_password }}</td>
                    <td> {{ item.n_level }}</td>
                    <td @dblclick="use_delete(item)"><u>삭제</u> </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import TooltipBtn from '@/components/etc/TooltipBtn.vue';
export default {
  components: { TooltipBtn },
    name: "ShopUserList",
    data() {
        return {
            iframeHeight: 500, // 초기 높이 설정 (원하는 높이로 초기화)
            isLoading: false,
            f_serarch: "",
            headers: [
                { text: 'ID',  value: 'i_id', align:'center',sortable: true, width:"10%"},
                { text: '이름',  value: 'n_name', align:'center',sortable: true, width:"15%"},              
                { text: 'email',  value: 'e_email', align:'center',sortable: true, width:"25%"},                
                { text: '비빌번호',  value: 'i_password', align:'center',sortable: false, width:"15%"},
                { text: '사용등급',  value: 'n_level', align:'center',sortable: false, width:"15%"},                
                { text: '사용자삭제', value: 'f_del', align:'center', sortable: false, width:"10%"} ,              
            ],
            items: [], selected:[],
        }
    },
    beforeCreate() {        
        if (!this.$store.state.user.member?.c_com) {            
            this.$router.push("/").catch( () => {this.$toast.error('잘못된 접급 입니다.')}); 
            return
        }
    },
    created() {
        this.fetchData() ;
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
    methods: {        
        adjustIframeHeight() {
        // 브라우저 창의 높이를 iframe의 높이로 설정
            const windowHeight = window.innerHeight;
            this.iframeHeight = windowHeight - 200;           
        },
        async fetchData() {
            this.items = await this.$axios.get(`/api/shopinfo/ShopUserList?f_serarch=${this.f_serarch}`);
        },
        async selectItem(item) {
            if (this.selected == item) return;
            this.selected = item;            
        },
        async use_delete(item) {
            const res = await this.$ezNotify.confirm(`${item.n_name} 삭제 하시겠습니까 ?`, '삭제');
            if(res) {
                const data = await this.$axios.patch(`/api/shopinfo/ShopUserDelete?i_id=${item.i_id}`);
                if (data.affectedRows === 1) {
                    const idx = this.items.indexOf(item);                    
                    if ( idx >= 0 ) this.items.splice(idx, 1);                    
                    await this.$ezNotify.confirm("삭제 완료 !!!!!!", "");
                }
            }
        }
    },
}

</script>

<style>

</style>