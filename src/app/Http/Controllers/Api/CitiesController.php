<?php

namespace App\Http\Controllers\Api;

use App\Repositories\RegionsRepository;
use App\Http\Controllers\Controller;

class CitiesController extends Controller
{
    private $regionsRepository;

    public function __construct(RegionsRepository $regionsRepository)
    {
        $this->regionsRepository = $regionsRepository;
    }

    public function list()
    {
        $result = $this->regionsRepository->list();

        return $this->returnResponse([
            'success' => true,
            'result' => $result
        ]);
    }
}
