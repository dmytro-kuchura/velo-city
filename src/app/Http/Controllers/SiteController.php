<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use App\Repositories\ProductsRepository;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    private $productsRepository;

    public function __construct(ProductsRepository $productsRepository)
    {
        $this->productsRepository = $productsRepository;
    }

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
        $result = $this->productsRepository->search($request->get('query'));

        return view('search', [
            'result' => $result,
            'query' => $request->get('query')
        ]);
    }
}
