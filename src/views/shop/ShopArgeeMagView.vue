<template>
    <v-container fluid>
        <v-toolbar height="40px" background-color="primary" dark>
            <v-toolbar-title>사업협약서관리</v-toolbar-title>
            <v-spacer/>           
            <tooltip-btn v-if="this.tabs==0 &&  this.$store.state.user.member?.i_level > 9" fab small label="사업추가" @click="addShop">
                <v-icon>mdi-plus</v-icon>
            </tooltip-btn>
            <tooltip-btn v-if="this.tabs>=1" fab small label="첨부 서류 추가" @click="addFile">
                <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
            </tooltip-btn>
        </v-toolbar>
    </v-container>
</template>

<script>
export default {
    name: "ShopArgeeMag",
    data() {
        return {
            iframeHeight: 500, // 초기 높이 설정 (원하는 높이로 초기화)
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
    methods: {
        adjustIframeHeight() {
        // 브라우저 창의 높이를 iframe의 높이로 설정
            const windowHeight = window.innerHeight;
            this.iframeHeight = windowHeight - 200;           
        },
        async fetchData() {
            // this.itemShops = await this.$axios.get("/api/shopinfo/getShopMag");
        },
    },

}
</script>

<style>

</style>