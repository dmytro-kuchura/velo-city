<?php

namespace App\Models\Enum;

class OrderStatus
{
    const STATUS_CREATED = 1;
    const STATUS_IN_WORK = 2;
    const STATUS_COMPLETED = 3;
    const STATUS_CANCELLED = 4;
    const STATUS_REFUNDED = 5;
}
