<template>
    <table class="table">
        <thead>
        <tr>
            <th>Товар</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Итого</th>
            <th>Действие</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cart.list">
            <td>
                <a href="product-page.html">
                    <div class="product-image">
                        <img alt="Roadie" src="images/1.jpg">
                    </div>
                </a>
            </td>
            <td>
                <div class="product-title">
                    <a v-bind:href="item.alias">{{ item.name }}</a>
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
                <div class="custom-qty">
                    <button type="button" v-on:click="onDecrement(item.count, item.id)" class="reduced items"><i
                            class="fa fa-minus"></i></button>
                    <input type="text" v-model="item.count" class="input-text qty">
                    <button type="button" v-on:click="onIncrement(item.count, item.id)" class="increase items"><i
                            class="fa fa-plus"></i></button>
                </div>
            </td>
            <td>
                <div class="total-price price-box">
                    <span class="price">₴ {{ item.price }}</span>
                </div>
            </td>
            <td>
                <i title="Remove Item From Cart" @click.prevent="removeFromCart(item.id)"
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
                isLoading: false,
                cart: this.$store.state,
                item: {
                    count: 1,
                    item_id: null,
                }
            }
        },
        methods: {
            onIncrement(item_count, item_id) {
                this.item.count = item_count + 1;
                this.item.item_id = item_id;

                axios.post("/api/v1/cart/update", this.item)
                    .then(() => this.cartListSuccessResponse())
                    .catch((response) => this.cartListErrorResponse(response));
            },
            onDecrement(item_count, item_id) {
                if (item_count > 1) {
                    this.item.count = item_count - 1;
                    this.item.item_id = item_id;

                    axios.post("/api/v1/cart/update", this.item)
                        .then(() => this.cartListSuccessResponse())
                        .catch((response) => this.cartListErrorResponse(response));
                }
            },
            removeFromCart(id) {
                axios.delete("/api/v1/cart/delete/" + id)
                    .then(() => this.cartListSuccessResponse())
                    .catch((response) => this.cartListErrorResponse(response));
            },
            cartListSuccessResponse() {
                this.$store.commit('loadCart');
            },
            cartListErrorResponse(response) {
                console.log(response);
            }
        }
    }
</script>
