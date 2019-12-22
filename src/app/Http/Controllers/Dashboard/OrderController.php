<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function edit($id)
    {
        return view('dashboard.orders.edit');
    }
}
