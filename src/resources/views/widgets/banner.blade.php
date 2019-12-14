<section class="banner-main container-full-sm">
    <div class="banner">
        <div class="main-banner">
            @if($banners)
                @foreach($banners as $banner)
                    <div class="banner-1">
                        <img src="{{ $banner->image }}" alt="{{ $banner->title }}">
                        <div class="banner-detail align-center">
                            <div class="container">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-7 col-xl-40per">
                                        <div class="banner-detail-inner">
                                            <span class="slogan">{{ $banner->slogan }}</span>
                                            <h1 class="banner-title">{{ $banner->title }}</h1>
                                            <div class="sub-title">{{ $banner->description }}</div>
                                            <a class="btn btn-color mt-30" href="{{ $banner->link }}">Shop Now!</a>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-5 col-xl-60per"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif

        </div>
    </div>
</section>
