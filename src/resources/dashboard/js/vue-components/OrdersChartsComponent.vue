<template>
    <div class="chart-container">
        <line-chart :chart-data="data"></line-chart>
    </div>
</template>

<script>
    import LineChart from '../LineChart.js'

    export default {
        components: {
            LineChart
        },
        data() {
            return {
                data: null
            }
        },
        mounted() {
            axios.get('/api/v1/orders/chart')
                .then(({data}) => this.getOrdersChartSuccessResponse(data))
                .catch((response) => this.getOrdersListErrorResponse(response));
        },
        methods: {
            getOrdersChartSuccessResponse(data) {
                console.log(data)

                this.data = {
                    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    datasets: [
                        {
                            label: 'Всего заказов',
                            backgroundColor: '#f87979',
                            data: [40, 20, 12, 39, 10, 40, 39, 55, 40, 20, 12, 11]
                        }, {
                            label: 'Завершенных заказов',
                            backgroundColor: '#3f7b26',
                            data: [20, 10, 8, 22, 8, 23, 25, 70, 35, 10, 8, 9]
                        }
                    ]
                }
            },
            getOrdersListErrorResponse(response) {
                console.log(response)
            }
        }
    }
</script>

<style>
    .chart-container {
        width: 100%;
    }
</style>
