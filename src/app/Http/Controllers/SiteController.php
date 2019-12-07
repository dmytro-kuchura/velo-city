<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function contacts()
    {
        return view('contact');
    }

    public function about()
    {
        return view('about');
    }

    public function sitemap()
    {
        //
    }

    public function search(Request $request)
    {
        //
    }
}
