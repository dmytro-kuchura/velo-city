<template>
    <div>
        <div class="mb-20">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-xl-3 col-lg-4 col-md-4 col-sm-3">
                            <span>Кол-во:</span>
                        </div>
                        <div class="col-xl-9 col-lg-8 col-md-8 col-sm-9">
                            <div class="custom-qty">
                                <button v-on:click="onDecrement" class="reduced items" type="button"><i  class="fa fa-minus"></i></button>
                                <input type="text" v-model="item.count" class="input-text qty">
                                <button v-on:click="onIncrement" class="increase items" type="button"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="mb-20">
        <div class="bottom-detail cart-button">
            <ul>
                <li class="pro-cart-icon">
                    <button v-on:click="onSubmit" class="btn-color"><i class="fa fa-shopping-basket"></i> В корзину</button>
                </li>
                <li class="pro-wishlist-icon">
                    <a href="javascript:void(0)"><span><i class="fa fa-heart"></i></span>В избранное</a>
                </li>
                <li class="pro-email-icon">
                    <a href="javascript:void(0)"><span><i class="fa fa-envelope"></i></span>Следить за ценой</a>
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
            onIncrement() {
                this.item.count++;
            },
            onDecrement() {
                if (this.item.count > 1) {
                    this.item.count--;
                }
            },
            onSubmit() {
                axios.post("/api/v1/cart/add", this.item)
                    .then(({data}) => this.setSuccessResponse(data))
                    .catch(({response}) => this.setErrorResponse(response));
            },
            setSuccessResponse(data) {
                this.$store.commit("loadCart");

                swal({
                    title: "Добавлено!",
                    text: "Товар в корзине :)",
                    icon: "success",
                });
            },
            setErrorResponse(response) {
                swal({
                    title: "Ошибка!",
                    text: "Что то сломалось :(",
                    icon: "error",
                });
            }
        }
    }
</script>
