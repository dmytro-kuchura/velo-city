<div class="featured-product ptb-70">
    <div class="container">
        <div class="product-listing">
            <div class="row">
                <div class="col-12">
                    <div class="heading-part align-center mb-30">
                        <h2 class="main_title heading">Наши товары</h2>
                        <div id="tabs" class="category-bar mt-20">
                            <ul class="tab-stap">
                                <li><a class="tab-step1 selected" title="step1">Специальные предложения</a></li>
                                <li>-</li>
                                <li><a class="tab-step2" title="step2">Найболее просматриваемые</a></li>
                                <li>-</li>
                                <li><a class="tab-step3" title="step3">Последние добавленые</a></li>
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
                                                    @widget('item', ['item' => $item])
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
                                                    @widget('item', ['item' => $item])
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
                                                    @widget('item', ['item' => $item])
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
