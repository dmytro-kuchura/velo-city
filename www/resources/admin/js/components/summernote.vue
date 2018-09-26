<template>
    <textarea class="form-control"></textarea>
</template>

<script>
    export default {
        props: {
            model: {
                required: true
            },
            height: {
                type: String,
                default: '150'
            }
        },
        mounted() {
            let config = {
                height: this.height
            };
            let vm = this;
            config.callbacks = {
                onInit: function () {
                    $(vm.$el).summernote("code", vm.model);
                },
                onChange: function () {
                    vm.$emit('update:model', $(vm.$el).summernote('code'));
                },
            };
            $(this.$el).summernote(config);
        }
    }
</script>