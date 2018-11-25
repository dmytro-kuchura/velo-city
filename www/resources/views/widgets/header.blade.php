<header class="navbar navbar-custom container-full-sm" id="header">
    <div class="header-middle">
        <div class="container position-s">
            <div class="row m-0">
                <div class="col-xl-5 col-lg-5 menu-position col-xl-40per p-0  position-initial">
                    <div id="menu" class="navbar-collapse collapse">
                        <ul class="nav navbar-nav">
                            @foreach($menu[0] as $obj)
                                <li class="level dropdown"><span class="opener plus"></span>
                                    <a href="shop.html" class="page-scroll">{{ $obj->title }}
                                        <div class="menu-label"></div>
                                    </a>
                                    <div class="megamenu mobile-sub-menu">
                                        <div class="megamenu-inner-top">
                                            <ul class="sub-menu-level1">
                                                @if(isset($menu[$obj->id]))
                                                    @foreach($menu[$obj->id] as $parent)
                                                        <li class="level2">
                                                            <a href="{{ $parent->url }}"><span>{{ $parent->title }}</span></a>
                                                            @foreach($menu[$parent->parent_id] as $item)
                                                                <ul class="sub-menu-level2 ">
                                                                    <li class="level3">
                                                                        <a href="{{ $item->url }}"><span>■</span>{{ $item->title }}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            @endforeach
                                                        </li>
                                                    @endforeach
                                                @endif
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            @endforeach

                            <li class="level dropdown">
                                <span class="opener plus"></span>
                                <a href="javascript:void(0)" class="page-scroll">Pages</a>
                                <div class="megamenu mobile-sub-menu">
                                    <div class="megamenu-inner-top">
                                        <ul class="sub-menu-level1">
                                            <li class="level2">
                                                <ul class="sub-menu-level2 ">
                                                    <li class="level3"><a href="shop.html"><span>■</span>Shop</a></li>
                                                    <li class="level3"><a href="shop_2.html"><span>■</span>Shop 2</a>
                                                    </li>
                                                    <li class="level3"><a href="product-page.html"><span>■</span>product-page</a>
                                                    </li>
                                                    <li class="level3"><a href="about.html"><span>■</span>About Us</a>
                                                    </li>
                                                    <li class="level3"><a href="about-2.html"><span>■</span>About Us
                                                            2</a></li>
                                                    <li class="level3"><a href="about-3.html"><span>■</span>About Us
                                                            3</a></li>
                                                    <li class="level3"><a href="account.html"><span>■</span>Account</a>
                                                    </li>
                                                    <li class="level3"><a
                                                                href="checkout.html"><span>■</span>Checkout</a></li>
                                                </ul>
                                            </li>
                                            <li class="level2">
                                                <ul class="sub-menu-level2 ">
                                                    <li class="level3"><a href="contact.html"><span>■</span>Contact</a>
                                                    </li>
                                                    <li class="level3"><a href="compare.html"><span>■</span>Compare</a>
                                                    </li>
                                                    <li class="level3"><a
                                                                href="wishlist.html"><span>■</span>Wishlist</a></li>
                                                    <li class="level3"><a href="blog.html"><span>■</span>Blog</a></li>
                                                    <li class="level3"><a href="blog_2.html"><span>■</span>Blog 2</a>
                                                    </li>
                                                    <li class="level3"><a href="single-blog.html"><span>■</span>Single
                                                            Blog</a></li>
                                                    <li class="level3"><a href="404.html"><span>■</span>404 Error</a>
                                                    </li>
                                                    <li class="level3"><a href="faq.html"><span>■</span>Faq</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-6 col-xl-20per align-center left-sm p-0">
                    <div class="header-middle-left">
                        <div class="navbar-header float-none-sm">
                            <a class="navbar-brand page-scroll" href="/">
                                <img alt="Velo-City" src="images/logo.png">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-xl-5 col-lg-4 col-6 col-xl-40per p-0">
                    <div class="right-side header-right-link">
                        <ul>
                            <li class="search-box">
                                <a><span></span></a>
                            </li>
                            <li class="account-icon"><a href="javascript:void(0)"><span></span></a>
                                <div class="header-link-dropdown account-link-dropdown">
                                    <ul class="link-dropdown-list">
                                        <li><span class="dropdown-title">Личный кабинет!</span>
                                            <ul>
                                                <li><a href="login.html">Авторизация</a></li>
                                                <li><a href="register.html">Регистрация</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="cart-icon">
                                <a href="javascript:void(0)">
                                    <span class="cart-icon-main"><small class="cart-notification">2</small> </span>
                                    <div class="cart-text">
                                        <div class="my-cart">Корзина</div>
                                        <div class="total-price">$650.00</div>
                                    </div>
                                </a>
                                <div class="cart-dropdown header-link-dropdown">
                                    <ul class="cart-list link-dropdown-list">
                                        <li><a class="close-cart"><i class="fa fa-times-circle"></i></a>
                                            <div class="media"><a class="pull-left"> <img alt="Roadie"
                                                                                          src="images/1.jpg"></a>
                                                <div class="media-body"><span><a href="javascript:void(0)">Black African Print Skirt</a></span>
                                                    <p class="cart-price">$14.99</p>
                                                    <div class="product-qty">
                                                        <label>Qty:</label>
                                                        <div class="custom-qty">
                                                            <input type="text" name="qty" maxlength="8" value="1"
                                                                   title="Qty" class="input-text qty">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li><a class="close-cart"><i class="fa fa-times-circle"></i></a>
                                            <div class="media"><a class="pull-left"> <img alt="Roadie"
                                                                                          src="images/2.jpg"></a>
                                                <div class="media-body"><span><a href="javascript:void(0)">Black African Print Skirt</a></span>
                                                    <p class="cart-price">$14.99</p>
                                                    <div class="product-qty">
                                                        <label>Qty:</label>
                                                        <div class="custom-qty">
                                                            <input type="text" name="qty" maxlength="8" value="1"
                                                                   title="Qty" class="input-text qty">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <p class="cart-sub-totle"><span class="pull-left">Cart Subtotal</span> <span
                                                class="pull-right"><strong class="price-box">$29.98</strong></span></p>
                                    <div class="clearfix"></div>
                                    <div class="mt-20">
                                        <a href="cart.html" class="btn-color btn"><i class="fa fa-shopping-cart"></i>Cart</a>
                                        <a href="checkout.html" class="btn-color btn right-side"><i
                                                    class="fa fa-share"></i>Checkout</a>
                                    </div>
                                </div>
                            </li>
                            <li class="side-toggle">
                                <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle"
                                        type="button"><i class="fa-bar"></i></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>