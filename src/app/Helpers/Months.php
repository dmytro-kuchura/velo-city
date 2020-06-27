<?php

namespace App\Helpers;

class Months
{
    static $shortMonthsNumbers = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    public static function prepareArrayOfMonthOrders($data): array
    {
        $arr = [];

        foreach (self::$shortMonthsNumbers as $key => $month) {
            foreach ($data as $item) {
                var_dump($item->month);
                if ($item->month === $month) {
                    $arr[$key] = $item->total;
                } else {
                    $arr[$key] = 0;
                }
            }
        }

        die;

        return $arr;
    }
}
