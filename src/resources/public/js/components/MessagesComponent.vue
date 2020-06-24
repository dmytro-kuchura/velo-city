<template></template>

<script>
    export default {
        mounted() {
            swal({
                title: this.$attrs.title,
                text: this.$attrs.text,
                icon: this.$attrs.icon,
            });
        },
    }
</script>
