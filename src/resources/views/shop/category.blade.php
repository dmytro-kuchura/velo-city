@extends('layouts.main')

@section('content')
    @widget('breadcrumbs')

    <section class="ptb-70">
        <div class="container">
            @if(count($result) > 0)
            <div class="row">
                @widget('filter')
                <div class="col-xl-10 col-lg-9 col-xl-80per">
                    <div class="shorting mb-30">
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="view">
                                    <div class="list-types grid active ">
                                        <a>
                                            <div class="grid-icon list-types-icon"></div>
                                        </a>
                                    </div>
                                    <div class="list-types list">
                                        <a>
                                            <div class="list-icon list-types-icon"></div>
                                        </a>
                                    </div>
                                </div>
                                <div class="short-by float-right-sm"><span>Сортировка :</span>
                                    <div class="select-item select-dropdown">
                                        <fieldset>
                                            <select name="speed" id="sort-price" class="option-drop">
                                                <option value="" selected="selected">Название (от А до Я)</option>
                                                <option value="">Название (от Я до А)</option>
                                                <option value="">Цена (низкая &gt; высокая)</option>
                                                <option value="">Цена (высокая &gt; низкая)</option>
                                                <option value="">Рейтинг (высокий)</option>
                                                <option value="">Рейтинг (низкий)</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="show-item float-left-sm">
                                    <span>Отображается :</span>
                                    <div class="select-item select-dropdown">
                                        <fieldset>
                                            <select name="speed" id="show-item" class="option-drop">
                                                <option value="" selected="selected">12</option>
                                                <option value="">24</option>
                                                <option value="">48</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                    <span>на страницу</span>
{{--                                    <div class="compare float-right-sm">--}}
{{--                                        <a href="compare.html" class="btn btn-color">Сравнение (0)</a>--}}
{{--                                    </div>--}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-listing grid-type">
                        <div class="inner-listing">
                            <div class="row">
                                @foreach($result as $item)
                                    <div class="col-xl-3 col-lg-4 col-md-4 col-6 item-width mb-30">
                                        <div class="product-item {{ $item->available === 1 ? '' : 'sold-out' }}">
                                            @if($item->sale)
                                                <div class="main-label sale-label"><span>Sale</span></div>
                                            @endif
                                            @if($item->new)
                                                <div class="main-label new-label"><span>New</span></div>
                                            @endif
                                            <div class="row">
                                                <div class="img-col col-12">
                                                    <div class="product-image">
                                                        <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">
                                                            <img src="{{ $item->image ? $item->image : '/images/no-image.png' }}" alt="{{ $item->name }}">
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="detail-col col-12">
                                                    <div class="product-details">
                                                        <div class="product-item-details">
                                                            <div class="product-item-name">
                                                                <a href="{{ route('shop.item', ['alias' => $item->alias, 'id' => $item->id]) }}">
                                                                    {{ $item->name }}
                                                                </a>
                                                            </div>
                                                            <div class="rating-summary-block">
                                                                <div class="rating-result" title="53%"><span
                                                                        style="width:53%"></span></div>
                                                            </div>
                                                            <div class="price-box">
                                                                <span class="price">₴ {{ $item->cost }}</span>
                                                                @if($item->sale)
                                                                    <del class="price old-price">₴ {{ $item->cost_old }}</del>
                                                                @endif
                                                            </div>
                                                            <div class="product-des">
                                                                <p>{{ $item->getShortAttribute() }}</p>
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
                                                                    <li class="pro-compare-icon">
                                                                        <a title="Compare" href="compare.html"></a>
                                                                    </li>
                                                                    <li class="pro-quick-view-icon">
                                                                        <a
                                                                            title="quick-view"
                                                                            href="#product_popup"
                                                                            class="popup-with-product"></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            {!! $result->links('widgets.paginate') !!}
                        </div>
                    </div>
                </div>
            </div>
            @else
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-xl-100per">
                        <div class="product-listing grid-type">
                            <div class="inner-listing">
                                <div class="row">
                                    @foreach($categories as $category)
                                        <div class="col-xl-3 col-lg-4 col-md-4 col-6 item-width mb-30">
                                            <div class="product-item">
                                                <div class="row">
                                                    <div class="img-col col-12">
                                                        <div class="product-image">
                                                            <a href="{{ route('shop.category', ['category' => $category->alias]) }}">
                                                                <img src="{{ $category->image ? $category->image : '/images/no-image.png' }}" alt="{{ $category->name }}">
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="detail-col col-12">
                                                        <div class="product-details">
                                                            <div class="product-item-details">
                                                                <div class="product-item-name">
                                                                    <a href="{{ route('shop.category', ['category' => $category->alias]) }}">
                                                                        {{ $category->name }}
                                                                    </a>
                                                                </div>
                                                            </div>
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
            @endif
        </div>
    </section>
@endsection
