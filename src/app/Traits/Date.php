<?php namespace App\Traits;

/**
 * Trait HumanDate
 *
 * @package App\Traits
 */
trait Date
{
    /**
     * Полные названия месяцев
     *
     * @var array
     */
    static $months = [
        1 => 'Января', 2 => 'Февраля', 3 => 'Марта', 4 => 'Апреля',
        5 => 'Мая', 6 => 'Июня', 7 => 'Июля', 8 => 'Августа',
        9 => 'Сентября', 10 => 'Октября', 11 => 'Ноября', 12 => 'Декабря',
    ];

    /**
     * Короткие названия месяцев
     *
     * @var array
     */
    static $shortMonths = [
        1 => 'Янв', 2 => 'Фев', 3 => 'Мар', 4 => 'Апр',
        5 => 'Мая', 6 => 'Июн', 7 => 'Июл', 8 => 'Авг',
        9 => 'Сен', 10 => 'Окт', 11 => 'Ноя', 12 => 'Дек',
    ];

    public static function getRussianMonth(string $date): string
    {
        return self::$months[date('n', strtotime($date))];
    }

    public static function getShortRussianMonth(string $date): string
    {
        return self::$shortMonths[date('n', strtotime($date))];
    }

    public static function getHumanDate(string $date): string
    {
        return strftime('%d ', strtotime($date)) . ' ' . self::getRussianMonth($date) . ', ' . strftime('%Y', strtotime($date));
    }

    public static function getShortHumanDate(string $date): string
    {
        return strftime('%d ', strtotime($date)) . ' ' . self::getShortRussianMonth($date) . ', ' . strftime('%Y', strtotime($date));
    }
}
