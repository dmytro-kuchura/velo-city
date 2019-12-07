@extends('layouts.main')

@section('content')
    <div class="banner inner-banner1 ">
        <div class="container">
            <section class="banner-detail center-xs">
                <h1 class="banner-title">Shopping Cart</h1>
                <div class="bread-crumb right-side float-none-xs">
                    <ul>
                        <li><a href="index.html">Home</a>/</li>
                        <li><span>Shopping Cart</span></li>
                    </ul>
                </div>
            </section>
        </div>
    </div>

    <section class="ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="cart-item-table commun-table">
                        <div class="table-responsive">
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
                                <tr>
                                    <td>
                                        <a href="product-page.html">
                                            <div class="product-image">
                                                <img alt="Roadie" src="images/1.jpg">
                                            </div>
                                        </a>
                                    </td>
                                    <td>
                                        <div class="product-title">
                                            <a href="product-page.html">Cross Colours Camo Print Tank half mengo</a>
                                        </div>
                                    </td>
                                    <td>
                                        <ul>
                                            <li>
                                                <div class="base-price price-box">
                                                    <span class="price">$520.00</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <div class="input-box select-dropdown">
                                            <fieldset>
                                                <select data-id="100" class="quantity_cart option-drop" name="quantity_cart">
                                                    <option selected="" value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </fieldset>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="total-price price-box">
                                            <span class="price">$520.00</span>
                                        </div>
                                    </td>
                                    <td>
                                        <i title="Remove Item From Cart" data-id="100" class="fa fa-trash cart-remove-item"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="product-page.html">
                                            <div class="product-image">
                                                <img alt="Roadie" src="images/2.jpg">
                                            </div>
                                        </a>
                                    </td>
                                    <td>
                                        <div class="product-title">
                                            <a href="product-page.html">Defyant Reversible Dot Shorts</a>
                                        </div>
                                    </td>
                                    <td>
                                        <ul>
                                            <li>
                                                <div class="base-price price-box">
                                                    <span class="price">$520.00</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <div class="input-box select-dropdown">
                                            <fieldset>
                                                <select data-id="100" class="quantity_cart option-drop" name="quantity_cart">
                                                    <option selected="" value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </fieldset>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="total-price price-box">
                                            <span class="price">$520.00</span>
                                        </div>
                                    </td>
                                    <td>
                                        <i title="Remove Item From Cart" data-id="100" class="fa fa-trash cart-remove-item"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-30">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="mt-30 mt-xs-15">
                            <a href="shop-3col-sidebar.html" class="btn btn-color">
                                <span><i class="fa fa-angle-left"></i></span>
                                Continue Shopping
                            </a>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mt-30 mt-xs-15 right-side xs-float-none">
                            <a href="checkout.html" class="btn btn-color">Proceed to checkout
                                <span><i class="fa fa-angle-right"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="mtb-30">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="cart-total-table commun-table">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th colspan="2">Cart Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Item(s)</td>
                                        <td>
                                            <div class="price-box">
                                                <span class="price">2</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Amount Payable</b></td>
                                        <td>
                                            <div class="price-box">
                                                <span class="price"><b>$160.00</b></span>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
