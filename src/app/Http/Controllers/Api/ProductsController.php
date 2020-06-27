<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductCreateRequest;
use App\Http\Requests\Product\ProductImageUpdateRequest;
use App\Http\Requests\Product\ProductUpdateRequest;
use App\Repositories\ProductsRepository;

class ProductsController extends Controller
{
    private $repository;

    public function __construct(ProductsRepository $productsRepository)
    {
        $this->repository = $productsRepository;
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

    public function store(ProductCreateRequest $bannerCreateRequest)
    {
        $this->repository->create($bannerCreateRequest->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function update($id, ProductUpdateRequest $bannerUpdateRequest)
    {
        $this->repository->store($id, $bannerUpdateRequest->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function image(ProductImageUpdateRequest $bannerImageUpdateRequest)
    {
        $this->repository->updateImage($bannerImageUpdateRequest->all());

        return $this->returnResponse([
            'success' => true,
        ]);
    }

    public function delete($id)
    {
        $this->repository->destroy($id);

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}
