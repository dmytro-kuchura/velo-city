<template>
    <div class="footer-block-contant">
        <form name="contactform" @submit.prevent="onSubmit">
            <div class="field">
                <input type="text" v-model="form.name" :class="{'has-error': errors.name}"
                       placeholder="Введите Ваше имя" required>
            </div>
            <div class="field">
                <input type="text" v-model="form.name" :class="{'has-error': errors.name}"
                       placeholder="Введите Ваш Email" required>
            </div>
            <div class="field">
                <textarea v-model="form.message" :class="{'has-error': errors.message}"
                          placeholder="Что именно Вас интересует?" rows="2" cols="5" name="message"></textarea>
            </div>
            <div class="field">
                <button title="Subscribe" class="btn-color">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: null,
                    email: null,
                    message: null,
                },
                errors: [],
            };
        },
        methods: {
            onSubmit() {
                this.isLoading = true;
                axios.post("/api/v1/contacts", this.form)
                    .then(() => this.setSuccessResponse())
                    .catch(({response}) => this.setErrorResponse(response));
            },
            setSuccessResponse() {
                this.isLoading = false;
                this.form.name = null;
                this.form.email = null;
                this.form.description = null;
                this.errors = [];
                swal({
                    title: "Отлично!",
                    text: "Запрос отправлен!",
                    icon: "success",
                });
            },
            setErrorResponse(response) {
                this.isLoading = false;
                this.errors = response.data.errors;
                swal({
                    title: "Ошибка!",
                    text: "Указан не верный email или слишком частый выполняется отправка!",
                    icon: "error",
                });
            },
        }
    }
</script>
