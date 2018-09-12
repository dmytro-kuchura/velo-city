<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;

class AdminController
{
    public function index()
    {
        $cookie = Cookie::get('auth_token');

        if (strlen($cookie) > 1) {
            return redirect(route('dashboard'), 301);
        }

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

    public function dashboard()
    {
        $cookie = Cookie::get('auth_token');

        if (!$cookie) {
            return redirect(route('auth'), 301);
        }

        return view('admin.dashboard');
    }
}