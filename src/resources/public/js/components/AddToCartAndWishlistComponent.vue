<template>
    <div class="product-detail-inner">
        <div class="detail-inner-left">
            <ul>
                <li class="pro-cart-icon">
                    <button v-on:click="addToCart" title="Добавить в корзину"></button>
                </li>
                <li class="pro-wishlist-icon">
                    <button v-on:click="addToWishlist" title="Добавить в список желаний"></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                item: {
                    count: 1,
                    item_id: null,
                },
            };
        },
        mounted() {
            this.item.item_id = this.$attrs.item;
        },
        methods: {
            addToCart() {
                axios.post('/api/v1/cart/add', this.item)
                    .then(({data}) => this.addToCartSuccessResponse(data))
                    .catch(({response}) => this.addToCartErrorResponse(response));
            },
            addToCartSuccessResponse(data) {
                this.$store.commit('loadCart');

                swal({
                    title: 'Добавлено!',
                    text: 'Товар в корзине :)',
                    icon: 'success',
                });
            },
            addToCartErrorResponse(response) {
                swal({
                    title: 'Ошибка!',
                    text: 'Что то сломалось :(',
                    icon: 'error',
                });
            },
            addToWishlist() {
                axios.post('/api/v1/wishlist/add', this.item)
                    .then(({data}) => this.addToWishlistSuccessResponse(data))
                    .catch(({response}) => this.addToWishlistErrorResponse(response));
            },
            addToWishlistSuccessResponse(data) {
                swal({
                    title: 'Добавлено!',
                    text: 'Товар в в Вашем списке желаний :)',
                    icon: 'success',
                });
            },
            addToWishlistErrorResponse(response) {
                swal({
                    title: 'Ошибка!',
                    text: 'Что то сломалось :(',
                    icon: 'error',
                });
            },
        }
    }
</script>
