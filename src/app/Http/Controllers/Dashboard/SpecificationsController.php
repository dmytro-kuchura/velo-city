<?php

namespace App\Http\Controllers\Dashboard;

class SpecificationsController
{
    public function index()
    {
        return view('dashboard.specifications.index');
    }

    public function edit()
    {
        return view('dashboard.specifications.edit');
    }

    public function create()
    {
        return view('dashboard.specifications.create');
    }
}
