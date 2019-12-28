<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Brands\BrandCreateRequest;
use App\Http\Requests\Brands\BrandUpdateRequest;
use App\Http\Requests\Brands\BrandImageUpdateRequest;
use App\Repositories\BrandsRepository;

class BrandsController extends Controller
{
    private $repository;

    public function __construct(BrandsRepository $brandsRepository)
    {
        $this->repository = $brandsRepository;
    }

    public function index()
    {
        $result = $this->repository->paginate();

        return $this->returnResponse([
            'success' => true,
            'result' => $result,
        ]);
    }

    public function all()
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

    public function create(BrandCreateRequest $brandCreateRequest)
    {
        $this->repository->create($brandCreateRequest->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function update($id, BrandUpdateRequest $brandUpdateRequest)
    {
        $this->repository->store($id, $brandUpdateRequest->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function image(BrandImageUpdateRequest $brandImageUpdateRequest)
    {
        $this->repository->updateImage($brandImageUpdateRequest->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function delete($id)
    {
        $this->repository->destroy($id);
    }
}