<?php

namespace App\Http\Controllers\Api;

use App\Services\OrderCheckout;
use App\Http\Controllers\Controller;

class CheckoutController extends Controller
{
    /** @var OrderCheckout */
    private $checkout;

    public function __construct(OrderCheckout $checkout)
    {
        $this->checkout = $checkout;
    }

    public function list()
    {
        $result = $this->shoppingCart->cartList();

        return $this->returnResponse([
            'success' => true,
            'result' => $result
        ]);
    }
}
