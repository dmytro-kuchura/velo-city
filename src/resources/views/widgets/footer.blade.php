<div class="footer">
    <div class="container">
        <div class="footer-inner">
            <div class="footer-middle">
                <div class="row">
                    <div class="col-xl-3 f-col">
                        <div class="footer-static-block">
                            <span class="opener plus"></span>
                            <h3 class="title">Адрес <span></span></h3>
                            <ul class="footer-block-contant address-footer">
                                <li class="item"><i class="fa fa-home"> </i>
                                    <p>
                                        Херсон, Херсонская область, <br>улица Крымская 137, <br>район Днепровского рынка
                                    </p>
                                </li>
                                <li class="item"><i class="fa fa-envelope"> </i>
                                    <p><a href="javascript:void(0)">info@velo-city.store</a></p>
                                </li>
                                <li class="item"><i class="fa fa-phone"> </i>
                                    <p>(+38) 050 570 1900</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-6 footer-center">
                        <div class="row">
                            <div class="col-xl-4 f-col">
                                <div class="footer-static-block">
                                    <span class="opener plus"></span>
                                    <h3 class="title">Каталог <span></span></h3>
                                    <ul class="footer-block-contant link">
                                        @if($tree)
                                            @foreach($tree[0] as $obj)
                                                <li>
                                                    <a href="{{ route('shop.category', ['category' => $obj->alias]) }}">
                                                        <i class="fa fa-angle-right"></i>{{ $obj->name }}
                                                    </a>
                                                </li>
                                            @endforeach
                                        @endif
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xl-4 f-col">
                                <div class="footer-static-block">
                                    <span class="opener plus"></span>
                                    <h3 class="title">Информация <span></span></h3>
                                    <ul class="footer-block-contant link">
                                        <li>
                                            <a href="javascript:void(0)">
                                                <i class="fa fa-angle-right"></i>Велопрокат
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">
                                                <i class="fa fa-angle-right"></i>Веломастерская
                                            </a>
                                        </li>
                                        <li>
                                            <a href="{{ route('about') }}">
                                                <i class="fa fa-angle-right"></i>О магазине
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xl-4 f-col">
                                <div class="footer-static-block">
                                    <span class="opener plus"></span>
                                    <h3 class="title">Пользователь <span></span></h3>
                                    <ul class="footer-block-contant link">
                                        <li>
                                            <a href="{{ route('login') }}">
                                                <i class="fa fa-angle-right"></i>Вход
                                            </a>
                                        </li>
                                        <li>
                                            <a href="{{ route('register') }}">
                                                <i class="fa fa-angle-right"></i>Регистрация
                                            </a>
                                        </li>
                                        <li>
                                            <a href="{{ route('wishlist') }}">
                                                <i class="fa fa-angle-right"></i>Список желаний
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 f-col footer-about">
                        <div class="footer-static-block">
                            <span class="opener plus"></span>
                            <h3 class="title">Обратная связь <span></span></h3>
                            <contact-us-form></contact-us-form>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="footer-bottom ">
                <div class="row mtb-30">
                    <div class="col-lg-6 ">
                        <div class="footer_social mb-sm-30 center-sm">
                            <ul class="social-icon">
                                <li><a title="Facebook" class="facebook"><i class="fa fa-facebook"> </i></a></li>
                                <li><a title="Twitter" class="twitter"><i class="fa fa-twitter"> </i></a></li>
                                <li><a title="Instagram" class="linkedin"><i class="fa fa-instagram"> </i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 ">
                        <div class="payment">
                            <ul class="payment_icon">
                                <li class="visa">
                                    <a href="javascript:void(0)">
                                        <img src="/images/pay1.png" alt="Visa">
                                    </a>
                                </li>
                                <li class="discover">
                                    <a href="javascript:void(0)">
                                        <img src="/images/pay2.png" alt="MasterCard">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="copy-right-bg">
        <div class="container">
            <div class="row  align-center">
                <div class="col-12 mb-30">
                    <div class="site-link">
                        <ul>
                            <li><a href="{{ route('about') }}">О магазине</a>/</li>
                            <li><a href="javascript:void(0)">Оплата</a>/</li>
                            <li><a href="javascript:void(0)">Доставка</a>/</li>
                            <li><a href="javascript:void(0)">Гарантия</a>/</li>
                            <li><a href="javascript:void(0)">Возврат</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-12">
                    <div class="">
                        <div class="copy-right ">
                            Make with <i class="fa fa-heart" style="color: red"> </i> by <a href="https://www.instagram.com/dmitry.k__/">Dmytro Kuchura</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@widget('message')

<div class="scroll-top">
    <div class="scrollup"></div>
</div>

