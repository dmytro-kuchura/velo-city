<?php

namespace App\Http\Controllers;

use App\Services\SportTopParserService;

class ParserController extends Controller
{
    private $service;

    public function __construct(SportTopParserService $service)
    {
        $this->service = $service;
    }

    public function addProductsToQuery()
    {
        $this->service->addToQuery();

        return $this->returnResponse([
            'success' => true,
            'add_to_query' => true,
        ], 201);
    }

    public function addOrUpdateProductsFromQuery()
    {
        $count = $this->service->uploadProductFromQuery();

        return $this->returnResponse([
            'success' => true,
            'imported' => $count,
        ], 200);
    }
}
