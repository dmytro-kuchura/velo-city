<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Forms\SubscribeFormRequest;
use App\Repositories\SubscribersRepository;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Swagger\Annotations as SWG;

class SubscribeController extends Controller
{
    private $repository;

    public function __construct(SubscribersRepository $subscribersRepository)
    {
        $this->repository = $subscribersRepository;
    }

    /**
     * @SWG\Get(
     *     path="/api/v1/subscribe",
     *     summary="Subscribe new user",
     *     tags={"Subscribers"},
     *     @SWG\Response(
     *         response=200,
     *         description="successful operation",
     *         @SWG\Schema(
     *             type="array",
     *             @SWG\Items(ref="#/definitions/Subscribers")
     *         ),
     *     ),
     *     @SWG\Response(
     *         response="401",
     *         description="Unauthorized user",
     *     ),
     * )
     */
    public function subscribe(SubscribeFormRequest $request)
    {
        $check = $this->repository->find($request->get('email'));

        if ($check && $check->ip === '192.168.1.1' && Carbon::now()->diffInMinutes($check->created_at) < 5) {
            return $this->returnResponse([
                'success' => false,
            ], 400);
        }

        try {
            $this->repository->create($request->all());
        } catch (\Throwable $exception) {
            Log::error($exception->getMessage());

            return $this->returnResponse([
                'success' => false,
            ], 400);
        }

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}
