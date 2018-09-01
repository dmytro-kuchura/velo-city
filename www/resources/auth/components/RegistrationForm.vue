<template>
    <form class="form-horizontal m-t-20" @submit.prevent="onSubmit">

        <div class="form-group">
            <div class="col-xs-12">
                <input class="form-control" type="email" required="" placeholder="Email" v-model="registration.email"
                       :class="{'has-error': errors.email}">
            </div>
        </div>

        <div class="form-group">
            <div class="col-xs-12">
                <input class="form-control" type="text" required="" placeholder="Имя" v-model="registration.name"
                       :class="{'has-error': errors.name}">
            </div>
        </div>

        <div class="form-group">
            <div class="col-xs-12">
                <input class="form-control" type="password" required="" placeholder="Пароль"
                       v-model="registration.password"
                       :class="{'has-error': errors.password}">
            </div>
        </div>

        <div class="form-group text-center m-t-40">
            <div class="col-xs-12">
                <button class="btn btn-primary btn-block btn-lg waves-effect waves-light" type="submit">Регистрация
                </button>
            </div>
        </div>

        <div class="form-group m-t-30 m-b-0">
            <div class="col-sm-12 text-center">
                <a href="pages-login.html" class="text-muted">Авторизация</a>
            </div>
        </div>

    </form>
</template>

<script>
    export default {
        data() {
            return {
                errors: [],
                registration: {
                    name: "",
                    email: "",
                    password: "",
                }
            };
        },
        methods: {
            onSubmit() {
                axios.post('/api/v1/register', this.registration)
                    .then(({success}) => this.setSuccessMessage(success))
                    .catch(({response}) => this.setErrors(response));
            },
            setErrors(response) {
                this.errors = response.data.errors;
            },
            setSuccessMessage(success) {
                console.log(success);

                this.reset();
            },
            reset() {
                this.errors = [];
                this.registration = {
                    name: "",
                    email: "",
                    password: "",
                };
            }
        }
    }
</script>