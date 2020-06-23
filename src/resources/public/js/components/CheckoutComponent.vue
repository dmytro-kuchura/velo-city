<template>
    <div class="checkout-content">
        <div class="row">
            <div class="col-12">
                <div class="heading-part align-center">
                    <h2 class="heading">Оформление заказа</h2>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-4 col-lg-5">
                <form class="main-form full">
                    <div class="row mb-20">
                        <div class="col-12 mb-20">
                            <div class="heading-part">
                                <h3 class="sub-heading">Контактные данные</h3>
                            </div>
                            <hr>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <input type="text" v-model="order.first_name" :class="{'has-error': errors.first_name}"
                                       placeholder="Имя *">
                                <span v-if="errors.first_name" class="has-error">Please include landmark.</span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <input type="text" v-model="order.last_name" :class="{'has-error': errors.last_name}"
                                       placeholder="Фамилия *">
                                <span v-if="errors.last_name" class="has-error">Please include landmark.</span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <input type="text" v-model="order.middle_name"
                                       :class="{'has-error': errors.middle_name}" placeholder="Отчество">
                                <span v-if="errors.middle_name" class="has-error">Please include landmark.</span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <input type="email" v-model="order.email" :class="{'has-error': errors.email}"
                                       placeholder="Ваш Email *">
                                <span v-if="errors.email" class="has-error">Please include landmark.</span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <input type="text" v-model="order.phone" :class="{'has-error': errors.phone}"
                                       placeholder="Номер телефона *">
                                <span v-if="errors.phone" class="has-error">Please include landmark.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mb-20">
                            <div class="heading-part">
                                <h3 class="sub-heading">Доставка</h3>
                            </div>
                            <hr>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <fieldset>
                                    <select name="delivery" class="option-drop" @change="selectDelivery($event)">
                                        <option selected="" value="">Вариант доставки</option>
                                        <option v-bind:value="delivery.id" v-for="delivery in deliveries">{{
                                            delivery.name }}
                                        </option>
                                    </select>
                                </fieldset>
                                <span v-show="order.delivery_id === 1">Херсон, улица Крымская 137, район Днепровского рынка</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-box select-dropdown">
                                <fieldset>
                                    <select name="region" class="option-drop" @change="selectRegion($event)">
                                        <option selected="" value="">Выберите область</option>
                                        <option v-bind:value="region.id" v-for="region in regions">{{ region.name_ru
                                            }}
                                        </option>
                                    </select>
                                </fieldset>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-box select-dropdown">
                                <fieldset>
                                    <select name="city" class="option-drop" @change="selectCity($event)">
                                        <option value="">Выберите город</option>
                                        <option v-bind:value="city.id" v-for="city in cities">{{ city.name_ru }}
                                        </option>
                                    </select>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mb-20">
                            <div class="heading-part">
                                <h3 class="sub-heading">Оплата</h3>
                            </div>
                            <hr>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <fieldset>
                                    <select name="payment" class="option-drop" @change="selectPayment($event)">
                                        <option selected="" value="">Вариант оплаты</option>
                                        <option v-bind:value="payment.id" v-for="payment in payments">{{
                                            payment.name }}
                                        </option>
                                    </select>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-xl-8 col-lg-7 mb-sm-30">
                <div class="col-12 mb-20">
                    <div class="heading-part">
                        <h3 class="sub-heading">Ваши товары</h3>
                    </div>
                    <hr>
                </div>
                <div class="cart-item-table commun-table mb-30">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Продукт</th>
                                <th>Информация</th>
                                <th>Итого</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr v-for="item in cart.list">
                                <td>
                                    <a v-bind:href="item.alias">
                                        <div class="product-image">
                                            <img v-bind:alt="item.name"
                                                 :src="item.image.length > 1 ? item.image : '/images/no-image.png'">
                                        </div>
                                    </a>
                                </td>
                                <td>
                                    <div class="product-title">
                                        <a v-bind:href="item.alias">{{ item.name }}</a>
                                        <div class="product-info-stock-sku m-0">
                                            <div>
                                                <label>Цена: </label>
                                                <div class="price-box"><span
                                                    class="info-deta price">₴ {{ item.price }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-info-stock-sku m-0">
                                            <div>
                                                <label>Кол-во: </label>
                                                <span class="info-deta">{{ item.count }}</span></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="total-price price-box">
                                        <span class="price">₴ {{ (item.price * item.count).toFixed(2) }}</span>
                                    </div>
                                </td>
                                <td>
                                    <i class="fa fa-trash cart-remove-item" @click.prevent="removeFromCart(item.id)"
                                       title="Удалить"></i>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="cart-total-table commun-table mb-30 mb-sm-15">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th colspan="2">Итого</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Всего за товары товаров</td>
                                <td>
                                    <div class="price-box"><span class="price">₴ {{ cart.totalPrice }}</span></div>
                                </td>
                            </tr>
                            <tr>
                                <td>Доставка</td>
                                <td>
                                    <div class="price-box"><span class="price">$0.00</span></div>
                                </td>
                            </tr>
                            <tr>
                                <td><b>К оплате</b></td>
                                <td>
                                    <div class="price-box"><span class="price"><b>₴ {{ cart.totalPrice }}</b></span>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div class="col-md-12 mt-20 mt-xs-15">
                <a @click.prevent="onSubmit()" class="btn btn-color right-side">Оформить</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoading: false,
                cart: this.$store.state,
                deliveries: [],
                cities: [],
                regions: [],
                payments: [],
                order: {
                    first_name: null,
                    last_name: null,
                    middle_name: null,
                    email: null,
                    phone: null,
                    delivery_id: null,
                    region_id: null,
                    city_id: null,
                    user_id: null,
                    payment_id: null,
                },
                errors: []
            }
        },
        mounted() {
            if (this.$attrs.user.hasOwnProperty('id')) {
                this.order.user_id = this.$attrs.user.id;
                this.order.first_name = this.$attrs.user.name;
                this.order.last_name = this.$attrs.user.last_name;
                this.order.middle_name = this.$attrs.user.middle_name;
                this.order.email = this.$attrs.user.email;
                this.order.phone = this.$attrs.user.phone;
            }

            axios.get('api/v1/regions/list')
                .then(({data}) => this.setRegionsSuccessResponse(data))
                .catch((response) => this.setRegionsErrorResponse(response));

            axios.get('api/v1/deliveries/list')
                .then(({data}) => this.setDeliveriesSuccessResponse(data))
                .catch((response) => this.setDeliveriesErrorResponse(response));

            axios.get('api/v1/payments/list')
                .then(({data}) => this.setPaymentsSuccessResponse(data))
                .catch((response) => this.setPaymentsErrorResponse(response));
        },
        methods: {
            onSubmit() {
                this.isLoading = true;
                axios.post('/api/v1/orders/create', this.order)
                    .then(() => this.setOnSubmitSuccessResponse())
                    .catch(({response}) => this.setOnSubmitErrorResponse(response));
            },
            setOnSubmitSuccessResponse() {
                this.isLoading = false;

                this.order.first_name = null;
                this.order.last_name = null;
                this.order.middle_name = null;
                this.order.email = null;
                this.order.phone = null;
                this.order.delivery_id = null;
                this.order.region_id = null;
                this.order.city_id = null;
                this.order.payment_id = null;

                swal({
                    title: 'Оформлен!',
                    text: 'Ваш заказ был оформлен мы свяжемся с Вами в ближайшее время :)',
                    icon: 'success',
                });

                location.href = '/thank';
            },
            setOnSubmitErrorResponse(response) {
                this.isLoading = false;

                this.errors = response.data;
            },
            setRegionsSuccessResponse(data) {
                this.isLoading = false;
                this.regions = data.result;
            },
            setRegionsErrorResponse(response) {
                this.isLoading = false;
                console.log(response);
            },
            setPaymentsSuccessResponse(data) {
                this.isLoading = false;
                this.payments = data.result;
            },
            setPaymentsErrorResponse(response) {
                this.isLoading = false;
                console.log(response);
            },
            setDeliveriesSuccessResponse(data) {
                this.isLoading = false;
                this.deliveries = data.result;
            },
            setDeliveriesErrorResponse(response) {
                this.isLoading = false;
                console.log(response);
            },
            selectDelivery(event) {
                this.order.delivery_id = parseInt(event.target.value);
            },
            selectCity(event) {
                this.order.city_id = parseInt(event.target.value);
            },
            selectPayment(event) {
                this.order.payment_id = parseInt(event.target.value);
            },
            selectRegion(event) {
                let region = event.target.value;

                this.order.region_id = parseInt(region);

                axios.get('api/v1/cities/' + region)
                    .then(({data}) => this.setCitiesSuccessResponse(data))
                    .catch((response) => this.setCitiesErrorResponse(response));
            },
            setCitiesSuccessResponse(data) {
                this.isLoading = false;
                this.cities = data.result;
            },
            setCitiesErrorResponse(response) {
                this.isLoading = false;
                console.log(response);
            },
            removeFromCart(id) {
                axios.delete('/api/v1/cart/delete/' + id)
                    .then(() => this.deleteCartListSuccessResponse())
                    .catch((response) => this.deleteCartListErrorResponse(response));
            },
            deleteCartListSuccessResponse() {
                this.$store.commit('loadCart');
            },
            deleteCartListErrorResponse(response) {
                this.isLoading = false;
                console.log(response);
            },
        }
    }
</script>

<style>
    span .has-error {
        color: #ff0000;
    }

    input .has-error {
        border-color: #ff0000;
    }
</style>
