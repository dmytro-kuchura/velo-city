<template>
    <div class="row flex-row">
        <div class="col-xl-12">
            <div class="widget widget-07 has-shadow">
                <div class="widget-header bordered d-flex align-items-center">
                    <h2>Последние заказы</h2>
                </div>
                <div class="widget-body">
                    <div class="table-responsive table-scroll padding-right-10" style="max-height:520px;">
                        <table class="table table-hover mb-0">
                            <thead>
                            <tr>
                                <th>Заказ</th>
                                <th>ФИО</th>
                                <th>Дата создания</th>
                                <th><span style="width:100px;">Статус</span></th>
                                <th>Итого</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr v-for="item in list">
                                <td><span class="text-primary"># {{ item.id }}</span></td>
                                <td>{{ item.first_name + ' ' + item.last_name + ' ' + item.middle_name }}</td>
                                <td>{{ moment(item.created_at).format('MMMM Do YYYY, h:mm') }}</td>
                                <td>
                                    <span style="width:100px;">
                                        <span class="badge-text badge-text-small info" v-bind:class="getClass(item.status)">{{ getLabel(item.status) }}</span>
                                    </span>
                                </td>
                                <td>₴ {{ item.total }}</td>
                                <td class="td-actions">
                                    <a v-bind:href="'/admin/order/' + item.id"><i class="la la-edit edit"></i></a>
                                    <a v-bind:href="'/admin/order/' + item.id + '/cancel'"><i class="la la-close delete"></i></a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="widget-footer d-flex align-items-center">
                    <div class="mr-auto p-2">
                        <span class="display-items">Показано 1-30 / 150 Всего</span>
                    </div>
                    <div class="p-2">
                        <nav aria-label="...">
                            <ul class="pagination justify-content-end">
                                <li class="page-item disabled">
                                    <span class="page-link"><i class="ion-chevron-left"></i></span>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item active">
                                    <span class="page-link">2<span class="sr-only">(current)</span></span>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#"><i class="ion-chevron-right"></i></a>
                                </li>
                            </ul>
                        </nav>
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
                list: []

            };
        },
        mounted() {
            axios.get("/api/v1/orders/list")
                .then(({data}) => this.getOrderListSuccessResponse(data.result))
                .catch((response) => this.getOrderListErrorResponse(response));
        },
        methods: {
            moment: function () {
                return moment();
            },
            getOrderListSuccessResponse(result) {
                this.list = result;
            },
            getOrderListErrorResponse(response) {
                console.log(response);
            },
            getClass(status) {
                switch (status) {
                    case 1:
                        return 'info';
                    case 2:
                        return 'warning';
                    case 3:
                        return 'success';
                    case 4:
                        return 'danger';
                    case 5:
                        return 'danger';
                }
            },
            getLabel(status) {
                switch (status) {
                    case 1:
                        return 'Создан';
                    case 2:
                        return 'В работе';
                    case 3:
                        return 'Выполнен';
                    case 4:
                        return 'Отменен';
                    case 5:
                        return 'Возврат';
                }
            }
        }
    }
</script>
