<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

class CategoriesController extends Controller
{
    public function index()
    {
        return view('dashboard.categories.index');
    }

    public function edit()
    {
        return view('dashboard.categories.edit');
    }

    public function create()
    {
        return view('dashboard.categories.create');
    }
}
