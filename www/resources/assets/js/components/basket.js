$(document).ready(function() {

    // basket wezom
    // версия 1.3 | 09.12.2014
    // Олег Дутченко

    // vars
    var wb_i, //инпут спиннера
        wb_v, //вал инпута
        wb_n, //число из вала инпута
        wb_l, //родитель
        wb_t, //темп перем.
        wb_p, //темп перем.
        wb_s = 400, //время операции ****
        wb_x = 2, // копейки - нулей после запятой / если целое число = 0 ****
        wb_h = '#cart', // хеш вызова поп-апа ****
        wb_m = 'wb_edit_init', // имя класса для магнифика
        wb_f = true, //флаг изменений в товаре
        wb_a = true, //флаг глобальный - успех аякса
        wb_t = [8,9,13,16,27,33,34,35,36,37,38,39,40,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,107,109,112,113,114,115,116,118,119,120,121,122,123]; // кей кодов массив темп

    var wb_k = []; // кей кодов объект
    for (var i = 0; i < wb_t.length; i++) {
        wb_k[wb_t[i]] = wb_t[i];
    };

    // functions

    function wbf_ajax(obj, del) {
        wb_a = false;
        var itemRow = obj,
            itemId = obj.attr('data-w-cost'),
            itemPrice = obj.attr('data-price'),
            itemCount = obj.attr('data-count'),
            itemPack = (obj.attr('data-packing')) ? obj.attr('data-packing') : false,
            itemSize = (obj.attr('data-size')) ? obj.attr('data-size') : false,

            itemDel = (del) ? true : false, //удаляем товар?
            delTime = (del) ? wb_s : 0; //время операции

        //консоль тест
        console.log('запрос');
        console.log('id: ' + itemId);
        console.log('кол.: ' + itemCount);
        console.log('фас.: ' + itemPack);
        console.log('размер: ' + itemSize);
        console.log('удаляем? - ' + itemDel);
        console.log('время: ' + delTime);


        if (del) {
            wbf_del(obj, delTime);
        }
        setTimeout(function() {
            if(!del) {
                wb_calcOne(obj);
            }
            wb_calcTotl();
            wb_a = true; // смену флага тут удалить, оставить в success аякса
        }, delTime + 10);

        // ajax

        /*$.ajax({
            type: 'POST',
            url: '/ajax/*****.php',
            data: ({}),
            success: function(data) {

                php - пишем в базу

                wb_a = true;
            }
        });*/
    }

    // функция проверки на число, которое не меньше нуля
    function wbf_num(inpt) {
        if ($.isNumeric(inpt.val()) && inpt.val() >= 1) {
            inpt.val(parseInt(inpt.val(), 10));
            wb_f = true;
        } else {
            inpt.val(wb_v);
            wb_f = false;
        }
    }

    // функция визуального удаления
    function wbf_del(obj, time) {
        obj.stop().slideUp(time, function() {
            obj.remove();
            // товар удален
        });
    }

    // функция вызова popup
    function wbf_call(popup) {
        popup.magnificPopup('open');
    }

    // функция закрытия popup
    function wbf_close(popup) {
        popup.magnificPopup('close');
    }

    // функция подсчета за количество
    // reObj - аргумент перерисованной лишки после аякса с датой
    function wb_calcOne(reObj) {
        wb_p = wb_mult(reObj);
        // для каждой корзины на странице
        $('.wBasket').each(function(index, el) {
            // переписываем даты у лишек
            wb_t = $(el).find('[data-w-cost="' + reObj.attr('data-w-cost') + '"]').filter('LI');
            for (var i = 0; i < reObj[0].attributes.length; i++) {
                wb_t.attr(reObj[0].attributes[i].name, reObj[0].attributes[i].value);
            };
            // переписываем вал в инпуте - если есть
            if (wb_t.find('.wb_amount input')) {
                wb_t.find('.wb_amount input').val(reObj.attr('data-count'));
            }
            // переписываем цену за единицу - если есть
            if (wb_t.find('.wb_price_one span')) {
                wb_t.find('.wb_price_one span').text(reObj.attr('data-price'));
            }
            // переписываем цену общую за количество товара - если есть
            if (wb_t.find('.wb_price_totl span')) {
                wb_t.find('.wb_price_totl span').text(wb_p.toFixed(wb_x));
            }
            // переназначение селекта - если есть
            /*if (wb_t.find('.wb_select')) {
                wb_t.find('.wb_select').each(function(index, el) {
                    $(this).find('option:selected').prop('selected', false);
                    $(this).find('[value="' + wb_t.attr($(this).attr('data-equal')) + '"]').prop('selected', true);
                });
            }*/
            // переназначение радио - если есть
            /*if (wb_t.find('.wb_check')) {
                wb_t.find('.wb_check').each(function(index, el) {
                    $(this).find('input:checked').prop('checked', false);
                    $(this).find('[value="' + wb_t.attr($(this).attr('data-equal')) + '"]').prop('checked', true);
                });
            }*/
            wb_t = '';
        });
        wb_p = '';
    }

    // функция подсчета итоговая
    function wb_calcTotl() {
        // для каждой корзины на странице
        $('.wBasket').each(function(ind, el) {
            wb_p = 0;
            $(el).find('.wb_item').each(function(i, e) {
                wb_p += wb_mult($(e));
            });
            // переписываем итоговую цену
            $(el).find('.wb_total span').text(wb_p.toFixed(wb_x));
        });
    }

    // множим цену на количество
    function wb_mult(x) {
        var num = x.attr('data-count') * parseFloat(x.attr('data-price'));
        return num;
    }

    // init
    // все события делегируем от $('.wBasket')

    // поп-ап по хештегу
    $(window).load(function() {
        // если хеш для вызова
        if (window.location.hash && window.location.hash === wb_h) {
            setTimeout(function() {
                // вызов поп-апа
                wbf_call($('.' + wb_m));
            }, 500);
        }
    });

    // поп-ап закрытие
    $('.wBasket').on('click', '.wb_close_init', function(event) {
        event.preventDefault();
        wbf_close($('.' + wb_m));
    });

    //контролы спиннера
    $('.wBasket').on('click', '.wb_amount span', function(event) {
        // если сейчас не идет предыдущий запрос
        if (wb_a) {
            wb_i = $(this).parent().children('input'); //определяем нужный инпут
            wb_n = parseInt(wb_i.val(), 10); //вал в число
            wb_l = $(this).closest('li'); //определяем родителя
            //изменяем вал
            if ($(this).attr('data-spin') === 'plus') { // +1
                wb_i.val(++wb_n);
            } else if (($(this).attr('data-spin') === 'minus') && (wb_n > 1)) { // -1
                wb_i.val(--wb_n);
            } else {
                wb_f = false; // ничего не изменилось
            }
            //отправляем если изменили вал
            if (wb_f) {
                wb_l.attr('data-count', wb_i.val());
                wbf_ajax(wb_l, false);
            } else {
                wb_f = true;
            }
        }
    });

    // фокус спиннера
    $('.wBasket').on('focus', '.wb_amount input', function(event) {
        wb_v = $(this).val(); // запоминаем значение
    });

    // потеря фокуса спиннера
    $('.wBasket').on('blur', '.wb_amount input', function(event) {
        if (wb_a) {
            wb_l = $(this).closest('li');
            wbf_num($(this)); //проверяем вал на число
            if (wb_f) {
                if ($(this).val() != wb_v) { // изменилось ли значение?
                    wb_l.attr('data-count', $(this).val());
                    wbf_ajax(wb_l, false);
                }
            } else {
                wb_f = true;
            }
        }
    });

    // keydown спиннера
    $('.wBasket').on('keydown', '.wb_amount input', function(event) {
        if (wb_k[event.keyCode] && !event.shiftKey) {
            var ths = $(this);
            switch (event.keyCode) {
                case 9:
                    ths.blur();
                    break;
                case 13:
                    ths.blur();
                    break;
                case 27:
                    ths.blur();
                    break;
                case 38:
                    ths.val(parseInt(ths.val(), 10) + 1);
                    break;
                case 107:
                    ths.val(parseInt(ths.val(), 10) + 1);
                    return false;
                case 33:
                    ths.val(parseInt(ths.val(), 10) + 10);
                    return false;
                    break;
                case 40:
                    if (parseInt(ths.val(), 10) > 1) {
                        ths.val(parseInt(ths.val(), 10) - 1);
                    } else {
                        return false;
                    }
                    break;
                case 109:
                    if (parseInt(ths.val(), 10) > 1) {
                        ths.val(parseInt(ths.val(), 10) - 1);
                        return false;
                    } else {
                        return false;
                    }
                    break;
                case 34:
                    if (parseInt(ths.val(), 10) >= 11) {
                        ths.val(parseInt(ths.val(), 10) - 10);
                        return false;
                    } else {
                        return false;
                    }
                    break;
            }
        } else {
            return false;
        }
    });

    //удаление товара
    $('.wBasket').on('click', '.wb_content .wb_del', function(event) {
        wb_l = $(this).closest('li');
        wbf_ajax(wb_l, true);
    });

    //пример - селекты
    $('.wBasket').on('change', '.wb_select select', function(event) {
        wb_l = $(this).closest('li');
        wb_l.attr($(this).closest('.wb_select').attr('data-equal'), $(this).val());
        wbf_ajax(wb_l, false);
    });

    //пример - чекеды
    $('.wBasket').on('change', '.wb_check input', function(event) {
        wb_l = $(this).closest('li');
        wb_l.attr($(this).closest('.wb_check').attr('data-equal'), $(this).val());
        wbf_ajax(wb_l, false);
    });

    // .wb_edit_init
    $('.' + wb_m).magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: true,
        midClick: true,
        removalDelay: 300,
        mainClass: 'wb_slideBottom' // wb_slideBottom, wb_slideRight, wb_zoomIn
    });

    // подтверждениe ухода
    /*$('.wbLeave').on('click', function(event) {
        alert('вы уверены?');
    });*/

});