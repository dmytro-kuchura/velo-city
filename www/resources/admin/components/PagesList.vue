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
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Age</th>
                                        <th>City</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr v-for="page in list[0]">
                                        <td>{{ page.id }}</td>
                                        <td>{{ page.name }}</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>20</td>
                                        <td>
                                            <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Редактировать"><i class="fa fa-pencil-square-o"></i></a>
                                            <a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Удалить"><i class="fa fa-trash-o"></i></a>
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

    </div>
</template>

<script>
    export default {
        data() {
            return {
                errors: [],
                loader: true,
                list: []
            };
        },

        mounted() {
            this.prepareComponent();
        },

        methods: {
            prepareComponent: function () {
                let self = this;

                axios.get('/api/v1/admin/pages/list')
                    .then(function (response) {
                        self.list = response.data.response;

                        console.log(self.list);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            setErrors(response) {
                this.errors = response.data.errors;
            },
            setSuccessMessage() {
            },
        }
    }
</script>