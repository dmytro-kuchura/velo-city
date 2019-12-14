<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

class MainController extends Controller
{
    public function dashboard()
    {
        return view('dashboard.dashboard');
    }

    public function auth()
    {

    }
}
