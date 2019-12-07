<template>
    <table class="table">
        <thead>
        <tr>
            <th>Product</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sub Total</th>
            <th>Action</th>
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
                    <button type="button" v-on:click="onDecrement" class="reduced items"><i class="fa fa-minus"></i></button>
                    <input type="text" v-model="item.count" class="input-text qty">
                    <button type="button" v-on:click="onIncrement" class="increase items"><i class="fa fa-plus"></i></button>
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
                cart: this.$store.state,
                item: {
                    count: 1,
                    item_id: null,
                },
                isLoading: true,
            }
        },
        methods: {
            onIncrement() {
                this.item.count++;
            },
            onDecrement() {
                if (this.item.count > 1) {
                    this.item.count--;
                }
            },
            removeFromCart(id) {
                axios.delete("/api/v1/cart/delete/" + id)
                    .then(() => this.deleteCartListSuccessResponse())
                    .catch((response) => this.deleteCartListErrorResponse(response));
            },
            deleteCartListSuccessResponse() {
                axios.get("/api/v1/cart/list")
                    .then(({data}) => this.setCartListSuccessResponse(data))
                    .catch((response) => this.setCartListErrorResponse(response));
            },
            deleteCartListErrorResponse(response) {
                this.isLoading = false;
            },
            setCartListSuccessResponse(data) {
                this.$store.commit('loadCart', data.result);
            },
            setCartListErrorResponse(response) {
                this.isLoading = false;
            }
        }
    }
</script>
