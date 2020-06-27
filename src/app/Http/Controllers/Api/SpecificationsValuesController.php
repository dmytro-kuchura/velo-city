<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Specifications\SpecificationsValuesCreateRequest;
use App\Repositories\SpecificationsValuesRepository;

class SpecificationsValuesController extends Controller
{
    /** @var SpecificationsValuesRepository */
    private $specificationsValuesRepository;

    public function __construct(
        SpecificationsValuesRepository $specificationsValuesRepository
    )
    {
        $this->specificationsValuesRepository = $specificationsValuesRepository;
    }

    public function create(SpecificationsValuesCreateRequest $request)
    {
        $this->specificationsValuesRepository->create($request->all());

        return $this->returnResponse([
            'success' => true
        ]);
    }

    public function delete($id)
    {
        $this->specificationsValuesRepository->destroy($id);

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}
