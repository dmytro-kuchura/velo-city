<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

class BrandsController extends Controller
{
    public function index()
    {
        return view('dashboard.brands.index');
    }

    public function edit()
    {
        return view('dashboard.brands.edit');
    }

    public function create()
    {
        return view('dashboard.brands.create');
    }
}
