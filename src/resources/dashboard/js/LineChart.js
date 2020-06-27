import {Line, mixins} from 'vue-chartjs';

const {reactiveProp} = mixins;

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: ['options'],
    mounted() {
        this.renderChart(this.chartData, {
            responsive: true, maintainAspectRatio: false, scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        })
    }
}
