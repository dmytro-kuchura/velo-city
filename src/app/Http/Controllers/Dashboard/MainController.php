<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MainController extends Controller
{
    public function dashboard()
    {
        if (!Auth::check()) {
            return redirect()->route('dashboard.auth');
        }

        return view('dashboard.dashboard');
    }

    public function auth()
    {
        return view('dashboard.auth');
    }
}
