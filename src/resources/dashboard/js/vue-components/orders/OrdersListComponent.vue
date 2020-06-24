<template>
    <div class="col-xl-12">
        <div class="widget has-shadow">
            <div class="widget-body">
                <div class="table-responsive">
                    <table class="table mb-0">
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
                                <a v-bind:href="'/admin/orders/' + item.id"><i class="la la-edit edit"></i></a>
                                <a v-bind:href="'/admin/orders/' + item.id + '/delete'"><i class="la la-close delete"></i></a>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div class="widget-footer d-flex align-items-center">
                <div class="mr-auto p-2">
                    <span class="display-items">Показано {{ showingFrom }}-{{ showingTo }} / {{ total }} Записей</span>
                </div>
                <div class="p-2">
                    <nav aria-label="...">
                        <paginate
                                :page-count="pageCount"
                                :page-range="3"
                                :margin-pages="2"
                                :click-handler="fetch"
                                :prev-text="'<'"
                                :next-text="'>'"
                                :container-class="'pagination justify-content-end'"
                                :page-link-class="'page-link'"
                                :prev-link-class="'page-link'"
                                :next-link-class="'page-link'"
                                :page-class="'page-item'">
                        </paginate>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                pageCount: 1,
                showingFrom: 1,
                showingTo: 1,
                total: 1,
                endpoint: '/api/v1/orders/list?page='
            };
        },
        mounted() {
            axios.get('/api/v1/orders/list')
                .then(({data}) => this.getOrdersListSuccessResponse(data))
                .catch((response) => this.getOrdersListErrorResponse(response));
        },
        methods: {
            onDelete(id) {
                axios.delete('/api/v1/orders/' + id)
                    .then(() => this.fetch(1))
            },
            fetch(page = 1) {
                axios.get(this.endpoint + page)
                    .then(({data}) => {
                        this.list = data.result.data;
                        this.total = data.result.total;
                        this.showingFrom = data.result.from;
                        this.showingTo = data.result.to;
                        this.pageCount = data.result.last_page;
                    });
            },
            moment: function () {
                return moment();
            },
            getOrdersListSuccessResponse(data) {
                this.list = data.result.data;
                this.total = data.result.total;
                this.showingFrom = data.result.from;
                this.showingTo = data.result.to;
                this.pageCount = data.result.last_page;
            },
            getOrdersListErrorResponse(response) {
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
