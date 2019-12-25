<?php

namespace App\Http\Controllers\Api;

use App\Services\UploadImage;
use App\Http\Controllers\Controller;
use App\Http\Requests\ImageUploadRequest;
use Illuminate\Support\Facades\Log;

class UploadController extends Controller
{
    private $service;

    public function __construct(UploadImage $uploadImage)
    {
        $this->service = $uploadImage;
    }

    public function image(ImageUploadRequest $request)
    {
        try {
            $path = $this->service->upload($request, 'banners');
        } catch (\Throwable $exception) {
            Log::error($exception->getMessage());

            return $this->returnResponse([
                'success' => false,
            ], 400);
        }

        return $this->returnResponse([
            'success' => true,
            'url' => $path,
        ]);
    }
}
