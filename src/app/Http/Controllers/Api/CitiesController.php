<?php

namespace App\Http\Controllers\Api;

use App\Repositories\CitiesRepository;
use App\Http\Controllers\Controller;use Illuminate\Http\Request;

class CitiesController extends Controller
{
    /** @var CitiesRepository */
    private $citiesRepository;

    public function __construct(CitiesRepository $regionsRepository)
    {
        $this->citiesRepository = $regionsRepository;
    }

    public function list(Request $request)
    {
        $result = $this->citiesRepository->list($request->route('region'));

        return $this->returnResponse([
            'success' => true,
            'result' => $result
        ]);
    }
}
