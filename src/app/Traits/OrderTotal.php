<?php

namespace App\Traits;

use App\Models\OrderItems;

trait OrderTotal
{
    public static function getTotal($items)
    {
        $total = 0.0;

        /** @var OrderItems $item */
        foreach ($items as $item) {
            $total += $item->count * $item->cost;
        }

        return number_format($total);
    }
}
