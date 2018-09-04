<template>
    <form class="form-horizontal m-t-20" @submit.prevent="onSubmit">

        <div class="form-group">
            <div class="col-xs-12">
                <input class="form-control" type="text" required="" placeholder="Email" v-model="auth.username"
                       :class="{'has-error': errors.username}">
            </div>
        </div>

        <div class="form-group">
            <div class="col-xs-12">
                <input class="form-control" type="password" required="" placeholder="Пароль" v-model="auth.password"
                       :class="{'has-error': errors.name}">
            </div>
        </div>

        <div class="form-group">
            <div class="col-xs-12">
                <div class="checkbox checkbox-primary">
                    <input id="checkbox-signup" type="checkbox" checked>
                    <label for="checkbox-signup">
                        Запомнить меня
                    </label>
                </div>
            </div>
        </div>

        <div class="form-group text-center m-t-40">
            <div class="col-xs-12">
                <button class="btn btn-primary btn-block btn-lg waves-effect waves-light" type="submit">Авторизоваться
                </button>
            </div>
        </div>

        <div class="form-group m-t-30 m-b-0">
            <div class="col-sm-7">
                <a href="/admin/reset-password" class="text-muted"><i class="fa fa-lock m-r-5"></i> Забыли пароль?</a>
            </div>
            <div class="col-sm-5 text-right">
                <a href="/admin/create" class="text-muted">Создать аккаунт</a>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                errors: [],
                auth: {
                    username: "",
                    password: "",
                }
            };
        },
        methods: {
            onSubmit() {
                axios.post('/api/v1/login', this.auth)
                    .then(({}) => this.setSuccessMessage())
                    .catch(({response}) => this.setErrors(response));
            },
            setErrors(response) {
                this.errors = response.data.errors;
            },
            setSuccessMessage() {
                this.$cookies.set("auth_token", true, "1d", "/");

                window.location.href = '/admin/dashboard';

                this.reset();
            },
            reset() {
                this.errors = [];
                this.auth = {
                    username: "",
                    password: "",
                };
            }
        }
    }
</script>