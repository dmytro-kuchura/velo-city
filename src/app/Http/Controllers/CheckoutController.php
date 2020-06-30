<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function checkout()
    {
        return view('checkout', [
            'user' => Auth::check() ? Auth::user() : null
        ]);
    }

    public function thank()
    {
        return view('thank');
    }
}
