<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Specifications\SpecificationsCreateRequest;
use App\Http\Requests\Specifications\SpecificationsUpdateRequest;
use App\Repositories\SpecificationsRepository;

class SpecificationsController extends Controller
{
    /** @var SpecificationsRepository */
    private $specificationsRepository;

    public function __construct(
        SpecificationsRepository $specificationsRepository
    )
    {
        $this->specificationsRepository = $specificationsRepository;
    }

    public function list()
    {
        $result = $this->specificationsRepository->paginate();

        return $this->returnResponse([
            'success' => true,
            'result' => $result,
        ]);
    }

    public function show($id)
    {
        $result = $this->specificationsRepository->find($id);

        return $this->returnResponse([
            'success' => true,
            'result' => $result,
        ]);
    }

    public function create(SpecificationsCreateRequest $request)
    {
        $this->specificationsRepository->create($request->all());

        return $this->returnResponse([
            'success' => true
        ]);
    }

    public function store(SpecificationsUpdateRequest $request)
    {
        $list = $this->specificationsRepository->store($request->get('id'), $request->all());

        return $this->returnResponse([
            'list' => $list
        ]);
    }

    public function delete($id)
    {
        $this->specificationsRepository->destroy($id);

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}
