{{--@extends('layouts.main')--}}
{{--@section('content')--}}
<!-- SUB-BANNER START -->
@widget('Header')
@widget('Categories')
<!-- SUB-BANNER END -->

<!--  Featured Products Block Start  -->
@widget('Popular')
<!--  Featured Products Block Start  -->

<!-- perellex-banner Start -->
<section>
    <div class="perellex-banner">
        <div class="container">
            <div class="row">
                <div class="col-12 ptb-70 client-box">
                    <div class="perellex-delail float-none-sm right-side align-center">
                        <div class="perellex-subtitle">weekend</div>
                        <div class="perellex-title">Special Offer</div>
                        <div class="perellex-des">Click & Collect First Delivery Free Over $20*</div>
                        <a class="btn btn-color mt-30" href="shop.html">Shop Now!</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- perellex-banner End -->

<!--News Block Start -->
@widget('News')
<!--News Block End -->

<!--  Site Services Features Block Start  -->
<div class="pt-70">
    <div class="ser-feature-block gray-bg">
        <div class="container">
            <div class="center-xs">
                <div class="row">
                    <div class="col-xl-3 col-md-6 service-box">
                        <div class="feature-box ">
                            <div class="feature-icon feature1"></div>
                            <div class="feature-detail">
                                <div class="ser-title">Free Delivery</div>
                                <div class="ser-subtitle">From $59.89</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 service-box">
                        <div class="feature-box">
                            <div class="feature-icon feature2"></div>
                            <div class="feature-detail">
                                <div class="ser-title">Support 24/7</div>
                                <div class="ser-subtitle">Online 24 hours</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 service-box">
                        <div class="feature-box ">
                            <div class="feature-icon feature3"></div>
                            <div class="feature-detail">
                                <div class="ser-title">Free return</div>
                                <div class="ser-subtitle">365 a day</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 service-box">
                        <div class="feature-box ">
                            <div class="feature-icon feature4"></div>
                            <div class="feature-detail">
                                <div class="ser-title">Big Saving</div>
                                <div class="ser-subtitle">Weeken Sales</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--  Site Services Features Block End  -->

<!-- Brand logo block Start  -->
@widget('Brands')
<!-- Brand logo block End  -->
{{--@endsection--}}