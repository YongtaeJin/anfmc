<template>
  
</template>

<script>
export default {
    name: "SignedP04Form",
    props: {
        editJob: {type: Boolean, default: false}
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