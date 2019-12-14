<?php

namespace App\Repositories;

use App\Models\Enum\OrderStatus;
use App\Models\Orders;

class OrdersRepository
{
    private $model = Orders::class;

    public function create(array $data): Orders
    {
        /** @var Orders $order */
        $order = new $this->model;
        $order->first_name = $data['first_name'];
        $order->last_name = $data['last_name'];
        $order->middle_name = $data['middle_name'];
        $order->email = $data['email'];
        $order->phone = $data['phone'];
        $order->delivery = $data['delivery_id'];
        $order->payment = $data['payment_id'];
        $order->status = OrderStatus::STATUS_CREATED;

        $order->save();

        return $order;
    }
}
