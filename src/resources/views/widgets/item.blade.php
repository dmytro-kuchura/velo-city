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
                @if(count($item->images) > 0)
                    <img src="{{ $item->images[0]->link }}" alt="{{ $item->name }}">
                @else
                    <img src="{{ $item->image ? $item->image : '/images/no-image.png' }}"
                         alt="{{ $item->name }}">
                @endif
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

            <add-to-cart-and-wishlist :item="{{ $item->id }}"></add-to-cart-and-wishlist>
        </div>
    </div>
</div>
