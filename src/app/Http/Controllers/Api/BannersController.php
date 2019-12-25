<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BannerImageUpdateRequest;
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
        $result = $this->repository->all();

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

    public function store($data)
    {
    }

    public function update($data)
    {
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
    }
}
