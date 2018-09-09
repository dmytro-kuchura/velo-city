<header class="wHeader">
    <div id="Info" class="topline">
        <div class="wSize">
            <div class="top-btn">
                <a href="#">
                    <span class="ico ico-card"></span>
                    <span class="text">Оплата</span>
                </a>
            </div>
            <div class="top-btn">
                <a href="#">
                    <span class="ico ico-car"></span>
                    <span class="text">Надежная доставка</span>
                </a>
            </div>
            <div class="top-btn">
                <a href="#">
                    <span class="ico ico-change"></span>
                    <span class="text">Возврат и обмен</span>
                </a>
            </div>
            <div class="top-btn">
                <a href="#">
                    <span class="ico ico-warranty"></span>
                    <span class="text">Гарантия</span>
                </a>
            </div>
            <div class="top-btn">
                <a href="#enterReg" class="enterReg">
                    <span class="ico ico-badge " ></span>
                    <span class="text">Вход / регистрация</span>
                </a>
            </div>
        </div>
    </div>
    <div class="logoline">
        <div class="wSize">
            <div class="logo">
                <span class="logo-big"><a href="index.html"></a></span>
                <span class="logo-text">интернет магазин велосипедов и комплектующего</span>
            </div>
            <div id="Search" class="search wForm" data-form="true">
                <input type="text" placeholder="Например Adidas Gazelle"  data-msg-minlength="Пожалуйста, введите не меньше 4 символов" data-rule-minlength="4">
                <div class="icon-search wSubmit"></div>
                <span class="alt">Например  Adidas Gazelle</span>
            </div>
            <div id='Phones' class="phones">
                <ul>
                    <li><a href="tel:+380505701900">+38 050-570-1900</a></li>
                </ul>
                <div class="callme-btn"><span>перезвоните мне</span></div>
                <div id="callme"  style="display:none;" class="callme-popup wForm" data-form="true">
                    <div class="wFormRow">
                        <input type="text" required
                               name="name"
                               placeholder="Ваше имя"
                               data-rule-word="true"
                               data-msg-required="Укажите Ваше имя"
                               data-rule-minlength="2"
                               data-msg-minlength="Минимум 2 символа"
                               data-msg="Ошибка! Укажите корректное имя">
                        <div class="inpInfo">Имя</div>
                    </div>
                    <div class="wFormRow">
                        <input type="tel" required
                               class="contackformtel"
                               name="tel"
                               placeholder="Телефон"
                               data-rule-minlength="10"
                               data-rule-phone="true"
                               data-msg-minlength="Недостаточно символов"
                               data-msg-phone="Разрешены только цифры пробелы и ()+-"
                               data-msg="Нужно ввести корректный телефон">
                        <div class="inpInfo">Телефон</div>
                    </div>
                    <div class="wFormRow time">
                        Удобное время для звонка с <span>
              <input type="number" data-msg="Введите число от 0 до 23" value="9"></span> до <span ><input type="number" data-msg="Введите число от 0 до 23" value="18"></span>
                    </div>
                    <div class="wSubmit wBtn">
                        Перезвоните мне
                    </div>
                    <div class="close"></div>
                </div>
            </div>
            <div class="basket"><a data-mfp-src="#orderBasket" class="wb_edit_init" style="  text-decoration: none;">
                    <div class="basket-img"><span class="basket-count">0</span></div>
                    <span class="basket-sum">0 UAH</span>
                </a>
            </div>
            <div id="drop-info" class=" ico touch-info mfp" data-mfp-src="#Info"></div>
            <div id="drop-menu" class=" ico touch-menu dropdown"></div>
            <div class="ico touch-phone mfp" data-mfp-src="#Phones"></div>
            <div class="ico touch-search mfp" data-mfp-src="#Search"></div>
        </div>
    </div>
</header>