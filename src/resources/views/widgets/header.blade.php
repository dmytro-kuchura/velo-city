<header class="navbar navbar-custom container-full-sm" id="header">
    <div class="header-middle">
        <div class="container position-s">
            <div class="row m-0">
                <div class="col-xl-5 col-lg-5 menu-position col-xl-40per p-0  position-initial">
                    <div id="menu" class="navbar-collapse collapse">
                        <ul class="nav navbar-nav">
                            @foreach($tree[0] as $obj)
                                <li class="level dropdown"><span class="opener plus"></span> <a
                                        href="javascript:void(0)" class="page-scroll">{{ $obj->name }}</a>
                                    <div class="megamenu mobile-sub-menu">
                                        <div class="megamenu-inner-top">
                                            <ul class="sub-menu-level1">
                                                <li class="level2">
                                                    <ul class="sub-menu-level2 ">
                                                        <li class="level3"><a href="shop.html"><span>■</span>Shop</a>
                                                        </li>
                                                        <li class="level3"><a href="shop_2.html"><span>■</span>Shop
                                                                2</a></li>
                                                        <li class="level3"><a href="product-page.html"><span>■</span>product-page</a>
                                                        </li>
                                                        <li class="level3"><a href="about.html"><span>■</span>About
                                                                Us</a></li>
                                                        <li class="level3"><a href="about-2.html"><span>■</span>About Us
                                                                2</a></li>
                                                        <li class="level3"><a href="about-3.html"><span>■</span>About Us
                                                                3</a></li>
                                                        <li class="level3"><a href="account.html"><span>■</span>Account</a>
                                                        </li>
                                                        <li class="level3"><a href="checkout.html"><span>■</span>Checkout</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-6 col-xl-20per align-center left-sm p-0">
                    <div class="header-middle-left">
                        <div class="navbar-header float-none-sm">
                            <a class="navbar-brand page-scroll" href="{{ route('home') }}">
                                <img alt="VeloCity" src="/images/logo-new.png">
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
                                        <li><span class="dropdown-title">Default welcome msg!</span>
                                            <ul>
                                                <li><a href="login.html">Sign In</a></li>
                                                <li><a href="register.html">Create an Account</a></li>
                                            </ul>
                                        </li>
                                        <li><span class="dropdown-title">Language :</span>
                                            <ul>
                                                <li><a class="active" href="javascript:void(0)">English</a></li>
                                                <li><a href="javascript:void(0)">French</a></li>
                                                <li><a href="javascript:void(0)">German</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <cart></cart>
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
