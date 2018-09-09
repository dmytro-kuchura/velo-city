<div style="display: none;">
    <div id="enterReg" class="enterRegPopup zoomAnim">
        <div class="enterReg_top">
            <div class="popupBlock enterBlock wCur">
                <div class="erTitle">Вход на сайт</div>
                <div class="popupContent">
                    <div id="entrForm" data-form="true" class="wForm enterBlock_form visForm">
                        <div class="wFormRow">
                            <input type="email" name="enter_email" data-msg-required="Это поле необходимо заполнить" data-msg-email="Пожалуйста, введите корректный Email" placeholder="E-mail" required="">
                            <div class="inpInfo">E-mail</div>
                        </div>
                        <div class="wFormRow">
                            <input type="password" name="enter_pass" data-msg-required="Это поле необходимо заполнить" data-msg-minlength="Пожалуйста, введите не меньше 4 символов" data-rule-minlength="4" placeholder="Пароль" required="">
                            <div class="inpInfo">Пароль</div>
                        </div>
                        <label class="checkBlock">
                            <input type="checkbox" checked="checked">
                            <ins></ins>
                            <span>Запомнить данные</span>
                        </label>
                        <div class="passLink" id="forget_pass">Забыли пароль?</div>
                        <div class="tar">
                            <button class="wSubmit wBtn">войти</button>
                        </div>
                    </div>
                    <div id="forgetForm" data-form="true" class="wForm enterBlock_form">
                        <div class="wFormRow">
                            <input type="email" name="forget_email" data-msg-required="Это поле необходимо заполнить" data-msg-email="Пожалуйста, введите корректный Email" placeholder="E-mail" required="">
                            <div class="inpInfo">E-mail</div>
                        </div>
                        <div class="forgetInf">
                            После отправления, в течении 5 минут к Вам на почту придут инструкции по восстановлению пароля.
                        </div>
                        <div class="passLink" id="remember_pass">Вернуться</div>
                        <div class="tar">
                            <button class="wSubmit wBtn">отправить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div data-form="true" class="popupBlock wForm regBlock">
                <div class="erTitle">Новый пользователь</div>
                <div class="popupContent">
                    <div class="wFormRow">
                        <input type="email" name="reg_email" data-msg-required="Это поле необходимо заполнить" data-msg-email="Пожалуйста, введите корректный Email" placeholder="E-mail" required="">
                        <div class="inpInfo">E-mail</div>
                    </div>
                    <div class="wFormRow">
                        <input type="password" name="reg_pass" data-msg-required="Это поле необходимо заполнить" data-msg-minlength="Пожалуйста, введите не меньше 4 символов" data-rule-minlength="4" placeholder="Пароль" required="">
                        <div class="inpInfo">Пароль</div>
                    </div>
                    <label class="checkBlock">
                        <input type="checkbox" name="reg_agree" data-msg-required="Это поле нужно отметить" required="">
                        <ins></ins>
                        <span>Я согласен с условиями использования и обработку моих персональных данных</span>
                    </label>
                    <div class="tar">
                        <button class="wSubmit wBtn">зарегистрироваться</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="popupBlock socEnter">
            <div class="erTitle">Вход через соц. сети</div>
            <div class="popupContent socLinkEnter">
                <button class="eVk wBtn" title="Вконтакте"></button>
                <button class="eFb wBtn" title="Facebook"></button>
                <button class="eOd wBtn" title="Одноклассники"></button>
                <button class="eMr wBtn" title="Mail.ru"></button>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</div>
<div style="display: none;">
    <div id="orderBasket" class="wBasket wBasketModule wb_animate">
        <div class="wBasketWrapp">
            <div class="wBasketHead">
                <div class="wBasketTTL">Корзина</div>
            </div>
            <div class="wBasketBody">
                <ul class="wBasketList">
                    <li class="wb_item" data-w-cost="456" data-count="1" data-price="9999.99" data-packing="val987" data-size="M">
                        <div class="wb_li">
                            <div class="wb_side">
                                <div class="wb_img">
                                    <a href="item.html" class="wbLeave"><img src="http://imgsrc.me/500/aaccee" alt="" /></a>
                                </div>
                            </div>
                            <div class="wb_content">
                                <div class="wb_row">
                                    <div class="wb_del"><span title="Удалить товар">Удалить товар</span></div>
                                    <div class="wb_ttl">
                                        <a href="item.html" class="wbLeave">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</a>
                                    </div>
                                </div>
                                <div class="wb_row">
                                    <div class="wb_check" data-equal="data-size">
                                        <div>Размер:</div>
                                        <span class="sizes">

											<input type="radio" value="40" id='size40' name='sizes' checked><label for="size40">40</label>
											<input type="radio" value="41" id='size41' name='sizes'><label for="size41">41</label>
											<input type="radio" value="42" id='size42' name='sizes'><label for="size42">42</label>
											<input type="radio" value="43" id='size43' name='sizes'><label for="size43">43</label>
											<input type="radio" value="44" id='size44' name='sizes'><label for="size44">44</label>
											<input type="radio" value="45" id='size45' name='sizes'><label for="size45">45</label>
										</span>
                                    </div>
                                </div>
                                <div class="wb_cntrl">
                                    <div class="wb_price_one"><p><span>9999.99</span> грн.</p></div>
                                    <div class="wb_amount_wrapp">
                                        <div class="wb_amount">
                                            <input type="text" value="1">
                                            <span data-spin="plus"></span>
                                            <span data-spin="minus"></span>
                                        </div>
                                    </div>
                                    <div class="wb_price_totl"><p><span>9999.99</span> грн.</p></div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="wBasketFooter">
                <div class="wb_footer">
                    <div class="tar wb_footer_tot">
                        <div class="wb_total">Итого: <span>19999.98</span> грн.</div>
                    </div>
                    <div class="flr wb_footer_go">
                        <div class="wb_gobasket wBtn">
                            <a href="/order" >Оформить заказ</a>
                        </div>
                    </div>
                    <div class="fll wb_footer_go">
                        <div class="wb_goaway wbLeave wBtn">
                            <a href="#" class="wb_close_init">продолжить покупки</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>