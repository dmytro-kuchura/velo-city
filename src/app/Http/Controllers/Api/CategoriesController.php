<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Catalog;
use App\Repositories\CategoriesRepository;

class CategoriesController extends Controller
{
    private $repository;

    public function __construct(CategoriesRepository $categoriesRepository)
    {
        $this->repository = $categoriesRepository;
    }

    public function all()
    {
        $result = $this->repository->all();

        return $this->returnResponse([
            'success' => true,
            'result' => $result,
        ]);
    }

    public function index()
    {
        $result = $this->repository->all();

        return $this->returnResponse([
            'success' => true,
            'result' => $result,
        ]);
    }
}
