<?php

namespace App\Http\Controllers;

use App\Services\ShoppingCart;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    /** @var ShoppingCart */
    private $shoppingCart;

    public function __construct(ShoppingCart $shoppingCart)
    {
        $this->shoppingCart = $shoppingCart;
    }

    public function checkout()
    {
        $result = $this->shoppingCart->cartList();

        if (!$result['list']) {
            return redirect('/', 301);
        }

        return view('checkout', [
            'user' => Auth::check() ? Auth::user() : null
        ]);
    }

    public function thank()
    {
        return view('thank');
    }
}
