<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

class NewsController extends Controller
{
    public function index()
    {
        return view('dashboard.news.index');
    }

    public function create()
    {
        return view('dashboard.news.create');
    }

    public function edit()
    {
        return view('dashboard.news.edit');
    }
}
