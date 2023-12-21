<template>
	<div class="d-flex justify-center align-center" style="height:100%">
	  <v-card max-width="400" width="100%" elevation="10">
		<v-toolbar>
		  	<v-toolbar-title>회원가입</v-toolbar-title>
		</v-toolbar>
		<v-card-text> 			
			<sign-up-form :cbCheckId="checkId" />
		</v-card-text>
	  </v-card>
	</div>
  </template>
  
<script>
import SignUpForm from '@/components/auth/SignUpForm.vue';
import { mapActions } from 'vuex';

  
export default {
  components: { SignUpForm },

	name: "Join",
	methods : {
		...mapActions('user', ['duplicateCheck']),
		async checkId(id) {
			const data = await this.duplicateCheck({field : 'mb_id', value : id});
			return data;
		}
	}
};
</script>

