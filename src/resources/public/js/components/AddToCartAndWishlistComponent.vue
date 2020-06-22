<template>
    <div class="product-detail-inner">
        <div class="detail-inner-left">
            <ul>
                <li class="pro-cart-icon">
                    <button v-on:click="addToCart" title="Добавить в корзину"></button>
                </li>
                <li class="pro-wishlist-icon">
                    <button v-on:click="addToWishlist" title="Список желаний"></button>
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
                    .then(({data}) => this.setSuccessResponse(data))
                    .catch(({response}) => this.setErrorResponse(response));
            },
            setSuccessResponse(data) {
                this.$store.commit('loadCart');

                swal({
                    title: 'Добавлено!',
                    text: 'Товар в корзине :)',
                    icon: 'success',
                });
            },
            setErrorResponse(response) {
                swal({
                    title: 'Ошибка!',
                    text: 'Что то сломалось :(',
                    icon: 'error',
                });
            },

            addToWishlist() {
                axios.post('/api/v1/cart/add', this.item)
                    .then(({data}) => this.setSuccessResponse(data))
                    .catch(({response}) => this.setErrorResponse(response));
            },
        }
    }
</script>
