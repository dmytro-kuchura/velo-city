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
                                <input type="text" required placeholder="Имя">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <input type="text" required placeholder="Фамилия">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <input type="text" required placeholder="Отчество">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <input type="email" required placeholder="Email Address">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input-box">
                                <input type="text" required placeholder="Contact Number">
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
                                    <select name="delivery" class="option-drop" id="delivery">
                                        <option selected="" value="">Вариант доставки</option>
                                        <option value="AX">Самовывоз</option>
                                        <option value="AX">Новой Почтой</option>
                                        <option value="AF">Курьером (Новой Почтой)</option>
                                        <option value="AF">Justin</option>
                                    </select>
                                </fieldset>
                                <!--                                <span>Please include landmark.</span>-->
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-box select-dropdown">
                                <fieldset>
                                    <select name="region" class="option-drop" id="region" @change="selectRegion($event)" >
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
                                    <select name="city" class="option-drop" id="city">
                                        <option value="">Выберите город</option>
                                        <option v-bind:value="city.id" v-for="city in cities">{{ city.name_ru }}
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
                                            <img alt="Honour" src="images/1.jpg">
                                        </div>
                                    </a>
                                </td>
                                <td>
                                    <div class="product-title">
                                        <a v-bind:href="item.alias">{{ item.name }}</a>
                                        <div class="product-info-stock-sku m-0">
                                            <div>
                                                <label>Цена: </label>
                                                <div class="price-box"><span class="info-deta price">₴ {{ item.price }}</span>
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
                                    <i class="fa fa-trash cart-remove-item" @click.prevent="removeFromCart(item.id)" title="Удалить"></i>
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
                                    <div class="price-box"><span class="price"><b>₴ {{ cart.totalPrice }}</b></span></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div class="col-md-12 mt-20 mt-xs-15">
                <a href="order-overview.html" class="btn btn-color right-side">Оформить</a>
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
                delivery: [],
                cities: [],
                regions: [],
            }
        },
        mounted() {
            axios.get("api/v1/regions/list")
                .then(({data}) => this.setRegionsSuccessResponse(data))
                .catch((response) => this.setRegionsErrorResponse(response));
        },
        methods: {
            setRegionsSuccessResponse(data) {
                this.isLoading = false;
                this.regions = data.result;
            },
            setRegionsErrorResponse(response) {
                this.isLoading = false;
                toastr.error("Error, maybe you forget Migrate and Seeding database?!?", "Inconceivable!")
            },
            selectRegion(event) {
                axios.get("api/v1/cities/" + event.target.value)
                    .then(({data}) => this.setCitiesSuccessResponse(data))
                    .catch((response) => this.setCitiesErrorResponse(response));
            },
            setCitiesSuccessResponse(data) {
                this.isLoading = false;
                this.cities = data.result;
            },
            setCitiesErrorResponse(response) {
                this.isLoading = false;
                toastr.error("Error, maybe you forget Migrate and Seeding database?!?", "Inconceivable!")
            },
            removeFromCart(id) {
                axios.delete("/api/v1/cart/delete/" + id)
                    .then(() => this.deleteCartListSuccessResponse())
                    .catch((response) => this.deleteCartListErrorResponse(response));
            },
            deleteCartListSuccessResponse() {
                this.$store.commit('loadCart');
            },
            deleteCartListErrorResponse(response) {
                console.log(response);
            }
        }
    }
</script>
