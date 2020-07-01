<?php

namespace App\Http\Controllers;

use App\Models\Enum\SystemPagesConstants;
use App\Repositories\SystemPagesRepository;

class CartController extends Controller
{
    /** @var SystemPagesRepository */
    private $pagesRepository;

    public function __construct(SystemPagesRepository $pagesRepository)
    {
        $this->pagesRepository = $pagesRepository;
    }

    public function cart()
    {
        $page = $this->pagesRepository->findBySlug(SystemPagesConstants::SHOPPING_CART_PAGE);

        return view('cart', [
            'page' => $page
        ]);
    }
}
