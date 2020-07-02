<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BannerCreateRequest;
use App\Http\Requests\BannerImageUpdateRequest;
use App\Http\Requests\BannerUpdateRequest;
use App\Http\Requests\News\NewsCreateRequest;
use App\Http\Requests\News\NewsUpdateRequest;
use App\Repositories\NewsRepository;

class NewsController extends Controller
{
    private $repository;

    public function __construct(NewsRepository $newsRepository)
    {
        $this->repository = $newsRepository;
    }

    public function index()
    {
        $result = $this->repository->paginate();

        return $this->returnResponse([
            'success' => true,
            'result' => $result,
        ]);
    }

    public function show($id)
    {
        $result = $this->repository->find($id);

        return $this->returnResponse([
            'success' => true,
            'result' => $result,
        ]);
    }

    public function create(NewsCreateRequest $request)
    {
        $this->repository->create($request->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function update($id, NewsUpdateRequest $request)
    {
        $this->repository->store($id, $request->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function image(BannerImageUpdateRequest $bannerImageUpdateRequest)
    {
        $this->repository->updateImage($bannerImageUpdateRequest->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function delete($id)
    {
        $this->repository->destroy($id);
    }
}
