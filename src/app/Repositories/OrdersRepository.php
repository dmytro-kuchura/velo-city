<?php

namespace App\Repositories;

use App\Models\Enum\OrderStatus;
use App\Models\Orders;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrdersRepository
{
    private $model = Orders::class;

    public function list(int $limit)
    {
        return $this->model::select(DB::raw('SUM(order_items.count * order_items.cost) as total'), 'orders.*')
            ->leftJoin('order_items', 'orders.id', '=', 'order_items.order_id')
            ->orderBy('orders.id', 'desc')
            ->groupBy('orders.id')
            ->limit($limit)
            ->get();
    }

    public function chart()
    {
        return $this->model::select(
            DB::raw('to_char(created_at, \'Mon\') as month'),
            DB::raw('COUNT(id) as total')
        )
            ->groupBy(DB::raw('to_char(created_at, \'Mon\')'))
            ->get();
    }

    public function paginate()
    {
        return $this->model::select(DB::raw('SUM(order_items.count * order_items.cost) as total'), 'orders.*')
            ->leftJoin('order_items', 'orders.id', '=', 'order_items.order_id')
            ->orderBy('orders.id', 'desc')
            ->groupBy('orders.id')
            ->paginate(12);
    }

    public function getOrdersByUser(int $userId)
    {
        return $this->model::select(DB::raw('SUM(order_items.count * order_items.cost) as total'), 'orders.*')
            ->leftJoin('order_items', 'orders.id', '=', 'order_items.order_id')
            ->where('orders.user_id', $userId)
            ->with('items', 'items.product')
            ->orderBy('orders.id', 'desc')
            ->groupBy('orders.id')
            ->get();
    }

    public function create(array $data): Orders
    {
        /** @var Orders $order */
        $order = new $this->model;

        $order->user_id = $data['user_id'];
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
