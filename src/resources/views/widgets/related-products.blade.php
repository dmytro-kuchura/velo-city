<section class="pb-70">
    <div class="container">
        <div class="product-listing">
            <div class="row">
                <div class="col-12">
                    <div class="heading-part align-center mb-30">
                        <h2 class="main_title heading"><span>Related Products</span></h2>
                    </div>
                </div>
            </div>
            <div class="pro_cat">
                <div class="row">
                    <div class="owl-carousel pro-cat-slider">
                        @foreach($items as $item)
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
                                            <img src="{{ $item->image ? $item->image : '/images/no-image.png' }}" alt="{{ $item->name }}">
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
    </div>
</section>
