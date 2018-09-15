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
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>20</td>
                                        <td>Cityname</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        <td>20</td>
                                        <td>Cityname</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                        <td>20</td>
                                        <td>Cityname</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Steve</td>
                                        <td>Mac Queen</td>
                                        <td>@steve</td>
                                        <td>20</td>
                                        <td>Cityname</td>
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
                axios.post('/api/v1/admin/pages/store', this.page)
                    .then(({}) => this.setSuccessMessage())
                    .catch(({response}) => this.setErrors(response));
            },
            setErrors(response) {
                this.errors = response.data.errors;
            },
            setSuccessMessage() {
                this.reset();

                window.location.href = '/admin/pages';
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