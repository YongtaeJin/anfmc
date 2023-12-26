<template>
  <v-btn to="/" text plain class="px-0 text-none text-h6">
    <v-img src="../../assets/logo.png"  height="30px" /> 
    <!-- </v-img> :style="{ transform: 'scale(0.3)' }"/> -->
    <!-- {{ title }} -->
  </v-btn>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SiteTitle",
  computed: {
    ...mapState({
      title: (state) => state.config.title,
    }),
  },
};
</script>

<style>
</style>