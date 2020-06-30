<template>
    <li class="cart-icon">
        <a href="/cart">
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
                            <img v-bind:alt="item.name" :src="item.image.length > 1 ? item.image : '/images/no-image.png'">
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
            <p class="cart-sub-title">
                <span class="pull-left">Итого</span>
                <span class="pull-right">
                    <strong class="price-box">₴ {{ cart.totalPrice }}</strong>
                </span>
            </p>
            <div class="clearfix"></div>
            <div class="mt-20">
                <a href="/cart" class="btn-color btn"><i class="fa fa-shopping-cart"></i>Корзина</a>
                <a v-if="cart.list.length" href="/checkout" class="btn-color btn right-side"><i class="fa fa-share"></i>Купить</a>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                cart: this.$store.state,
            }
        },
        mounted() {
            this.$store.commit('loadCart');
        },
        methods: {
            removeFromCart(id) {
                axios.delete('/api/v1/cart/delete/' + id)
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
