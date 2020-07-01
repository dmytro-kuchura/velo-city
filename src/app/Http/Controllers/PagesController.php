<?php

namespace App\Http\Controllers;

use App\Repositories\PagesRepository;
use Illuminate\Http\Request;

class PagesController
{
    /** @var PagesRepository */
    private $pagesRepository;

    public function __construct(
        PagesRepository $pagesRepository
    )
    {
        $this->pagesRepository = $pagesRepository;
    }

    public function page(Request $request)
    {
        $page = $this->pagesRepository->findBySlug($request->route('slug'));

        return view('page', [
            'page' => $page
        ]);
    }
}
