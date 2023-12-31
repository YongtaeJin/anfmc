<template>
  
</template>

<script>
export default {
    name: "SignedP04Form",
    props: {
      
    },
    data() {
        return {
            valid: true,
            form: {
            },
        }
    },
    methods: {      
        async save() {
            this.$emit("save", this.form);
        }
    }

}
</script>

<style>

</style>