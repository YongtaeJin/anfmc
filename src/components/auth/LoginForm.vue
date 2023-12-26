<template>
    <v-card max-width="450" width="100%" elevation="10">
        <v-toolbar><site-title/></v-toolbar>      
        <v-tabs v-model="tabs" background-color="primary" dark>
            <v-tab style="flex: 1" value="one">스마트공방 신청(등록)</v-tab>
            <v-tab style="flex: 1" value="two">스마트공방</v-tab>
        </v-tabs>
        <v-card-text>
            <v-tabs-items v-model="tabs">
                <v-tab-item>
                    <v-tabs v-model="idtbas" background-color="primary" dark>
                        <v-tab v-for="item in items" :key="item" style="flex: 1">
                            {{ item }}
                        </v-tab>
                    </v-tabs>
                    <v-card-text>
                        <v-tabs-items v-model="idtbas" >
                            <v-tab-item><sign-chk-form></sign-chk-form></v-tab-item>
                            <v-tab-item><find-id-form></find-id-form></v-tab-item>
                            <v-tab-item><find-pw-form></find-pw-form></v-tab-item>
                        </v-tabs-items>
                    </v-card-text>
                    <template>
                        <v-card-text class="mt-n4">
                            <v-btn to="/join" block>회원가입</v-btn>
                        </v-card-text>
                    </template> 
                </v-tab-item>
                <v-tab-item>
                  <sign-in-form></sign-in-form>
                </v-tab-item>
            </v-tabs-items>
        </v-card-text>
    </v-card>
</template>

<script>
import SiteTitle from '../layout/SiteTitle.vue'
import FindIdForm from './FindIdForm.vue'
import SignChkForm from './SignChkForm.vue'
import SignInForm from './SignInForm.vue'
export default {
  components: { SiteTitle, SignInForm, SignChkForm, FindIdForm },
    name: "LoginForm",
    data() {
        return {
            valid: true,
            tabs: 0,
            idtbas: 0,
            items: ["로그인", "아이디 찾기", "비밀번호 찾기"],
            isLoading: false,
        }
    },

    methods: {
    }

}
</script>

<style>

</style>