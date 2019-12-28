@if($brands)
    <div class="brand-logo ptb-70">
        <div class="container">
            <div class="row">
                <div class="col-12 ">
                    <div class="heading-part align-center mb-30">
                        <h2 class="main_title heading"><span>Наши бренды</span></h2>
                    </div>
                </div>
            </div>
            <div class="row brand">
                <div class="col-md-12">
                    <div id="brand-logo" class="owl-carousel align_center">
                        @foreach($brands as $brand)
                            <div class="item">
                                <a href="javascript:void(0)">
                                    <img src="{{ $brand->image }}" alt="{{ $brand->name }}" style="max-width: 170px">
                                </a>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endif
