<?php

namespace App\Http\Controllers;

use App\Models\Enum\SystemPagesConstants;
use App\Repositories\NewsRepository;
use App\Repositories\SystemPagesRepository;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /** @var NewsRepository */
    private $newsRepository;

    /** @var SystemPagesRepository */
    private $pagesRepository;

    public function __construct(
        NewsRepository $newsRepository,
        SystemPagesRepository $pagesRepository
    )
    {
        $this->newsRepository = $newsRepository;
        $this->pagesRepository = $pagesRepository;
    }

    public function index()
    {
        $page = $this->pagesRepository->findBySlug(SystemPagesConstants::NEWS_PAGE);

        $news = $this->newsRepository->paginate();

        return view('news.index', [
            'news' => $news,
            'page' => $page
        ]);
    }

    public function inner(Request $request)
    {
        $news = $this->newsRepository->findByAlias($request->route('alias'));

        return view('news.inner', [
            'news' => $news,
            'comments' => []
        ]);
    }
}
