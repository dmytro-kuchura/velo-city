<?php

namespace App\Http\Controllers;

class CheckoutController extends Controller
{
    public function checkout()
    {
        return view('checkout');
    }

    public function thank()
    {
        return view('thank');
    }
}
