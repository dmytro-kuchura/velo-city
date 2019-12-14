<?php

namespace App\Repositories;

use App\Models\OrderItems;

class OrderItemsRepository
{
    private $model = OrderItems::class;

    public function create(array $items, int $orderId)
    {

    }
}
