<?php

namespace App\Http\Controllers\Api;

use App\Services\UploadImage;
use App\Http\Controllers\Controller;
use App\Http\Requests\ImageUploadRequest;

class UploadController extends Controller
{
    public function image(ImageUploadRequest $request)
    {
        try {
            $service = new UploadImage();
            $path = $service->upload($request, 'banners');
        } catch (\Throwable $exception) {

            dd($exception->getMessage());

            return $this->returnResponse([
                'success' => false,
            ], 400);
        }

        return $this->returnResponse([
            'success' => true,
            'uploaded' => true,
            'url' => $path,
        ]);
    }
}
