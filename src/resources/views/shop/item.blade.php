@extends('layouts.main')

@section('content')
    <!-- Bread Crumb STRAT -->
    <div class="banner inner-banner1 ">
        <div class="container">
            <section class="banner-detail center-xs">
                <h1 class="banner-title">Women</h1>
                <div class="bread-crumb right-side float-none-xs">
                    <ul>
                        <li><a href="index.html">Home</a>/</li>
                        <li><span>Women</span></li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
    <!-- Bread Crumb END -->

    <!-- CONTAIN START -->
    <section class="pt-70">
        <div class="container">
            <div class="row">
                <div class="col-xl-9 col-12">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 mb-xs-30">
                            <div class="fotorama" data-nav="thumbs" data-allowfullscreen="native">
                                <a href="#"><img src="/images/1.jpg" alt="Roadie"></a>
                                <a href="#"><img src="/images/2.jpg" alt="Roadie"></a>
                                <a href="#"><img src="/images/3.jpg" alt="Roadie"></a>
                                <a href="#"><img src="/images/4.jpg" alt="Roadie"></a>
                                <a href="#"><img src="/images/5.jpg" alt="Roadie"></a>
                                <a href="#"><img src="/images/6.jpg" alt="Roadie"></a>
                                <a href="#"><img src="/images/4.jpg" alt="Roadie"></a>
                                <a href="#"><img src="/images/5.jpg" alt="Roadie"></a>
                                <a href="#"><img src="/images/6.jpg" alt="Roadie"></a>
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-7">
                            <div class="row">
                                <div class="col-12">
                                    <div class="product-detail-main">
                                        <div class="product-item-details">
                                            <h1 class="product-item-name">{{ $result->name }}</h1>

                                            <div class="price-box">
                                                <span class="price">₴ {{ $result->cost }}</span>
                                                @if($result->sale)
                                                    <del class="price old-price">₴ {{ $result->cost_old }}</del>
                                                @endif
                                            </div>
                                            <div class="product-info-stock-sku">
                                                <div>
                                                    <label>Availability: </label>
                                                    <span class="info-deta">In stock</span>
                                                </div>
                                                <div>
                                                    <label>SKU: </label>
                                                    <span class="info-deta">{{ $result->artikul }}</span>
                                                </div>
                                            </div>
                                            <hr class="mb-20">
                                            <p>{{ $result->information }}</p>
                                            <ul class="product-list">
                                                <li><i class="fa fa-check"></i> Satisfaction 100% Guaranteed</li>
                                                <li><i class="fa fa-check"></i> Free shipping on orders over $99</li>
                                                <li><i class="fa fa-check"></i> 14 day easy Return</li>
                                            </ul>
                                            <hr class="mb-20">
                                            <div class="mb-20">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-4 col-md-4 col-sm-3">
                                                                <span>Qty:</span>
                                                            </div>
                                                            <div class="col-xl-9 col-lg-8 col-md-8 col-sm-9">
                                                                <div class="custom-qty">
                                                                    <button
                                                                        onclick="var result = document.getElementById('qty'); var qty = result.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) result.value--;return false;"
                                                                        class="reduced items" type="button"><i
                                                                            class="fa fa-minus"></i></button>
                                                                    <input type="text" class="input-text qty"
                                                                           title="Qty" value="1" maxlength="8" id="qty"
                                                                           name="qty">
                                                                    <button
                                                                        onclick="var result = document.getElementById('qty'); var qty = result.value; if( !isNaN( qty )) result.value++;return false;"
                                                                        class="increase items" type="button"><i
                                                                            class="fa fa-plus"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr class="mb-20">
                                            <div class="bottom-detail cart-button">
                                                <ul>
                                                    <li class="pro-cart-icon">
                                                        <form>
                                                            <button title="Add to Cart" class="btn-color"><i
                                                                    class="fa fa-shopping-basket"></i> Add to Cart
                                                            </button>
                                                        </form>
                                                    </li>
                                                    <li class="pro-wishlist-icon"><a href="wishlist.html"><span><i
                                                                    class="fa fa-heart"></i></span>Wishlist</a></li>
                                                    <li class="pro-email-icon"><a href="javascript:void(0)"><span><i
                                                                    class="fa fa-envelope"></i></span>Email to
                                                            Friends</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 d-none d-xl-block">
                    <div class="sub-banner-block align-center">
                        <img src="/images/pro-banner.jpg" alt="Roadie">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--tab_content Start -->
    <section class="ptb-70">
        <div class="container">
            <div class="product-detail-tab">
                <div class="row">
                    <div class="col-lg-12">
                        <div id="tabs">
                            <ul class="nav nav-tabs">
                                <li><a class="tab-Description selected" title="Description">Description</a></li>
                                <li><a class="tab-Product-Tags" title="Product-Tags">Product-Tags</a></li>
                                <li><a class="tab-Reviews" title="Reviews">Reviews</a></li>
                            </ul>
                        </div>
                        <div id="items">
                            <div class="tab_content">
                                <ul>
                                    <li>
                                        <div class="items-Description selected ">
                                            <div class="Description">{{ $result->specification }}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="items-Product-Tags"><strong>Section 1.10.32 of "de Finibus Bonorum
                                                et Malorum", written by Cicero in 45 BC</strong><br/>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                            veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                            consequuntur
                                        </div>
                                    </li>
                                    <li>
                                        <div class="items-Reviews">
                                            <div class="comments-area">
                                                <h4>Comments<span>(2)</span></h4>
                                                <ul class="comment-list mt-30">
                                                    <li>
                                                        <div class="comment-user"><img src="images/comment-user.jpg"
                                                                                       alt="Roadie"></div>
                                                        <div class="comment-detail">
                                                            <div class="user-name">John Doe</div>
                                                            <div class="post-info">
                                                                <ul>
                                                                    <li>Fab 11, 2016</li>
                                                                    <li><a href="#"><i class="fa fa-reply"></i>Reply</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <p>Consectetur adipiscing elit integer sit amet augue
                                                                laoreet maximus nuncac.</p>
                                                        </div>
                                                        <ul class="comment-list child-comment">
                                                            <li>
                                                                <div class="comment-user"><img
                                                                        src="images/comment-user2.jpg" alt="Roadie">
                                                                </div>
                                                                <div class="comment-detail">
                                                                    <div class="user-name">Joseph</div>
                                                                    <div class="post-info">
                                                                        <ul>
                                                                            <li>Fab 11, 2016</li>
                                                                            <li><a href="#"><i class="fa fa-reply"></i>Reply</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <p>Consectetur adipiscing elit integer sit amet
                                                                        augue laoreet maximus nuncac.</p>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="comment-user"><img
                                                                        src="images/comment-user2.jpg" alt="Roadie">
                                                                </div>
                                                                <div class="comment-detail">
                                                                    <div class="user-name">Joseph</div>
                                                                    <div class="post-info">
                                                                        <ul>
                                                                            <li>Fab 11, 2016</li>
                                                                            <li><a href="#"><i class="fa fa-reply"></i>Reply</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <p>Consectetur adipiscing elit integer sit amet
                                                                        augue laoreet maximus nuncac.</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <div class="comment-user"><img src="images/comment-user3.jpg"
                                                                                       alt="Roadie"></div>
                                                        <div class="comment-detail">
                                                            <div class="user-name">Kennedy Doe</div>
                                                            <div class="post-info">
                                                                <ul>
                                                                    <li>Fab 11, 2016</li>
                                                                    <li><a href="#"><i class="fa fa-reply"></i>Reply</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <p>Consectetur adipiscing elit integer sit amet augue
                                                                laoreet maximus nuncac.</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="main-form mt-30">
                                                <h4>Leave a comments</h4>
                                                <form>
                                                    <div class="row mt-30">
                                                        <div class="col-md-4 mb-30">
                                                            <input type="text" placeholder="Name" required>
                                                        </div>
                                                        <div class="col-md-4 mb-30">
                                                            <input type="email" placeholder="Email" required>
                                                        </div>
                                                        <div class="col-md-4 mb-30">
                                                            <input type="text" placeholder="Website" required>
                                                        </div>
                                                        <div class="col-12 mb-30">
                                                            <textarea cols="30" rows="3" placeholder="Message"
                                                                      required></textarea>
                                                        </div>
                                                        <div class="col-12">
                                                            <button class="btn btn-color" name="submit" type="submit">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
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
    </section>
    <!--tab_content End -->

    <!--Related Products Start -->
    @widget('relatedProducts')
    <!--Related Products End -->

    <!-- CONTAINER END -->
@endsection
