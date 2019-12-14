<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\PaymentsRepository;

class PaymentController extends Controller
{
    /** @var PaymentsRepository */
    private $paymentsRepository;

    public function __construct(PaymentsRepository $deliveriesRepository)
    {
        $this->paymentsRepository = $deliveriesRepository;
    }

    public function list()
    {
        $result = $this->paymentsRepository->list();

        return $this->returnResponse([
            'success' => true,
            'result' => $result
        ]);
    }
}
