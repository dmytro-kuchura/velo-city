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
                @foreach($result as $obj)

                    <div class="item">
                        <div class="blog-item">
                            <div class="row">
                                <div class="col-md-6 mb-xs-30">
                                    <div class="blog-media">
                                        <img src="images/blog_img1.jpg" alt="Roadie">
                                        <div class="blog-effect"></div>
                                        <a href="{{ '/news/' . $obj->slug }}" title="Просмотр" class="read">&nbsp;</a>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="blog-detail">
                                        <div class="blog-title"><a href="single-blog.html">{{ $obj->title }}</a>
                                        </div>
                                        {{--<span>by Wed Censtoriya</span>--}}
                                        <div class="post-info">
                                            <p>{{ $obj->excerpt }}</p>
                                            <ul>
                                                <li>
                                                    <a href="javascript:void(0)">0 комментарий(ев)</a>
                                                </li>
                                                <li class="right-side">
                                                    <a href="{{ '/news/' . $obj->slug }}">Просмотр
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
            </div>
        </div>
    </div>
</section>