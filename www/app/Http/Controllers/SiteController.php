<?php

namespace App\Http\Controllers;

class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('index');
    }

    public function contacts()
    {
        return view('contacts');
    }
}
