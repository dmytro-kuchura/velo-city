<?php

namespace App\Http\Controllers\Api;

use App\Repositories\DeliveriesRepository;
use App\Http\Controllers\Controller;

class DeliveriesController extends Controller
{
    /** @var DeliveriesRepository */
    private $deliveriesRepository;

    public function __construct(DeliveriesRepository $deliveriesRepository)
    {
        $this->deliveriesRepository = $deliveriesRepository;
    }

    public function list()
    {
        $result = $this->deliveriesRepository->list();

        return $this->returnResponse([
            'success' => true,
            'result' => $result
        ]);
    }
}
