<template>
    <li class="cart-icon">
        <a href="javascript:void(0)">
            <span class="cart-icon-main"><small class="cart-notification">{{ cart.totalCount }}</small> </span>
            <div class="cart-text">
                <div class="my-cart">Ваша корзина</div>
                <div class="total-price">₴ {{ cart.totalPrice }}</div>
            </div>
        </a>
        <div class="cart-dropdown header-link-dropdown">
            <ul class="cart-list link-dropdown-list">
                <li v-for="item in cart.list">
                    <a class="close-cart" @click.prevent="removeFromCart(item.id)"><i class="fa fa-times-circle"></i></a>
                    <div class="media">
                        <a class="pull-left">
                            <img v-bind:alt="item.name" src="/images/1.jpg">
                        </a>
                        <div class="media-body"> <span><a v-bind:href="item.alias">{{ item.name }}</a></span>
                            <p class="cart-price">₴ {{ item.price }}</p>
                            <div class="product-qty">
                                <label>Кол-во:</label>
                                <div class="custom-qty">
                                    <input type="text" name="qty" maxlength="8" v-model="item.count" title="Кол-во" class="input-text qty">
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <p class="cart-sub-totle"> <span class="pull-left">Итого</span> <span class="pull-right"><strong class="price-box">₴ {{ cart.totalPrice }}</strong></span> </p>
            <div class="clearfix"></div>
            <div class="mt-20">
                <a href="/cart" class="btn-color btn"><i class="fa fa-shopping-cart"></i>Корзина</a>
                <a href="/checkout" class="btn-color btn right-side"><i class="fa fa-share"></i>Купить</a>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                cart: this.$store.state,
                isLoading: true,
            }
        },
        mounted() {
            axios.get("/api/v1/cart/list")
                .then(({data}) => this.setCartListSuccessResponse(data))
                .catch((response) => this.setCartListErrorResponse(response));
        },
        methods: {
            removeFromCart(id) {
                axios.delete("/api/v1/cart/delete/" + id)
                    .then(() => this.deleteCartListSuccessResponse())
                    .catch((response) => this.deleteCartListErrorResponse(response));
            },
            setCartListSuccessResponse(data) {
                this.$store.commit("loadCart", data.result);
            },
            setCartListErrorResponse(response) {
                this.isLoading = false;
            },
            deleteCartListSuccessResponse() {
                axios.get("/api/v1/cart/list")
                    .then(({data}) => this.setCartListSuccessResponse(data))
                    .catch((response) => this.setCartListErrorResponse(response));
            },
            deleteCartListErrorResponse(response) {
                this.isLoading = false;
            }
        }
    }
</script>
