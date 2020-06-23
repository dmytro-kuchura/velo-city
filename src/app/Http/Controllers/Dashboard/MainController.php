<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MainController extends Controller
{
    public function dashboard()
    {
        if (!Auth::check()) {
            if (Auth::user() && Auth::user()->role !== 2) {
                return redirect()->route('login');
            }

            return redirect()->route('login');
        }

        return view('dashboard.dashboard');
    }

    public function auth()
    {
        return view('dashboard.auth');
    }
}
