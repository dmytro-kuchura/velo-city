<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use App\Models\Enum\SystemPagesConstants;
use App\Repositories\BrandsRepository;
use App\Repositories\ProductsRepository;
use App\Repositories\SystemPagesRepository;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    /** @var ProductsRepository */
    private $productsRepository;

    /** @var SystemPagesRepository */
    private $pagesRepository;

    /** @var BrandsRepository */
    private $brandsRepository;

    public function __construct(
        ProductsRepository $productsRepository,
        BrandsRepository $brandsRepository,
        SystemPagesRepository $pagesRepository
    )
    {
        $this->productsRepository = $productsRepository;
        $this->brandsRepository = $brandsRepository;
        $this->pagesRepository = $pagesRepository;
    }

    public function index()
    {
        $page = $this->pagesRepository->findBySlug(SystemPagesConstants::MAIN_PAGE);

        return view('index', [
            'page' => $page
        ]);
    }

    public function contacts()
    {
        $page = $this->pagesRepository->findBySlug(SystemPagesConstants::CONTACTS_PAGE);

        return view('contacts', [
            'page' => $page
        ]);
    }

    public function about()
    {
        $page = $this->pagesRepository->findBySlug(SystemPagesConstants::ABOUT_PAGE);

        $brands = $brands = $this->brandsRepository->list();

        return view('about', [
            'page' => $page,
            'brands' => $brands,
        ]);
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
