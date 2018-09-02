<?php

namespace App\Http\Controllers;


class AdminController
{
    public function index()
    {
        return view('admin.login');
    }

    public function create()
    {
        return view('admin.create');
    }

    public function reset()
    {
        return view('admin.reset');
    }
}