<section class="pt-70">
    <div class="container">
        <div class="row">
            <div class="col-12 ">
                <div class="heading-part align-center mb-30">
                    <h2 class="main_title heading"><span>Последние новости</span></h2>
                </div>
            </div>
        </div>
        <div class="row">
            <div id="blog" class="owl-carousel">
                @if($news)
                    @foreach($news as $record)
                        <div class="item">
                            <div class="blog-item">
                                <div class="row">
                                    <div class="col-md-6 mb-xs-30">
                                        <div class="blog-media">
                                            <img src="{{ $record->image }}" alt="{{ $record->name }}">
                                            <div class="blog-effect"></div>
                                            <a href="{{ $record->alias }}" title="{{ $record->name }}"
                                               class="read">&nbsp;</a>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="blog-detail">
                                            <div class="blog-title">
                                                <a href="single-blog.html">{{ $record->name }}</a>
                                            </div>
                                            <span>by Wed Censtoriya</span>
                                            <div class="post-info">
                                                <p>{{ $record->short }}</p>
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0)">0 comment(s)</a>
                                                    </li>
                                                    <li class="right-side">
                                                        <a href="single-blog.html">Read more
                                                            <i class="fa fa-angle-double-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif
            </div>
        </div>
    </div>
</section>
