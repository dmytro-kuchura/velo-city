<template>
    <table class="table">
        <thead>
        <tr>
            <th>Товар</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Статус</th>
            <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in wishlist">
            <td>
                <a v-bind:href="item.alias">
                    <img v-bind:alt="item.name" :src="item.image.length > 1 ? item.image : '/images/no-image.png'">
                </a>
            </td>
            <td>
                <div class="product-title">
                    <a v-bind:href="item.alias">{{ item.name }}</a>
                    <div class="size-text"><span>Артикул: {{ item.artikul }}</span></div>
                </div>
            </td>
            <td>
                <ul>
                    <li>
                        <div class="base-price price-box">
                            <span class="price">₴ {{ item.price }}</span>
                        </div>
                    </li>
                </ul>
            </td>
            <td>
                <div class="total-price price-box">
                    <span class="price">{{ item.available ? 'Доступен' : 'Недоступен' }}</span>
                </div>
            </td>
            <td>
                <i title="Купить товар" @click.prevent="addToCart(item.id)"
                   class="fa fa-shopping-cart cart-remove-item"></i>
                <i title="Удалить товар" @click.prevent="removeFromWishlist(item.id)"
                   class="fa fa-trash cart-remove-item"></i>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        data() {
            return {
                wishlist: [],
            }
        },
        mounted() {
            this.getWishlist();
        },
        methods: {
            getWishlist() {
                axios.get('/api/v1/wishlist/list')
                    .then((response) => this.getWishlistSuccessResponse(response.data))
                    .catch((response) => this.getWishlistErrorResponse(response));
            },
            getWishlistSuccessResponse(data) {
                this.wishlist = data.result.list;
            },
            getWishlistErrorResponse(response) {
                console.log(response)
            },
            removeFromWishlist(id) {
                axios.delete('/api/v1/wishlist/delete/' + id)
                    .then(() => this.removeFromWishlistListSuccessResponse())
                    .catch((response) => this.removeFromWishlistListErrorResponse(response));
            },
            removeFromWishlistListSuccessResponse() {
                this.getWishlist();
            },
            removeFromWishlistListErrorResponse(response) {
                console.log(response);
            },
            addToCart(id) {
                axios.post('/api/v1/cart/add', {
                    count: 1,
                    item_id: id,
                })
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
        }
    }
</script>
