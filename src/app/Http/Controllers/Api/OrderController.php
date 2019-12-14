<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderCreateRequest;
use App\Services\OrderCheckout;

class OrderController extends Controller
{
    private $orderCheckout;

    public function __construct(OrderCheckout $orderCheckout)
    {
        $this->orderCheckout = $orderCheckout;
    }

    public function create(OrderCreateRequest $orderCreateRequest)
    {
        $this->orderCheckout->createOrder($orderCreateRequest->all());

//        return $this->returnResponse([
//            'success' => true
//        ]);
    }
}
