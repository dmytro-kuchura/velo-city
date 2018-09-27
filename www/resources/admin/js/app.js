/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from "vue";

import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {
    maxHeight: "500px"
});

Vue.component('pages-create-form', require('../components/PagesCreateForm.vue'));
Vue.component('pages-edit-form', require('../components/PagesEditForm.vue'));
Vue.component('pages-list', require('../components/PagesList.vue'));

const app = new Vue({
    el: '#app',

    components: {
        'summernote': require('./components/summernote')
    }
});