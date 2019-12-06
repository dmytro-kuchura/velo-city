<template>
    <li class="cart-icon">
        <a href="javascript:void(0)">
            <span class="cart-icon-main"><small class="cart-notification">2</small> </span>
            <div class="cart-text">
                <div class="my-cart">Shopping Cart</div>
                <div class="total-price">$650.00</div>
            </div>
        </a>
        <div class="cart-dropdown header-link-dropdown">
            <ul class="cart-list link-dropdown-list">
                <li> <a class="close-cart"><i class="fa fa-times-circle"></i></a>
                    <div class="media"> <a class="pull-left"> <img alt="Roadie" src="/images/1.jpg"></a>
                        <div class="media-body"> <span><a href="javascript:void(0)">Black African Print Skirt</a></span>
                            <p class="cart-price">$14.99</p>
                            <div class="product-qty">
                                <label>Qty:</label>
                                <div class="custom-qty">
                                    <input type="text" name="qty" maxlength="8" value="1" title="Qty" class="input-text qty">
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li> <a class="close-cart"><i class="fa fa-times-circle"></i></a>
                    <div class="media"> <a class="pull-left"> <img alt="Roadie" src="/images/2.jpg"></a>
                        <div class="media-body"> <span><a href="javascript:void(0)">Black African Print Skirt</a></span>
                            <p class="cart-price">$14.99</p>
                            <div class="product-qty">
                                <label>Qty:</label>
                                <div class="custom-qty">
                                    <input type="text" name="qty" maxlength="8" value="1" title="Qty" class="input-text qty">
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <p class="cart-sub-totle"> <span class="pull-left">Cart Subtotal</span> <span class="pull-right"><strong class="price-box">$29.98</strong></span> </p>
            <div class="clearfix"></div>
            <div class="mt-20">
                <a href="cart.html" class="btn-color btn"><i class="fa fa-shopping-cart"></i>Cart</a>
                <a href="checkout.html" class="btn-color btn right-side"><i class="fa fa-share"></i>Checkout</a>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                cart: [],
                isLoading: true,
                errors: [],
            };
        },
        mounted() {
            axios.get("/api/v1/cart/list")
                .then(({data}) => this.setCartListSuccessResponse(data))
                .catch((response) => this.setCartListErrorResponse(response));
        },
        methods: {
            // onSubmit() {
            //     this.isLoading = true;
            //     axios.post("api/v1/search", {"searchQuery": this.searchQuery})
            //         .then(({data}) => this.setSuccessResponse(data))
            //         .catch(({response}) => this.setErrorResponse(response));
            // },
            // setSuccessResponse(data) {
            //     this.isLoading = false;
            //     this.searchResults = data.searchResults;
            //     this.emptyResults = !data.searchResults.length;
            //     this.errors = [];
            //     this.isFetched = true;
            // },
            // setErrorResponse(response) {
            //     this.isLoading = false;
            //     this.emptyResults = true;
            //     this.isFetched = false;
            //     this.errors = response.data.errors;
            //     toastr.error("The given data was invalid.", "Error!");
            // },
            setCartListSuccessResponse(data) {
                this.cart = data;
            },
            setCartListErrorResponse(response) {
                this.isLoading = false;
                swal.error("Error, maybe you forget Migrate and Seeding database?!?", "Inconceivable!")
            }
        }
    }
</script>
