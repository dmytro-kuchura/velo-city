<template>
    <form class="form-horizontal" @submit.prevent="onSubmit">

        <div class="form-group">
            <label class="col-md-2 control-label">Название</label>
            <div class="col-md-10">
                <input type="text" class="form-control" placeholder="Название страницы ..." v-model="page.name">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">Алиас</label>
            <div class="col-md-10">
                <input type="text" class="form-control" placeholder="Адрес страницы ..." v-model="page.alias">
            </div>
        </div>


        <div class="form-group">
            <label class="col-md-2 control-label">Контент</label>
            <div class="col-md-10">
                <textarea class="form-control" rows="5" v-model="page.content"></textarea>
            </div>
        </div>


        <div class="form-group">
            <label class="col-md-2 control-label">Title</label>
            <div class="col-md-10">
                <input type="text" class="form-control" v-model="page.title">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">H1</label>
            <div class="col-md-10">
                <input type="text" class="form-control" v-model="page.h1">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">Keywords</label>
            <div class="col-md-10">
                <textarea class="form-control" rows="5" v-model="page.keywords"></textarea>
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">Description</label>
            <div class="col-md-10">
                <textarea class="form-control" rows="5" v-model="page.description"></textarea>
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">Статус</label>
            <div class="col-sm-10">
                <div class="radio radio-info radio-inline">
                    <input type="radio" id="inlineRadio1" value="1"
                           name="radioInline" checked="checked">
                    <label for="inlineRadio1"> Опубликовано </label>
                </div>
                <div class="radio radio-inline">
                    <input type="radio" id="inlineRadio2" value="0"
                           name="radioInline">
                    <label for="inlineRadio2"> Не опубликовано </label>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-info waves-effect waves-light m-l-10">Создать</button>

    </form>
</template>

<script>
    export default {
        data() {
            return {
                errors: [],
                page: {
                    name: "",
                    alias: "",
                    content: "",
                    title: "",
                    h1: "",
                    keywords: "",
                    description: "",
                    status: 0,
                }
            };
        },
        methods: {
            onSubmit() {
                axios.post('/api/v1/login', this.page)
                    .then(({}) => this.setSuccessMessage())
                    .catch(({response}) => this.setErrors(response));
            },
            setErrors(response) {
                this.errors = response.data.errors;
            },
            setSuccessMessage() {
                this.reset();
            },
            reset() {
                this.errors = [];
                this.page = {
                    name: "",
                    alias: "",
                    content: "",
                    title: "",
                    h1: "",
                    keywords: "",
                    description: "",
                    status: 0,
                };
            }
        }
    }
</script>