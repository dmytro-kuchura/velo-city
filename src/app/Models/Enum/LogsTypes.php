<?php

namespace App\Models\Enum;

class LogsTypes
{
    const NEW_STATUS = 0;
    const VIEWED_STATUS = 1;

    const NEW_ORDER = 'Новый заказ';
    const NEW_REVIEW = 'Отзыв к товару';
    const NEW_CONTACT_FORM_MESSAGE = 'Сообщение из контактной формы';
    const NEW_SUBSCRIBER = 'Подписчик';
    const NEW_USER = 'Регистрация пользователя';
    const NEW_APP_ERROR = 'Ошибка приложения';

    const ORDER_LINK = '';
    const REVIEW_LINK = '';
    const CONTACT_FORM_MESSAGE_LINK = '';
    const SUBSCRIBER_LINK = '';
    const USER_LINK = '';
}
