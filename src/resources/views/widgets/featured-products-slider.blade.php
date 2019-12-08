<div class="featured-product ptb-70">
    <div class="container">
        <div class="product-listing">
            <div class="row">
                <div class="col-12">
                    <div class="heading-part align-center mb-30">
                        <h2 class="main_title heading">Our Products</h2>
                        <div id="tabs" class="category-bar mt-20">
                            <ul class="tab-stap">
                                <li><a class="tab-step1 selected" title="step1">Special</a></li>
                                <li>-</li>
                                <li><a class="tab-step2" title="step2">Most Viewed</a></li>
                                <li>-</li>
                                <li><a class="tab-step3" title="step3">Latest</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pro_cat tab_content ">
                <div id="items">
                    <div class="">
                        <ul>
                            <li>
                                <div id="data-step1" class="items-step1 product-slider-main position-r selected" data-temp="tabdata">
                                    <div class="tab_cat">
                                        <div class="row">
                                            <div class="owl-carousel tab_slider">
                                                @foreach($special as $item)
                                                    <div class="item">
                                                        <div class="product-item {{ $item->available === 1 ? '' : 'sold-out' }}">
                                                            @if($item->sale)
                                                                <div class="main-label sale-label"><span>Sale</span></div>
                                                            @endif
                                                            @if($item->new)
                                                                <div class="main-label new-label"><span>New</span></div>
                                                            @endif
                                                            <div class="product-image">
                                                                <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">
                                                                    <img src="/images/4.jpg" alt="Roadie">
                                                                </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">{{ $item->name }}</a>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">₴ {{ $item->cost }}</span>
                                                                        @if($item->sale)
                                                                            <del class="price old-price">₴ {{ $item->cost_old }}</del>
                                                                        @endif
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
                            </li>
                            <li>
                                <div id="data-step2" class="items-step2 product-slider-main position-r" data-temp="tabdata">
                                    <div class="tab_cat">
                                        <div class="row">
                                            <div class="owl-carousel tab_slider">
                                                @foreach($mostViewed as $item)
                                                    <div class="item">
                                                        <div class="product-item {{ $item->available === 1 ? '' : 'sold-out' }}">
                                                            @if($item->sale)
                                                                <div class="main-label sale-label"><span>Sale</span></div>
                                                            @endif
                                                            @if($item->new)
                                                                <div class="main-label new-label"><span>New</span></div>
                                                            @endif
                                                            <div class="product-image">
                                                                <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">
                                                                    <img src="/images/4.jpg" alt="Roadie">
                                                                </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">{{ $item->name }}</a>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">₴ {{ $item->cost }}</span>
                                                                        @if($item->sale)
                                                                            <del class="price old-price">₴ {{ $item->cost_old }}</del>
                                                                        @endif
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
                            </li>
                            <li>
                                <div id="data-step3" class="items-step3 product-slider-main position-r" data-temp="tabdata">
                                    <div class="tab_cat">
                                        <div class="row">
                                            <div class="owl-carousel tab_slider">
                                                @foreach($latest as $item)
                                                    <div class="item">
                                                        <div class="product-item {{ $item->available === 1 ? '' : 'sold-out' }}">
                                                            @if($item->sale)
                                                                <div class="main-label sale-label"><span>Sale</span></div>
                                                            @endif
                                                            @if($item->new)
                                                                <div class="main-label new-label"><span>New</span></div>
                                                            @endif
                                                            <div class="product-image">
                                                                <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">
                                                                    <img src="/images/4.jpg" alt="Roadie">
                                                                </a>
                                                            </div>
                                                            <div class="product-details">
                                                                <div class="product-item-details">
                                                                    <div class="product-item-name">
                                                                        <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">{{ $item->name }}</a>
                                                                    </div>
                                                                    <div class="price-box">
                                                                        <span class="price">₴ {{ $item->cost }}</span>
                                                                        @if($item->sale)
                                                                            <del class="price old-price">₴ {{ $item->cost_old }}</del>
                                                                        @endif
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
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
