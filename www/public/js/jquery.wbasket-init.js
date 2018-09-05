wPreloader.config({
    markup: ''+
        '<div id="fountainG">'+
            '<div id="fountainG_1" class="fountainG"></div>'+
            '<div id="fountainG_2" class="fountainG"></div>'+
            '<div id="fountainG_3" class="fountainG"></div>'+
            '<div id="fountainG_4" class="fountainG"></div>'+
            '<div id="fountainG_5" class="fountainG"></div>'+
            '<div id="fountainG_6" class="fountainG"></div>'+
            '<div id="fountainG_7" class="fountainG"></div>'+
            '<div id="fountainG_8" class="fountainG"></div>'+
        '</div>'
});

function togglePreloader(instance, toggle) {
    var preloader = instance.structure.preloader.element;
    wPreloader[toggle](preloader);
}

wBasket.debugg = true;

jQuery(document).ready(function($) {

    $('.onChangeToMfiB').on('change', 'input', function(event) {
        var ths = $(this);
        var value = ths.val();
        var group = ths.data('group');
        var parent = ths.closest('.setToMfiB');
        var mfib = parent.find('.mfiB');
        var param = mfib.data('param');
        param[group] = value;
    });

    wBasket.Config({
        writePage: false,
        delayReDraw: 700,
        headtitle: {
            'default': 'Корзина'
        },
        sendTo: {
            total_price: ['.basket-sum span']
        }
    });

    wBasket.Callbacks({
        afterDraw: function(instance) {},
        afterWrite: function(instance) {},
        beforeDelete: function(instance, iD, item, itemData, confirm) {
            var wb = this;
            togglePreloader(instance, 'hide');
            item.find('.inputDelConfirm').trigger('focus');
            confirm.on('click', function(event) {
                event.preventDefault();
                wb.proto.runCallback('onDelete', [iD, item, itemData]);
            });
        },
        onDelete: function(instance, iD, item, itemData) {
            var wb = this;
            togglePreloader(instance, 'show');
            /* ajax */
            /* ответе */
            item.stop().slideUp(500, function() {
                item.remove();
                wb.ReDraw('footer', {
                    totals: {
                        "total_qauntity": 2,
                        "total_price": 1800
                    }
                }, iD);
            });
        },
        onEdit: function(instance, iD, item, itemData, editData) {
            var wb = this;
            togglePreloader(instance, 'show');
            //console.log(iD);
            //console.log(item);
            //console.log(itemData);
            //console.log(editData);
            
            /* demo */
                $.ajax({
                    url: 'hidden/wbasket.php',
                    dataType: 'json',
                    statusCode: {
                        404: function() {
                            alert("Список товаров не найден!!!");
                        }
                    }
                }).fail(function() {
                    alert("Ошибка!\nЗапрос провалился!!!");
                }).done(function(data) {
                    wb.ReDraw('all', data);
                });
        },
        afterReDraw: function(instance, element) {
            togglePreloader(instance, 'hide');
        }
    });

    wBasket.Structure({
        basket: {
            classCss: 'wBasketModule wb_animate',
            markup: ''+
                '<div class="wBasketWrapp">'+
                    '<div class="wBasketHead"></div>'+
                    '<div class="wBasketBody"></div>'+
                    '<div class="wBasketFooter"></div>'+
                '</div>'+
                '<div class="mfp-close" style="cursor: pointer;"></div>'
        },
        header: {
            classSelector: 'wBasketTTL',
            appendto: '.wBasketHead',
            markup: '%%headtitle%%'
        },
        footer: {
            classSelector: 'wb_footer',
            appendto: '.wBasketFooter',
            markup: '' +
                '<div class="tar wb_footer_tot">'+
                    '<div class="wb_total">Итого: <span>%%total_price%%</span> грн.</div>'+
                '</div>'+
                '<div class="flr wb_footer_go">'+
                    '<div class="wb_gobasket wBtn">'+
                        '<a href="order.html" >Оформить заказ</a>'+
                    '</div>'+
                '</div>'+
                '<div class="fll wb_footer_go">'+
                    '<div class="wb_goaway wbLeave wBtn">'+
                        '<a href="#" class="wb_close_init">продолжить покупки</a>'+
                    '</div>'+
                '</div>'
        },
        list: {
            element: 'ul',
            classSelector: 'wBasketList',
            appendto: '.wBasketBody'
        },
        item: {
            element: 'li',
            classSelector: 'wb_item',
            elementDel: '.wb_del',
            elementConfirm: '.delConfirm',
            elementIncrement: '.wb_item_plus',
            elementDecrement: '.wb_item_minus',
            elementAmount: '.wb_item_amount',
            groups: {
                sizes: {
                    element: 'input',
                    type: 'radio',
                    markup: '<label class="wb_select_label wb_select_sizes">{{element}}<span>%%labeltext%%</span></label>'
                },
                fasovka: {
                    element: 'option',
                    markup: '{{element}}'
                },
                color: {
                    element: 'input',
                    type: 'radio',
                    markup: '<label class="wb_select_label wb_select_color">{{element}}<span title="%%colortitle%%" style="background-color: %%colorval%%;"></span></label>'
                }
            },
            markup: ''+
                '<div class="wb_li">'+
                    '[[src]]'+
                        '<div class="wb_side">'+
                            '<div class="wb_img">'+
                                '<a href="%%link%%" class="wbLeave" title="%%title%%"><img src="%%src%%" alt="%%title%%" /></a>'+
                            '</div>'+
                        '</div>'+
                    '[[/src]]'+
                    '<div class="wb_content">'+
                        '<div class="wb_row">'+
                            '<input type="text" class="inputDelConfirm" />'+
                            '<div class="delConfirmBlock">'+
                                '<p>Вы точно хотите удалить товар?</p>'+
                                '<p class="wb_check">'+
                                    '<label class="wb_select_label"><span>Нет</span></label>'+
                                    '<label class="wb_select_label delConfirm"><span>Да</span></label>'+
                                '</p>'+
                            '</div>'+
                            '<div class="wb_del"><span title="Удалить товар">Удалить товар</span></div>'+
                            '<div class="wb_ttl">'+
                                '<a href="%%link%%" class="wbLeave" title="%%title%%">%%title%%</a>'+
                            '</div>'+
                        '</div>'+
                        '[[description]]'+
                            '<div class="wb_row">%%description%%</div>'+
                        '[[/description]]'+
                        '[[sizes]]'+
                            '<div class="wb_row">'+
                                '<div class="wb_check">'+
                                    '<div>Размер:</div>'+
                                    '<span class="sizes">#groups:sizes#</span>'+
                                '</div>'+
                            '</div>'+
                        '[[/sizes]]'+
                        '[[fasovka]]'+
                            '<div class="wb_row">'+
                                '<div class="wb_check wb_select">'+
                                    '<div>Цвет:</div>'+
                                    '<select %%select_fasovka%%>#groups:fasovka#</select>'+
                                '</div>'+
                            '</div>'+
                        '[[/fasovka]]'+
                        '[[color]]'+
                            '<div class="wb_row">'+
                                '<div class="wb_check">'+
                                    '<div>Цвет:</div>'+
                                    '<span class="sizes">#groups:color#</span>'+
                                '</div>'+
                            '</div>'+
                        '[[/color]]'+
                        '<div class="wb_cntrl">'+
                            '<div class="wb_price_one"><p><span>%%price%%</span> грн.</p></div>'+
                            '<div class="wb_amount_wrapp">'+
                                '<div class="wb_amount">'+
                                    '<input class="wb_item_amount" type="text" value="%%count%%">'+
                                    '<span class="wb_item_plus" data-spin="plus"></span>'+
                                    '<span class="wb_item_minus" data-spin="minus"></span>'+
                                '</div>'+
                            '</div>'+
                            '<div class="wb_price_totl"><p><span>%%priceall%%</span> грн.</p></div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
        },
        preloader: {
            classSelector: 'wBasketPreloader',
            appendto: '.wBasket'
        },
    });

    $(document).magnificPopup({
        delegate: '.mfiB',
        callbacks: {
            parseAjax: function(mfpResponse, a, b, c, d) {
                var thisData = this.st.ajax.settings.data;
                var callerButton = $(this.currItem.el);
                mfpResponse.data = wBasket.Read(mfpResponse.data, {
                    setThisToInstance: function() {
                        wBasket.instance.callerButton = callerButton;
                        wBasket.instance.action = thisData.action;
                    }
                }, true);
            },
            elementParse: function(item) {
                var itemParam = item.el.data('param');
                this.st.ajax.settings = {
                    url: 'hidden/wbasket.php',
                    type: 'POST',
                    dataType: 'JSON',
                    data: itemParam
                };
            },
            ajaxContentAdded: function(el) {
                wBasket.Events();
            }
        },
        type: 'ajax',
        removalDelay: 300,
        mainClass: 'wb_slideRight'
    });

});