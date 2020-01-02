<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BannerCreateRequest;
use App\Http\Requests\BannerImageUpdateRequest;
use App\Http\Requests\BannerUpdateRequest;
use App\Repositories\BannersRepository;

class BannersController extends Controller
{
    private $repository;

    public function __construct(BannersRepository $bannersRepository)
    {
        $this->repository = $bannersRepository;
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

    public function create(BannerCreateRequest $bannerCreateRequest)
    {
        $this->repository->create($bannerCreateRequest->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function update($id, BannerUpdateRequest $bannerUpdateRequest)
    {
        $this->repository->store($id, $bannerUpdateRequest->all());

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
