<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Нзвание страницы</th>
                                        <th>Адрес</th>
                                        <th>Статус</th>
                                        <th>Дата создания</th>
                                        <th>Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr v-for="page in list">
                                        <td>{{ page.id }}</td>
                                        <td>{{ page.name }}</td>
                                        <td>{{ page.alias }}</td>

                                        <td v-if="page.status === 1">
                                            <span class="label label-success">Опубликовано</span>
                                        </td>
                                        <td v-else>
                                            <span class="label label-danger">Не опубликовано</span>
                                        </td>

                                        <td>{{ page.created_at }}</td>
                                        <td>
                                            <a :href="'/admin/pages/edit/' + page.id">
                                                <i class="fa fa-pencil-square-o"></i>
                                            </a>
                                            <a href="#" v-on:click="doDeletePage(page.id)">
                                                <i class="fa fa-trash-o"></i>
                                            </a>
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="loader-list" v-if="loader">
            <div class="a" style="--n: 5;">
                <div class="dot" style="--i: 0;"></div>
                <div class="dot" style="--i: 1;"></div>
                <div class="dot" style="--i: 2;"></div>
                <div class="dot" style="--i: 3;"></div>
                <div class="dot" style="--i: 4;"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loader: true,
                errors: [],
                list: []
            };
        },

        mounted() {
            this.prepareComponent();
        },

        methods: {
            prepareComponent: function () {
                let self = this;

                self.list = [];

                axios.get('/api/v1/admin/pages/list')
                    .then(function (response) {
                        self.list = response.data.response;
                        self.loader = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            doDeletePage(id) {
                axios.delete('/api/v1/admin/pages/delete/' + id)
                    .then(function () {
                        this.prepareComponent();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                console.log(id);
            },
            setErrors(response) {
                this.errors = response.data.errors;
            },
            setSuccessMessage() {
            },
        }
    }
</script>