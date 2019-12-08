<?php

namespace App\Http\Controllers\Api;

use App\Services\Checkout;
use App\Http\Controllers\Controller;

class CheckoutController extends Controller
{
    /**
     * @var Checkout
     */
    private $checkout;

    public function __construct(Checkout $checkout)
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
