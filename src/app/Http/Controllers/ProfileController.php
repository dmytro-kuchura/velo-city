<?php

namespace App\Http\Controllers;

use App\Repositories\OrdersRepository;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    private $ordersRepository;

    public function __construct(
        OrdersRepository $ordersRepository
    )
    {
        $this->ordersRepository = $ordersRepository;
    }

    public function profile()
    {
        $orders = $this->ordersRepository->getOrdersByUser(Auth::user()->getAuthIdentifier());

        return view('auth.profile', [
            'user' => Auth::user(),
            'orders' => $orders
        ]);
    }
}
