<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class MenuController extends Controller
{
    public function index()
    {
        return view('admin.menu.index');
    }

    public function create()
    {
        return view('admin.menu.create');
    }

    public function edit($id)
    {
        return view('admin.menu.edit', [
            '$id' => $id,
        ]);
    }
}