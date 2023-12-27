<template>
    <div class="d-flex justify-center align-center" style="height: 100%">
        <v-card max-width="450" width="100%" elevation="10">
            <v-toolbar><site-title /></v-toolbar>
            <v-tabs v-model="loginchk" background-color="primary" dark>
                <v-tab v-for="item in loginitem" :key="item" style="flex: 1">
                    {{ item }}
                </v-tab>
            </v-tabs>        
            <v-card-text>
                <v-tabs-items v-model="loginchk">
                    <v-tab-item> 
                        <v-tabs v-model="tabs" background-color="primary" dark>
                            <v-tab v-for="item in items" :key="item" style="flex: 1">
                                {{ item }}
                            </v-tab>
                        </v-tabs>
                        <v-card-text>
                            <v-tabs-items v-model="tabs">
                                <v-tab-item>
                                    <sign-chk-form @save="loginLocal" :isLoading="isLoading"></sign-chk-form>                                    
                                </v-tab-item>
                                <v-tab-item>
                                    <find-id-form @save="findId" :isLoading="isLoading"></find-id-form>
                                </v-tab-item>
                                <v-tab-item>
                                    <find-pw-form @save="findPw" :isLoading="isLoading"></find-pw-form>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card-text>
                        <template>
                          <v-card-text class="mt-n4">
                            <v-btn to="/join" block>회원가입</v-btn>
                          </v-card-text>
                        </template>
                    </v-tab-item>
                    <v-tab-item> 
                        <sign-in-form @save="loginLocal" :isLoading="isLoading"></sign-in-form>
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-card>
    </div>
  </template>
  
<script>

  import { mapActions, mapMutations } from "vuex";
  import SignChkForm from '../../components/auth/SignChkForm.vue';
  import FindIdForm from "../../components/auth/FindIdForm.vue";
  import FindPwForm from "../../components/auth/FindPwForm.vue";
  import SignInForm from "../../components/auth/SignInForm.vue";
  import SiteTitle from "../../components/layout/SiteTitle.vue";
  export default {
    components: { SiteTitle, SignInForm, FindIdForm, FindPwForm, SignChkForm },
    name: "Login",
    props: {
      isHome: {
            type : Boolean,
            default: false,
        },
    },
    data() {
      return {
        // tabs: parseInt(this.$route.query.tabs) || 0,
        loginchk : 0,
        loginitem: ["스마트공방 신청(등록)", "스마트공방"],
        tabs: 0,
        items: ["로그인", "아이디 찾기", "비밀번호 찾기"],
        isLoading: false,
      };
    },
    methods: {
      ...mapActions("user", ["signInLocal", "findIdLocal", "findPwLocal"]),
      ...mapMutations("user", ["SET_MEMBER", "SET_TOKEN"]),
      async loginLocal(form) {
        this.isLoading = true;      
        const data = await this.signInLocal(form);
        this.isLoading = false;
        if (data) {
          const n_name = this.$store.state.user.member.n_name;
          this.$toast.info(`${n_name}님 환영합니다.`);
          if (!this.isHome) {
            this.$router.push("/");
          }
        }
      },
      async findId(form) {
        this.isLoading = true;
        const data = await this.findIdLocal(form);
        this.isLoading = false;
        if (data && data.i_id) {
          await this.$ezNotify.alert(
            `<span style="font-size:1.5em">회원 아이디 : [ <b>${data.i_id}</b> ]</span>`,
            "아이디 찾기 결과"
          );
          this.tabs = 0;
        }
      },
      async findPw(form) {
        this.isLoading = true;
        const data = await this.findPwLocal(form);
        this.isLoading = false;        
        if (data) {
          await this.$ezNotify.alert(
            `${data.n_name}님<br><b>${form.e_email}</b>로 이메일 발송하였습니다.`,
            "이메일 발송 성공"
          );
          this.tabs = 0;
        }
      },
    },
  };
  </script>
  
  <style>
  </style>