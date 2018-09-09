/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from "vue";
Vue.use(require('vue-cookies'));

Vue.component('registration-form', require('../components/RegistrationForm.vue'));
Vue.component('auth-form', require('../components/AuthForm.vue'));

const app = new Vue({
    el: '#app'
});