<?php

namespace App\Http\Controllers;

use App\Repositories\MapRepository;
use Illuminate\Http\Request;
use App\Repositories\BlogRepository;
use App\Repositories\TagsRepository;
use App\Repositories\SitemapRepository;
use App\Repositories\CategoriesRepository;
use App\Repositories\SubscribersRepository;

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
