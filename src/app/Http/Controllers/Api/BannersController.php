<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
            'result' => $result
        ]);
    }

    public function show($id)
    {
    }

    public function store($data)
    {
    }

    public function update($data)
    {
    }

    public function delete($id)
    {
    }
}
