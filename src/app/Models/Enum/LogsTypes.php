<?php

namespace App\Models\Enum;

class LogsTypes
{
    const NEW_STATUS = 0;
    const VIEWED_STATUS = 1;

    const ERROR = 'error';
    const WARNING = 'warning';
    const NOTICE = 'notice';
    const INFO = 'info';
    const DEBUG = 'debug';

    const NEW_ORDER = 'Новый заказ';
    const NEW_REVIEW = 'Отзыв к товару';
    const NEW_CONTACT_FORM_MESSAGE = 'Сообщение из контактной формы';
    const NEW_SUBSCRIBER = 'Подписчик';
    const NEW_USER = 'Регистрация пользователя';
    const NEW_APP_ERROR = 'Ошибка приложения';

    const ORDER_LINK = '/admin/order/';
    const REVIEW_LINK = '/admin/reviews/';
    const CONTACT_FORM_MESSAGE_LINK = '/admin/contacts/';
    const SUBSCRIBER_LINK = '';
    const USER_LINK = '';
}
