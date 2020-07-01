<?php

namespace App\Http\Controllers;

use App\Models\Enum\SystemPagesConstants;
use App\Repositories\SystemPagesRepository;

class WishlistController extends Controller
{
    /** @var SystemPagesRepository */
    private $pagesRepository;

    public function __construct(SystemPagesRepository $pagesRepository)
    {
        $this->pagesRepository = $pagesRepository;
    }

    public function wishlist()
    {
        $page = $this->pagesRepository->findBySlug(SystemPagesConstants::WISHLIST_PAGE);

        return view('wishlist.index', [
            'page' => $page
        ]);
    }
}
