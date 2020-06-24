<template>
    <div class="newsletter-inner center-sm">
        <div class="">
            <div class="">
                <div class="newsletter-title">
                    <h2 class="main_title">Подпишитесь</h2>
                    <div class="newsletter-slogan">Получайте последние новости и обновление товаров</div>
                </div>
            </div>
            <div class="">
                <form @submit.prevent="onSubmit">
                    <div class="newsletter-box">
                        <input type="email" v-model="form.email" :class="{'has-error': errors.email}"
                               placeholder="Введите Ваш Email">
                        <button type="submit" title="Subscribe" class="btn-color ">Подписаться !</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: null,
                },
                errors: [],
            };
        },
        methods: {
            onSubmit() {
                this.isLoading = true;
                axios.post('/api/v1/subscribe', this.form)
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
                    title: 'Отлично!',
                    text: 'Подписка формлена! :)',
                    icon: 'success',
                });
            },
            setErrorResponse(response) {
                this.isLoading = false;
                this.errors = response.data.errors;
                swal({
                    title: 'Ошибка!',
                    text: 'Указан не верный email или что то пошло не так! :(',
                    icon: 'error',
                });
            },
        }
    }
</script>
