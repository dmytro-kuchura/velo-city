<div class="banner inner-banner1 ">
    <div class="container">
        <section class="banner-detail center-xs">
            <h1 class="banner-title">{{ $page }}</h1>
            @if(!empty($breadcrumbs))
                <div class="bread-crumb right-side float-none-xs">
                    <ul itemscope itemtype="http://schema.org/BreadcrumbList">
                        @foreach($breadcrumbs as $key => $bread)
                            @if(isset($bread['link']))
                                <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                    <a itemprop="item" href="{{ $bread['link'] }}">
                                        <span itemprop="name">{{ $bread['label'] }}</span>
                                    </a>/
                                    <meta itemprop="position" content="{{ $key + 1 }}" />
                                </li>
                            @else
                                <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                    <span itemprop="name">{{ $bread['label'] }}</span>
                                    <meta itemprop="position" content="{{ $key + 1 }}" />
                                </li>
                            @endif
                        @endforeach
                    </ul>
                </div>
            @endif
        </section>
    </div>
</div>
