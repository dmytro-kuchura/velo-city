window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.auth = {
    username: 'admin',
    password: 'secret'
};

window.swal = require('sweetalert');

import Vue from "vue";
import Vuex from 'vuex';
import store from "./store";

Vue.use(Vuex);

Vue.component('orders-list', require('./vue-components/OrdersListComponent.vue').default);
Vue.component('activity-log', require('./vue-components/ActivityLogComponent.vue').default);
Vue.component('reviews', require('./vue-components/ReviewsComponent.vue').default);

new Vue({
    el: '#dashboard',
    store: new Vuex.Store(store)
});
