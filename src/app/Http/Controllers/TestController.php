<?php

namespace App\Http\Controllers;

use App\Mail\NewOrder;
use App\Repositories\OrdersRepository;
use Illuminate\Support\Facades\Mail;

class TestController extends Controller
{
    public function email()
    {
        $repository = new OrdersRepository();

        $order = $repository->find(5);

        Mail::to('kuchura.d@gmail.com')->send(new NewOrder($order));
    }
}
