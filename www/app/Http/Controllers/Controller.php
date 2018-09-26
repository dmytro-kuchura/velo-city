<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function success($response, $code = 201)
    {
        return response()->json([
            'success' => true,
            'response' => $response,
        ], $code, [], JSON_NUMERIC_CHECK);
    }

    public function false($exception, $code = 422)
    {
        return response()->json([
            'success' => false,
            'message' => $exception,
        ], $code, [], JSON_NUMERIC_CHECK);
    }
}