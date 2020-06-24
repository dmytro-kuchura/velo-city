window.Chart = require('./components/chart');
window.moment = require('moment');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.auth = {
    username: 'admin',
    password: 'secret'
};

window.swal = require('sweetalert');

moment.locale('ru');

import Vue from "vue";

import Vuex from 'vuex';
import paginate from "vuejs-paginate";
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.component('paginate', paginate);
Vue.component('orders-widget-list', require('./vue-components/OrdersListComponent.vue').default);
Vue.component('activity-log', require('./vue-components/ActivityLogComponent.vue').default);
Vue.component('reviews', require('./vue-components/ReviewsComponent.vue').default);

Vue.component('orders-list', require('./vue-components/orders/OrdersListComponent.vue').default);

Vue.component('banner-list', require('./vue-components/banners/BannersListComponent').default);
Vue.component('banner-edit', require('./vue-components/banners/BannersEditComponent').default);
Vue.component('banner-create', require('./vue-components/banners/BannersCreateComponent').default);

Vue.component('product-list', require('./vue-components/products/ProductsListComponent').default);
Vue.component('product-edit', require('./vue-components/products/ProductsEditComponent').default);
Vue.component('product-create', require('./vue-components/products/ProductsCreateComponent').default);

Vue.component('brands-list', require('./vue-components/brands/BrandsListComponent').default);
Vue.component('brand-create', require('./vue-components/brands/BrandsCreateComponent').default);
Vue.component('brand-edit', require('./vue-components/brands/BrandsEditComponent').default);

Vue.component('categories-list', require('./vue-components/categories/CategoriesListListComponent').default);
Vue.component('category-edit', require('./vue-components/categories/CategoryEditComponent').default);

import store from "./store";

Vue.use(CKEditor);
Vue.use(Vuex);

new Vue({
    el: '#dashboard',
    store: new Vuex.Store(store),
});

let randomScalingFactor = function () {
    return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
};

Chart.helpers.drawRoundedTopRectangle = function (ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
};

Chart.elements.RoundedTopRectangle = Chart.elements.Rectangle.extend({
    draw: function () {
        let ctx = this._chart.ctx;
        let vm = this._view;
        let left, right, top, bottom, signX, signY, borderSkipped;
        let borderWidth = vm.borderWidth;

        if (!vm.horizontal) {
            left = vm.x - vm.width / 2;
            right = vm.x + vm.width / 2;
            top = vm.y;
            bottom = vm.base;
            signX = 1;
            signY = bottom > top ? 1 : -1;
            borderSkipped = vm.borderSkipped || 'bottom';
        } else {
            left = vm.base;
            right = vm.x;
            top = vm.y - vm.height / 2;
            bottom = vm.y + vm.height / 2;
            signX = right > left ? 1 : -1;
            signY = 1;
            borderSkipped = vm.borderSkipped || 'left';
        }

        if (borderWidth) {
            let barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
            borderWidth = borderWidth > barSize ? barSize : borderWidth;
            let halfStroke = borderWidth / 2;
            let borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
            let borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
            let borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
            let borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
            if (borderLeft !== borderRight) {
                top = borderTop;
                bottom = borderBottom;
            }
            if (borderTop !== borderBottom) {
                left = borderLeft;
                right = borderRight;
            }
        }

        let barWidth = Math.abs(left - right);
        let roundness = this._chart.config.options.barRoundness || 0.2;
        let radius = barWidth * roundness * 0.2;

        let prevTop = top;

        top = prevTop + radius;
        let barRadius = top - prevTop;

        ctx.beginPath();
        ctx.fillStyle = vm.backgroundColor;
        ctx.strokeStyle = vm.borderColor;
        ctx.lineWidth = borderWidth;

        Chart.helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop, barRadius);

        ctx.fill();
        if (borderWidth) {
            ctx.stroke();
        }

        top = prevTop;
    },
});

Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);

Chart.controllers.roundedBar = Chart.controllers.bar.extend({
    dataElementType: Chart.elements.RoundedTopRectangle
});

if (document.getElementById("orders")) {
    let ctx = document.getElementById("orders").getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'roundedBar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: 'Delivered',
                data: [30, 24, 22, 17, 22, 24, 9, 14, 20, 13, 17, 13],
                borderColor: "#fff",
                backgroundColor: "#5d5386",
                hoverBackgroundColor: "#483d77"
            }, {
                label: 'Estimated',
                data: [10, 14, 12, 20, 20, 8, 10, 20, 7, 11, 8, 10],
                borderColor: "#fff",
                backgroundColor: "#e4e8f0",
                hoverBackgroundColor: "#dde1e9"
            }]
        },
        options: {
            responsive: true,
            barRoundness: 1,
            tooltips: {
                backgroundColor: 'rgba(47, 49, 66, 0.8)',
                titleFontSize: 13,
                titleFontColor: '#fff',
                caretSize: 0,
                cornerRadius: 4,
                xPadding: 5,
                displayColors: false,
                yPadding: 5,
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: "#2e3451",
                    usePointStyle: true,
                    padding: 50,
                    fontSize: 13
                }
            },
            scales: {
                xAxes: [{
                    barThickness: 20,
                    stacked: false,
                    gridLines: {
                        drawBorder: false,
                        display: false
                    },
                    ticks: {
                        display: true
                    }
                }],
                yAxes: [{
                    stacked: false,
                    gridLines: {
                        drawBorder: false,
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });
}
