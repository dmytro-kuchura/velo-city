<?php namespace App\Traits;

use Exception;
use Illuminate\Support\Arr;

/**
 * Trait HumanDate
 *
 * Преобразовываем месяца в названия
 *
 * @package App\Traits
 */
trait HumanDate
{

    /**
     * Полные названия месяцев
     *
     * @var array
     */
    private $months = [
        1 => 'Января', 2 => 'Февраля', 3 => 'Марта', 4 => 'Апреля',
        5 => 'Мая', 6 => 'Июня', 7 => 'Июля', 8 => 'Августа',
        9 => 'Сентября', 10 => 'Октября', 11 => 'Ноября', 12 => 'Декабря',
    ];

    /**
     * Короткие названия месяцев
     *
     * @var array
     */
    private $shortMonths = [
        1 => 'Янв', 2 => 'Фев', 3 => 'Мар', 4 => 'Апр',
        5 => 'Мая', 6 => 'Июн', 7 => 'Июл', 8 => 'Авг',
        9 => 'Сен', 10 => 'Окт', 11 => 'Ноя', 12 => 'Дек',
    ];

    /**
     * Достаем короткое название месяца (3 буквы) по номеру
     *
     * @param null|int $month - номер месяца
     *
     * @return mixed
     * @throws Exception
     */
    public function shortNameOfTheMonth($month = null)
    {
        return Arr::get($this->shortMonths, $this->prepareMonthNumber($month));
    }

    /**
     * Достаем полное название месяца в родительном падеже
     *
     * @param null|int $month - номер месяца
     * @return mixed
     *
     * @throws Exception
     */
    public function nameOfTheMonth($month = null)
    {
        return Arr::get($this->months, $this->prepareMonthNumber($month));
    }

    /**
     * Подготавливаем номер месяца для использования
     *
     * @param null $month
     * @return false|int|null|string
     * @throws Exception
     */
    private function prepareMonthNumber($month = null)
    {
        if ($month === null) {
            $month = date('n');
        } else {
            $month = (int)$month;
        }
        if ($month < 1) {
            throw new Exception('Переменная $month указана некорректно! Она не может быть меньше числа 1');
        }
        if ($month > 12) {
            throw new Exception('Переменная $month указана некорректно! Она не может превышать число 12');
        }
        return $month;
    }

}
