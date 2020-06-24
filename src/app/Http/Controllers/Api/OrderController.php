<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderCreateRequest;
use App\Repositories\OrdersRepository;use App\Services\OrderCheckout;

class OrderController extends Controller
{
    private $orderCheckout;

    private $ordersRepository;

    public function __construct(
        OrderCheckout $orderCheckout,
        OrdersRepository $ordersRepository
    )
    {
        $this->orderCheckout = $orderCheckout;
        $this->ordersRepository = $ordersRepository;
    }

    public function list()
    {
        $result = $this->ordersRepository->paginate();

        return $this->returnResponse([
            'success' => true,
            'result' => $result
        ]);
    }

    public function create(OrderCreateRequest $orderCreateRequest)
    {
        $this->orderCheckout->createOrder($orderCreateRequest->all());

        return $this->returnResponse([
            'success' => true
        ]);
    }
}
