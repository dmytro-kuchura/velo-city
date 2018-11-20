<section class="pt-70">
    <div class="container">
        <div class="product-listing">
            <div class="row">
                <div class="col-12">
                    <div class="heading-part align-center mb-30">
                        <h2 class="main_title heading"><span>Популярные товары</span></h2>
                    </div>
                </div>
            </div>
            <div class="pro_cat">
                <div class="row">
                    <div class="owl-carousel pro-cat-slider">
                        @foreach ($products as $product)
                        <div class="item">
                            <div class="product-item">
                                <div class="main-label new-label"><span>New</span></div>
                                <div class="product-image">
                                    <a href="{{ route('shop.show', $product->slug) }}"> <img src="{{ productImage($product->image) }}" alt="Roadie"> </a>
                                </div>
                                <div class="product-details">
                                    <div class="product-item-details">
                                        <div class="product-item-name">
                                            <a href="{{ route('shop.show', $product->slug) }}">{{ $product->name }}</a>
                                        </div>
                                        <div class="rating-summary-block">
                                            <div class="rating-result" title="53%"><span style="width:53%"></span>
                                            </div>
                                        </div>
                                        <div class="price-box">
                                            <span class="price">$520.00</span>
                                            <del class="price old-price">$620.00</del>
                                        </div>
                                    </div>
                                    <div class="product-detail-inner">
                                        <div class="detail-inner-left">
                                            <ul>
                                                <li class="pro-cart-icon">
                                                    <form>
                                                        <button title="Add to Cart"></button>
                                                    </form>
                                                </li>
                                                <li class="pro-wishlist-icon">
                                                    <a title="Wishlist" href="wishlist.html"></a>
                                                </li>
                                                <li class="pro-quick-view-icon">
                                                    <a title="quick-view" href="#product_popup" class="popup-with-product"></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>