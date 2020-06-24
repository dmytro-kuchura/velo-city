<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

class OrdersController extends Controller
{
    public function index()
    {
        return view('dashboard.orders.index');
    }

    public function edit($id)
    {
        return view('dashboard.orders.edit');
    }
}
