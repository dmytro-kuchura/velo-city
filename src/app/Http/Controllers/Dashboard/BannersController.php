<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

class BannersController extends Controller
{
    public function index()
    {
        return view('dashboard.banners.index');
    }

    public function edit()
    {
        return view('dashboard.banners.edit');
    }

    public function create()
    {
        return view('dashboard.banners.create');
    }
}
